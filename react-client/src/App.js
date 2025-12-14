import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Heading from './component/Header';
import Footer from './component/Footer';
import Programs from './component/Programs';
import ProgramDetails from './component/ProgramDetails';
import About from './component/About';
import VolunteerForm from "./component/VolunteerForm";
import YouthForm from "./component/YouthForm";
import PartnerForm from "./component/PartnerForm";
import Homepage from './component/Homepage';
import FlyersDownloads from "./component/FlyersDownloads";
import EditProgram from "./component/EditProgram";
import AdminLogin from "./component/AdminLogin";
import Subscribers from './component/Subscribers';
import PartnerInquiries from './component/PartnerInquiries';
import VolunteerInquiries from './component/VolunteerInquiries';
import YouthInquiries from './component/YouthInquiries';
import AdminHub from "./component/AdminHub";

import {Routes, Route} from 'react-router-dom';

import { Navigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/admin-login" replace />;
    }
    return children;
};

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/get-current-user", { credentials: 'include' });
                const data = await res.json();
                setIsLoggedIn(data.data === true);
            } catch (err) {
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    if (loading) return <div>
        <Heading/>
    </div>;

    return (
        <div className="App">
            <div>
                <Heading/>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/About" element={<About/>}/>
                    <Route path="/Programs" element={<Programs/>}/>
                    <Route path="/Program-Details" element={<ProgramDetails/>}/>
                    <Route path="/Volunteer-Form" element={<VolunteerForm />} />
                    <Route path="/Youth-Form" element={<YouthForm />} />
                    <Route path="/Partner-Form" element={<PartnerForm />} />
                    <Route path="/FlyersDownloads" element={<FlyersDownloads />} />

                    <Route path="/admin-login" element={<AdminLogin isLoggedIn={isLoggedIn}
                                                                    setIsLoggedIn={setIsLoggedIn} />} />

                    {/* admin paths */}
                    <Route
                        path="/edit-program/:id"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <EditProgram />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-program"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <EditProgram />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/view-subscribers"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Subscribers />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/view-partner-inquiries"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <PartnerInquiries />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/view-volunteer-inquiries"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <VolunteerInquiries />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/view-youth-inquiries"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <YouthInquiries />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-hub"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <AdminHub />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <Footer/>
            </div>
        </div>
    );
}

export default App;