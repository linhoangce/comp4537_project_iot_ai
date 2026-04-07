"use client";

import { useState, useEffect } from "react";

export default function PhoneAgent() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [callSid, setCallSid] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [transcript, setTranscript] = useState<any[]>([]);

	const handleCall = async () => {
		setLoading(true);

		try {
			const res = await fetch(
				"https://comp4537-project-iot-ai-backend.onrender.com/api/make-call",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({ phoneNumber }),
				},
			);

			const data = await res.json();
			if (data.callSid) setCallSid(data.callSid);
		} catch (error) {
			console.error("Call failed:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchTranscript = async () => {
		if (!callSid) return;
		try {
			const res = await fetch(
				`https://comp4537-project-iot-ai-backend.onrender.com/api/transcript/${callSid}`,
				{
					credentials: "include",
				},
			);
			const data = await res.json();

			const displayableHistory = data.history?.filter((msg: any) => msg.role !== "system") || [];

			setTranscript(displayableHistory);
		} catch (error) {
			console.error("Failed to fetch transcript:", error);
		}
	};

	useEffect(() => {
		if (!callSid) return;

		fetchTranscript();

		const intervalId = setInterval(() => {
			fetchTranscript();
		}, 3000);

		return () => clearInterval(intervalId);
	}, [callSid]);

	return (
		<div className="p-8 max-w-lg mx-auto flex flex-col gap-4">
			<h1 className="text-2xl font-bold">AI Phone Agent Demo</h1>

			<input
				type="tel"
				placeholder="+1234567890"
				className="border p-2 rounded text-black"
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
			/>

			<button
				onClick={handleCall}
				disabled={loading}
				className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
			>
				{loading ? "Calling..." : "Call My Phone"}
			</button>

			<div className="mt-4 bg-gray-900 text-white p-4 rounded min-h-[100px]">
				<div className="flex justify-between items-center mb-2">
					<h2 className="text-sm text-gray-400">Live Transcript:</h2>
					{callSid && (
						<span className="text-xs text-green-400 animate-pulse">● Polling active</span>
					)}
				</div>

				{transcript.map((msg, index) => (
					<p
						key={index}
						className={`text-sm mb-2 ${msg.role === "user" ? "text-green-400" : "text-white"}`}
					>
						<strong className="capitalize">{msg.role}:</strong> {msg.content}
					</p>
				))}

				{transcript.length === 0 && (
					<p className="text-gray-500 text-sm">Transcript will appear here in real-time...</p>
				)}
			</div>
		</div>
	);
}
