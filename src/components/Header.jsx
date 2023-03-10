import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

export default function Header() {
	const navigate = useNavigate();

	return (
		<Box sx={{ flexGrow: 1 }} height="8vh">
			<Toolbar sx={{ backgroundColor: "#d2023e", height: "100%" }}>
				<div onClick={() => navigate("/")}>
					<img
						className="logo"
						src="https://d33wubrfki0l68.cloudfront.net/7be340cf7f33d774314208ef5909440b608d87a2/cbe64/static/4f10d2777b2d14759feb01c65b2765f7/b7d3e/eth-glyph-colored.png"
						alt="altcoing"
					/>
				</div>
				<Button style={{ color: "white" }} onClick={() => navigate("/")}>
					Home
				</Button>
			</Toolbar>
		</Box>
	);
}
