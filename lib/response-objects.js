export function success(body) {
	return responseBuilder(200, body);
}


export function failure(body) {
	return responseBuilder(500, body);
}

function responseBuilder(status, body) {
	return {
		statusCode: status,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true
		},
		body:JSON.stringify(body)
	};
}