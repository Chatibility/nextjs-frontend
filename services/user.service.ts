import { BehaviorSubject } from "rxjs";
import Router from "next/router";

import { fetchWrapper } from "@/lib/fetchWrapper";

const userSubject = new BehaviorSubject<User | null>(
	process.browser && JSON.parse(localStorage.getItem("user")!)
);

export const userService = {
	user: userSubject.asObservable(),
	get userValue() {
		return userSubject.value;
	},
	login,
	logout,
};

interface User {
	detail: string;
	token: string;
}

async function login(username: string, password: string): Promise<User> {
	return await fetchWrapper
		.post(`/accounts/login/`, {
			login: username,
			password,
		})
		.then((user: User) => {
			userSubject.next(user);
			localStorage.setItem("user", JSON.stringify(user));

			return user;
		});
}

function logout(): void {
	localStorage.removeItem("user");
	userSubject.next(null);
	Router.push("/");
}
