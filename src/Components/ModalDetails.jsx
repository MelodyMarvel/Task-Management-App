
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRef, useState } from "react";
import toast from 'react-hot-toast';


const ModalDetails = ({ isOpen, todo, closeModal, handleUpdateTodo, handleDeleteTodo }) => {
  const textEdit = useRef(null);
  const [disabled, setDisabled] = useState(true); 
  

  const handleClose = () => {
    handleUpdateTodo=!handleUpdateTodo
    closeModal();

  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdateTodo(todo.id, textEdit.current.value);
      setDisabled(true); 
      toast.success('Task updated successfully')
      closeModal();
    }
  }
    const saveModalDetails = ()=>{
      handleUpdateTodo(todo.id, textEdit.current.value);
      setDisabled(true); 
      toast.success('Task updated successfully')
      closeModal();
    }
  

  return (
    <Modal show={isOpen} onHide={handleClose} className='modal-wrapper'>
      <Modal.Dialog className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title className='modal-title'>Task Details</Modal.Title>
        </Modal.Header>

        <Modal.Body  className="modal-content">
          <p className='modal-status'>Status: {todo.completed ? "Completed" : "Active"}</p>
          
          <div className='modal-text-wrapper'>
          <textarea type='text'
            rows={4} ref={textEdit}
            disabled={false}
            defaultValue={todo.todo}
            onKeyDown={handleKeyDown} 
            className='modalTextarea no-scrollbar'>
          </textarea>
          </div>
          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className='btn-md'>
            Cancel
          </Button>
          <Button variant="primary" className='btn-md' onClick={() => handleDeleteTodo(todo.id)}
>Delete</Button>
          <Button variant="primary" onClick={saveModalDetails} className='btn-md'>Update</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default ModalDetails;