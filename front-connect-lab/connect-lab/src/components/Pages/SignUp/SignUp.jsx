import { Button, FormSignUp, FormSignUpHeader, Input } from "../../../styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../../services/api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas devem ser idênticas!"),
    phone: yup.number(),
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

  //user = e (parâmetro)
  // const newUser = (user) => {
  //   console.log(user);
  // };

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
      email,
      password,
      fullName,
      photoUrl,
      phone,
      zipCode,
      street,
      number,
      neighborhood,
      city,
      state,
      complement,
    } = value;

    api
      .post("/auth/register", {
        email,
        password,
        fullName,
        photoUrl,
        phone,
        userAddress: {
          zipCode,
          street,
          number,
          neighborhood,
          city,
          state,
          complement,
        },
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
    <div>
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
                  <label htmlFor="">Nome Completo</label>
                  <Input type="text" {...register("fullName")} />
                  <small>{errors.fullName?.message}</small>

                  <label htmlFor="">E-mail</label>
                  <Input type="text" {...register("email")} />
                  <small>{errors.email?.message}</small>

                  <label htmlFor="">Foto de Perfil</label>
                  <Input
                    type="text"
                    placeholder="Insira uma URL"
                    {...register("photoUrl")}
                  />

                  <label htmlFor="">Telefone</label>
                  <Input type="number" {...register("phone")} />

                  <label htmlFor="">Senha</label>
                  <Input type="password" {...register("password")} />
                  <p>{errors.password?.message}</p>

                  <label htmlFor="">Confirme a senha</label>
                  <Input type="password" {...register("passwordConfirm")} />
                  <small>{errors.passwordConfirm?.message}</small>
                </div>

                <div className="signUpAdress">
                  <h3>Endereço</h3>
                  <label htmlFor="">CEP</label>
                  <Input
                    type="text"
                    id="cep"
                    {...register("zipCode")}
                    onBlur={catchCep}
                  />
                  <small>{errors.zipCode?.message}</small>

                  <label htmlFor="">Logradouro</label>
                  <Input type="text" id="logradouro" {...register("street")} />

                  <label htmlFor="">Bairro</label>
                  <Input
                    type="text"
                    id="bairro"
                    {...register("neighborhood")}
                  />

                  <label htmlFor="">Cidade</label>
                  <Input type="text" id="cidade" {...register("city")} />

                  <label htmlFor="">Estado</label>
                  <Input type="text" id="uf" {...register("state")} />

                  <label htmlFor="">Número</label>
                  <Input type="number" id="numero" {...register("number")} />

                  <label htmlFor="">Complemento</label>
                  <Input
                    ype="text"
                    id="complemento"
                    {...register("complement")}
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
    </div>
  );
};

export default SignUp;
