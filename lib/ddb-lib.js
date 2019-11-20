import AWS from 'aws-sdk';

export function call(action, tableParams) {
	const ddb = new AWS.DynamoDB.DocumentClient();
	return ddb[action](tableParams).promise();
};