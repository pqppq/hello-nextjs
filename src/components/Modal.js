function Modal(props) {
  return (
    <div className='modal'>
      <p>{props.text}</p>
      <button className='btn btn--alt' onClick={props.onCancel}>
        Cancel
      </button>
      <button className='btn' onClick={props.onCancel}>
        Confirm
      </button>
    </div>
  );
}

export default Modal;
