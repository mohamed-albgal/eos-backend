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
			imageDescription: req_body.imageDescription,
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