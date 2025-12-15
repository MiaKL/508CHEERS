import React from 'react'

import { useNavigate } from 'react-router-dom';

function BackButton({ navAddress = -1 }) {
    const navigate = useNavigate();
    const goBack = () => {
        if (navAddress === -1) {
            navigate(-1);  // Navigate back to the previous page
        } else {
            navigate(navAddress);
        }
    };

    return (
        <div>
            <button className="back_button" title="Go Back" onClick={goBack}>
                <i className="bi bi-arrow-left-circle"></i>
            </button>
        </div>
    );
}

export default BackButton;