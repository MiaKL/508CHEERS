import React from "react";

import { useNavigate } from 'react-router-dom';

function ProgramCard() {
    const navigate = useNavigate();
    return (
        <div className="card program_card">
            <img className="card-img-top" src="images/Program_Image.png" alt="Program"/>
            <div className="card-body">
                <h5 className="card-title">Program Title</h5>
                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
                <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/Program-Details')}>Learn More</button>
            </div>
        </div>
    );
}

export default ProgramCard;