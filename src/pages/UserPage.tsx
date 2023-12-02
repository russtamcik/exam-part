import { Link } from "react-router-dom";
import "../css/user.css";

const UserPage = () => {
  return (
    <div className="back-not">
      <h1 className="userH">Welcome to Our Portfolio Project</h1>
      <p className="userP">
        <span className="userspan" style={{ color: "white" }}>
          Portfolio Owners:
        </span>{" "}
        If you're looking to showcase your work, skills, and accomplishments,
        you're in the right place! Our platform empowers you to create a
        stunning portfolio that reflects your expertise. The possibilities are
        endless, and your portfolio will be a true reflection of your unique
        talents.
      </p>
      <hr />
      <p className="userP">
        <span className="userspan" style={{ color: "white" }}>
          Clients and Visitors:
        </span>{" "}
        For clients seeking top-notch professionals or anyone visiting our
        platform, we invite you to explore the incredible portfolios our users
        have created. You'll find a diverse range of skills, styles, and
        experiences to choose from, making it easy to find the perfect match for
        your needs.
      </p>
      <hr />
      <p className="userP">
        If you're not a client but are eager to explore portfolios and
        experience the potential of our project, we kindly ask you to reach out
        to our admin team for more information. Our team is here to guide you
        and help you make the most of your journey with us. Feel free to contact
        us at{" "}
        <span className="userspan" style={{ color: "white" }}>
          abdulaziz_programmer@gmail.com
        </span>{" "}
        Thank you for embarking on this exciting journey with us! We're
        dedicated to providing a platform that serves every user's portfolio
        needs and creates connections that lead to success.
      </p>
      <div className="knopka">
        <button className="userButton">Contact with Admin</button>
        <Link to="/login">
          <button className="userButton">Go to login</button>
        </Link>
      </div>
    </div>
  );
};

export default UserPage;
