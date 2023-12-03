import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Hamburger } from "../assets/hamburger.svg";
import "./navbar.css";

const Navbar = () => {
	const [showNavbar, setShowNavbar] = useState(false);

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};

	const [isSticky, setSticky] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setSticky(window.scrollY > 0);
		};

		
		window.addEventListener("scroll", handleScroll);

		
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className={`navbar ${isSticky ? "sticky" : ""}`}>
			<nav className="navbar">
				<div className="container">
					<div className="logo">
						<NavLink to="/"> Heliverse - Team Management Portal </NavLink>
					</div>

					<div className="menu-icon" onClick={handleShowNavbar}>
						<Hamburger />
					</div>

					<div className={`nav-elements  ${showNavbar && "active"}`}>
						<ul>
							<li>
								<NavLink to="/">Home</NavLink>
							</li>
							<li>
								<NavLink to="/team/select">Create Team</NavLink>
							</li>
							<li>
								<NavLink to="/users/create">Create User</NavLink>
							</li>
							<li>
								<NavLink to="/team/view">View Teams</NavLink>
							</li>
							<li>
								<NavLink to="/about">About</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
