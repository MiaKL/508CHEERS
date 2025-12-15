import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ isLoggedIn, setIsLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("error")) {
            alert(urlParams.get("error"));
        }
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/get-current-user", { credentials: 'include' });
                const data = await res.json();
                setIsLoggedIn(data.data === true);
            } catch (err) {
                console.error("Auth check failed:", err.message);
                setIsLoggedIn(false);
            }
        };
        checkAuth();
    }, [setIsLoggedIn]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/admin-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });
            const data = await res.json();
            if (data.message === "success") {
                setIsLoggedIn(true);
                navigate("/admin-hub");
            } else {
                alert("Login failed: " + data.message);
            }
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    const handleLogout = async () => {
        try {
            const res = await fetch("/admin-logout", {
                method: "POST",
                credentials: 'include'
            });
            const data = await res.json();
            if (data.message === "success") {
                setIsLoggedIn(false);
                navigate("/");
            }
        } catch (err) {
            console.error("Logout failed: ", err);
        }
    };

    return (
        <div>
            {isLoggedIn ? (
                <div className="container d-flex flex-column justify-content-center mt-5">
                    <h2 className="text-center" style={{ paddingBottom: "20px" }}>You are already logged in</h2>
                    <div className="row justify-content-center">
                        <div className="col-sm-10 col-md-8 col-lg-6 d-flex justify-content-center">
                            <button type="button" onClick={handleLogout} className="btn btn-dark" style={{ width: "150px" }}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container d-flex flex-column justify-content-center mt-5">
                    <h2 className="text-center" style={{ paddingBottom: "20px" }}>Admin Login</h2>
                    <div className="row justify-content-center">
                        <div className="col-sm-10 col-md-8 col-lg-6">
                            <div className="card shadow-sm">
                                <div className="card-body p-5">
                                    <form onSubmit={handleLogin}>
                                        <div className="row mb-4 align-items-center">
                                            <label className="col-3">Username:</label>
                                            <div className="col-9">
                                                <input
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="row mb-4 align-items-center">
                                            <label className="col-3">Password:</label>
                                            <div className="col-9">
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="row mt-5">
                                            <div className="col-12 d-flex justify-content-center">
                                                <button type="submit" className="btn btn-dark" style={{ width: "150px" }}>
                                                    Login
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminLogin;