import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col flex-1 items-center justify-cente font-sans dark:bg-black">
			<main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start">
				<div>
					<h1>Comp4537 - Term Project</h1>
					<h3>AI Phone Agent Demo</h3>
				</div>
			</main>
		</div>
	);
}
