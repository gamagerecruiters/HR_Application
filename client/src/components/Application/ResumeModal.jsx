const ResumeModal = ({ fileUrl, onClose }) => {
  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <object
          data={fileUrl}
          type="application/pdf"
          width="100%"
          height="100%"
        ></object>
      </div>
    </div>
  );
};

export default ResumeModal;
