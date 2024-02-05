import { useState } from "react";
import styled from "styled-components";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
      });
  };

  return (
    <Container>
      <Center>
        <Logo />
        <HeadingText src="/public/images/apple-gray-logo.svg" alt="로고">
          {" "}
          LOGIN
        </HeadingText>
        <Description>Login and experience various contents</Description>
        <Input
          type="email"
          placeholder="Email"
          // value={email}
          onChange={handleEmail}
        ></Input>
        <Input
          type="password"
          placeholder="PW"
          // value={password}
          onChange={handlePassword}
        ></Input>
        <Button onClick={handleLogin}>login</Button>
        <LinkText onClick={() => navigate("/signup")}>
          Create New Account
        </LinkText>
        {/* <LinkText>Forgot Apple ID or Password?</LinkText> */}
      </Center>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Center = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Logo = styled.img`
  margin-bottom: 1.3rem;
  width: 50px;
`;
const HeadingText = styled.h1`
  font-size: 1.9rem;
`;

const Description = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
`;

const LinkText = styled.p`
  font-size: 1.2rem;
  color: #2997ff;
  margin: 3rem 0;
  cursor: pointer;
`;
const Input = styled.input`
  color: #c3c1c1;
  box-sizing: border-box;
  margin-bottom: 0.8rem;
  font-size: 18px;
  padding: 1rem;
  border: 3px solid transparent;
  border-radius: 12px;
  border-color: #424245;
  background-color: hsla(0, 0%, 100%, 0.04);
  width: 350px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.08);
  }
`;
const Button = styled.button`
  box-sizing: border-box;
  margin-top: 2.5rem;
  font-size: 20px;
  padding: 1rem;
  border: 3px solid transparent;
  border-radius: 12px;
  background-color: #c1c1c1;
  color: black;
  /* background-color: hsla(0, 0%, 100%, 0.04); */
  border-color: #c1c1c1;
  width: 350px;
  font-weight: 400;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    color: white;
    border-color: #c1c1c1;
    background-color: hsla(0, 0%, 100%, 0.04);
  }
`;
export default LoginPage;
