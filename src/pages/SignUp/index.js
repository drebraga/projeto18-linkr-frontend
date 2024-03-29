import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageLoad from "../../components/Load/Load.js";

export default function SignUp() {
  const URLPOST = `${process.env.REACT_APP_API_URL}/`;
  const navigate = useNavigate();

  let [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    pictureUrl: "",
  });

  const [isDisabled, setIsDisabled] = useState(false)


  function handleSignIn(e) {
    e.preventDefault();
    setIsDisabled(true)

    axios
      .post(`${URLPOST}sign-up`, form)
      .then((res) => {
        alert("Usuário criado!")
        navigate("/");
        setIsDisabled(false)
      })
      .catch((err) => {
        alert(err.response.message);
        setIsDisabled(false)
      });
  }

  return (
    <Container>

      <SidebarSty>
        <div>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </div>
      </SidebarSty>


      <SignInSty>
        <form onSubmit={handleSignIn}>

          <input
            name="email"
            type="email"
            placeholder="email"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            value={form.email}
            data-test="email"
          />

          <input
            name="password"
            type="password"
            placeholder="password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            value={form.password}
            data-test="password"
          />

          <input
            name="username"
            type="text"
            placeholder="username"
            required
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            value={form.username}
            data-test="username"
          />

          <input
            name="pictureUrl"
            type="url"
            placeholder="picture url"
            required
            onChange={(e) =>
              setForm({ ...form, pictureUrl: e.target.value })
            }
            value={form.pictureUrl}
            data-test="picture-url"
          />
          <button
            type="submit"
            data-test="sign-up-btn"
            disabled={isDisabled}
          >
            {isDisabled ? <PageLoad /> : "Sign Up"}
          </button>
        </form>
        <p data-test="login-link" onClick={() => navigate("/")} >
          Switch back to log in
        </p>
      </SignInSty>

    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 900px;


  @media (max-width: 860px) {
    flex-direction: column;
    height:667px;
    
    div{
      text-align: center;
    }
  }

`;

const SidebarSty = styled.div`
  display: flex;
  flex-direction: column;
  width: 75vw;
  height: 900px;
  background-color: #151515;
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 700;
  color: #FFFFFF;

  div{
    margin: 300px 0 0 110px;
  }

  h1{
    font-size: 106px;
    line-height: 117px;
    width: 233px;
  }

  h2{
    font-size: 43px;
    line-height: 64px;
    width: 442px;
  }

  @media (max-width: 860px) {
      width: 100%;
      height: 25%;

      div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 10px 0 0 0;
      }

      h1{
        font-size: 76px;
        line-height: 75px;
        width: 40%;
      }

      h2{
        text-align: center;
        font-size: 23px;
        line-height: 30px;
        width: 80%;
      }

    }

`;

const SignInSty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lexend Deca", sans-serif;
  width: 50vw;
  background-color: #333333;


  form {
    display: flex;
    flex-direction: column;
    margin: 300px 0 0 0;
  }

  input {
    width: 429px;
    height: 65px;
    left: 956px;
    top: 317px;
    background: #FFFFFF;
    border-radius: 6px;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #9F9F9F;
    margin-bottom: 12px;
    padding:18px;
  }

  button {
    width: 429px;
    height: 65px;
    background: #1877F2;
    border-radius: 6px;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;
    margin-bottom: 22px;
    border-color: transparent;
  }

  p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #FFFFFF;
  }

  /* @media (max-width: 860px) and (min-width: 376px) {
  input{
    background-color: red;
  }
} */

  @media (max-width: 860px) {
    width: 100%;
    height:75%;

    form {
    margin: 40px 0 0 0;
  }

  input {
    width: 330px;;
    height: 55px;
    font-size: 22px;
    line-height: 33px;
    margin-bottom: 11px;
    padding:10px;
  }

  button {
    width: 330px;
    height: 55px;
    font-size: 22px;
    line-height: 33px;
    margin-bottom: 22px;
  }

  p {
    font-size: 17px;
    line-height: 20px;
  }

  }

`;