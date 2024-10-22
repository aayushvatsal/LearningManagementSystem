import React from 'react';
import '../../Styles/StartUPFounder.css'; // Import the new CSS file

const data = [
  {
    title: 'The most experienced partners',
    description:
      'Each founder is assigned a dedicated group partner who has mentored hundreds of Grow UP Start Company companies. They have more data on what it takes to build a successful startup than any other early stage startup advisor.',
    image: "/Images/experienced.webp",
  },
  {
    title: 'Investor network',
    description:
      'Grow UP Start Company companies have raised $85 billion dollars from the best investors in the world. Our founders have access to the Grow UP Start Company Investor Database which has profiles and reviews for more than 50,000 startup investors.',
    image: "/Images/Investor network.jpg",
  },
  {
    title: 'Global network',
    description:
      'Grow UP Start Company alumni span across all continents. As a Grow UP Start Company founder, you are instantly part of a strong global network with access to world-class resources.',
    image: "/Images/Global network.jpg",
  },
  {
    title: 'Startup School',
    description:
      'Our free online program teaches the basics of launching a startup. Get advice and mentorship from experienced entrepreneurs through weekly lessons and exercises.',
    image: "/Images/Startup School.png",
  },
  {
    title: 'Demo Day',
    description:
      'At the end of every batch, Grow UP Start Company founders present their startup to a carefully selected audience of investors in our Demo Day event, one of the largest startup pitch events in the world.',
    image: "/Images/Demo Day.jpg",
  },
  {
    title: 'Ongoing support',
    description:
      'Even after you complete the Grow UP Start Company program, you will continue to receive support through our alumni network, office hours, and resources.',
    image: "/Images/Ongoing support.png",
  },
];

const StartUPFounder = () => {
  return (
    <div className="founderContainer">
      <h2 className="mainHeading">
        Grow UP Start Company <span className="highlight">is run by startup founders</span> who have built exactly what they wanted when starting and growing a startup.
      </h2>
      <div className="cardGrid">
        {data.map((item, index) => (
          <div className="founderCard" key={index}>
            <img src={item.image} alt={item.title} className="cardImage" />
            <div className="cardContent">
              <h3 className="cardTitle">{item.title}</h3>
              <p className="cardDescription">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartUPFounder;
