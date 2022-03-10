const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

exports.User_Signup = function (user_email, user_password, user_profile, user_name, user_phone, callback) {
    /** SELECT PART */
    var table = "3d_user_info";

    /* == USER ID == */
    var random_seed = new Date().getUTCMilliseconds();
    var user_id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);

    // var params = {
    // 	TableName: table,
    // 	Key: {
    // 		"user_email": user_email
    // 	}
    // };
    var params = {

        TableName: table,
        IndexName: "user_email-index",
        KeyConditionExpression: "user_email = :user_email",
        ExpressionAttributeValues: {
            ":user_email": user_email
        }
    }

    docClient.query(params, function (get_err, get_data) {
        if (get_err) {
            console.error("Unable to read user_info item. Error JSON:", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("GetItem of user_info succeeded:", JSON.stringify(get_data, null, 2));

            if (get_data.Items.length == 0) {
                console.log("NO DATA");

                /* INSERT PART */
                var insert_table = "3d_user_info";

                /* == TIMESTAMP == */
                const today = new Date();
                var timestamp = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                var params = {
                    TableName: insert_table,
                    Item: {
                        "user_id": user_id,
                        "user_email": user_email,
                        "user_password": user_password,
                        "user_phone": user_phone,
                        "created_ts": timestamp,
                        "user_profile_pic": user_profile,
                        "user_name": user_name
                    }
                };

                console.log("Adding a new item!");
                docClient.put(params, function (in_err, in_data) {
                    if (in_err) {
                        console.error("Unable to add item in user_info. Error JSON:", JSON.stringify(in_err, null, 2));
                        callback(in_err, in_data);
                    } else {
                        console.log("Added item:", JSON.stringify(in_data));
                        console.log("200");
                        callback(in_err, 200);
                        /** 200 */
                    }
                });
                /* END INSERT PART */
            }
            else {
                console.log("YES");
                console.log("501");
                callback(get_err, 501);
                /* SEND ALREADY EXISTS */
            }
        }
    });
    /** END SELECT PART */
}