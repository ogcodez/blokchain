import React from "react";
import TableRow from "./TableRow";
import Tablee from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Row from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";

function Table({ transactions }) {
	return (
		<Container sx={{ backgroundColor: "#300000", p: "2%" }}>
			<TableContainer component={Paper}>
				<Tablee aria-label="collapsible table">
					<TableHead>
						<Row sx={{ borderBottom: "2px solid black" }}>
							<TableCell />
							<TableCell>From</TableCell>
							<TableCell>To</TableCell>
							<TableCell>ETH</TableCell>
						</Row>
					</TableHead>
					<TableBody>
						{transactions.map((transaction) => {
							return (
								<TableRow transaction={transaction} key={transaction.hash} />
							);
						})}
					</TableBody>
				</Tablee>
			</TableContainer>
		</Container>
	);
}

export default Table;
