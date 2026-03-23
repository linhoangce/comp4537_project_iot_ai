import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// SKIP middleware for internal Next.js files and static assets
	// EXCLUDE login, signup, and assets
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		pathname.startsWith("/auth") || // ✅ ADD THIS
		pathname.includes(".") ||
		pathname === "/login" ||
		pathname === "/signup"
	) {
		return NextResponse.next();
	}

	const cookie = request.headers.get("cookie") || "";

	try {
		// 2. Add a timeout to the fetch so it doesn't hang the transition
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), 2000);

		const response = await fetch(
			"https://comp4537-exexd9bdh3d6f7d9.canadacentral-01.azurewebsites.net/auth/me",
			{
				headers: { cookie },
				signal: controller.signal,
			},
		);

		clearTimeout(id);
		const data = await response.json();

		// 3. Logic for Redirects
		if (!data.authenticated && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		if (pathname.startsWith("/admin") && data.userType !== "admin") {
			return NextResponse.redirect(new URL("/user", request.url));
		}
	} catch (error) {
		// If backend is down or timeout, don't trap the user in a loop
		// unless they are trying to hit a sensitive route
		if (pathname.startsWith("/admin") || pathname.startsWith("/user")) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	return NextResponse.next();
}
