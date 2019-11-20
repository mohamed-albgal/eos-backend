import * as ddbLib from './lib/ddb-lib.js';
import { success, failure } from './lib/response-objects';

export async function main(event, context) {
	const table_params = {
		TableName: process.env.tableName,
		Key: {
			userid: event.requestContext.identity.cognitoIdentityId,
			uploadid: event.pathParameters.id
		}
	};

	try {
		ddbLib.call("delete", table_params);
		return success({status: true });
	}catch (e){
		console.log(e);
		return failure({status: false});
	}
}