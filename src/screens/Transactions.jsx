import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../components/Table";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ethers } from "ethers";
import "../style.css";

function Transactions() {
	const { address, startBlock } = useParams();

	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getTransactions = useCallback(async () => {
		setIsLoading(true);

		let provider = new ethers.providers.EtherscanProvider(
			"homestead",
			"TDF9UI4IB1Q9AHH4SH1ZDS6YZUUQN2GSMU"
		);
		let history = [];

		try {
			history = await provider.getHistory(address, startBlock);
		} catch (err) {}

		setTransactions(history);
		setIsLoading(false);
	}, [address, startBlock]);

	useEffect(() => {
		getTransactions();
	}, [getTransactions]);

	if (isLoading) {
		return (
			<Box
				width="100%"
				height="80vh"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<CircularProgress size={100} color="error" />
			</Box>
		);
	}

	return (
		<Box display="flex" flexDirection="column">
			<Box
				sx={{
					borderRadius: "2px",
					display: "flex",
					justifyContent: "space-evenly",
					alignItems: "center",
					flexDirection: "column",
					gap: "20px",
					p: "5%",
					margin: "70px 0",
				}}
			>
				<Typography variant="h5" mb="20px">
					Wallet:{address}
				</Typography>
				<Typography variant="h5">
					Start Block:{startBlock == "undefined" ? "" : startBlock}
				</Typography>
			</Box>
			<Table transactions={transactions} />
		</Box>
	);
}

export default Transactions;
