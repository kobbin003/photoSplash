import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	AuthToken,
	getAuthToken,
} from "../../utils/queryFunctions/auth/getAuthToken";
import { ErrorUnsplash } from "../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import { usePhotoStore } from "../../store/store";

const LogIn = () => {
	const [code, setCode] = useState("");

	const { setAccessToken } = usePhotoStore();

	const navigate = useNavigate();

	useQuery<AuthToken, ErrorUnsplash>(["authToken", code], getAuthToken, {
		enabled: !!code,
		onSuccess: (data) => {
			//store the token in local storage
			const token = data.access_token;

			// if (token) localStorage.setItem("tokenUnsplash", token);
			setAccessToken(token);

			// go to /me after getting the token data.
			navigate("/me");
		},
	});

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const code = urlSearchParams.get("code");
		if (code) setCode(code);
	}, []);

	return <div>Loading...</div>;
};

export default LogIn;
