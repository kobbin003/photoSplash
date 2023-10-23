import { MouseEvent, useState } from "react";
import { Button } from "../../button/Button";
import { useQuery } from "@tanstack/react-query";
import { likeUnlikePhoto } from "../../../utils/queryFunctions/unsplashData/likeUnlikePhoto";
import { usePhotoStore } from "../../../store/store";
import { useLocation } from "react-router-dom";
import { authorise } from "../../../utils/authorise";

type Props = {
	id: string;
	likedByUser: boolean;
};

const HeartButton = ({ id, likedByUser }: Props) => {
	const [heart, setheart] = useState(false);

	const { pathname } = useLocation();

	const loggedIn = pathname.includes("me");
	const [method, setMethod] = useState("");

	const { accessToken } = usePhotoStore();

	useQuery(["likeUnlike", id, method, accessToken], likeUnlikePhoto, {
		useErrorBoundary: false,
		enabled: method ? true : false,
	});

	const handleClickHeart = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (!loggedIn) {
			const url = authorise();
			window.location.href = url;
		} else {
			setheart((prev) => !prev);

			if (!method) {
				setMethod("POST");
			} else {
				setMethod((prev) => (prev = "POST" ? "DELETE" : "POST"));
			}
		}
	};

	return (
		<Button
			height={35}
			mode="only-icons"
			imgUrl={"/src/stories/assets/PhotoCard/heart.svg"}
			handleClick={handleClickHeart}
			heart={heart || likedByUser ? "heart" : ""}
		/>
	);
};

export default HeartButton;
