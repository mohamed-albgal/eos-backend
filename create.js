import uuid from 'uuid';
import * as ddbLib from './lib/ddb-lib';
import {success, failure} from './lib/response-objects';

//const ddb = new aws.DynamoDB.DocumentClient();

export async function main(event, context, callback) {
	const req_body = JSON.parse(event.body);
	const tableParams = {
		TableName: process.env.tableName,
		Item: {
			userid: event.requestContext.identity.cognitoIdentityId,
			uploadid: uuid.v1(),
			creationTime: Date.now(),
			imageDescription: req_body.content,
			attachment: req_body.attachment
		}
	};

	try {
		await ddbLib.call("put", tableParams);
		return success(tableParams.Item);
	}catch (e){
		console.log(e);
		return failure({status:false});
	}

	// ddb.put(table_params, (error, data) => {
	// 	//set resp headers to enable cors
	// 	const headers = {
	// 		"Access-Control-Allow-Origin": "*",
	// 		"Access-Control-Allow-Credentials": true
	// 	};

	// 	if (error) {
	// 		console.log(error);
	// 		const resp = {
	// 			statusCode: 500,
	// 			headers: headers,
	// 			body: JSON.stringify({status:false})
	// 		};
	// 		callback(null, resp);
	// 		return;
	// 	}

	// 	const resp = {
	// 		statusCode: 200,
	// 		headers: headers,
	// 		body: JSON.stringify(table_params.Item)
	// 	};
	// 	callback(null, resp);
	// });
}