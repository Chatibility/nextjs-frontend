import { Table, Row, Col, Tooltip, Link, Text } from "@nextui-org/react";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { useRouter } from "next/router";
type Inputs = {
	users: any;
};
const TableDiv = ({ users }: Inputs) => {
	const columns = [
		{ name: "NAME", uid: "name" },
		{ name: "ACTIONS", uid: "actions" },
	];

	const router = useRouter();
	const renderCell = (user: any, columnKey: any) => {
		const cellValue = user[columnKey];
		switch (columnKey) {
			case "name":
				return <Text>{user.name}</Text>;
			case "actions":
				return (
					<Row justify='center' align='center'>
						<Col css={{ d: "flex" }}>
							<Tooltip content='View Script'>
								<IconButton
									onClick={() =>
										router.push(
											"/dashboard/chatbot/" + user.uuid
										)
									}
								>
									<EyeIcon size={20} fill='#979797' />
								</IconButton>
							</Tooltip>
						</Col>
					</Row>
				);
			default:
				return cellValue;
		}
	};
	return (
		<Table
			aria-label='Table with list of chatbots'
			css={{
				height: "auto",
				minWidth: "100%",
				background: "#fff",
				zIndex: "0",
			}}
			selectionMode='none'
		>
			<Table.Header columns={columns}>
				{(column) => (
					<Table.Column key={column.uid}>{column.name}</Table.Column>
				)}
			</Table.Header>
			<Table.Body items={users}>
				{(item) => (
					<Table.Row key={item.uuid}>
						{(columnKey) => (
							<Table.Cell>
								{renderCell(item, columnKey)}
							</Table.Cell>
						)}
					</Table.Row>
				)}
			</Table.Body>
		</Table>
	);
};

export default TableDiv;
