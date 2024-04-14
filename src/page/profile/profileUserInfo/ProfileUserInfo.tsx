import { FC, MouseEvent, useState } from "react";
import "./style.css";
import useOutsideClickPropagate from "../../../hooks/useClickedOutsidePropagate";
import { UsersProfile } from "../../../utils/queryFunctions/unsplashData/type/UsersProfile";

type Props = {
	data: UsersProfile | undefined;
	userName: string | undefined;
};

const ProfileUserInfo: FC<Props> = ({ data, userName }) => {
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
					src={
						data
							? `${data && data.profile_image.large}`
							: "/src/assets/defaultprofile.svg"
					}
					alt="profile_pic"
				/>
				<div className="sticky_buttons sticky_buttons__left">
					{userName ? (
						<div>
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
					) : (
						<button>
							<img
								src="/src/assets/edit.svg"
								alt=""
							/>
							<p>Edit Profile</p>
						</button>
					)}
				</div>
			</div>
			<div id="profileUserInfo_right">
				<div>
					<h2>
						{data && data.first_name} {data && data.last_name}{" "}
					</h2>
					<div className="sticky_buttons sticky_buttons__right">
						{userName ? (
							<div>
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
						) : (
							<button>
								<img
									src="/src/assets/edit.svg"
									alt=""
								/>
								<p>Edit Profile</p>
							</button>
						)}
					</div>
				</div>
				<p>{data && data.bio}</p>
				{data && data.location && (
					<div>
						<img
							src="/src/assets/location.svg"
							alt=""
						/>
						<p>{data.location}</p>
					</div>
				)}
				{userName && (
					<div id="connect">
						<button onClick={handleDropDown}>
							<img
								src="/src/assets/link.svg"
								alt=""
							/>
							<p>connect with {data && data.first_name}</p>
							<img
								src="/src/assets/dropdown.svg"
								alt=""
							/>
						</button>
						<div style={{ display: showDropDown ? "block" : "none" }}>
							{data && data.social.instagram_username && (
								<a
									target="_blank"
									href={`https://www.instagram.com/${data.social.instagram_username}/`}
								>
									<div>
										<img
											src="/src/assets/instagram.svg"
											alt=""
										/>
									</div>
									<p>instagram</p>
								</a>
							)}
							{data && data.social.portfolio_url && (
								<a
									target="_blank"
									href={`${data && data.social.portfolio_url}`}
								>
									<div>
										<img
											src="/src/assets/globe.svg"
											alt=""
											style={{ position: "relative", left: "10%" }}
										/>
									</div>
									<p>website</p>
								</a>
							)}
							{data && data.social.twitter_username && (
								<a
									target="_blank"
									href={`https://twitter.com/${data.social.twitter_username}`}
								>
									<div>
										<img
											src="/src/assets/twitter.svg"
											alt=""
										/>
									</div>
									<p>twitter</p>
								</a>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default ProfileUserInfo;
