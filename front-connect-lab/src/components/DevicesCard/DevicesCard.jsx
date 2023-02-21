import React, { useState, useEffect, useContext } from "react";
import { Button, DeviceCard, Input } from "../../styles";
import { getDevice, addUserDevice } from "../../services/api";
import { Loading } from "../Loading/Loading";
import Modal from "react-modal";
import { AuthenticationContext } from "../Context/Authentication";
import styles from "../DevicesCard/styles.css";
import { LoadingBtn } from "../LoadingBtn/LoadingBtn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

export const DevicesCard = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [deviceModal, setDeviceModal] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Casa");
  const { user } = useContext(AuthenticationContext);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const showToastMessage = () => {
    toast.success("Dispositivo pareado!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const openAndSet = (device) => {
    setDeviceModal(device);
    openModal();
  };

  useEffect(() => {
    (async () => {
      const response = await getDevice();
      setDevices(response.data);
      setLoading(false);
    })();
  }, []);

  const addDevice = async (device) => {
    setLoadingBtn(true);

    const deviceFormated = {
      userId: user.id,
      deviceId: device.info.virtual_id,
      status: "Desligado",
      location: selectedLocation,
    };
    setTimeout(async () => {
      await addUserDevice(deviceFormated);
      setLoadingBtn(false);
      showToastMessage();
      closeModal();
    }, Math.floor(Math.random() * 2000) + 3000);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <DeviceCard>
          <ul>
            {devices.map((device) => (
              <li key={device._id}>
                <div className="userDeviceCard">
                  <div className="deviceImage">
                    <img src={device.photoUrl} alt={device.name} />
                  </div>

                  <div className="deviceData">
                    <h3>{device.name}</h3>
                    <Button onClick={() => openAndSet(device)}>
                      Adicionar
                    </Button>
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
          contentLabel="Device details"
          overlayClassName="modal-overlay"
          className="modal-card"
        >
          <div className="modal-container">
            <div className="device-container">
              <div className="device-img">
                <img src={deviceModal.photoUrl} alt={deviceModal.name} />
              </div>
              <div className="device-data">
                <h2>Dispositivo: {deviceModal.name}</h2>
                <h5>Fabricante: {deviceModal.madeBy}</h5>
                <p>{deviceModal.type}</p>
                <div className="device-local">
                  <div>
                    <label>Local de instalação: </label>
                    <select
                      className="device-local-select"
                      onChange={(event) =>
                        setSelectedLocation(event.target.value)
                      }
                    >
                      <option>Casa</option>
                      <option>Escritório</option>
                      <option>Fábrica</option>
                    </select>
                  </div>
                </div>
                {/* <Input
                  className="device-local-input"
                  placeholder="Em qual cômodo o dispositivo está instalado?"
                /> */}
              </div>
            </div>

            <div className="modal-btn">
              <Button
                onClick={() => addDevice(deviceModal)}
                disabled={loadingBtn}
                className="add-btn"
              >
                Adicionar{loadingBtn && <LoadingBtn />}
              </Button>
              <ToastContainer />
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

export default DevicesCard;
