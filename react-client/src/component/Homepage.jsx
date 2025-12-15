import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import SubmitPopUp from './SubmitPopUp';
import { Carousel } from 'react-bootstrap';

export default function Homepage() {
    const navigate = useNavigate();

    const [subscriber, setSubscriber] = useState({
        email: ''
    });

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // create a new subscriber object to store in database
        const newSubscriber = {
            email: subscriber.email
        };

        const url = '/save-subscriber';
        const method = 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSubscriber),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Server responded with an error');
                }
                return response.json();
            })
            .then((data) => {
                if (data.message === 'success') {
                    setIsPopUpOpen(true);
                    setSubscriber({ ...subscriber, email: '' });
                } else {
                    console.log(data.data || 'An error occurred while saving the subscriber email.');
                }
            })
            .catch((err) => {
                console.error('Error saving subscriber: ', err);
                console.log('There was an error saving the subscriber email: ' + err.data || err);
            });
    };

    return (
        <div>
            <div className={'d-block mx-auto'} style={{width: "97.5%"}}>
                <Carousel id="partnersCarousel" pause={false} controls={true}>
                    <Carousel.Item>
                        <img src="/images/vision_img.png" className="d-block w-100 carousel_uniform" alt="Slide 1" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/images/carousel2.jpeg" className="d-block w-100 carousel_uniform" alt="Slide 2" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/images/carousel3.jpeg" className="d-block w-100 carousel_uniform" alt="Slide 3" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/images/carousel4.jpeg" className="d-block w-100 carousel_uniform" alt="Slide 4" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/images/carousel5.jpeg" className="d-block w-100 carousel_uniform" alt="Slide 5" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/images/carousel6.jpeg" className="d-block w-100 carousel_uniform" alt="Slide 6" />
                    </Carousel.Item>
                </Carousel>
            </div>


            {/* Hero Title Section */}
            <div className="hero-title">
                <h1 className="title"> C.H.E.E.R.S</h1>
                <h2 className="cheers-subtitle">If we all do a little, the results will be a lot.</h2>
                <div className='btn-row d-flex justify-content-center gap-3'>
                    <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/Partner-Form')}>Partner With Us</button>
                    <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/Volunteer-Form')}>Volunteer</button>
                </div>
            </div>
        
            {/* Line */}
            <div className="section-divider" />

            {/* Who We Are Section */}
            <div className='who-we-are'>
                <h1 className="header"> Who We Are</h1>
                <h2 className="subtext">508 C.H.E.E.R.S. empowers Worcester’s underserved youth through mentorship, mutual aid, and wellness initiatives to build a more equitable community</h2>
            </div>

             {/* Line */}
            <div className="section-divider" />

            <img src='/images/tug_of_war.png' alt="Tug of War" className='banner-image'/>

            {/* Line */}
            <div className="section-divider" />

            {/* What we do and programs Section */}
            <div className='info-section'>
                <div className='what-we-do'>
                    <h1 className="header"> What We Do</h1> 
                    <p className="body-text-bold">We strengthen our community by helping youth serve, advocate, and lead while addressing critical local needs.</p>
                    <ul className='body-text'>
                        <li><b>Mentorship & Growth:</b> Supporting youth as they build confidence and define their purpose.</li>
                        <li><b>Direct Service:</b> Tackling food insecurity and health disparities through mutual aid.</li>
                        <li><b>Systemic Change:</b> Empowering the next generation to advocate for equity in Worcester.</li>
                    </ul>
                </div>
                <div className='programs'>
                    <h1 className="header"> Programs & Resources</h1>
                    <p className="body-text-bold"> Quick access to programs details, download flyers, and partnership materials for the schools and funders.</p>
                    <div className='btn-row'>
                        <div className='btn-col'>
                            <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/Programs')}>View Programs</button>
                            <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/About')}>Info</button>
                        </div>
                        <div className='btn-col'>
                            <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/FlyersDownloads')}> Download Flyers </button>
                            <button type="button" className="btn btn-outline-primary" onClick={() => navigate('https://secure.qgiv.com/for/508cheers')}>Donate</button>
                        </div>
                    </div>
                </div>
            </div>
        
            {/* Line */}
            <div className="section-divider" />

            {/* Other Info Section */}
            <div className='Other-info'>
                <h1 className="header"> Subscribe and Stay Updated! </h1>
                <form className="subscribe-form" onSubmit={handleSubmit}>
                    <input type="email" className="form-control subscribe-input" id="subscribeEmail"
                           value={subscriber.email}
                           placeholder="Enter your email"
                           onChange={(e) => setSubscriber({ ...subscriber, email: e.target.value })}
                           required
                    />
                    <button type="submit" className="btn btn-outline-primary subscribe-btn">Subscribe</button>
                </form>
                <div>
                    <SubmitPopUp isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}>
                        <h2>Thank you for subscribing!</h2>
                    </SubmitPopUp>
                </div>
                                <div className="video-embed">
                                    <iframe
                                        src="https://www.youtube.com/embed/PHUM7bpt6GA"
                                        title="Advocacy is Service"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                </div>
                
                <h1 className="header"> Connect With Us  </h1>
                <div className="container" style={{width: "300px"}}>
                    <div className="row">
                        <a href="https://www.instagram.com/508CHEERS" className="col-4 socialIcon" target="_blank" rel="noopener noreferrer">
                            {/*<img src="/images/instagram-icon.png" alt="Instagram" />*/}
                            <i className="bi bi-instagram" style={{fontSize: "50px"}}></i>
                        </a>
                        <a href="https://www.facebook.com/508cheers" className="col-4 socialIcon" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-facebook" style={{fontSize: "50px"}}></i>
                        </a>
                        <a href="https://www.youtube.com/@508CHEERS" className="col-4 socialIcon" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-youtube" style={{fontSize: "50px"}}></i>
                        </a>
                    </div>
                </div>

                {/* Line */}
                <div className="section-divider" />

                <div className='contact-us'>
                    <div className='reach-out'>
                        <h2 className='subtext-bold'> Reach Out</h2>
                        <p className='body-text'> Echo Louissaint</p>
                        <p className='body-text'> Founder/Executive Director</p>
                        <p className='body-text'> echo@508cheers.org</p>
                    </div>
                    <img src="/images/Logo.png" alt="logo"/>
                    <div className='location'>
                        <h2 className='subtext-bold'> 508 C.H.E.E.R.S.</h2>
                        <p className='body-text'> Worcester, Massachusetts, United States</p>
                        <p className='body-text'> 1 (508) 963-2919</p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}