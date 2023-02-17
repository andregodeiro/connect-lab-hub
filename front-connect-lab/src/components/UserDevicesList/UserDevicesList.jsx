import React, { useState, useEffect } from "react";
import { userDeviceList, deleteDevice, userDevice } from "../../services/api";
import { DeviceCard } from "../../styles";
import { Loading } from "../Loading/Loading";
import { Button, DeleteButton } from "../../styles";
import styles from "../UserDevicesList/styles.css";
import { Swtich } from "../Switch/Swtich";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserDevicesList = () => {
  const [userDevicesList, setDevicesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deviceModal, setDeviceModal] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openAndSet = async (id) => {
    const response = await userDevice(id);
    console.log("Lista de Dispositivos do Usuário: ", response.data);
    const userDeviceResp = response.data;
    setDeviceModal(userDeviceResp);
    console.log("DeviceModal: ", deviceModal);
    openModal();
  };

  useEffect(() => {
    (async () => {
      const response = await userDeviceList();
      const userDevice = setDevicesList(response.data);
      setLoading(false);
    })();
  }, []);

  const showToastMessage = () => {
    toast.success("Dispositivo deletado!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const deleteSelectedDevice = async (id) => {
    setLoading(true);
    console.log(id);
    await deleteDevice(id);
    const refresh = await userDeviceList();
    setDevicesList(refresh.data);
    showToastMessage();
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <DeviceCard>
          <ul>
            {userDevicesList.map(({ device, id }) => (
              <li key={device.info.virtual_id}>
                <div className="userDeviceCard">
                  <div className="deviceImage">
                    <img src={device.photoUrl} alt={device.name} />
                  </div>

                  <div className="deviceData">
                    <h3>{device.name}</h3>
                    <div className="switch-delete-buttons">
                      <Swtich />
                      <DeleteButton onClick={() => deleteSelectedDevice(id)}>
                        Desparear
                      </DeleteButton>
                    </div>

                    <Button
                      className="details-btn"
                      onClick={() => openAndSet(id)}
                    >
                      Detalhes
                    </Button>
                    <ToastContainer />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </DeviceCard>
      )}
      {Object.values(deviceModal).length !== 0 && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="User daevices details"
          overlayClassName="modal-overlay"
          className="modal-card"
        >
          <div className="modal-container">
            <div className="device-container">
              <div className="device-img">
                <img
                  src={deviceModal.device.photoUrl}
                  alt={deviceModal.device.name}
                />
              </div>
              <div className="device-data">
                <h2>Dispositivo: {deviceModal.device.name}</h2>
                <h5>Fabricante: {deviceModal.device.madeBy}</h5>
                <p>{deviceModal.device.type}</p>
                <p>Local: {deviceModal.location}</p>
                <p>Endereço IP: {deviceModal.device.info.ip_address}</p>
                <p>Endereço MAC: {deviceModal.device.info.mac_address}</p>
                <p>Sinal: {deviceModal.device.info.signal}</p>
              </div>
            </div>
            <div className="modal-btn">
              <button className="btn-close-modal" onClick={closeModal}>
                Fechar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
