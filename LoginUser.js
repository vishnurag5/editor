const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

exports.User_Login = function (user_email, user_password, callback) {

    var table = "3d_user_info";

    var params = {
        TableName: table,
        IndexName: "user_email-index",
        KeyConditionExpression: "user_email = :uemail",
        ExpressionAttributeValues: {
            ":uemail": user_email
        }
    }

    docClient.query(params, function (get_err, get_data) {
        if (get_err) {
            console.error("Unable to read 3d_user_info item. Error JSON:", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("GetItem of 3d_user_info succeeded:", JSON.stringify(get_data, null, 2));

            if (get_data.Items.length == 0) {
                console.log("User not registered!");
                callback(get_err, 500);
            } else {
                if (user_password == get_data.Items[0].user_password)
                {
                    callback(get_err, get_data.Items[0].user_id);
                }
                else if (user_password != JSON.stringify(get_data.Items[0].user_password))
                {
                    console.log("Invalid Password!");
                    console.log("user_password in Invalid part", user_password);
                    console.log("get_data.Items.user_password", get_data.Items[0].user_password);
                    // console.log("get_data.Item.user_password", get_data.Item.user_password);
                    callback(get_err, 501);
                }
            }
        }
    });
}