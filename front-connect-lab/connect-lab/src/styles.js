import styled from "styled-components";

export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  /* border: solid; */
  justify-content: space-between;

  img {
    width: 350px;
    margin-top: 150px;
  }

  label {
    /* border: solid; */
    text-align: left;
  }

  .labelInput {
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* border: solid red; */
  }

  .labelInput input {
    outline: none;
    border: solid #000;
    border-width: 0 0 1px 0;
    width: 300px;
    color: #8c8c8c;
  }

  .formLoginContainer {
    display: flex;
    flex-direction: column;
    /* border: solid blue; */
    align-items: center;
    gap: 10px;
    margin-top: 100px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    gap: 10px;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border: none;
  background-color: #0494dc;
  color: white;
  padding: 10px;
  width: 200px;
  height: 50px;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;

  a {
    text-decoration: none;
    color: white;
  }
`;

export const Input = styled.input`
  outline: none;
  border: solid #000;
  border-width: 0 0 1px 0;
  min-width: 350px;
`;

export const Label = styled.label`
  text-align: left;
`;

export const FormSignUpHeader = styled.div`
  text-align: center;

  img {
    width: 350px;
    margin-top: 50px;
  }
`;

export const FormSignUp = styled.div`
  background-color: white;
  padding: 10px;
  margin: 0 auto;
  width: 100%;
  max-width: 50%;

  span {
    padding: 10px;
  }

  .formSignUp {
    display: flex;
    align-items: flex-start;
    gap: 30px;
    justify-content: center;
    padding: 30px;
  }

  .signUpData {
    /* border: solid 3px green; */
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .signUpAdress {
    /* border: solid 3px yellow; */
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  label {
    /* border: solid grey; */
    text-align: left;
  }

  .sendButton {
    display: flex;
    text-align: center;
    justify-content: center;
  }

  .loginButton {
    padding: 10px;
    text-align: center;
  }
`;

export const NavbarComponent = styled.div`
  background-color: #505151;
  padding: 10px;

  img {
    width: 300px;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
  }

  .linksNavbar {
    display: flex;
    gap: 30px;
  }

  .linksNavbar a {
    background-color: #0098da;
    text-decoration: none;
    color: white;
    padding: 10px;
    border-radius: 10px;
  }
`;

export const DeviceCard = styled.div`
  img {
    width: 150px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    list-style-type: none;
  }

  h3 {
    padding: 5px;
    text-align: center;
    text-transform: uppercase;
  }

  .userDeviceCard {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 500px;
    background-color: #a7bac4;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.49);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.49);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.49);
  }

  .deviceImage {
    grid-area: 1 / 1 / 2 / 2;
    background-color: white;
    padding: 10px;
    border-radius: 10px 0 0 10px;
  }

  .deviceData {
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }
`;

export const DeviceList = styled.div`
  margin-top: 30px;

  div {
    display: flex;
    gap: 50px;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const StyledSearchBar = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;

  input {
    width: 120vh;
    border: none;
    background-color: #e1e1e1;
    padding: 10px;
    outline: none;
    margin-top: 90px;
    margin-bottom: 90px;
    border-radius: 10px;
  }

  .searchButton {
  }
`;

export const UserProfileCard = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  padding: 10px;
  text-align: center;

  h2 {
    margin-top: 20px;
  }

  .profileCard {
    background-color: #e0e0e0;
    width: 500px;
    margin: 10px;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.49);
    -moz-box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.49);
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.49);
  }

  .profileData {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    margin: 50px;
    color: #707070;
  }

  .userImage {
    grid-area: 1 / 1 / 2 / 2;
  }

  .userImage img {
    width: 150px;
    border-radius: 30px;
  }

  .userData {
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }

  .userAdress {
    margin-bottom: 50px;
  }
  .userAdress p {
    padding: 5px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
  }
`;

export const DeleteButton = styled.button`
  background: #e0e0e0;
  border-radius: 100px;
  padding: 5px;
  font-size: 15px;
  font-weight: bold;
  color: black;
  border: none;
  cursor: pointer;
`;
