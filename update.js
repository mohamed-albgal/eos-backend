import * as ddbLib from "./lib/ddb-lib";
import { success, failure } from "./lib/response-objects.js";

export async function main(event, context) {
	const req_body = JSON.parse(event.body);
	const table_params = {
		TableName: process.env.tableName,
		Key: {
			userid: event.requestContext.identity.cognitoIdentityId,
			uploadid: event.pathParameters.id,
		},
		UpdateExpression: "SET imageDescription = :imageDescription,  attachment = :attachment",//"tags = :tags"
		ExpressionAttributeValues: {
			":attachment": req_body.attachment || null,
			":imageDescription": req_body.imageDescription || null
			//":tags": req_body.tags || null
		},
		ReturnValues: "ALL_NEW"
	};

	try {
		await ddbLib.call("update", table_params);
		return success({status: true});
	}catch (e) {
		console.log(e);
		return failure({status: false});
	}
}