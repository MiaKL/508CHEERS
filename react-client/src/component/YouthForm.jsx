import React, { useState } from "react";

function YouthForm() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        parentName: "",
        parentEmail: "",
        parentPhone: "",
        accommodations: "",
        programsInterested: "",
        consent: false
    });

    function handleChange(e) {
        const name = e.target.name;
        let value;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        } else {
            value = e.target.value;
        }

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function clearForm() {
        setFormData({
            firstName: "",
            lastName: "",
            parentName: "",
            parentEmail: "",
            parentPhone: "",
            accommodations: "",
            programsInterested: "",
            consent: false
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
        alert("Youth form submitted!");
        clearForm();
    }

    return (
        <div className="container volunteer-container">

            <h1 className="volunteer-title text-center">Youth Form</h1>

            <p className="volunteer-subtitle text-center">
                Join our Youth Program to make a difference through Community <br />
                Service, Advocacy & Equity, Girls Mentorship, and Cultural Cooking initiatives.
            </p>

            <div className="form-box" id={"youth_form"}>
                <form onSubmit={handleSubmit}>

                    <div className="row mb-3">

                        <div className="col-md-4">
                            <label className="form-label required-label">First Name</label>
                            <input
                                className="form-control table-input"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label required-label">Last Name</label>
                            <input
                                className="form-control table-input"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label required-label">Parents/Guardian Name</label>
                            <input
                                className="form-control table-input"
                                type="text"
                                name="parentName"
                                value={formData.parentName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="row mb-3">

                        <div className="col-md-6">
                            <label className="form-label required-label">Parent/Guardian Email Address</label>
                            <input
                                className="form-control table-input"
                                type="email"
                                name="parentEmail"
                                value={formData.parentEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label required-label">Parent/Guardian Phone Number</label>
                            <input
                                className="form-control table-input"
                                type="text"
                                name="parentPhone"
                                value={formData.parentPhone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="mb-3">
                        <label className="form-label">Accommodations</label>
                        <input
                            className="form-control table-input"
                            type="text"
                            name="accommodations"
                            value={formData.accommodations}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label required-label">
                            What Programs are you interested in getting involved with?
                        </label>
                        <input
                            className="form-control table-input"
                            type="text"
                            name="programsInterested"
                            value={formData.programsInterested}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="checkbox-row mb-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                            required
                        />
                        <label className="required-label">
                            Parent/Guardian consent checkbox (for under 18)
                        </label>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="submit-btn btn btn-outline-primary">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default YouthForm;
