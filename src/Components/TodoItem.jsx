//import React from 'react'
import {useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import ModalDetails from "./ModalDetails";
import { MdDeleteSweep } from "react-icons/md";
import { Link } from "react-router-dom";

function TodoItem({ todo, handleUpdateTodo, handleCompleteTodo, handleDeleteTodo }) {
 
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div key={todo.id} className="item">
      <div className="todoDetails">
       <div className="left">
        <div className="text">
          <p className="todoText">{todo.todo}</p>
        </div>
        <Link to={`/details/${todo.id}`} className="btn btn-primary btn-view">
          VIEW
        </Link>
       </div>
        
        <div className="todoActions">
          <div
           onClick={openModal}
            // onClick={() => editTodo()}
            tabIndex={0}
            role="button"
            className="icon"
          >
            <AiFillEdit />
          </div>
          
          <div>
          {todo.completed === false && (
            <div
              onClick={() => handleCompleteTodo(todo.id)}
              style={{ color: "green" }}
              tabIndex={0}
              role="button"
              className="icon"
            >
              < IoCheckmarkDoneSharp />
            </div>
          )}
          </div>
          

          <div
            onClick={() => handleDeleteTodo(todo.id)}
            style={{ color: "red" }}
            className="icon"
            tabIndex={0}
            role="button"
          >
            <MdDeleteSweep />
          </div>
        </div>


        {/* MODAL */}
        <ModalDetails
          isOpen={isModalOpen}
          todo={todo}
          closeModal={closeModal}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

export default TodoItem;
