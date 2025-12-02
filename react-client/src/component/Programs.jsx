import React from "react";
import ProgramCard from "./ProgramCard";

import {useState, useEffect} from 'react';

function Programs() {
    const [programs, setPrograms] = React.useState([]);
    const [error, setError] = React.useState(null);
    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res= await fetch("http://localhost:3001/get-all-programs");
                if (!res.ok) {
                    throw new Error("Failed fetching programs error: " + res.status);
                }
                const data = await res.json();
                if (data.message === 'success') {
                    setPrograms(data.data);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError(error.message);
            }
        }
        fetchPrograms();
    })
    return (
        <section id="programs_section" className="page">
            <div>
                <h1>Youth Programs</h1>
                <h4 className="blue_bold">Empowering Worcester - One Act at a Time.</h4>
            </div>
            <div className="container">
                <div className="row">
                    {
                        programs.map(function(program, idx) {
                            return (
                                <ProgramCard key={program._id} program={program}/>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <button type="button" className="btn btn-outline-primary" style={{width: "50%"}}>Sign Up</button>
            </div>
        </section>
    );
}

export default Programs;