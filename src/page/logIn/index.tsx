import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	AuthToken,
	getAuthToken,
} from "../../utils/queryFunctions/auth/getAuthToken";
import { ErrorUnsplash } from "../../utils/queryFunctions/unsplashData/getEditorialPhotos";

const LogIn = () => {
	const [code, setCode] = useState("");
	const navigate = useNavigate();
	console.log("code in login", code);
	// if (code) {
	const { isLoading, isError, data, error } = useQuery<
		AuthToken,
		ErrorUnsplash
	>(["authToken", code], getAuthToken, {
		enabled: !!code,
		onSuccess: (data) => {
			console.log("success");
			//store the token in local storage
			const token = data.access_token;
			if (token) localStorage.setItem("tokenUnsplash", token);
			// go to /me after getting the token data.
			navigate("/me");
		},
	});
	console.log(isLoading, isError, data, error);

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const code = urlSearchParams.get("code");
		if (code) setCode(code);
	}, []);

	return <div>Loading...</div>;
};

export default LogIn;
