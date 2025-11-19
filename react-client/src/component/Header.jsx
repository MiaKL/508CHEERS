import React from "react";

function Heading() {
    return (
        <section id="header_section">
            <nav className="navbar navbar-expand-lg nav-custom">
                <div className="container-fluid">
                    <div className="navbar-nav">
                        <a className="navbar-brand" href="/">Logo</a>
                        <a className="nav-link" href="/">Home</a>
                        <a className="nav-link" href="/">About</a>
                        <a className="nav-link" href="/">Programs</a>
                        <a className="nav-link" href="/">Impact</a>
                        <a className="nav-link" href="/">Media</a>
                        <a className="nav-link" href="/">Join Us</a>
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default Heading;