import './styles/footer.scss';
import {
  AiOutlineCopyrightCircle,
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineInstagram
} from "react-icons/ai";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-icons">
        <a className="link" href="https://www.linkedin.com/in/zsiwei/" target="_blank" rel="noreferrer">
          <AiOutlineLinkedin className='icon' />
        </a>
        <a className="link" href="https://github.com/siweiez" target="_blank" rel="noreferrer">
          <AiOutlineGithub className='icon' />
        </a>
        <AiOutlineInstagram className='icon' />

      </div>
      <div className="footer-text">
        <AiOutlineCopyrightCircle />
        <p>2022 Siwei Zhang.</p>
      </div>
    </div>
  );
}

export default Footer;