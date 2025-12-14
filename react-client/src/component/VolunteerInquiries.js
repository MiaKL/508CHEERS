import React, { useState, useEffect } from 'react';
import { CSVLink } from "react-csv";
import BackButton from "./BackButton";

const csvHeaders = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Emergency Contact", key: "emergencyName" },
    { label: "Emergency Phone", key: "emergencyPhone" },
    { label: "Availability", key: "availability" },
    { label: "Accommodations", key: "accommodations" },
    { label: "Photo Consent", key: "consent" },
    { label: "Date", key: "dateOfInquiry" }
];

const ExpandableText = ({ label, text, limit = 150 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    if (!text) return null;
    if (text.length <= limit) return <p className="card-text"><strong>{label}:</strong> {text}</p>;

    return (
        <p className="card-text">
            <strong>{label}:</strong> {isExpanded ? text : `${text.substring(0, limit)}...`}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="btn btn-link btn-sm p-0 ms-2 text-decoration-none"
            >
                {isExpanded ? "See Less" : "See More"}
            </button>
        </p>
    );
};

function VolunteerInquiries() {
    const [inquiries, setInquiries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const res = await fetch("http://localhost:3001/get-all-volunteer-inquiries", {
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.message === 'success') {
                    setInquiries(data.data);
                }
            } catch (err) {
                setError("Failed to fetch inquiries: " + err.message);
            }
        };
        fetchInquiries();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this volunteer inquiry?")) {
            try {
                const response = await fetch('/delete-volunteer-inquiry-by-id', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ _id: id }),
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.message === 'success') {
                    setInquiries(inquiries.filter(item => item._id !== id));
                }
            } catch (err) {
                console.error("Delete failed:", err);
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="back_button_container">
                <BackButton navAddress={"/admin-hub"}/>
            </div>
            <div className="d-flex flex-column align-items-center">

                <div className="w-auto mb-4 px-3 d-flex justify-content-between align-items-center" style={{ minWidth: '350px' }}>
                    <h2 className="mb-0 me-5">Volunteer Inquiries</h2>
                    <div className="d-flex gap-2">
                        {inquiries.length > 0 && (
                            <CSVLink
                                data={inquiries}
                                headers={csvHeaders}
                                filename={"508CHEERS_Volunteer_Inquiries.csv"}
                                className="btn btn-info btn-sm"
                                target="_blank"
                            >
                                <i className="bi bi-download me-1"></i> Download CSV
                            </CSVLink>
                        )}
                    </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="row justify-content-center w-100">
                    <div className="col-md-10">
                        {inquiries.map((inquiry) => (
                            <div key={inquiry._id} className="card shadow-sm mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center bg-light">
                                    <h5 className="mb-0 list_element_title">
                                        {inquiry.firstName} {inquiry.lastName}
                                    </h5>
                                    <small className="text-muted">
                                        Submitted: {new Date(inquiry.dateOfInquiry).toLocaleDateString()}
                                    </small>
                                </div>
                                <div className="card-body">
                                    <div className="row text-start">
                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <h6 className="text-muted small text-uppercase">Volunteer Info</h6>
                                            <div><strong>Email:</strong> {inquiry.email}</div>
                                            <div><strong>Availability:</strong> {inquiry.availability}</div>
                                        </div>

                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <h6 className="text-muted small text-uppercase">Emergency Contact</h6>
                                            <div><strong>Name:</strong> {inquiry.emergencyName}</div>
                                            <div><strong>Phone:</strong> {inquiry.emergencyPhone}</div>
                                        </div>

                                        <div className="col-md-4">
                                            <h6 className="text-muted small text-uppercase">Permissions</h6>
                                            <div><strong>Photo Consent:</strong> {inquiry.consent ? "✅" : "❌"}</div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <ExpandableText
                                        label="Accommodations"
                                        text={inquiry.accommodations || "None specified"}
                                        limit={150}
                                    />
                                </div>
                                <div className="card-footer d-flex justify-content-end bg-white border-top-0">
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleDelete(inquiry._id)}
                                    >
                                        <i className="bi bi-trash me-1"></i> Delete
                                    </button>
                                </div>
                            </div>
                        ))}

                        {inquiries.length === 0 && !error && (
                            <p className="text-center text-muted mt-5">Volunteer Inquiries database is empty.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VolunteerInquiries;