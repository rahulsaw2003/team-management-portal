import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser } from "../services/api";
import "./UpdateUser.css";
const defaultUser = {
	first_name: "",
	last_name: "",
	email: "",
	phone: "",
	gender: "",
	domain: "",
	available: "",
};

const CreateUser = () => {
	const [userData, setUserData] = useState(defaultUser);
	const history = useNavigate();

	const handleValueChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleClick = async (e) => {
		e.preventDefault();
		const res = await createUser(userData);

		if (res.status === 201) {
			toast.success("User Created Successfully");
			setUserData(defaultUser);
			history("/");
		} else {
			console.log(res.data.message);
			toast.error(res.data.message);
		}
	};

	return (
		<section>
			<div className="form_data">
				<div className="form_heading">
					<h1>Update User</h1>
				</div>

				<form method="post">
					<div className="form_input">
						<label htmlFor="first_name">First Name</label>
						<input type="name" name="first_name" placeholder="Enter full name" onChange={(e) => handleValueChange(e)} value={userData.first_name} />
					</div>
					<div className="form_input">
						<label htmlFor="last_name">Last Name</label>
						<input type="name" name="last_name" placeholder="Enter last name" onChange={(e) => handleValueChange(e)} value={userData.last_name} />
					</div>
					<div className="form_input">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" id="email" placeholder="Enter email address" onChange={(e) => handleValueChange(e)} value={userData.email} />
					</div>
					<div className="form_input">
						<label htmlFor="gender">Gender</label>

						<select className="menu" name="gender" id="gender" onChange={(e) => handleValueChange(e)} value={userData.gender}>
							<option value="">Select Gender</option>
							<option value="Male">Male</option>
							<option value="Bigender">Bigender</option>
							<option value="Genderfluid">Genderfluid</option>
							<option value="Agender">Agender</option>
							<option value="Genderqueer">Genderqueer</option>
							<option value="Polygender">Polygender</option>
							<option value="Female">Female</option>
							<option value="Non-binary">Non-binary</option>
						</select>
					</div>
					<div className="form_input">
						<label htmlFor="domain">Domain</label>
						<select className="menu" name="domain" id="domain" onChange={(e) => handleValueChange(e)} value={userData.domain}>
							<option value="">Select Domain</option>
							<option value="Business Development">Business Development</option>
							<option value="IT">IT</option>
							<option value="UI Designing">UI Designing</option>
							<option value="Finance">Finance</option>
							<option value="Management">Management</option>
							<option value="Marketing">Marketing</option>
							<option value="Sales">Sales</option>
						</select>
					</div>
					<div className="form_input">
						<label htmlFor="available">Availability</label>
						<select className="menu" name="available" id="available" onChange={(e) => handleValueChange(e)} value={userData.available}>
							<option value="">Select Availability</option>
							<option value="true">Available</option>
							<option value="false">Not Available</option>
						</select>
					</div>

					<button className="btn" onClick={(e) => handleClick(e)}>
						Create
					</button>
				</form>
			</div>
		</section>
	);
};

export default CreateUser;
