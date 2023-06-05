import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";

import {
	Button,
	Container,
	Row,
	Text,
	Input,
	FormElement,
	Spacer,
	Loading,
} from "@nextui-org/react";

import { useEffect, useState } from "react";

import { ChangeEvent } from "react";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { useRouter } from "next/router";
import { userService } from "@/services/user.service";

export default function Add() {
	const [website, setWebiste] = useState("");
	const [disable, setDisable] = useState(true);
	const router = useRouter();
	const [loadingbutton, setButtonLoading] = useState(false);

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

	const handleWebsite = (e: ChangeEvent<FormElement>) => {
		setWebiste(e.currentTarget.value);
		if (e.currentTarget.value) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};
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
				<Text h2 style={{ fontWeight: "400" }}>
					First, what is your website’s URL?
				</Text>
				<Text style={{ fontWeight: "300" }}>
					We’ll generate a script that you can add to your website.{" "}
					<b>It will take less than a minute!</b>
				</Text>
				<Spacer y={2} />
				<form
					style={{ marginLeft: "auto", marginRight: "auto" }}
					onSubmit={(e) => {
						e.preventDefault();
						setDisable(true);
						setButtonLoading(true);
						fetchWrapper
							.post("/extract-url/", { xml_map: website })
							.then((response) => {
								console.log(response);
								const url = new URL(website);
								const domain = url.hostname;

								fetchWrapper
									.post("/chatbots/", {
										data: { website_urls: response },
										name: domain,
									})
									.then((response) => {
										console.log(response);
										router.push(
											"/dashboard/chatbot/" +
												response.uuid
										);
									});
							});
					}}
				>
					<Row
						className={styles.row}
						style={{ textAlign: "start", height: "auto" }}
						align='center'
					>
						<Input
							className={styles.input}
							size='xl'
							placeholder='Your Website Site map (Example: example.com/site_map.xml)'
							id='website'
							name='website'
							type='text'
							onChange={handleWebsite}
						/>
						<Spacer x={2} />
						<Button
							size='xl'
							type='submit'
							disabled={disable}
							style={{ marginTop: "auto", marginBottom: "auto" }}
						>
							{loadingbutton ? (
								<Loading
									type='spinner'
									color='currentColor'
									size='sm'
								/>
							) : (
								"Generate Script"
							)}
						</Button>
					</Row>
				</form>
			</Container>
		</Layout>
	);
}
