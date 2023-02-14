import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../Context/Authentication";
import { Button, UserProfileCard } from "../../../styles";
import { Navbar } from "../../Navbar/Navbar";
import { getUser, userDeviceList } from "../../../services/api";
import { Loading } from "../../Loading/Loading";

export const UserProfile = () => {
  const { authenticated, logout } = useContext(AuthenticationContext);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getUser();
      await userDeviceList();
      setUser(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <Navbar />

      <UserProfileCard>
        <div className="profileCard">
          <h2>Perfil do Usuário</h2>

          <div className="profileData">
            <div className="userImage">
              <img
                src={user.photoUrl}
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "https://i.imgur.com/DKYclA9.jpg";
                }}
              />
            </div>

            <div className="userData">
              <h5>{user.fullName}</h5>
              <p>{user.email}</p>
              <p>{user.telephone}</p>
            </div>
          </div>
          <div className="userAdress">
            <p>
              {user.userAddress.street}, {user.userAddress.number}
            </p>
            <p>
              {user.userAddress.city}, {user.userAddress.state}
            </p>
            <p>{user.userAddress.zipCode}</p>
          </div>

          <div className="buttons">
            <Button>Editar</Button>
            <a href="" onClick={handleLogout}>
              Sair
            </a>
          </div>
        </div>
      </UserProfileCard>
    </div>
  );
};
