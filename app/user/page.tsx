"use client";

import { useEffect, useState } from "react";

export default function UserPage() {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(
			"https://term-project-com4537-h5g7d6adgeeffbft.canadacentral-01.azurewebsites.net/api/user",
			{
				credentials: "include",
			},
		)
			.then((res) => res.json())
			.then((json) => setData(json.user));
	}, []);

	return <div>{data ? data : "Loading..."}</div>;
}
