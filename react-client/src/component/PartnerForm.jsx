import React, { useState } from "react";

function PartnerForm() {

    const [formData, setFormData] = useState({
        businessName: "",
        contactName: "",
        primaryEmail: "",
        primaryPhone: "",
        secondaryEmail: "",
        secondaryPhone: "",
        feedback: "",
        agree: false
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

    function handleSubmit(e) {
        e.preventDefault();
        alert("Partner form submitted!");
    }

    return (
        <div className="container volunteer-container">

            <h1 className="volunteer-title text-center">Partner Form</h1>

            <p className="volunteer-subtitle text-center">
                Let’s Build Together! Partner with C.H.E.E.R.S. to empower youth, <br />
                strengthen communities, and celebrate culture.
            </p>

            <div className="form-box">

                <form onSubmit={handleSubmit}>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label required-label">
                                First Business/Organization Name
                            </label>
                            <input
                                type="text"
                                name="businessName"
                                className="form-control table-input"
                                value={formData.businessName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label required-label">
                                Primary Contact Name
                            </label>
                            <input
                                type="text"
                                name="contactName"
                                className="form-control table-input"
                                value={formData.contactName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label required-label">Primary Email</label>
                            <input
                                type="email"
                                name="primaryEmail"
                                className="form-control table-input"
                                value={formData.primaryEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label required-label">
                                Primary Phone Number
                            </label>
                            <input
                                type="text"
                                name="primaryPhone"
                                className="form-control table-input"
                                value={formData.primaryPhone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Secondary Email</label>
                            <input
                                type="email"
                                name="secondaryEmail"
                                className="form-control table-input"
                                value={formData.secondaryEmail}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Secondary Phone</label>
                            <input
                                type="text"
                                name="secondaryPhone"
                                className="form-control table-input"
                                value={formData.secondaryPhone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label required-label">Questions or feedback</label>
                        <input
                            type="text"
                            name="feedback"
                            className="form-control table-input"
                            value={formData.feedback}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="checkbox-row mb-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            required
                        />
                        <label className="required-label">
                            I agree to be contacted by C.H.E.E.R.S.
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

export default PartnerForm;
