import React, { useState } from "react";
import SubmitPopUp from "./SubmitPopUp";

function VolunteerForm() {

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        emergencyName: "",
        emergencyPhone: "",
        accommodations: "",
        availability: "",
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
            email: "",
            emergencyName: "",
            emergencyPhone: "",
            accommodations: "",
            availability: "",
            consent: false
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log(formData);

        const url = '/save-volunteer-inquiry';
        const method = 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Server responded with an error');
                }
                return response.json();
            })
            .then((data) => {
                if (data.message === 'success') {
                    setIsPopUpOpen(true);
                    clearForm();
                } else {
                    console.log(data.data || 'An error occurred while saving the volunteer inquiry.');
                }
            })
            .catch((err) => {
                console.log('There was an error saving the volunteer inquiry: ' + err.data || err);
            });
    }

    return (
        <div className="container volunteer-container">

            <h1 className="volunteer-title text-center">Volunteer Form</h1>

            <p className="volunteer-subtitle text-center">
                Want to make a difference? Join our team of volunteers and <br />
                take part in community service, advocacy, and cultural events.
            </p>

            <div className="form-box">

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
                            <label className="form-label required-label">Email Address</label>
                            <input
                                className="form-control table-input"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="row mb-3">

                        <div className="col-md-6">
                            <label className="form-label required-label">Emergency Contact Name</label>
                            <input
                                className="form-control table-input"
                                type="text"
                                name="emergencyName"
                                value={formData.emergencyName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label required-label">Emergency Contact Phone Number (xxx-xxx-xxxx)</label>
                            <input
                                className="form-control table-input"
                                type="tel"
                                name="emergencyPhone"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                placeholder="xxx-xxx-xxxx"
                                value={formData.emergencyPhone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="mb-3">
                        <label className="form-label">Do you require any accommodations?</label>
                        <input
                            className="form-control table-input"
                            type="text"
                            name="accommodations"
                            value={formData.accommodations}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label required-label">List Your Availability (Days/Times)</label>
                        <input
                            className="form-control table-input"
                            type="text"
                            name="availability"
                            value={formData.availability}
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
                            Consent to us taking Photo/Video of you and being used on this website
                            and other social medias
                        </label>
                    </div>

                    <div className="text-center">
                        <button className="submit-btn btn btn-outline-primary" type="submit">Submit</button>
                    </div>

                </form>

            </div>

            <div>
                <SubmitPopUp isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}>
                    <h3>Thank you for inquiring about volunteering with 508 C.H.E.E.R.S.! We will get back to you in a few business days.</h3>
                </SubmitPopUp>
            </div>
        </div>
    );
}

export default VolunteerForm;
