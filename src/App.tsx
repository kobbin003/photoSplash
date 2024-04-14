// import "./App.css";

function App() {
	const throwError = () => {
		console.log("about to throw error");
		throw new Error("Home gallery error");
	};
	return (
		<div>
			<h1>HI</h1>
			<button
				onClick={throwError}
				style={{
					height: "100px",
					width: "100px",
					position: "relative",
					top: "100px",
					zIndex: "15",
					backgroundColor: "black",
				}}
			>
				Throw Error
			</button>
		</div>
	);
}

export default App;
