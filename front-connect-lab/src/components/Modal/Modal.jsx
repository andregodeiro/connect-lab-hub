// import React, { useState } from "react";
// import { Modal as ModalComponent } from "react-modal";
// import styles from "../Modal/styles.css";
// import { Button } from "../../styles";
// import PropTypes from "prop-types";

// export const Modal = ({ device }) => {
//   const [modalIsOpen, setIsOpen] = useState(false);

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div>
//       <ModalComponent
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Device details"
//         overlayClassName="modalOverlay"
//         className="modalCard"
//       >
//         <div className="modalContainer">
//           <img src={device.photoUrl} alt={device.name} />
//           <h2>{device.name}</h2>
//           <h5>{device.madeBy}</h5>
//           <p>{device.type}</p>
//           {/* <div className="deviceOtherInfo">
//             <p>{device.info.ip_address}</p>
//             <p>{device.info.mac_address}</p>
//             <p>{device.info.signal}</p>
//           </div> */}
//           <Button>Adicionar</Button>
//           <a>Fechar</a>
//         </div>
//       </ModalComponent>
//     </div>
//   );
// };

// Modal.propTypes = {
//   device: PropTypes.shape({
//     name: PropTypes.string,
//     madeBy: PropTypes.string,
//     type: PropTypes.string,
//   }),
// };

// export default Modal;
