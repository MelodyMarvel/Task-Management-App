//import React from 'react'
import { useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";
import ModalDetails from "./ModalDetails";


function TodoItem(props) {
  const { todo, handleUpdateTodo, handleCompleteTodo, handleDeleteTodo } =
    props;
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const changeFocus = () => {
    setDisabled(false); // Enable the textarea
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdateTodo(todo.id, inputRef.current.value);
      setDisabled(true); // Set back to true to disable editing after update
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <li key={todo.id} className="card" onClick={openModal}>
      <textarea
        ref={inputRef}
        disabled={disabled}
        defaultValue={todo.todo}
        onKeyDown={handleKeyDown}
      />

      <div className="btns">
        <button onClick={() => changeFocus()}>
          <AiFillEdit />
        </button>

        {todo.completed === false && (
          <button
            onClick={() => handleCompleteTodo(todo.id)}
            style={{ color: "green" }}
          >
            <IoCheckmarkDoneSharp />
          </button>
        )}

        <button
          onClick={() => handleDeleteTodo(todo.id)}
          style={{ color: "red" }}
        >
          {/* {" "} */}
          <IoClose />
        </button>
      </div>
      
      {todo.completed && <span className="completed">done</span>}

      {/* MODAL */}
      <ModalDetails isOpen={isModalOpen} todo={todo} closeModal={closeModal} />

    </li>
  );
}

export default TodoItem;
