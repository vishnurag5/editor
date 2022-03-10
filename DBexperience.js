const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

exports.db_experience = function (user_id, experience_title, callback) {
    /** SELECT PART */
    //var uid = "jhzmt8bnzhi0b1";
    console.log("USER ID HERE !");
    console.log("user_id", user_id);
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
            "updated_ts": timestamp

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


exports.DB_renameexperience = function (experience_id, experience_title, callback) {
    /** UPDATE PART */
    var table = "3d_experience_info";

    var params = {
        TableName: table,
        Key: {
            "experience_id": experience_id
        },
        UpdateExpression: "set experience_title = :ed",
        ExpressionAttributeValues: {

            ":ed": experience_title
        },
        ReturnValues: "UPDATED_NEW"
    };

    docClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to update experience table Error JSON:", JSON.stringify(err, null, 2));
            callback(err, data)
        } else {
            console.log("Successfully updated 3dExperience info table", JSON.stringify(data, null, 2));
            callback(err, data);
        }
    });


}

exports.DB_deleteexperience = function (experience_id, callback) {
    /** UPDATE PART */
    var dtable = "3d_experience_info";

    var params = {
        TableName: dtable,
        Key: {
            "experience_id": experience_id
        }
    }

    docClient.delete(params, function (err, data) {
        if (err) {
            console.error("Unable to delete experience id Error JSON:", JSON.stringify(err, null, 2));
            callback(err, data)
        } else {
            console.log("Successfully deleted experience id", JSON.stringify(data, null, 2));
            callback(err, data);
        }
    });


}

exports.DB_copyexperience = function (experience_id, callback) {
    /** SELECT PART */
    var table = "3d_experience_info";
    //var uid = "jhzmt8bnzhi0b1";

    var read_params =
    {
        TableName: table,
        IndexName: "experience_id-index",
        KeyConditionExpression: "experience_id = :sid",
        ExpressionAttributeValues: {
            ":sid": experience_id,

        }
    }


    docClient.query(read_params, function (get_err, get_data) {

        if (get_err) {
            console.error("Unable to get experience details Error JSON:", JSON.stringify(get_err, null, 2));
            console.log("loki");
            callback(get_err, get_data);
        } else {
            console.log("got experience details", JSON.stringify(get_data, null, 2));
            console.log(get_data.Items.length);
            console.log("USER ID", get_data.Items[0].user_id);

            var insert_table = "3d_experience_info";

            // var user_id = "jhzmt8bnzhi0b1";  // It should be dynamic

            var random_seed = new Date().getUTCMilliseconds();
            var experience_id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);

            const today = new Date();
            var timestamp = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();



            var insert_params = {
                TableName: insert_table,
                Item: {
                    "experience_id": experience_id,
                    "experience_data": get_data.Items[0].experience_data,
                    "experience_title": get_data.Items[0].experience_title,
                    "user_id": get_data.Items[0].user_id,
                    "created_ts": timestamp,
                    "updated_ts": timestamp

                }
            }

            console.log("Adding a new item!");
            docClient.put(insert_params, function (in_err, in_data) {
                if (in_err) {
                    console.error("Unable to add folder item in session_ids. Error JSON:", JSON.stringify(in_err, null, 2));
                    callback(in_err, in_data);
                } else {
                    console.log("Added item:", JSON.stringify(in_data));
                    console.log("200");
                    callback(in_err, in_data);
                    /** 200 */
                }
            });
            // callback(get_err, get_data.Items);
        }

    });
    /** END SELECT PART */


}


