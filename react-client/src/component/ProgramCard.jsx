import React from "react";

import { useNavigate } from 'react-router-dom';

function ProgramCard(props) {
    const program = props.program;
    const navigate = useNavigate();
    return (
        <div className="program-card-wrapper">
            <div className="card program_card">
                <img className="card-img-top" src={program.imageURL} alt="Loading Image..."/>
                <div className="card-body">
                    <h5 className="card-title">{program.title}</h5>
                    <p className="card-text">{program.overview}</p>
                    <button type="button" className="btn btn-outline-primary" style={{width: "200px"}}
                            onClick={() => navigate(`/Program-Details?program_id=${program._id}`)}>Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProgramCard;