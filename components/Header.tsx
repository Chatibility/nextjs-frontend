import Head from "next/head";

export default function Header() {
	return (
		<Head>
			<title>Chatibility</title>
			<meta name='description' content='Chatibility' />
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1'
			/>
			<link rel='icon' href='/favicon.ico' />
		</Head>
	);
}
