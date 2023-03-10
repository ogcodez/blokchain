import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import "../style.css";

function Home() {
	const navigate = useNavigate();

	const [transactionData, setTransactionData] = useState({
		address: "",
		startBlock: undefined,
	});

	const [balanceData, setBalanceData] = useState({
		address: "",
		date: new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
	});

	const [errors, setErrors] = useState({
		transactions: "",
		balance: "",
	});

	const transactionsSubmitHandler = () => {
		if (ethers.utils.isAddress(transactionData.address)) {
			navigate(
				`/transactions/${transactionData.address}/${transactionData.startBlock}`
			);
		} else {
			setErrors({
				transactions: "Please provide valid address!",
				balance: "",
			});
		}
	};
	const balanceSubmitHandler = () => {
		if (ethers.utils.isAddress(balanceData.address)) {
			navigate(`/balance/${balanceData.address}/${balanceData.date}`);
		} else {
			setErrors({
				transactions: "",
				balance: "Please provide valid address!",
			});
		}
	};

	return (
		<div className="container">
			<div className="container-form">
				<div className="container-elements">
					<h3 style={{ color: "black" }}>Ethereum Transactions</h3>
					<div className="ether_transaction">
						<input
							placeholder="wallet ID"
							value={transactionData.address}
							onChange={(e) => {
								setTransactionData((prevData) => ({
									...prevData,
									address: e.target.value,
								}));
							}}
						/>
						<input
							placeholder="block number, ex: 12329054"
							type="number"
							value={transactionData.startBlock}
							onChange={(e) =>
								setTransactionData((prevData) => ({
									...prevData,
									startBlock: e.target.value,
								}))
							}
						/>
						<button
							type="button"
							className="button"
							onClick={transactionsSubmitHandler}
						>
							search
						</button>
					</div>
					{errors.transactions && (
						<h4 style={{ color: "red" }}>{errors.transactions}</h4>
					)}
					<h3 style={{ color: "black" }}>Account Balance</h3>
					<div className="account_balance">
						<input
							placeholder="wallet ID"
							value={balanceData.address}
							onChange={(e) =>
								setBalanceData((prevData) => ({
									...prevData,
									address: e.target.value,
								}))
							}
						/>
						<input
							placeholder="date"
							type="date"
							value={balanceData.date}
							onChange={(e) =>
								setBalanceData((prevData) => ({
									...prevData,
									date: e.target.value,
								}))
							}
						/>
						<button className="button" onClick={balanceSubmitHandler}>
							search
						</button>
						{errors.balance && (
							<h4 style={{ color: "red" }}>{errors.balance}</h4>
						)}
					</div>
				</div>
			</div>
			<div>
				<img
					className="image"
					src="https://d33wubrfki0l68.cloudfront.net/7be340cf7f33d774314208ef5909440b608d87a2/cbe64/static/4f10d2777b2d14759feb01c65b2765f7/b7d3e/eth-glyph-colored.png"
					alt="altcoing"
				/>
			</div>
		</div>
	);
}

export default Home;
