"use client";

import LogOut from "@/components/LogOut";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
	const [usage, setUsage] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);

	useEffect(() => {
		fetch("https://comp4537-project-iot-ai-backend.onrender.com/admin/usage", {
			credentials: "include",
		})
			.then((res) => {
				if (res.status === 401 || res.status === 403) {
					window.location.href = "/login";
					return;
				}
				return res.json();
			})
			.then((data) => {
				setUsage(Array.isArray(data) ? data : []);
				setLoading(false);
			})
			.catch(() => setLoading(false))
			.finally(() => setIsCheckingAuth(false));
	}, []);

	if (isCheckingAuth) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-gray-500 animate-pulse">Authenticating...</p>
			</div>
		);
	}

	if (loading) {
		return <div className="p-8">Loading stats...</div>;
	}

	return (
		<div className="relative min-h-screen p-8">
			{/* --- Logout Button Container --- */}
			<div className="fixed top-6 right-6 z-50">
				<LogOut />
			</div>
			<h1 className="text-3xl font-bold mb-6">Admin Usage Monitor</h1>

			<div className="overflow-x-auto bg-white shadow rounded-lg text-black">
				<table className="min-w-full table-auto">
					<thead className="bg-gray-100 border-b">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								User
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Email
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Total Calls
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Last Active
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{usage.map((user) => (
							<tr key={user.id}>
								<td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
								<td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
								<td className="px-6 py-4 whitespace-nowrap font-bold">{user.total_calls || 0}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{user.last_call_date
										? new Date(user.last_call_date).toLocaleDateString()
										: "Never"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
