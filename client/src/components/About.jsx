import React from "react";
import "./About.css";

const About = () => {
	return (
		<div className="about-container">
			<div className="about-content">
				<h2>About Us</h2>
				<p>Welcome to our website! We are dedicated to providing amazing products/services to our customers.</p>
				<p>Feel free to reach out to us for any inquiries or collaborations. We would love to hear from you!</p>
			</div>
			<div className="contact-details">
				<h3>Contact Details</h3>
				<p>
					Email: <a href="mailto:2021chb1052@iitrpr.ac.in">2021chb1052@iitrpr.ac.in</a>
				</p>
				<p>Phone: +91 878456-57890</p>
				<p>Address: Nangal Road, Rupnagar, Punjab, India - 140001</p>
			</div>
		</div>
	);
};

export default About;
