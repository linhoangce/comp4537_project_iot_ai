"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch("https://comp4537-project-iot-ai-backend.onrender.com/api/admin", {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((json) => setData(json.admin));
	}, []);

	return <div>{data ? data : "Loading..."}</div>;
}
