"use client";

import { useEffect, useState } from "react";

export default function UserPage() {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch("https://comp4537-exexd9bdh3d6f7d9.canadacentral-01.azurewebsites.net/api/user", {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((json) => setData(json.user));
	}, []);

	return <div>{data ? data : "Loading..."}</div>;
}
