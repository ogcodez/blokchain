import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "../src/screens/Home";
import Balance from "./screens/Balance";
import Transactions from "./screens/Transactions";
import "./style.css";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/balance/:address/:date" element={<Balance />} />
				<Route
					path="/transactions/:address/:startBlock"
					element={<Transactions />}
				/>
			</Routes>
		</>
	);
}

export default App;
