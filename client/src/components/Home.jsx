import React, { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { deleteUser, getAllUsers } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
	const [items, setItems] = useState([]);
	const [currentItems, setCurrentItems] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFilters, setSelectedFilters] = useState({
		domain: "",
		gender: "",
		availability: null,
	});
	const itemsPerPage = 10;
	const [itemOffset, setItemOffset] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		getUserDetails();
	}, []);

	const getUserDetails = async () => {
		const response = await getAllUsers();
		// console.log(response.data.users);
		setItems(response.data.users);
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
	};

	const handleFilterChange = (filterType, value) => {
		setSelectedFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: value,
		}));
		setItemOffset(0);
	};

	const handleSearch = () => {
		updatePage();
	};

	const handleUpdate = (itemId) => {
		// console.log(itemId);
		navigate(`/users/update/${itemId}`);
	};

	const handleDelete = async (itemId) => {
		const res = await deleteUser(itemId);
		toast.success("User Deleted Successfully");
		getUserDetails();

		if (currentItems.length === 1 && itemOffset > 0) {
			setItemOffset((prevOffset) => Math.max(0, prevOffset - itemsPerPage));
		}
	};

	// Filter functions
	const filterByDomain = (item, domain) => !domain || item.domain.toLowerCase() === domain.toLowerCase();
	const filterByGender = (item, gender) => !gender || item.gender.toLowerCase() === gender.toLowerCase();
	const filterByAvailability = (item, availability) => availability === null || item.available === availability;

	return (
		<>
			<div className="container-one">
				<div className="search-container">
					<input type="text" placeholder="Search by Name" value={searchQuery} className="search-field" onChange={(e) => handleSearchChange(e.target.value)} />
					<button className="search-button" onClick={handleSearch}>
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
						<div key={item.id}>
							<img src={item.avatar} alt={item.title} />

							<p>
								Name: {item.first_name} {item.last_name}
							</p>

							<p>Email: {item.email}</p>

							<p>Gender: {item.gender}</p>

							<p>Domain: {item.domain}</p>

							<p>Available: {item.available ? "Yes" : "No"}</p>

							<div className="btns">
								<button className="btn1" onClick={() => handleUpdate(item._id)}>
									Update
								</button>
								<button className="btn1" onClick={() => handleDelete(item._id)}>
									Delete
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

export default Home;
