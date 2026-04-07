"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhoneAgent from "@/components/PhoneAgent";
import LogOut from "@/components/LogOut";

export default function UserPage() {
	const [data, setData] = useState(null);
	const router = useRouter();

	useEffect(() => {
		fetch("https://comp4537-project-iot-ai-backend.onrender.com/api/user", {
			credentials: "include", // Ensure cookies are sent with the request
		})
			.then((res) => {
				if (res.status === 401) {
					// If the session isn't valid, send them back to login
					window.location.href = "/login";
				}
				return res.json();
			})
			.then((json) => {
				if (json && json.user) {
					setData(json.user);
				}
			})
			.catch((err) => console.error("Fetch error:", err));
	}, []);

	return (
		<div className="relative min-h-screen p-8">
			{/* --- Logout Button Container --- */}
			<div className="fixed top-6 right-6 z-50">
				<LogOut />
			</div>

			{/* --- Main Content --- */}
			<div className="max-w-lg mx-auto">
				<div className="text-2xl font-bold mb-4 text-center">
					{data ? `Welcome to the ${data}` : "Loading..."}
				</div>

				<PhoneAgent />
			</div>
		</div>
	);
}
