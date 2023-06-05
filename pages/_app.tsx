import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { createTheme, NextUIProvider } from "@nextui-org/react";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";

import html from "react-syntax-highlighter/dist/cjs/languages/hljs/htmlbars";
SyntaxHighlighter.registerLanguage("html", html);


const theme = createTheme({
	type: "light",
	theme: {
		colors: {
			primary: "#EE4C6E",
			gradient: "#FB4138",
			link: "#5E1DAD",
			backgroundColor: "#fecbca",
			secondary: "#43395E",
		},
		space: {},
		fonts: {},
	},
});

export default function App({ Component, pageProps, router }: AppProps) {
	return (
		<NextUIProvider theme={theme}>
			<Component {...pageProps} />
		</NextUIProvider>
	);
}
