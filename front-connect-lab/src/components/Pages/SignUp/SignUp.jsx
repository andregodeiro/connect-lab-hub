import {
  Button,
  FormSignUp,
  FormSignUpContainer,
  FormSignUpHeader,
  FormSignUpImage,
  FormSignUpMain,
  Input,
} from "../../../styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../../services/api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";

export const SignUp = () => {
  //Validação YUP
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .min(15, "Campo obrigatório! Mínimo 15 caracteres!")
      .required(),
    email: yup.string().email().required("Campo obrigatório!"),
    photoUrl: yup.string().url(),
    password: yup
      .string()
      .min(8, "Mínimo 8 caracteres")
      .required("Campo obrigatório!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "A senha precisa ter no mínimo 8 caracteres, " +
          "uma letra maiúscula, uma letra minúscula, " +
          "um número e um caracter especial"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas devem ser idênticas!"),
    zipCode: yup
      .string()
      .min(8, "Insira um CEP válido")
      .required("Campo obrigatório!"),
    street: yup.string().required(),
    number: yup.number().required("Campo obrigatório!"),
    neighborhood: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    complement: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const catchCep = (user) => {
    const cep = user.target.value.replace(/\D/g, "");
    console.log(errors);
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then((res) =>
      res.json().then((data) => {
        setValue("street", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("state", data.uf);
        setFocus("number");
      })
    );
  };

  const createUser = (value) => {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      photoUrl,
      zipCode,
      street,
      number,
      neighborhood,
      city,
      state,
      complement,
    } = value;

    console.log(value);

    api
      .post("/users/signup", {
        fullName,
        email,
        password,
        confirmPassword,
        photoUrl,
        zipCode,
        street,
        number,
        neighborhood,
        city,
        state,
        complement,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log("Erro", +response);
      });
    userSignedUp();
  };

  const userSignedUp = () => {
    toast.success("Usuário Cadastrado!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <FormSignUpContainer>
      <FormSignUpImage></FormSignUpImage>
      <FormSignUpMain>
        <FormSignUpHeader>
          <img src="https://i.imgur.com/pTj5VAl.png" alt="" />
          <p>
            criando sua conta no connectlab você integrará todos os seus
            dispositivos em um só ambiente!
          </p>
        </FormSignUpHeader>
        <div>
          <div className="formContainer">
            <FormSignUp>
              <form onSubmit={handleSubmit(createUser)}>
                <div className="formSignUp">
                  <div className="signUpData">
                    <h3>Dados Pessoais</h3>

                    <TextField
                      className="outlined-basic"
                      label="Nome Completo"
                      variant="standard"
                      {...register("fullName")}
                      error={errors.fullName ? true : false}
                      helperText={errors.fullName?.message}
                    />

                    <TextField
                      className="outlined-basic"
                      label="E-mail"
                      variant="standard"
                      {...register("email")}
                      error={errors.email ? true : false}
                      helperText={errors.email?.message}
                    />

                    <TextField
                      className="outlined-basic"
                      label="Foto de Perfil"
                      variant="standard"
                      {...register("photoUrl")}
                    />

                    <TextField
                      className="outlined-basic"
                      label="Senha"
                      type={"password"}
                      variant="standard"
                      {...register("password")}
                      error={errors.password ? true : false}
                      helperText={errors.password?.message}
                    />

                    <TextField
                      className="outlined-basic"
                      label="Confirme a Senha"
                      type={"password"}
                      variant="standard"
                      {...register("confirmPassword")}
                      error={errors.confirmPassword ? true : false}
                      helperText={errors.confirmPassword?.message}
                    />
                  </div>

                  <div className="signUpAdress">
                    <h3>Endereço</h3>
                    <TextField
                      className="outlined-basic"
                      label="CEP"
                      variant="standard"
                      {...register("zipCode")}
                      error={errors.zipCode ? true : false}
                      helperText={errors.zipCode?.message}
                      onBlur={catchCep}
                    />

                    <TextField
                      className="outlined-basic"
                      label="Logradouro"
                      variant="standard"
                      {...register("street")}
                      error={errors.street ? true : false}
                      helperText={errors.street?.message}
                    />

                    <TextField
                      className="outlined-basic"
                      label="Bairro"
                      variant="standard"
                      {...register("neighborhood")}
                      error={errors.neighborhood ? true : false}
                      helperText={errors.neighborhood?.message}
                    />

                    <TextField
                      className="outlined-basic"
                      label="Cidade"
                      variant="standard"
                      {...register("city")}
                      error={errors.city ? true : false}
                      helperText={errors.city?.message}
                    />

                    <TextField
                      className="outlined-basic"
                      label="Estado"
                      variant="standard"
                      {...register("state")}
                      error={errors.state ? true : false}
                      helperText={errors.state?.message}
                    />

                    <TextField
                      className="outlined-basic"
                      label="Número"
                      variant="standard"
                      {...register("number")}
                      error={errors.number ? true : false}
                      helperText={errors.number?.message}
                    />

                    <TextField
                      className="outlined-basic"
                      label="Complemento"
                      variant="standard"
                      {...register("complement")}
                      error={errors.complement ? true : false}
                      helperText={errors.complement?.message}
                    />
                  </div>
                </div>
                <div className="sendButton">
                  <Button type="submit">cadastrar</Button>
                  <ToastContainer />
                </div>
              </form>
              <div className="loginButton">
                <Link to="/">login</Link>
              </div>
            </FormSignUp>
          </div>
        </div>
      </FormSignUpMain>
    </FormSignUpContainer>
  );
};

export default SignUp;
