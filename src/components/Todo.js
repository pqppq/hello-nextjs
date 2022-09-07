import { useState } from 'react';

import Backdrop from './Backdrop';
import Modal from './Modal';

function Todo(props) {
	// stateful value of component and function to update it
	const [showModal, setShowModal] = useState(); 

  function showModalHandler() {
		console.log(showModal)
    setShowModal(true);
  }

  function closeModalHandler() {
		console.log(showModal);
    setShowModal(false);
  }

  return (
    <div className='card'>
      <h2>{props.text}</h2>
      <div className='actions'>
        <button className='btn' onClick={showModalHandler}>
          Delete
        </button>
      </div>
			{showModal && <Modal text="Are you sure?" onCancel={closeModalHandler} onConfirm={closeModalHandler}/> }
			{showModal && <Backdrop onClick={closeModalHandler} /> }
    </div>
  );
}

export default Todo;
