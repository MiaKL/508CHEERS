import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHub() {
    const navigate = useNavigate();

    const adminModules = [
        {
            title: "Subscribers",
            description: "Manage your mailing list and export subscriber emails.",
            path: "/view-subscribers",
            icon: "bi-envelope-paper",
            color: "text-primary"
        },
        {
            title: "Partner Inquiries",
            description: "Manage business and organization partnership requests.",
            path: "/view-partner-inquiries",
            icon: "bi-building",
            color: "text-success"
        },
        {
            title: "Volunteer Inquiries",
            description: "Manage individual volunteer applications.",
            path: "/view-volunteer-inquiries",
            icon: "bi-person-heart",
            color: "text-info"
        },
        {
            title: "Youth Inquiries",
            description: "Manage guardian-submitted inquiries for youth programs.",
            path: "/view-youth-inquiries",
            icon: "bi-people",
            color: "text-warning"
        }
    ];

    const handleLogout = async () => {
        try {
            const res = await fetch("/admin-logout", {
                method: "POST",
                credentials: 'include'
            });
            const data = await res.json();
            if (data.message === "success") {
                navigate("/");
            }
        } catch (err) {
            console.error("Logout failed: ", err);
        }
    };

    return (
        <div className="container mt-5 pt-4">
            <div className="text-center mb-5">
                <h1 className="fw-bold">Admin Hub</h1>
                <p className="text-muted">Select a module below to manage entries and export data.</p>
            </div>

            <div className="row justify-content-center g-4">
                {adminModules.map((module, idx) => (
                    <div key={idx} className="col-md-6 col-lg-3">
                        <div
                            className="card h-100 shadow-sm border-0 text-center p-3"
                            onClick={() => navigate(module.path)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body d-flex flex-column align-items-center">
                                <div className={`mb-3 ${module.color}`} style={{ fontSize: '3rem' }}>
                                    <i className={`bi ${module.icon}`}></i>
                                </div>
                                <h4 className="card-title fw-semibold">{module.title}</h4>
                                <p className="card-text text-muted small mt-2">
                                    {module.description}
                                </p>
                                <button className="btn btn-outline-dark btn-sm mt-auto stretched-link">
                                    Manage
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{marginTop: "25px"}}>
                <button onClick={handleLogout} className="btn btn-outline-dark" style={{width: "100px"}}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default AdminHub;