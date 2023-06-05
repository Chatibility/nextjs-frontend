import { useState, useEffect } from "react";

function GetSessionStorage(key: string): string {
	const [value, setValue] = useState("");

	useEffect(() => {
		setValue(sessionStorage.getItem(key) ?? "");
	}, [key]);

	return value;
}

function setSessionStorage(key: string, value: string): void {
	if (typeof window !== "undefined") {
		sessionStorage.setItem(key, value);
	}
}

function removeSessionStorage(key: string): void {
	sessionStorage.removeItem(key);
}

export { GetSessionStorage, setSessionStorage, removeSessionStorage };
