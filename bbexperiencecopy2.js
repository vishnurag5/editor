const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

exports.db_experience = function (user_id,experience_title, callback) {
    /** SELECT PART */
    //var uid = "jhzmt8bnzhi0b1";
    console.log("USER ID HERE !");
    console.log("user_id",user_id);
    console.log("experience_title", experience_title);

    var random_seed = new Date().getUTCMilliseconds();
    var experience_id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);

    var insert_table = "3d_experience_info";

    const today = new Date();
    var timestamp = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var insert_params = {
        TableName: insert_table,
        Item: {
            "experience_id": experience_id,
            "experience_title": experience_title,
            "user_id": user_id,
            "created_ts": timestamp,
            "updated_ts" : timestamp

        }
    }

    console.log("Adding a new item!");
    docClient.put(insert_params, function (in_err, in_data) {
        if (in_err) {
            console.error("Unable to add item in session_ids. Error JSON:", JSON.stringify(in_err, null, 2));
            callback(in_err, in_data);
        } else {
            console.log("Added item:", JSON.stringify(in_data));
            console.log("200");
            callback(in_err, in_data);
            /** 200 */
        }
    });
}