import uuid from 'uuid';
import aws from 'aws-sdk'

const ddb = new aws.DynamoDB.DocumentClient();

export function main(event, context, callback) {
	const req_body = JSON.parse(event.body);

	const table_params = {
		TableName: process.env.tableName,
		Item: {
			userId: event.requestContext.identity.cognitoIdentityId,
			uploadid: uuid.v1()
			creationTime: Date.now()
			imageInfo: {
				imgageDescription: req_body.content,
				attachment: req_body.attachment
			}
		}
	};

	ddb.put(table_params, (error, data) => {
		//set resp headers to enable cors
		const headers = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true
		}

		if (error) {
			const resp = {
				statusCode: 500,
				headers: headers,
				body: JSON.stringify({status:false})
			};
			callback(null, response);
		}
	});
}