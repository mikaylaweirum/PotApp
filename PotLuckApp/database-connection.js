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
RoleArn: "arn:aws:dynamodb:us-west-2:726359160323:table/potluckdb"
});


var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

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
            //document.getElementById('textarea').innerHTML = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
			/*var s = JSON.stringify(data, undefined, 2);
			var j = JSON.parse(s);
			var theKey = 'Latitude';
			retrievedLatitude = data.Longitude;
			retrievedLongitude = data.Latitude;*/
			jsonString = JSON.stringify(data, undefined, 2);
			
			jsonArray[index - 2] = jsonString;
			//console.log(jsonArray[index - 2]);
			//myMap();
			//console.log(jsonString);
        }
    });
	
}

function queryItemCount() {
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
	
	var key = { "id": 1 };
	params.Key = key;
	
	var countString;
	
    docClient.get(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
			console.log(data.id);
            //document.getElementById('textarea').innerHTML = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
			/*var s = JSON.stringify(data, undefined, 2);
			var j = JSON.parse(s);
			var theKey = 'Latitude';
			retrievedLatitude = data.Longitude;
			retrievedLongitude = data.Latitude;*/
			tableLengthString = JSON.stringify(data, undefined, 2);

			//myMap();
			//console.log(jsonString);
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
