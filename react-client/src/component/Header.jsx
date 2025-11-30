import React from "react";

function Heading() {
    return (
        <section id="header_section">
            <nav className="navbar navbar-expand-lg nav-custom">
                <div className="container-fluid" style={{width: "85%"}}>
                    <a className="navbar-brand" style={{fontSize: "xx-large"}} href="/">
                        <img src="images/Logo.png" alt=""/>
                        C.H.E.E.R.S.
                    </a>
                    <div className="navbar-nav align-items-center w-100 justify-content-around">
                        <a className="nav-link" href="/About">About</a>
                        <a className="nav-link" href="/">Impact</a>
                        <a className="nav-link" href="/Programs">Programs</a>
                        <a className="nav-link" href="/">Flyers</a>
                        <a className="nav-link" href="/">Get Involved</a>
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default Heading;