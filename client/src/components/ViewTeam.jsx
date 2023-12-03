import { Button, styled, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getTeams, deleteTeam } from "../services/api";

const Container = styled(Table)({
	width: "90%",
	margin: "1.5rem auto",
});

const MemberSpan = styled("span")({
	fontSize: "15px",
});

const THead = styled(TableRow)({
	background: "#000000",
	"& > th": {
		color: "#fff",
		fontSize: "15px",
	},
});

const Tbody = styled(TableRow)({
	"& > td": {
		fontSize: "16px",
	},
});

const ViewTeam = () => {
	const [teams, setTeams] = useState([]);

	useEffect(() => {
		getAllTeams();
	}, [teams]);

	const getAllTeams = async () => {
		const response = await getTeams();
		console.log(response);
    setTeams(response.data.teams);
    
	};

  const deleteTeamDetails = async (id) => {
		const response = await deleteTeam(id);
    toast.success(response.data.message);
    getAllTeams();
	};


	return (
		<>
			{teams.length === 0 ? (
				<h1 style={{ textAlign: "center", marginTop: "2rem" }}>No Teams Found</h1>
			) : (
				<Container>
					<TableHead>
						<THead>
							<TableCell>TeamID</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Members</TableCell>
							<TableCell>Action</TableCell>
						</THead>
					</TableHead>
					<TableBody>
						{teams.map((team) => (
							<Tbody key={team._id}>
								<TableCell>{team._id}</TableCell>
								<TableCell>{team.name}</TableCell>
								<TableCell>{team.description}</TableCell>
								<TableCell>
									{team.members.map((member, index) => (
										<MemberSpan key={index}>
											{member.first_name + " " + member.last_name}
											{index < team.members.length - 1 ? ", " : ""}
										</MemberSpan>
									))}
								</TableCell>
								<TableCell>
									<Button variant="contained" style={{ marginRight: 10, fontSize: "14px" }} component={Link} to={`/team/${team._id}`}>
										View Details
									</Button>
									<Button variant="contained" style={{ fontSize: "14px" }} onClick={() => deleteTeamDetails(team._id)}>
										Delete
									</Button>
								</TableCell>
							</Tbody>
						))}
					</TableBody>
				</Container>
			)}
		</>
	);

};

export default ViewTeam;
