import { Modal, Container } from "@mui/material";

import AuthTabs from "./AuthTabs";

const AuthModal = ({ openModal, handleClose }) => {
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: "background.paper",
          boxShadow: 5,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: 1,
        }}
      >
        <AuthTabs handleClose={handleClose} />
      </Container>
    </Modal>
  );
};

export default AuthModal;
