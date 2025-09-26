import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CampoInput from "../../components/campoInput";
import logo from "../../assets/2blogo.png";
import styles from "./login.module.css";





const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const login = async (e: React.FormEvent) => {
    e.preventDefault(); // evita refresh da página
    try {
      const response = await axios.post(
        "https://api.homologation.cliqdrive.com.br/auth/login/",
        { email, password },
        {
          headers: {
            Accept: "application/json;version=v1_web",
            "Content-Type": "application/json",
          },
        }
      );

    console.log(response.data); //Token 
    const token = response.data.tokens.access;
    if (!token) throw new Error("Token não retornado pela API");

    localStorage.setItem("token", token);
    console.log("Token salvo:", localStorage.getItem("token")); // confirmar
    navigate("/profile"); 
    } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 400) {
        setErrorMsg("Preencha todos os campos corretamente!");
      } else if (err.response?.status === 401) {
        setErrorMsg("Email ou senha incorretos!");
      } else {
        setErrorMsg("Ocorreu um erro, tente novamente");
      }
    } else {
      setErrorMsg("Ocorreu um erro inesperado");
    }
  }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <img src={logo} alt="Logo B2Bit" className={styles.logo} />
        <form onSubmit={login} className={styles.loginForm}>
          <div className={styles.campoForm}>
            <label htmlFor="email">Email</label>
            <CampoInput
              id="email"
              type="email"
              placeholder="@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.campoForm}>
            <label htmlFor="password">Password</label>
            <CampoInput
              id="password"
              type="password"
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.btnSignin}>
            Sign In
          </button>
        </form>
        {errorMsg && <span className={styles.error}>{errorMsg}</span>}
      </div>
    </div>
  );
};

export default Login;
