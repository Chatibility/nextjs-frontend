import Header from "./Header";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({
	weight: "400",
	subsets: ["latin"],
});

export default function Layout({
	children,
	loading = false,
	bgColor,
}: {
	children: ReactNode;
	loading?: boolean;
	bgColor?: string;
}) {
	return (
		<>
			<Header />
			<style jsx global>{`
				:root {
					--nextui-fonts-sans: ${poppins.style.fontFamily};
				}
			`}</style>
			{loading ? (
				<></>
			) : (
				<main
					style={{ 
						backgroundColor: bgColor,
						display: 'flex',
						flexDirection: 'column',
					}}
					className={poppins.className}
				>
                    {children}
				</main>
			)}
		</>
	);
}
