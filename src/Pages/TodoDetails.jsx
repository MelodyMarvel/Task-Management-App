import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState,useRef } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


function TodoDetails({ handleUpdateTodo, handleDeleteTodo, handleCompleteTodo }) {
const textEdit = useRef(null);
const [disabled, setDisabled] = useState(true); 

  const { id } = useParams(); // Get the 'id' route parameter
  const {todos} = useSelector((state) => state.todo);

  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (!todo) {
    return null;
  }

const handleClose = () => {
  handleUpdateTodo=!handleUpdateTodo
  closeModal();

};

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleUpdateTodo(todo.id, textEdit.current.value);
    setDisabled(true); 
    toast.success('Task updated successfully')
  }
}
  // const handleEdit = () => {
  //   setDisabled(false); // Enable editing
  // };

  // const handleSave = () => {
  //   const updatedText = textEdit.current.value;
  //   if (updatedText !== todo.todo) {
  //     // Only update if the text has changed
  //     dispatch(updateTodos({ id: todo.id, todo: updatedText }));
  //     toast.success('Task updated successfully');
  //   }
  //   setDisabled(true); // Disable editing
  // };

  // const saveModalDetails = ()=>{
  //   handleUpdateTodo(todo.id, textEdit.current.value);
  //   setDisabled(true); 
  //   toast.success('Task updated successfully')
  // }
  return (
    <Card className='card' style={{ width: '40rem', }}>
      <Card.Header className='card-header'>Details</Card.Header>
      <Card.Body>
        <Card.Text className='modal-text-wrapper'>          
          <p className='detail-status'>Status: {todo.completed ? "Completed" : "Active"}</p>
          <textarea type='text'
            rows={4} ref={textEdit}
            disabled={false}
            onKeyDown={handleKeyDown} 
            className='detailTextarea no-scrollbar'>
          {todo.todo}

          </textarea>
        </Card.Text>
        
      
      </Card.Body>
      <Card.Footer >
          <Button variant="secondary" onClick={handleClose} className='btn-md'>
            Cancel
           </Button>
          <Button variant="primary" className='btn-md' onClick={() => handleDeleteTodo(todo.id)}>
           Delete
          </Button>
          {/* <Button variant="primary" onClick={saveModalDetails} className='btn-md'> */}
          {/* <Button variant="primary" onClick={saveModalDetails} className='btn-md'> */}
            Update
          {/* </Button> */}
        </Card.Footer>
    </Card>
  );
}
export default TodoDetails
