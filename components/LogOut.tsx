export default function LogOut() {
	//  Logout Handler
	const handleLogout = async () => {
		try {
			const res = await fetch("https://comp4537-project-iot-ai-backend.onrender.com/auth/logout", {
				method: "POST",
				credentials: "include",
			});

			if (res.ok) {
				// Kick them back to the root page or wherever your login screen lives
				window.location.href = "/";
			} else {
				console.error("Logout failed on server.");
			}
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return (
		<div className="flex justify-end">
			<button
				onClick={handleLogout}
				className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-red-600 transition"
			>
				Log Out
			</button>
		</div>
	);
}
