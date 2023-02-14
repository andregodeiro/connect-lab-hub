import { NavbarComponent } from "../../styles";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <NavbarComponent>
      <div className="navbar">
        <div className="imgHeader">
          <img src="https://i.imgur.com/b1ujw9r.png" alt="" />
        </div>
        <div className="linksNavbar">
          <Link to="/home">Início</Link>
          <Link to="/devices">Dispositivos</Link>
          <Link to="/profile">Perfil do Usuário</Link>
        </div>
      </div>
    </NavbarComponent>
  );
};
