import React, { useState } from "react";

function VolunteerForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        emergencyName: "",
        emergencyPhone: "",
        accommodations: "",
        availability: "",
        consent: false,
    });

    function handleChange(e) {
        const {
            name, value, type, checked
        } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert("Form submitted!");
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
                            <input type="text" name="firstName" className="form-control table-input" value={formData.firstName} onChange={handleChange} required/>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label required-label">Last Name</label>
                            <input type="text" name="lastName" className="form-control table-input" value={formData.lastName} onChange={handleChange} required/>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label required-label">Email Address</label>
                            <input type="email" name="email" className="form-control table-input" value={formData.email} onChange={handleChange} required/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label required-label">Emergency Contact Name</label>
                            <input type="text" name="emergencyName" className="form-control table-input" value={formData.emergencyName} onChange={handleChange} required/>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label required-label">Emergency Contact Phone Number</label>
                            <input type="text" name="emergencyPhone" className="form-control table-input" value={formData.emergencyPhone} onChange={handleChange} required/>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Do you require any accommodations?</label>
                        <input type="text" name="accommodations" className="form-control table-input" value={formData.accommodations} onChange={handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label required-label">List Your Availability (Days/Times)</label>
                        <input type="text" name="availability" className="form-control table-input" value={formData.availability} onChange={handleChange} required/>
                    </div>

                    <div className="form-check mb-4 text-start">
                        <input className="form-check-input checkbox-fix" type="checkbox" id="consent" name="consent" checked={formData.consent} onChange={handleChange} required/>
                        <label className="form-check-label required-label" htmlFor="consent">
                            Consent to us taking Photo/Video of you and being used on this website and other social medias
                        </label>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="submit-btn">Submit</button>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default VolunteerForm;
