const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

exports.DB_Session = function (user_id, callback) {
    /** SELECT PART */
    var table = "3d_session_ids"; 

    //var uid = "jhzmt8bnzhi0b1";

    console.log(user_id);

    var random_seed = new Date().getUTCMilliseconds();
    var session_id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);
    console.log("SESSION CREATED : ", session_id);

    var read_params =
    {
        TableName: table,
        IndexName: "user_id-index",
        KeyConditionExpression: "user_id = :uid",
        ExpressionAttributeValues: {
            ":uid": user_id
        }

        // "TableName": "session_ids",
        // "IndexName": "user_id-index",
        // "KeyConditionExpression": "user_id = :uid",
        // "ExpressionAttributeValues": {
        //     ":uid": user_id
        // }
    }

    docClient.query(read_params, function (get_err, get_data) {
        if (get_err) {
            console.error("Unable to read session_ids item. Error JSON:", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("GetItem of session_ids succeeded:", JSON.stringify(get_data, null, 2));
            if (get_data.Items.length == 0) {

                // Insert session id and user id

                var insert_table = "3d_session_ids";

                const today = new Date();
                var timestamp = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                var insert_params = {
                    TableName: insert_table,
                    Item: {
                        "ID": session_id,
                        "session_id": session_id,
                        "user_id": user_id,
                        "created_ts": timestamp
                    }
                }

                console.log("Adding a new item!");
                docClient.put(insert_params, function (in_err, in_data) {
                    if (in_err) {
                        console.error("Unable to add item in session_ids. Error JSON:", JSON.stringify(in_err, null, 2));
                        callback(1, in_data);
                    } else {
                        console.log("Added item:", JSON.stringify(in_data));
                        console.log("200");
                        callback(0, session_id);
                        /** 200 */
                    }
                });

            } else {
                if (get_data.Items.length == 1) {

                    var table = "3d_session_ids";
                    var ID = get_data.Items[0].ID;

                    var params = {
                        TableName: table,
                        Key: {
                            "ID": ID
                        },
                        UpdateExpression: "set session_id = :sd",
                        ExpressionAttributeValues: {

                            ":sd": session_id
                        },
                        ReturnValues: "UPDATED_NEW"
                    };

                    docClient.update(params, function (err, data) {
                        if (err) {
                            console.error("Unable to update Session ID. Error JSON:", JSON.stringify(err, null, 2));
                            callback(1, 0)
                        } else {
                            console.log("Successfully updated Session ID:", JSON.stringify(data, null, 2));
                            callback(0, session_id);
                        }
                    });
                } else {
                    console.log("Multiple sessions exists with the same session Id!");
                    callback(2, 0); // redirect to login page
                }
            }
        }
    });
    /** END SELECT PART */

}
exports.DB_CheckSession = function (s_id, callback) {
    /** SELECT PART */
    var table = "3d_session_ids";
    //var uid = "jhzmt8bnzhi0b1";

    console.log(s_id);

    var read_params =
    {
        TableName: table,
        IndexName: "session_id-index",
        KeyConditionExpression: "session_id = :sid",
        ExpressionAttributeValues: {
            ":sid": s_id
        }
    }


    docClient.query(read_params, function (get_err, get_data) {

        if (get_err) {
            console.error("Unable to read session_ids item. Error JSON:", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("GetItem of session_ids succeeded:", JSON.stringify(get_data, null, 2));
            if (get_data.Items.length == 1) {
                console.log("Valid Session ID:", JSON.stringify(get_data));
                callback(0, get_data.Items[0].user_id);
                /** 200 */
            } else {
                console.log("Invalid Session ID")
                callback(1, 0);
            }
        }

    });
    /** END SELECT PART */


}
