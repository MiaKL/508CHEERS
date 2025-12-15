import React, { useRef, useEffect } from 'react';

const SubmitPopUp = ({ isOpen, onClose, children }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    const handleBackdropClick = (event) => {
        if (event.target === dialogRef.current) {
            onClose();
        }
    };

    return (
        <dialog ref={dialogRef} onClick={handleBackdropClick} style={{borderRadius: "10px", width: "40%", letterSpacing: 2}}>
            {children}
            <button onClick={onClose} className="btn btn-primary" style={{marginTop: "15px"}}>Close</button>
        </dialog>
    );
};

export default SubmitPopUp;