import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectTeam from "./components/SelectTeam";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UpdateUser from "./components/UpdateUser";
import ViewTeam from "./components/ViewTeam";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefineTeam from "./components/DefineTeam";
import TeamDetails from "./components/TeamDetails";
import CreateUser from "./components/CreateUser";
import About from "./components/About";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/users/create" element={<CreateUser />} />
					<Route path="/users/update/:id" element={<UpdateUser />} />
					<Route path="/about" element={<About />} />
					<Route path="/team/select" element={<SelectTeam />} />
					<Route path="/team/create" element={<DefineTeam />} />
					<Route path="/team/view" element={<ViewTeam />} />
					<Route path="/team/:id" element={<TeamDetails />} />
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
