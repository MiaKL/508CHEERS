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
                        <a className="nav-link" href="/Programs">Programs</a>
                        <a className="nav-link" href="/">Flyers & Downloads</a>
                        <a className="nav-link" href="/">Partners</a>
                        <a className="nav-link" href="/">Volunteer</a>
                        <a className="nav-link" href="/About">About</a>
                        <a className="btn btn-primary" href="https://secure.qgiv.com/for/508cheers" role="button">Donate</a>
                    </div>
                </div>
            </nav>
            <hr/>
        </section>
    );
}

export default Heading;