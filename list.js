import * as ddbLib from './lib/ddb-lib';
import { success , failure } from './lib/response-objects';

export async function main(event, context) {
	const table_params = {
		TableName: process.env.tableName,
		KeyConditionExpression: "userid = :userid",
		ExpressionAttributeValues: {
			":userid":event.requestContext.identity.cognitoIdentityId
		}
	};
	try {
		const result = await ddbLib.call("query", table_params);
		return success(result.Items);
	}catch (e) {
		return failure({status:false});
	}
}