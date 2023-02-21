import React, { useState, useEffect } from "react";
import {
  userDeviceList,
  deleteDevice,
  userDevice,
  changeStatus,
} from "../../services/api";
import { DeviceCard, SwtichButton } from "../../styles";
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
  const [deviceStatus, setDeviceStatus] = useState({});

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openAndSet = async (id) => {
    const response = await userDevice(id);
    const userDeviceResp = response.data;
    setDeviceModal(userDeviceResp);
    openModal();
  };

  useEffect(() => {
    (async () => {
      const response = await userDeviceList();
      const userDevice = setDevicesList(response.data);
      setLoading(false);

      const deviceStatuses = {};
      userDevice.forEach((device) => {
        deviceStatuses[device.id] = device.status;
      });

      setDeviceStatus(deviceStatuses);
    })();
  }, []);

  const showToastMessage = () => {
    toast.success("Dispositivo deletado!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const switchStatus = async (id) => {
    await changeStatus(id);
    setDeviceStatus((prevStatus) => ({
      ...prevStatus,
      [id]: prevStatus[id] === "ON" ? "OFF" : "ON",
    }));
  };

  const showStatus = (status) => {
    if (status.toLowerCase() === "ligado" || status.toLowerCase() === "on") {
      return "ON";
    } else if (
      status.toLowerCase() === "desligado" ||
      status.toLowerCase() === "off"
    ) {
      return "OFF";
    } else {
      return "UNKNOWN";
    }
    const refresh = userDeviceList();
    setDevicesList(refresh.data);
  };

  const deleteSelectedDevice = async (id) => {
    setLoading(true);
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
            {userDevicesList.map(({ device, id, status }) => (
              <li key={device.info.virtual_id}>
                <div className="userDeviceCard">
                  <div className="deviceImage">
                    <img src={device.photoUrl} alt={device.name} />
                  </div>

                  <div className="deviceData">
                    <h3>{device.name}</h3>
                    <div className="switch-delete-buttons">
                      <SwtichButton
                        style={{
                          color:
                            status.toLowerCase() === "ligado"
                              ? "green"
                              : "grey",
                        }}
                        className={
                          status.toLowerCase() === "ligado" ? "on" : "off"
                        }
                        onClick={() => switchStatus(id, status)}
                      >
                        {deviceStatus[id] || showStatus(status)}
                      </SwtichButton>
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
