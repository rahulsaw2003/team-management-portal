import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { createTeam } from "../services/api";
import "./UpdateUser.css";

const defaultTeam = {
	name: "",
	description: "",
};

const DefineTeam = () => {
	const [teamData, setTeamData] = useState(defaultTeam);
	const [members, setMembers] = useState([]);
    const [memberName, setMemberName] = useState([]);
	const history = useNavigate();
	const location = useLocation();
	const { selectedUsers } = location.state;

	useEffect(() => {
		setMembers(selectedUsers);
	}, [selectedUsers]);

	const handleValueChange = (e) => {
		const { name, value } = e.target;

		setTeamData({ ...teamData, [name]: value });
	};

	const handleClick = async (e) => {
		e.preventDefault();
		const newTeam = {
			...teamData,
			memberIds: members,
		};

        const res = await createTeam(newTeam);
		if(res.status === 201){
            toast.success("Team Created Successfully");
            history(`/team/${res.data.team._id}`);
        }else{
            toast.error(res.data.message);
            return;
        }
	};

	return (
		<section>
			<div className="form_data">
				<div className="form_heading">
					<h1>Create New Team</h1>
				</div>

				<form method="post">
					<div className="form_input">
						<label htmlFor="name">Name</label>
						<input type="name" name="name" placeholder="Enter Team Name" onChange={(e) => handleValueChange(e)} />
					</div>
					<div className="form_input">
						<label htmlFor="description">Description</label>
						<input type="text" name="description" placeholder="Enter Description" onChange={(e) => handleValueChange(e)} />
					</div>
					<div className="form_input">
						<label htmlFor="members">Team Member IDs</label>
						<input
							type="text"
							name="members"
							placeholder="Enter team members"
							value={members.join(": ")}
						/>
					</div>

					<button className="btn" onClick={(e) => handleClick(e)}>
						Update
					</button>
				</form>
			</div>
		</section>
	);
};

export default DefineTeam;
