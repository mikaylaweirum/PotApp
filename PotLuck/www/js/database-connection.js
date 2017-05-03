var DBresults, jsonString, tableLengthString;
var loaded = false;

var jsonArray = [];
AWS.config.update({
  region: "us-west-2",
  // The endpoint should point to the local or remote computer where DynamoDB (downloadable) is running.
  //endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
  /*
    accessKeyId and secretAccessKey defaults can be used while using the downloadable version of DynamoDB. 
    For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  */
});

  /* 
     Uncomment the following code to configure Amazon Cognito and make sure to 
     remove the endpoint, accessKeyId and secretAccessKey specified in the code above. 
     Make sure Cognito is available in the DynamoDB web service region (specified above).
     Finally, modify the IdentityPoolId and the RoleArn with your own.
  */

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: "us-west-2:8b965424-ffce-4354-b7f6-eefa9ca14804",
RoleArn: "arn:aws:iam::726359160323:role/Cognito_potluckpoolUnauth_Role"
});



var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

readItem(1);

function readItem(index) {
    var table = "potluckdb";
	var id;
	var food;
	var drinks;
	var misc;
	
    var params = {
        TableName: table,
        Key:{
            "id": id,
			"food": food,
			"drinks": drinks,
			"misc": misc
        }
    };
	
	var key = { "id": index };
	params.Key = key;
	
	
    docClient.get(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
        }
    });
	
}

function GetDBString() {
	return jsonString;
}

function GetDBStringArray() {
	return jsonArray;
}

function GetTableLength() {
	return tableLengthString;
}
