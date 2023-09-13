import { MouseEvent, useState } from "react";
import "./style.css";
import useOutsideClickPropagate from "../../../hooks/useClickedOutsidePropagate";
const ProfileUserInfo = () => {
	const [showDropDown, setShowDropDown] = useState(false);

	const handleDropDown = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setShowDropDown((prev) => !prev);
	};

	useOutsideClickPropagate(() => {
		setShowDropDown(false);
	});

	return (
		<div id="profileUserInfo">
			<div id="profileUserInfo_left">
				<img
					src="/src/assets/defaultprofile.svg"
					alt="profile_pic"
				/>
			</div>
			<div id="profileUserInfo_right">
				<h2>name</h2>
				<p>bio</p>
				<div>
					<img
						src="/src/assets/location.svg"
						alt=""
					/>
					<p>location</p>
				</div>
				<div id="connect">
					<button onClick={handleDropDown}>
						<img
							src="/src/assets/link.svg"
							alt=""
						/>
						<p>connect with name</p>
						<img
							src="/src/assets/dropdown.svg"
							alt=""
						/>
					</button>
					<div style={{ display: showDropDown ? "block" : "none" }}>
						<a href="">
							<img
								src="/src/assets/instagram.svg"
								alt=""
							/>
							<p>instagram........,,,hiaaskajsbasgh</p>
						</a>
						<a href="">
							<img
								src="/src/assets/globe.svg"
								alt=""
							/>
							<p>website</p>
						</a>
						<a href="">
							<img
								src="/src/assets/twitter.svg"
								alt=""
							/>
							<p>twitter</p>
						</a>
					</div>
				</div>
			</div>
			<div id="sticky_buttons">
				<button>
					<img
						src="/src/assets/mail.svg"
						alt=""
					/>
				</button>
				<button>
					<img
						src="/src/assets/3dots.svg"
						alt=""
					/>
				</button>
			</div>
		</div>
	);
};
export default ProfileUserInfo;
