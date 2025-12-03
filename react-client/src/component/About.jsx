import React from 'react';
import './About.css';
import PartnerCarousel from './PartnerCarousel';

export default function About() {
  const cheers=[['C', 'Community Service & Connection'],
                ['H', 'Health & Wellness & Future Readiness'],
                ['E', 'Equity & Empowerment'],
                ['E', 'Education & Enrichment'],
                ['R', 'Resilience & Representation'],
                ['S', 'Sustainability & Service']];
  const boardMembers=[
    {
      name: 'Echo Louissaint',
      bio: 'Body text for bio here. More description. Even more description. Another bit of description. Final part of the description.',
      imgSrc: '/images/avatar.png'
    },
    {
      name: 'Echo Louissaint',
      bio: 'Body text for bio here. More description. Even more description. Another bit of description. Final part of the description.',
      imgSrc: '/images/avatar.png'
    },
    {
      name: 'Echo Louissaint',
      bio: 'Body text for bio here. More description. Even more description. Another bit of description. Final part of the description.',
      imgSrc: '/images/avatar.png'
    },
]
  return (
    <div>
      <main>
        <section style={{margin: "10px"}}>
          <div>
            <h1 className="page-title">About Us</h1>
            <div className="section-divider" />
            
            {/* our vison */}
            <div className="vision">
              <div className="vision-text">
                <h1>Our Vision</h1>
                <h2>
                  We envision a world where every young person, regardless of background, has the confidence, support, and opportunity to rise as a leader, serve their community, and help build a more just, equitable, and compassionate society.
                </h2>
              </div>
              <div className="vision-image">
                       <img src="/images/vision_img.png" alt="Our vision" />
              </div>
            </div>
            
            {/* blue line */}
            <div className="section-divider" />

            {/* C.H.E.E.R.S. */}
            <h1 className="section-title">Our Values</h1>

            <div className="row values-row">
              {
                cheers.map(([letter, text], i) => (
                <div className="value-card col-lg-2 col-md-4 col-sm-6" key={i}>
                  <div className="value-letter">{letter}</div>
                  <div className="value-text">{text}</div>
                </div>
              ))}
            </div>

            {/* Feature cards */}
            <div className="row feature-cards">
              <div className="col-lg-4 col-md-12 d-flex mb-2">
                  <div className="feature">
                  <img src="/images/cheer-up.svg" alt="icon" />
                  <p>508 C.H.E.E.R.S. empowers BIPOC, low-income, and underserved youth through mentorship, community service, and mutual aid projects.</p>
                </div>
              </div>
                <div className="col-lg-4 col-md-12 d-flex mb-2">
                  <div className="feature">
                  <img src="/images/sprout.svg" alt="icon" />
                  <p>We address food insecurity, promote health and wellness, and create pathways for personal and community growth.</p>
                </div>
              </div>
                <div className="col-lg-4 col-md-12 d-flex mb-2">
                  <div className="feature">
                  <img src="/images/charity.svg" alt="icon" />
                  <p>Together, we're building a more equitable, connected, and compassionate Worcester, one youth leader at a time.</p>
                </div>
              </div>
            </div>

            {/* Line */}
            <div className="section-divider" />

            {/* Board Members */}
            <section className="board">
              <h2 className="section-title ">Meet Our Board</h2>
              <div className="row board-row">
                {boardMembers.map((member) => (
                  <div className="board-card col-lg-4 col-md-12 d-flex" key={member.name}>
                    <div className="board-avatar">
                       <img src= {member.imgSrc} alt="avatar" />
                    </div>
                    <div className="board-body">
                      <h3 className="board-name">{member.name}</h3>
                      <p>{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Line */}
            <div className="section-divider" />

            {/* Partners */}
            <section className="partners">
              <h2 className="partners-title">Meet Our Partners</h2>
              <PartnerCarousel />
              <div className="partner-cta">
                <a className="outlined-btn" href="#">Become a Partner</a>
              </div>
            </section>

          </div>
        </section>
      </main>
    </div>
  )
}
