import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { Container, Text, Spacer, Button, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import atomOneLight from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light";

export default function Chatbot() {
	const router = useRouter();
	const { chatbotid } = router.query;

	const [loading, setLoading] = useState(true);
	const user = userService.userValue;
	const isLoggedIn = user && user.token;

	useEffect(() => {
		if (!isLoggedIn) {
			router.push("/");
		} else {
			setLoading(false);
		}
	}, [isLoggedIn, router, user]);
	const codeSnippet =
		`<link rel="stylesheet" href="./style.css"> 
 
    <script> 
      window.chatbaseConfig = { 
        chatbotId: "` +
		chatbotid +
		`" 
      }; 
    </script> 
    <script src="./script.js" defer></script>`;

	const codeSnippet2 = `<div id="chatbot-container" data-chb-visible="false" aria-hidden="true"></div>`;

	return (
		<Layout loading={loading}>
			<Container
				className={styles.container}
				alignItems='center'
				style={{ textAlign: "center" }}
			>
				<Text
					style={{
						marginTop: "12px",
						fontWeight: "700",
						fontSize: "42px",
						margin: 0,
					}}
				>
					<span style={{ color: "#F2C94C" }}>Chat</span>
					ibility
				</Text>
				<Spacer y={4} />
				<Text>Add this code to header of your html:</Text>
				<SyntaxHighlighter style={atomOneLight}>
					{codeSnippet}
				</SyntaxHighlighter>
				<Text>Add this code to the body of your html:</Text>
				<SyntaxHighlighter style={atomOneLight}>
					{codeSnippet2}
				</SyntaxHighlighter>
				<Spacer y={2} />
				<Button>
					<Link color='inherit' href='/dashboard'>
						Done, Return to Dashboard
					</Link>
				</Button>
			</Container>
		</Layout>
	);
}
