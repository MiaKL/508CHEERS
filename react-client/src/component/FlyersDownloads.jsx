import React from "react";

function FlyersDownloads() {

    const flyers = [
        "Mentorship_and_Girls_Program_Flyer_2025-508_CHEERS-images-0.jpg",
        "Mentorship_and_Girls_Program_Flyer_2025-508_CHEERS-images-1.jpg",
        "Program_Offerings_and_Ways_to_Support_2025-508_CHEERS-images-0.jpg",
        "Program_Offerings_and_Ways_to_Support_2025-508_CHEERS-images-1.jpg",
        "Why_We_CHEERS-508_CHEERS_2025_page-0001.jpg",
        "Why_We_CHEERS-508_CHEERS_2025_page-0002.jpg",
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
