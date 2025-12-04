import React from "react";

function FlyersDownloads() {

    const flyers = [
        "Mentorship and Girls Program Flyer 2025- 508 C.H.E.E.R.S.-images-0.jpg",
        "Mentorship and Girls Program Flyer 2025- 508 C.H.E.E.R.S.-images-1.jpg",
        "Program Offerings and Ways to Support 2025- 508 C.H.E.E.R.S.-images-0.jpg",
        "Program Offerings and Ways to Support 2025- 508 C.H.E.E.R.S.-images-1.jpg",
        "Why We CHEERS- 508 C.H.E.E.R.S. 2025_page-0001.jpg",
        "Why We CHEERS- 508 C.H.E.E.R.S. 2025_page-0002.jpg"
    ];

    return (
        <div className="flyers-container">

            <h1 className="flyers-title">Flyers & Downloads</h1>

            <p className="flyers-subtitle">
                Explore our program flyers, community initiatives, and informational sheets.
                Click any flyer to download a full-resolution copy.
            </p>

            <div className="flyers-grid">
                {flyers.map(function(img, idx) {
                    return (
                        <div className="flyer-item" key={idx}>
                            <img
                                src={"/images/" + img}
                                alt="Flyer"
                                className="flyer-img"
                            />
                            <div className="flyer-overlay">
                                <a
                                    href={"/images/" + img}
                                    download
                                    className="download-btn"
                                >
                                    ⤓
                                </a>

                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}

export default FlyersDownloads;
