import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

interface Usuario {
  nome: string;
  sobrenome: string;
  dataNascimento: string;
}

export default function Principal() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/");
      return;
    }
    getDoc(doc(db, "usuarios", user.uid))
      .then((snap) => {
        if (snap.exists()) {
          setUsuario(snap.data() as Usuario);
        } else {
          setErro("Dados do usuário não encontrados.");
        }
      })
      .catch(() => setErro("Erro ao buscar dados do usuário."));
  }, [navigate]);

  async function handleLogout() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <div className="container">
      <h1>Página Principal</h1>
      {erro && <p className="erro">{erro}</p>}
      {usuario ? (
        <div className="card">
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>Sobrenome:</strong> {usuario.sobrenome}</p>
          <p><strong>Data de Nascimento:</strong> {usuario.dataNascimento}</p>
        </div>
      ) : (
        !erro && <p>Carregando dados...</p>
      )}
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
