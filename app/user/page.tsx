"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhoneAgent from "@/components/PhoneAgent";

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
	<div>
		<div className="text-2xl font-bold mb-4">
			 {data ? `Welcome to the ${data} Dashboarddata` : "Loading..."}
			</div>
			<PhoneAgent />
		
		</div>);
}