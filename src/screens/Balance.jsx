import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import moment from "moment";
import { Box, CircularProgress, Typography } from "@mui/material";
import "../style.css";

function Balance() {
	const { address, date } = useParams();
	const [balance, setBalance] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const getBalance = useCallback(async () => {
		setIsLoading(true);
		let provider = new ethers.providers.EtherscanProvider(
			"homestead",
			"TDF9UI4IB1Q9AHH4SH1ZDS6YZUUQN2GSMU"
		);

		let history = [];
		//ethers.getBalance() works bad and only for first few blocks for that reason I used this solution
		try {
			history = await provider.getHistory(address);
			const sum = history.reduce((balance, transaction) => {
				const isInRange = moment(date)
					.add(1, "day")
					.isAfter(moment(transaction.timestamp * 1000));

				if (isInRange) {
					const transactionValue = Number(
						ethers.utils.formatEther(transaction.value)
					);
					if (transaction.from === address) {
						balance -= transactionValue;
					} else {
						balance += transactionValue;
					}
				}
				return balance ?? 0;
			}, 0);
			setBalance(sum);
		} catch (err) {}
		setIsLoading(false);
	}, [address, date]);

	useEffect(() => {
		getBalance();
	}, [getBalance]);

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
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				backgroundColor: "rgb(45, 41, 41)",
				height: "90vh",
			}}
		>
			<Box sx={{ backgroundColor: "rgb(45, 41, 41)" }}>
				<Typography color="white" variant="h5" my="30px">
					Wallet: {address}
				</Typography>
				<Typography color="white" variant="h5" my="30px">
					Date: {date}
				</Typography>
				<Typography color="white" variant="h4" my="50px">
					Balance: {balance}
				</Typography>
			</Box>
			<div>
				<img
					className="image"
					src="https://d33wubrfki0l68.cloudfront.net/7be340cf7f33d774314208ef5909440b608d87a2/cbe64/static/4f10d2777b2d14759feb01c65b2765f7/b7d3e/eth-glyph-colored.png"
					alt="altcoing"
				/>
			</div>
		</Box>
	);
}

export default Balance;
