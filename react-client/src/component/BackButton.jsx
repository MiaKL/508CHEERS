import React from 'react'

import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
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