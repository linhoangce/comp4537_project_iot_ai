"use client";

import { useState } from "react";

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
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const fetchTranscript = async () => {
		if (!callSid) return;
		const res = await fetch(
			`https://comp4537-project-iot-ai-backend.onrender.com/api/transcript/${callSid}`,
			{
				credentials: "include",
			},
		);
		const data = await res.json();
		setTranscript(data.transcript || []);
	};

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

			{callSid && (
				<button
					onClick={fetchTranscript}
					className="text-blue-500 underline text-sm mt-2"
				>
					Refresh Transcript
				</button>
			)}

			<div className="mt-4 bg-gray-900 text-white p-4 rounded min-h-[100px]">
				<h2 className="text-sm text-gray-400 mb-2">Live Transcript:</h2>
				{transcript.map((msg, index) => (
					<p
						key={index}
						className={`text-sm ${msg.role === "user" ? "text-green-400" : "text-white"}`}
					>
						<strong>{msg.role}:</strong> {msg.content}
					</p>
				))}
				{transcript.length === 0 && (
					<p className="text-gray-500 text-sm">
						Transcript will appear here after or during the call...
					</p>
				)}
			</div>
		</div>
	);
}
