import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Row from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ethers } from "ethers";

function TableRow({ transaction }) {
	const [open, setOpen] = React.useState(false);

	const getTime = (timestamp) => {
		let date = new Date(timestamp * 1000);
		return date.toString();
	};

	return (
		<React.Fragment>
			<Row sx={{ borderBottom: "2px solid black" }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUpIcon sx={{ color: "#d2023e" }} />
						) : (
							<KeyboardArrowDownIcon sx={{ color: "#d2023e" }} />
						)}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{transaction.from}
				</TableCell>
				<TableCell>{transaction.to}</TableCell>
				<TableCell>{ethers.utils.formatEther(transaction.value)}</TableCell>
			</Row>
			<Row>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1, backgroundColor: "gray" }}>
							<Typography variant="h7" gutterBottom component="div">
								Hash: {transaction.hash}
							</Typography>
							<Typography variant="h7" gutterBottom component="div">
								Block number: {transaction.blockNumber}
							</Typography>
							<Typography variant="h7" gutterBottom component="div">
								Time: {getTime(transaction.timestamp)}
							</Typography>
						</Box>
					</Collapse>
				</TableCell>
			</Row>
		</React.Fragment>
	);
}

export default TableRow;
