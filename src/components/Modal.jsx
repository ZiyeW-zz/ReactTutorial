import './Modal.css';

const Modal = ({ children, open, close }) => {
  if (!open) return null;

  //overlay to close modal
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      close(); 
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick} 
      role="dialog"
      tabIndex="-1"
    >
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="btn-close" aria-label="Close" onClick={close}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
