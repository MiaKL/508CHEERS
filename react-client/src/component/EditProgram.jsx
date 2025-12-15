import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function convertMilitaryHourToStd(militaryHour) {
    let stdHour = militaryHour % 12;
    if (stdHour === 0) stdHour = 12;
    return stdHour;
}

function EditProgram() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [program, setProgram] = useState({
        title: '',
        overview: '',
        description: '',
        imageURL: '',
        day: 0,
        startHour: 1,
        startMinute: 0.0,
        startAm: true,
        endHour: 2,
        endMinute: 0.0,
        endAm: true,
    });
    const [error, setError] = useState('');
    const [formError, setFormError] = useState('');

    const onCancel = async() => {
        if (program._id) {
            navigate(`/Program-Details?program_id=${program._id}`)
        } else {
            navigate(`/Programs`)
        }
    }

    useEffect(() => {
        if (id) {
            fetch(`/get-program-by-id?program_id=${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'success') {
                        const programData = data.data;
                        const startTime = programData.startTime;
                        const endTime = programData.endTime || 0;

                        const startHour = convertMilitaryHourToStd(Math.floor(startTime));
                        const startMinute = (startTime - Math.floor(startTime));
                        const startAm = startTime < 12;

                        const endHour = convertMilitaryHourToStd(Math.floor(endTime));
                        const endMinute = (endTime - Math.floor(endTime));
                        const endAm = endTime < 12;

                        setProgram({
                            ...programData,
                            startHour,
                            startMinute,
                            startAm,
                            endHour,
                            endMinute,
                            endAm,
                        });
                    } else {
                        setError('Could not find a program with the ID ' + id + ': ' + data.message);
                    }
                })
                .catch(err => setError('Error in retrieving program with ID ' + id + ': ' + err));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // convert start hour, minute, and am or pm into one float to store in database (military time, decimal is minute where 0.25 is 15, 0.5 is 30, and 0.75 is 45, etc.)
        let startTime = program.startHour + program.startMinute;
        if (!program.startAm && program.startHour < 12) startTime += 12;
        if (program.startHour === 12 && program.startAm) startTime -= 12;

        // end start hour, minute, and am or pm into one float to store in database (military time, decimal is minute where 0.25 is 15, 0.5 is 30, and 0.75 is 45, etc.)
        let endTime = program.endHour + program.endMinute;
        if (!program.endAm && program.endHour < 12) endTime += 12;
        if (program.endHour === 12 && program.endAm) endTime -= 12;

        // Check if end time is later than start time
        if (endTime <= startTime) {
            console.log("Start: " + startTime + " END: " + endTime);
            setFormError("End time must be later than start time.");
            return;
        }

        // Reset error if no errors
        setFormError('');

        // create a new program object to store in database
        const newProgram = {
            title: program.title,
            overview: program.overview,
            description: program.description,
            imageURL: program.imageURL,
            day: program.day,
            startTime: startTime,
            endTime: endTime,
        };

        const url = '/save-program';
        const method = 'POST';

        // If we are editing, add the ID to the program data
        if (id) {
            newProgram._id = id;
        }

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProgram),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Server responded with an error');
                }
                return response.json();
            })
            .then((data) => {
                if (data.message === 'success') {
                    navigate(`/Program-Details?program_id=${data.data._id}`);
                } else {
                    setFormError(data.data || 'An error occurred while saving the program.');
                }
            })
            .catch((err) => {
                console.error('Error saving program: ', err);
                setFormError('There was an error saving the program: ' + err.data || err);
            });
    };

    let pageTitle;
    if (!id) pageTitle = "Add Program";
    else pageTitle = "Edit Program";

    return (
        <div className="container mt-5">
            <h2>{pageTitle}</h2>
            {error && <div className="alert alert-danger">{error}</div>} {/* General error display */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={program.title}
                        onChange={(e) => setProgram({...program, title: e.target.value})}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="overview" className="form-label">Overview</label>
                    <textarea
                        className="form-control"
                        id="overview"
                        value={program.overview}
                        onChange={(e) => setProgram({...program, overview: e.target.value})}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Additional Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={program.description}
                        onChange={(e) => setProgram({...program, description: e.target.value})}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="imageURL" className="form-label">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageURL"
                        value={program.imageURL}
                        onChange={(e) => setProgram({...program, imageURL: e.target.value})}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="day" className="form-label">Day</label>
                    <select
                        className="form-control"
                        id="day"
                        value={program.day}
                        onChange={(e) => setProgram({...program, day: parseInt(e.target.value)})}
                    >
                        <option value="0">Sunday</option>
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wednesday</option>
                        <option value="4">Thursday</option>
                        <option value="5">Friday</option>
                        <option value="6">Saturday</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="startTime" className="form-label">Start Time</label>
                    <div className="d-flex">
                        <select
                            className="form-control"
                            value={program.startHour}
                            onChange={(e) => setProgram({...program, startHour: parseInt(e.target.value)})}
                        >
                            {[...Array(12)].map((_, index) => (
                                <option key={index} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                        <span className="mx-2">:</span>
                        <select
                            className="form-control"
                            value={program.startMinute}
                            onChange={(e) => setProgram({...program, startMinute: parseFloat(e.target.value)})}
                        >
                            <option value="0.0">00</option>
                            <option value="0.25">15</option>
                            <option value="0.5">30</option>
                            <option value="0.75">45</option>
                        </select>
                        <select
                            className="form-control ms-2"
                            value={program.startAm ? 'AM' : 'PM'}
                            onChange={(e) => setProgram({...program, startAm: e.target.value === 'AM'})}
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="endTime" className="form-label">End Time</label>
                    <div className="d-flex">
                        <select
                            className="form-control"
                            value={program.endHour}
                            onChange={(e) => setProgram({...program, endHour: parseInt(e.target.value)})}
                        >
                            {[...Array(12)].map((_, index) => (
                                <option key={index} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                        <span className="mx-2">:</span>
                        <select
                            className="form-control"
                            value={program.endMinute}
                            onChange={(e) => setProgram({...program, endMinute: parseFloat(e.target.value)})}
                        >
                            <option value="0.0">00</option>
                            <option value="0.25">15</option>
                            <option value="0.5">30</option>
                            <option value="0.75">45</option>
                        </select>
                        <select
                            className="form-control ms-2"
                            value={program.endAm ? 'AM' : 'PM'}
                            onChange={(e) => setProgram({...program, endAm: e.target.value === 'AM'})}
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                </div>

                {/* Displaying form errors at the bottom */}
                {formError && <div className="alert alert-danger mt-3">{formError}</div>}

                <div>
                    <button type="button" className="btn me-2 btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-info">
                        Save Program
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditProgram;