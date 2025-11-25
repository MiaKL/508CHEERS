import React from "react";
import ProgramCard from "./ProgramCard";

function Programs() {
    return (
        <section id="programs_section" className="page">
            <h1>Youth Programs</h1>
            <h4 className="blue_bold">Empowering Worcester - One Act at a Time.</h4>
            <div className="container">
                <div className="row">
                    <div className="col-4"><ProgramCard/></div>
                    <div className="col-4"><ProgramCard/></div>
                    <div className="col-4"><ProgramCard/></div>
                </div>
            </div>
        </section>
    );
}

export default Programs;