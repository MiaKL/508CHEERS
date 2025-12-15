import React, { useState, useEffect } from 'react';
import { CSVLink } from "react-csv";

import { useNavigate } from 'react-router-dom';
import BackButton from "./BackButton";

function Subscribers() {
    const [emails, setEmails] = useState([]);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    const headers = [
        { label: "ID", key: "_id" },
        { label: "Email Address", key: "email" }
    ];

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const res = await fetch("/get-all-subscribers", {
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.message === 'success') {
                    setEmails(data.data);
                }
            } catch (err) {
                setError("Failed to fetch: " + err.message);
            }
        };
        fetchSubscribers();
    }, []);

    const copyToClipboard = () => {
        const emailString = emails.map(subscriber => subscriber.email).join(", ");
        navigator.clipboard.writeText(emailString).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this subscriber?")) {
            try {
                const response = await fetch('/delete-subscriber-by-id', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({_id: id}),
                });

                const data = await response.json();

                if (response.ok && data.message === 'success') {
                    window.location.reload();
                } else {
                    console.error("Error deleting the subscriber:", data.message);
                }
            } catch (error) {
                console.error("Error in delete request:", error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="back_button_container" style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
                <BackButton navAddress={"/admin-hub"}/>
            </div>
            <div className="d-flex flex-column align-items-center">
                <div className="w-auto mb-4 px-3 d-flex justify-content-between align-items-center" style={{ minWidth: '350px' }}>
                    <h2 className="mb-0 me-5">Subscribers Email List</h2>
                    <div className="d-flex gap-2">
                        {emails.length > 0 && (
                            <>
                                <button onClick={copyToClipboard} className='btn btn_outline_no_fill btn-sm'>
                                    <i className={`bi ${copied ? 'bi-check-lg' : 'bi-clipboard'} me-1`}></i>
                                    {copied ? 'Copied!' : 'Copy to clipboard'}
                                </button>
                                <CSVLink data={emails} filename={"508CHEERS_subscribers.csv"} className="btn btn-info btn-sm">
                                    Download CSV
                                </CSVLink>
                            </>
                        )}
                    </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="card shadow-sm d-inline-block" style={{ minWidth: '350px' , marginTop: '20px'}}>
                    <ul className="list-group list-group-flush">
                        {emails.map((subscriber) => (
                            <li key={subscriber._id} className="list-group-item d-flex justify-content-between align-items-center gap-4">
                                <span>{subscriber.email}</span>
                                <button
                                    className="btn btn-outline-danger btn-sm border-0 p-1"
                                    onClick={() => handleDelete(subscriber._id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Subscribers;