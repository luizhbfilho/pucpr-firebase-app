import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    senha: "",
    nome: "",
    sobrenome: "",
    dataNascimento: "",
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    try {
      const credencial = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      );
      const uid = credencial.user.uid;
      await setDoc(doc(db, "usuarios", uid), {
        uid,
        nome: form.nome,
        sobrenome: form.sobrenome,
        email: form.email,
        dataNascimento: form.dataNascimento,
      });
      setSucesso("Usuário cadastrado com sucesso!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err: unknown) {
      if (err instanceof Error) setErro(err.message);
      else setErro("Erro ao cadastrar usuário.");
    }
  }

  return (
    <div className="container">
      <h1>Cadastro</h1>
      <form onSubmit={handleCadastro}>
        <label>
          Nome
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Sobrenome
          <input
            type="text"
            name="sobrenome"
            value={form.sobrenome}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
            minLength={6}
          />
        </label>
        <label>
          Data de Nascimento
          <input
            type="date"
            name="dataNascimento"
            value={form.dataNascimento}
            onChange={handleChange}
            required
          />
        </label>
        {erro && <p className="erro">{erro}</p>}
        {sucesso && <p className="sucesso">{sucesso}</p>}
        <button type="submit">Cadastrar</button>
      </form>
      <p>
        Já tem conta? <Link to="/">Fazer login</Link>
      </p>
    </div>
  );
}
