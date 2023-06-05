import Layout from "@/components/Layout";
import { Container, Col, Spacer, Button, Link } from "@nextui-org/react";

import styles from "@/styles/Home.module.css";
import TableDiv from "@/containers/Table/Table";
import { userService } from "@/services/user.service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchWrapper } from "@/lib/fetchWrapper";

export default function Dashbaord() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();
	const user = userService.userValue;
	const isLoggedIn = user && user.token;
	const router = useRouter();

	useEffect(() => {
		if (isLoggedIn) {
			if (!data) {
				fetchWrapper.get("/chatbots/").then((respond) => {
					console.log(respond);
					setData(respond);
					setLoading(false);
				});
			}
		} else {
			router.push("/");
		}
	}, [isLoggedIn, data, router, user]);
	return (
		<Layout loading={loading}>
			<Container
				alignContent='center'
				style={{ padding: "8px 8px 8px 24px" }}
				className={styles.container}
			>
				<Spacer y={3} />
				<Button
					style={{
						maxWidth: "600px",
						marginRight: "auto",
						marginLeft: "auto",
					}}
				>
					<Link href='/dashboard/add'>Add New Chatbot</Link>
				</Button>
				<Spacer y={2} />
				<Col
					style={{
						alignItems: "center",
					}}
				>
					<Spacer y={2} />
					{data ? <TableDiv users={data} /> : <></>}

					<Spacer y={4} />
				</Col>
			</Container>
		</Layout>
	);
}
