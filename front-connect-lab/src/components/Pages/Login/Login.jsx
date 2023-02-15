import { Button, ContainerLogin, Input } from "../../../styles";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthenticationContext } from "../../Context/Authentication";
import { createSession } from "../../../services/api";

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

  // const userLogin = async (data) => {
  //   console.log({ email, password });
  //   try {
  //     const response = await createSession(data.email, data.password);
  //     localStorage.setItem("user", JSON.stringify(response.payload.email));
  //     localStorage.setItem("token", response.payload.token);
  //     window.location = "/";
  //   } catch (error) {
  //     setError("password", {
  //       type: "manual",
  //       message: "Invalid email or password",
  //     });
  //   }
  // };

  return (
    <ContainerLogin>
      <div>
        <img src="https://i.imgur.com/pTj5VAl.png" alt="" />
        <form onSubmit={handleSubmit(userLogin)} className="formLoginContainer">
          <div className="labelInput">
            <label htmlFor="email" name="email" id="email">
              e-mail
            </label>

            <Input
              type="email"
              name="email"
              id="email"
              {...register("email")}
              defaultValue={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <small>{errors.email?.message}</small>

            <label htmlFor="password">senha</label>
            <Input
              type="password"
              name="password"
              id="password"
              {...register("password")}
              defaultValue={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <small>{errors.password?.message}</small>
          </div>
          <div className="buttons">
            <Button type="submit">acessar</Button>
            <Link to="/cadastro">crie uma conta no connectlab</Link>
          </div>
        </form>
      </div>
    </ContainerLogin>
  );
};

export default Login;
