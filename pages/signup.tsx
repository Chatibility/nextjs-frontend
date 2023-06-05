import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";

import {
	Button,
	Container,
	Row,
	Col,
	Text,
	Input,
	FormElement,
	Spacer,
	Link,
} from "@nextui-org/react";

import robotImage from "@/public/robot.png";

import { useEffect, useState } from "react";

import { ChangeEvent } from "react";
import { userService } from "@/services/user.service";
import { useRouter } from "next/router";
import { fetchWrapper } from "@/lib/fetchWrapper";

export default function SignUp() {
	const [loading, setLoading] = useState(true);
	const user = userService.userValue;
	const isLoggedIn = user && user.token;
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn) {
			setLoading(false);
		} else {
			router.push("/");
		}
	}, [isLoggedIn, router, user]);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password_confirm, setConfirmPassword] = useState("");

	const [disable, setDisable] = useState(true);

	const handleUsername = (e: ChangeEvent<FormElement>) => {
		setUsername(e.currentTarget.value);
		if (e.currentTarget.value && password) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};
	const handlePassword = (e: ChangeEvent<FormElement>) => {
		setPassword(e.currentTarget.value);
		if (e.currentTarget.value && username) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};
	const handleConfirmPassword = (e: ChangeEvent<FormElement>) => {
		setConfirmPassword(e.currentTarget.value);
		if (e.currentTarget.value && username) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};

	return (
		<Layout loading={loading}>
			<Container className={styles.container} alignItems='center'>
				<Row className={styles.row} align='center' gap={2}>
					<Col className={styles.col}>
						<Text
							style={{
								fontWeight: "700",
								fontSize: "80px",
								margin: 0,
							}}
						>
							<span style={{ color: "#F2C94C" }}>Chat</span>
							ibility
						</Text>
						<Image
							alt='Robot image'
							src={robotImage}
							style={{
								objectFit: "cover",
								height: "300px",
								width: "auto",
							}}
						/>
						<Text
							style={{
								fontWeight: "200",
								fontSize: "22px",
								lineHeight: "34px",
								textAlign: "center",
							}}
						>
							The worlds first most accessible chatbot which uses
							ChatGPT and will take your website to the next level
						</Text>
					</Col>
					<Col className={styles.col_start}>
						<Text
							style={{
								marginTop: "24px",
								fontWeight: "400",
								fontSize: "48px",
								lineHeight: "58px",
								textAlign: "left",
							}}
						>
							Log in
						</Text>
						<Spacer y={1} />
						<form
							style={{ width: "100%" }}
							onSubmit={(e) => {
								e.preventDefault();
								fetchWrapper
									.post(`/accounts/register/`, {
										username,
										password,
										password_confirm,
									})
									.then((respond) => {
										console.log(respond);
										router.push("/");
									});
							}}
						>
							<Col className={styles.col_start}>
								<Input
									className={styles.input}
									label='Username'
									size='xl'
									id='username'
									name='username'
									type='text'
									onChange={handleUsername}
								/>
								<Spacer y={1} />
								<Input
									className={styles.input}
									label='Password'
									size='xl'
									id='email'
									name='email'
									type='password'
									onChange={handlePassword}
								/>
								<Spacer y={1} />
								<Input
									className={styles.input}
									label='Confirm Password'
									size='xl'
									id='confirm-password'
									name='confirm-password'
									type='password'
									onChange={handleConfirmPassword}
								/>
								<Spacer y={1.5} />

								<Button
									size='xl'
									type='submit'
									disabled={disable}
								>
									Sign Up
								</Button>
								<Spacer y={1} />
								<Link
									style={{
										color: "#000000",
										textDecoration: "underline",
										fontSize: "18px",
									}}
									href='/'
								>
									Or Log in Here
								</Link>
							</Col>
						</form>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}
