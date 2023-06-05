import { userService } from "@/services/user.service";

type RequestHeaders = { [key: string]: string };

type RequestBody = Record<string, unknown>;

interface RequestOptions {
	method: string;
	headers: RequestHeaders;
	body?: string;
}

interface FetchWrapper {
	get(url: string, auth_token?: string): Promise<any>;
	post(url: string, body: RequestBody): Promise<any>;
	put(url: string, body: RequestBody): Promise<any>;
	delete(url: string): Promise<any>;
}

export const fetchWrapper: FetchWrapper = {
	get,
	post,
	put,
	delete: _delete,
};

const apiUrl = "https://api.chatibility.com";

function get(url: string, auth_token?: string): Promise<any> {
	url = apiUrl + url;
	const requestOptions: RequestOptions = {
		method: "GET",
		headers: authHeader(url, auth_token),
	};

	return fetch(url, requestOptions).then(handleResponse);
}

function post(url: string, body: RequestBody): Promise<any> {
	url = apiUrl + url;
	const requestOptions: RequestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json", ...authHeader(url) },
		body: JSON.stringify(body),
	};

	return fetch(url, requestOptions).then(handleResponse);
}

function put(url: string, body: RequestBody): Promise<any> {
	url = apiUrl + url;
	const requestOptions: RequestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json", ...authHeader(url) },
		body: JSON.stringify(body),
	};
	return fetch(url, requestOptions).then(handleResponse);
}

function _delete(url: string): Promise<any> {
	url = apiUrl + url;
	const requestOptions: RequestOptions = {
		method: "DELETE",
		headers: authHeader(url),
	};
	return fetch(url, requestOptions).then(handleResponse);
}

function authHeader(url: string, auth_token?: string): RequestHeaders {
	url = apiUrl + url;
	const user = userService.userValue;
	const isLoggedIn = user && user.token;
	if (isLoggedIn || auth_token) {
		return { Authorization: `Token ${user?.token || auth_token}` };
	} else {
		return {};
	}
}

async function handleResponse(response: Response): Promise<any> {
	const text = await response.text();
	let data = text && JSON.parse(text);
	if (!response.ok) {
		if ([401, 403].includes(response.status) && userService.userValue) {
			userService.logout();
		}
	}

	if (!data || typeof data !== "object") {
		data = {};
	}

	data.status = response.status;
	return data;
}
