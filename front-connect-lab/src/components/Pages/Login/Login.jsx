import {
  Button,
  ContainerLogin,
  Input,
  LoginField,
  LoginImage,
} from "../../../styles";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthenticationContext } from "../../Context/Authentication";
import { createSession } from "../../../services/api";
import TextField from "@mui/material/TextField";

export const Login = () => {
  const { authenticated, login } = useContext(AuthenticationContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const schema = yup.object().shape({
    email: yup.string().required("Digite seu e-mail"),
    password: yup.string().required("Digite sua senha"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const userLogin = async (data) => {
    console.log({ email, password });
    try {
      await login(data.email, data.password);
      window.location = "/home";
    } catch (error) {
      console.log(error);
      setError("password", {
        type: "manual",
        message: "Invalid email or password",
      });
    }
  };

  return (
    <ContainerLogin>
      <LoginImage></LoginImage>
      <LoginField>
        <img src="https://i.imgur.com/pTj5VAl.png" alt="" />
        <form onSubmit={handleSubmit(userLogin)} className="formLoginContainer">
          <div className="labelInput">
            <TextField
              htmlFor={"email"}
              id="email"
              label="email"
              type={"email"}
              variant="standard"
              {...register("email")}
              defaultValue={email}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
              onChange={(event) => setEmail(event.target.value)}
            />

            <TextField
              htmlFor={"password"}
              id="password"
              label="password"
              type={"password"}
              variant="standard"
              {...register("password")}
              defaultValue={password}
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="buttons">
            <Button type="submit">acessar</Button>
            <Link to="/cadastro">crie uma conta no connectlab</Link>
          </div>
        </form>
      </LoginField>
    </ContainerLogin>
  );
};

export default Login;
