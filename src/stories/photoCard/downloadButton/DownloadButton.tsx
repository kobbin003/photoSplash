import { useQuery } from "@tanstack/react-query";
import { Button } from "../../button/Button";
import { downloadPhoto } from "../../../utils/queryFunctions/unsplashData/downloadPhoto";
import { MouseEvent, useEffect, useState } from "react";
import { DownloadData } from "../../../utils/queryFunctions/unsplashData/type/downloadPhoto";
import { ErrorUnsplash } from "../../../utils/queryFunctions/unsplashData/getEditorialPhotos";

type Props = { id: string };

const DownloadButton = ({ id }: Props) => {
	const [enableDownload, setEnableDownload] = useState(false);

	const { data } = useQuery<DownloadData, ErrorUnsplash>(
		["downloadphoto", id],
		downloadPhoto,
		{
			useErrorBoundary: false,
			enabled: enableDownload,
		}
	);

	const handleClickDownload = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setEnableDownload(true);
	};

	useEffect(() => {
		if (data) {
			const downloadUrl = data.url;
			console.log("download-data", downloadUrl);
			// create an anchor element.
			const a = document.createElement("a");
			// set the downloadUrl as the href attribute value.
			a.href = downloadUrl;
			a.target = "_blank";
			a.id = "downloadAnchor";
			// keep display none, so that it would be invisible.
			a.style.display = "none";
			// append the anchor element to body
			document.body.appendChild(a);
			// Trigger the click event to initiate the download
			a.click();
			// Clean up by removing the temporary anchor element
			document.body.removeChild(a);
		}
	}, [data]);

	return (
		<Button
			height={35}
			mode="only-icons"
			imgUrl="/src/stories/assets/PhotoCard/downloadArrow.svg"
			handleClick={handleClickDownload}
		/>
	);
};

export default DownloadButton;
