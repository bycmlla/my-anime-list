import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Frieren from "../assets/images/frierenbg.png";

const Login = () => {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha }),
      });

      if (!res.ok) throw new Error("Senha incorreta");

      const { token } = await res.json();
      localStorage.setItem("authToken", token);
      navigate("/add");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        flexDirection: "column",
      }}
    >
      <h2 className="Acess">Acesso Restrito</h2>
      <input
        type="password"
        placeholder="Digite a senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button
        onClick={handleLogin}
        style={{
          backgroundColor: "#F5DEB3",
          border: "none",
          borderRadius: 10,
          marginTop: 10,
          fontSize: 15,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        Entrar
      </button>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <div className="box-acesso">
        “A maior alegria da magia está em procurá-la.” – Frieren
        <img src={Frieren} alt="mini frieren" />
      </div>
    </div>
  );
};

export default Login;
