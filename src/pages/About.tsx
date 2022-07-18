import Header from "../components/Header";
import './styles/about.scss';
import profilePic from '../images/profile.png';

function About() {
  return (
    <div className="about">
      <Header>About Me</Header>
      <div className="about-content">
        <div className="left-content">
          <h2>Hi, I'm Siwei.</h2>
          <p>
            I'm a developer based in Vancouver.<br />
            This is my blog space where I keep my notes and thoughts about development.
          </p>
        </div>
        <a className="link profile-picture" href="https://www.zcool.com.cn/u/282121" target="_blank" rel="noreferrer">
          <img src={profilePic} alt="" className="picture" />
        </a>
      </div>
    </div >
  );
};

export default About;
