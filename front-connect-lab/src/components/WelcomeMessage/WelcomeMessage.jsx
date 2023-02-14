import React, { useContext } from "react";
import { AuthenticationContext } from "../Context/Authentication";
import styles from "../WelcomeMessage/styles.css";

export const WelcomeMessage = () => {
  const { user } = useContext(AuthenticationContext);

  function firstName(name, space) {
    return name.split(space, 1)[0];
  }

  return (
    <div className="welcomeTile">
      <h3>
        Seja bem vindo, <span>{firstName(user.fullName, " ")}</span>!
      </h3>
    </div>
  );
};
