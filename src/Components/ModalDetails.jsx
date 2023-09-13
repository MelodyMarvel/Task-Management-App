
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalDetails = ({ isOpen, todo, closeModal }) => {
  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    closeModal();
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Todo Details</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-content">
          <p>ID: {todo.id}</p>
          <p>Completed: {todo.completed ? "Yes" : "No"}</p>
          <p>Todo: {todo.todo}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Edit</Button>
          {/* <Button variant="primary">Save changes</Button> */}
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default ModalDetails;