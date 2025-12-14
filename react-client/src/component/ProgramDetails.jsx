import React from "react";
import BackButton from './BackButton';
import AdminButtons from './AdminButtons';

import {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function convertDayToText(day) {
    let dayText = "";
    switch (day) {
        case 0:
            dayText = "Sunday";
            break;
        case 1:
            dayText = "Monday";
            break;
        case 2:
            dayText = "Tuesday";
            break;
        case 3:
            dayText = "Wednesday";
            break;
        case 4:
            dayText = "Thursday";
            break;
        case 5:
            dayText = "Friday";
            break;
        case 6:
            dayText = "Saturday";
            break;
        default:
            dayText = "TBD";
            break;
    }
    return dayText;
}

function convertToStdTimeText(militaryTime, includeAmPm) {
    let stdHour = Math.floor(militaryTime);
    let stdMinFrac = militaryTime - stdHour;

    if (stdHour > 12) stdHour -= 12;
    if (stdHour === 0) stdHour = 12;

    let stdMin = Math.round(stdMinFrac * 60);

    let stdTimeText = "" + stdHour;
    if (stdMin > 0) {
        stdTimeText += ":";
        if (stdMin < 10) {
            stdTimeText += "0";
        }
        stdTimeText += stdMin;
    }

    if (includeAmPm) {
        if (militaryTime < 12) {
            stdTimeText += " am";
        } else {
            stdTimeText += " pm";
        }
    }

    return stdTimeText;
}

function ProgramDetails() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const id = searchParams.get('program_id');

    const [programDetails, setProgramDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function onEdit() {
        navigate(`/edit-program/${id}`);
    }

    // delete the car with the current car id (if successfully deleted, goes to programs page)
    const onDelete = async() => {
        const confirmDelete = window.confirm("Are you sure you want to delete this program?");
        if (confirmDelete) {
            try {
                const response = await fetch('/delete-program-by-id', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({_id: id}),
                });

                const data = await response.json();

                if (response.ok && data.message === 'success') {
                    console.log(data.message);
                    navigate('/Programs');
                } else {
                    console.error("Error deleting the program:", data.message);
                }
            } catch (error) {
                console.error("Error in delete request:", error);
            }
        }
    }

    useEffect(() => {
        const fetchProgram = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/get-program-by-id?program_id=${id}`);

                if (!res.ok) {
                    throw new Error("Failed fetching program by id" + id + "error: " + res.status);
                }

                const data = await res.json();
                if (data.message === 'success') {
                    setProgramDetails(data.data);
                    setError(null);
                } else {
                    setError(data.message);
                    setProgramDetails(null);
                }

            } catch (err) {
                setError(err.message);
                setProgramDetails(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProgram();
        }
    }, [id]);

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

    if (loading) {
        return <div className="container mt-4">Loading program details...</div>;
    }

    if (error) {
        return <div className="container mt-4">Error: {error}</div>;
    }

    if (!programDetails) {
        return <div className="container mt-4">Program not found.</div>;
    }

    return (
        <section id="program_details_section" className="page">
            <div className="back_button_container">
                <BackButton navAddress={"/Programs"}/>
            </div>
            {isLoggedIn &&
                <AdminButtons onEdit={onEdit} onDelete={onDelete}/>
            }
            <div className="container">
                <div className="row">
                    <div className="col-md-4 me-md-1" style={{alignSelf: "center", paddingBottom: "30px"}}>
                        <img className="card-img-top" src={programDetails.imageURL} alt="Program"/>
                    </div>
                    <div className="col-md-7">
                        <h2 className="blue_bold">{programDetails.title}</h2>
                        <h5 className="bold">Meets {convertDayToText(programDetails.day)}s {convertToStdTimeText(programDetails.startTime, ((programDetails.startTime < 12 && programDetails.endTime >= 12) || (programDetails.startTime >= 12 && programDetails.endTime < 12)))}-{convertToStdTimeText(programDetails.endTime, true)}</h5>
                        <div className="container" style={{paddingTop: "20px"}}>
                            <p className="text-start">{programDetails.overview}</p>
                            <p className="text-start">{programDetails.description}</p>
                        </div>
                        <a className="btn btn-outline-primary" style={{width: "200px", marginTop: "20px"}} href="/Youth-Form" role="button">Sign Up</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProgramDetails;