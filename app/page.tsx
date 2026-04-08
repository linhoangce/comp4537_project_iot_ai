import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen bg-white dark:bg-black font-sans text-gray-900 dark:text-gray-100">
			<main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center sm:text-left sm:items-start max-w-4xl mx-auto w-full">
				{/* Header Section */}
				<div className="mb-10">
					<h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
						Internet Software Architecture - Term Project
					</h1>
					<h3 className="text-2xl sm:text-3xl font-semibold opacity-80">AI Phone Agent Demo</h3>
				</div>

				{/* Short Description */}
				<div className="mb-12 max-w-2xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
					<p>
						Experience the future of customer service. This platform enables automated,
						context-aware phone interactions using **Llama-3-8B** and **Twilio**. Our AI agents
						handle real-time speech, maintain conversational memory, and provide live
						transcripts—all while enforcing secure API consumption limits.
					</p>
				</div>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
					<Link
						href="/login"
						className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition text-center"
					>
						Login
					</Link>
					<Link
						href="/signup"
						className="px-8 py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg font-bold transition text-center"
					>
						Sign Up
					</Link>
				</div>

				{/* Demo Credentials Box */}
				<div className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl">
					<h4 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-4">
						Demo Credentials
					</h4>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
						{/* User Creds */}
						<div className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
							<p className="font-bold text-gray-400 mb-1">Standard User</p>
							<p>
								Email: <span className="text-blue-400">john@john.com</span>
							</p>
							<p>
								Pass: <span className="text-blue-400">123</span>
							</p>
						</div>

						{/* Admin Creds */}
						<div className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
							<p className="font-bold text-red-400 mb-1">Admin Account</p>
							<p>
								Email: <span className="text-red-400">admin@admin.com</span>
							</p>
							<p>
								Pass: <span className="text-red-400">111</span>
							</p>
						</div>
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="py-8 text-center text-xs text-gray-500 border-t border-gray-100 dark:border-zinc-900">
				Built by Team U7 • BCIT CST 2026
			</footer>
		</div>
	);
}
