import React, { useState } from "react";
import SubmitPopUp from "./SubmitPopUp";

function PartnerForm() {

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const [formData, setFormData] = useState({
        businessName: "",
        contactName: "",
        primaryEmail: "",
        primaryPhone: "",
        secondaryEmail: "",
        secondaryPhone: "",
        feedback: "",
        agreeToBeContacted: false
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
            businessName: "",
            contactName: "",
            primaryEmail: "",
            primaryPhone: "",
            secondaryEmail: "",
            secondaryPhone: "",
            feedback: "",
            agreeToBeContacted: false
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);

        const url = '/save-partner-inquiry';
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
                    console.log(data.data || 'An error occurred while saving the partner inquiry.');
                }
            })
            .catch((err) => {
                console.log('There was an error saving the partner inquiry: ' + err.data || err);
            });
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
                                Primary Phone Number (xxx-xxx-xxxx)
                            </label>
                            <input
                                type="tel"
                                name="primaryPhone"
                                className="form-control table-input"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                placeholder="xxx-xxx-xxxx"
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
                            <label className="form-label">Secondary Phone (xxx-xxx-xxxx)</label>
                            <input
                                type="tel"
                                name="secondaryPhone"
                                className="form-control table-input"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                placeholder="xxx-xxx-xxxx"                                value={formData.secondaryPhone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label required-label">Questions or feedback</label>
                        <textarea
                            name="feedback"
                            className="form-control"
                            value={formData.feedback}
                            onChange={handleChange}
                            rows={3}
                            required
                        />
                    </div>

                    <div className="checkbox-row mb-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="agreeToBeContacted"
                            checked={formData.agreeToBeContacted}
                            onChange={handleChange}
                            required
                        />
                        <label className="required-label">
                            I agree to be contacted by C.H.E.E.R.S.
                        </label>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="submit-btn btn btn-outline-primary">Submit</button>
                    </div>

                </form>
            </div>

            <div>
                <SubmitPopUp isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}>
                    <h3>Thank you for inquiring about partnering with 508 C.H.E.E.R.S.! We will get back to you in a few business days.</h3>
                </SubmitPopUp>
            </div>
        </div>
    );
}

export default PartnerForm;
