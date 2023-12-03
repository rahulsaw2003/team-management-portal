import React, { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { getUniqueUsers } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./createTeam.css";
import { toast } from "react-toastify";

const CreateTeam = () => {
	const [items, setItems] = useState([]);
	const [currentItems, setCurrentItems] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFilters, setSelectedFilters] = useState({
		domain: "",
		gender: "",
		availability: null,
	});
	const [selectedUsers, setSelectedUsers] = useState([]);
	const itemsPerPage = 10;
	const [itemOffset, setItemOffset] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		getUserDetails();
	}, []);

	const getUserDetails = async () => {
		const response = await getUniqueUsers();
		const uniqueUsers = response.data.uniqueUsers;
		if (uniqueUsers.length === 0) {
			toast.error("No users found");
		}

		setItems(uniqueUsers);
	};

	const updatePage = () => {
		const filteredItems = items
			.filter((item) => `${item.first_name} ${item.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()))
			.filter((item) => filterByDomain(item, selectedFilters.domain))
			.filter((item) => filterByGender(item, selectedFilters.gender))
			.filter((item) => filterByAvailability(item, selectedFilters.availability));

		const endOffset = itemOffset + itemsPerPage;
		const slicedItems = filteredItems.slice(itemOffset, endOffset);

		setCurrentItems(slicedItems);
		setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
	};

	useEffect(() => {
		updatePage();
	}, [itemOffset, itemsPerPage, items, searchQuery, selectedFilters]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		setItemOffset(newOffset);
	};

	const handleSearchChange = (query) => {
		setSearchQuery(query);
		setItemOffset(0);
	};

	const handleResetFilters = () => {
		setSelectedFilters({
			domain: "",
			gender: "",
			availability: null,
		});
		setSearchQuery("");
		setItemOffset(0);
		setSelectedUsers([]);
	};

	const handleFilterChange = (filterType, value) => {
		setSelectedFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: value,
		}));
		setItemOffset(0);
		setSelectedUsers([]);
	};

	const handleSearch = () => {
		updatePage();
	};

	const handleTeam = () => {
		if (selectedUsers.length < 2) {
			toast.error("Please select atleast two users");
			return;
		}
		
		navigate("/team/create", { state: { selectedUsers } });
	};

	const handleSelect = (itemId) => {
		setSelectedUsers((prevSelectedUsers) => {
			if (prevSelectedUsers.includes(itemId)) {
				return prevSelectedUsers.filter((id) => id !== itemId);
			} else {
				return [...prevSelectedUsers, itemId];
			}
		});
	};

	// Filter functions
	const filterByDomain = (item, domain) => !domain || item.domain.toLowerCase() === domain.toLowerCase();
	const filterByGender = (item, gender) => !gender || item.gender.toLowerCase() === gender.toLowerCase();
	const filterByAvailability = (item, availability) => availability === null || item.available === availability;

	return (
		<>
			<div className="container-one">
				<div className="search-container1">
					<div className="create-team">
						<button className="create-team-button" onClick={() => handleTeam()}>
							Create Team
						</button>
					</div>
					<input type="text" placeholder="Search by Name" value={searchQuery} className="search-field1" onChange={(e) => handleSearchChange(e.target.value)} />
					<button className="search-button1" onClick={handleSearch}>
						Search
					</button>
				</div>

				<div className="filters">
					{/* Domain filter */}
					<select value={selectedFilters.domain} onChange={(e) => handleFilterChange("domain", e.target.value)}>
						<option value="">Select Domain</option>
						<option value="Business Development">Business Development</option>
						<option value="IT">IT</option>
						<option value="UI Designing">UI Designing</option>
						<option value="Finance">Finance</option>
						<option value="Management">Management</option>
						<option value="Marketing">Marketing</option>
						<option value="Sales">Sales</option>
					</select>

					{/* Gender filter */}
					<select value={selectedFilters.gender} onChange={(e) => handleFilterChange("gender", e.target.value)}>
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

					{/* Availability filter */}
					<select value={selectedFilters.availability === null ? "" : selectedFilters.availability.toString()} onChange={(e) => handleFilterChange("availability", e.target.value === "true" ? true : e.target.value === "false" ? false : null)}>
						<option value="">Select Availability</option>
						<option value="true">Available</option>
						<option value="false">Not Available</option>
					</select>

					<button onClick={handleResetFilters}>Reset Filters</button>
				</div>
			</div>
			<hr className="h-rule" />
			<div className="cards">
				<div className="images">
					{currentItems.map((item) => (
						<div key={item.id} className={`card ${selectedUsers.includes(item._id) ? "selected" : ""}`}>
							<img src={item.avatar} alt={item.title} />

							<p>Name: {item.first_name + item.last_name}</p>

							<p>Email: {item.email}</p>

							<p>Gender: {item.gender}</p>

							<p>Domain: {item.domain}</p>

							<p>Available: {item.available ? "Yes" : "No"}</p>

							<div className="btns2">
								<button className="btn-2" onClick={() => handleSelect(item._id)}>
									{selectedUsers.includes(item._id) ? "Deselect" : "Select"}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<ReactPaginate breakLabel="..." nextLabel="Next >" onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} previousLabel="< Previous" renderOnZeroPageCount={null} containerClassName="pagination" activeLinkClassName="active-page" previousLinkClassName="page-num" nextLinkClassName="page-num" pageLinkClassName="page-num" disabledLinkClassName="disabled-page" disableInitialCallback={true} />
		</>
	);
};

export default CreateTeam;
