import React from "react";
import ProgramCard from "./ProgramCard";
import AdminButtonCreate from "./AdminButtonCreate";

import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Programs() {
    const [programs, setPrograms] = React.useState([]);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res= await fetch("/get-all-programs",
                    {credentials: "include"});
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
    }, [])

    function onCreate() {
        navigate(`/add-program`);
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/get-current-user", {
                    credentials: 'include'
                });
                const data = await res.json();

                if (data.data === true) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (err) {
                console.error("Auth check failed:", err.message);
                setIsLoggedIn(false);
            }
        };
        checkAuth();
    }, [])

    return (
        <section id="programs_section" className="page">
            <div>
                <h1>Youth Programs</h1>

                {/* only show admin create program button if logged in as admin */}
                {isLoggedIn &&
                    // only show admin buttons if logged in as admin
                    <div className="container position-relative" >
                        <AdminButtonCreate onCreate={onCreate}/>
                    </div>
                }
            </div>
            <div>
                <h4 className="programs-subtitle">Empowering Worcester - One Act at a Time.</h4>
            </div>
            <div className="container">
                <div className="program-grid">
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
                <a className="btn btn-outline-primary" style={{width: "50%", marginTop: "25px"}} href="/Youth-Form" role="button">Sign Up</a>
            </div>
        </section>
    );
}

export default Programs;