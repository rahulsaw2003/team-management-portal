import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneTeam } from "../services/api"; 
import "./TeamDetails.css";

const defaultTeamDetails = {
	name: "",
	description: "",
	members: [],
};
const TeamDetails = () => {
	const { id } = useParams();
	const [teamDetails, setTeamDetails] = useState(defaultTeamDetails);

	const fetchTeamDetails = async () => {
		try {
			const response = await getOneTeam(id);
			console.log(response);
			setTeamDetails(response.data.team);
		} catch (error) {
			console.error("Error fetching team details:", error);
		}
	};

	useEffect(() => {
		fetchTeamDetails();
	}, []);

	if (!teamDetails) {
		return <div>Loading...</div>;
	}

	const chunkMembers = (arr, size) => arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);

	const membersPairs = chunkMembers(teamDetails.members, 2);

	return (
		<div className="team-details-container">
			<h1 className="team-details-title">Team Details:</h1>
			<div className="team-details-section">
				<p className="team-details-label">Team Name:</p>
				<p className="team-details-value">{teamDetails.name}</p>
			</div>
			<div className="team-details-section">
				<p className="team-details-label">Description:</p>
				<p className="team-details-value">{teamDetails.description}</p>
			</div>

			<p className="team-details-label">Members:</p>

			<div className="members-container">
				{membersPairs.map((pair, index) => (
					<div key={index} className="members-pair">
						{pair.map((member) => (
							<div key={member._id} className="member-item">
								<p>
									<span className="member-detail-label">Name:</span> {member.first_name} {member.last_name}
								</p>
								<p>
									<span className="member-detail-label">Email:</span> {member.email}
								</p>
								<p>
									<span className="member-detail-label">Gender:</span> {member.gender}
								</p>
								<p>
									<span className="member-detail-label">Domain:</span> {member.domain}
								</p>
								<p>
									<span className="member-detail-label">Available:</span> {member.available ? "Yes" : "No"}
								</p>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default TeamDetails;
