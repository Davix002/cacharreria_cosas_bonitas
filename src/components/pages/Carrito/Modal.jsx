import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 py-6 overflow-y-auto" style={{ marginTop: 0 }}>
      <div className="bg-white p-5 rounded-lg relative max-w-md w-full mx-auto">
        <button
          className="absolute top-4 right-7 text-3xl text-black border-none bg-transparent cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
