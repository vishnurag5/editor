const { MachineLearning } = require("aws-sdk");
const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

exports.DB_directory_data = function (user_id, callback) {
    /** SELECT PART */
    var table = "3d_folder_info";
    //var uid = "jhzmt8bnzhi0b1";

    var read_params =
    {
        TableName: table,
        IndexName: "user_id-index",
        KeyConditionExpression: "user_id = :sid",
        FilterExpression: "asset_format = :af",
        ExpressionAttributeValues: {
            ":sid": user_id,
            ":af": "main",
        
        }
    }


    docClient.query(read_params, function (get_err, get_data) {

        if (get_err) {
            console.error("Unable to read folder item. Error JSON:", JSON.stringify(get_err, null, 2));
            console.log("loki");
            callback(get_err, get_data);
        } else {
            console.log("GetItem of folders succeeded:", JSON.stringify(get_data, null, 2));
            console.log(get_data.Items.length);
            callback(get_err, get_data.Items);
        }

    });
    /** END SELECT PART */


}


exports.db_directory = function (user_id,asset_name, callback) {
    /** SELECT PART */
    var insert_table = "3d_folder_info";

    // var user_id = "jhzmt8bnzhi0b1";  // It should be dynamic

    var random_seed = new Date().getUTCMilliseconds();
    var folder_id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);

    var random_seed = new Date().getUTCMilliseconds();
    var id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);

    const today = new Date();
    var timestamp = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var insert_params = {
        TableName: insert_table,
        Item: {
            "id": id,
            "folder_id": folder_id,
            "asset_name": asset_name,
            "asset_format": "main",
            "asset_extension": "N.A.",
            "asset_id": "N.A.",
            "asset_type": "folder",
            "user_id": user_id,
            "created_ts": timestamp,
            "updated_ts" : timestamp

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


}

///////////////////////////////////////////////////rename directory//////////////////////////////////////////////////////

exports.DB_queryrenamefolder = function (id, asset_name, callback) {
    /** SELECT PART */
    var table = "3d_folder_info";

    var read_params =
    {
        TableName: table,
        KeyConditionExpression: "id = :sid",
        ExpressionAttributeValues: {
            ":sid": id,

        }
    }


    docClient.query(read_params, function (get_err, get_data) {

        if (get_err) {
            console.error("Unable to read folder item. Error JSON:", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("GetItem of folders succeeded:", JSON.stringify(get_data, null, 2));
            console.log("get_data.Items");
            console.log(get_data.Items.length);
            /** UPDATE PART */
            var foldertable = "3d_folder_info";

            var params = {
                TableName: foldertable,
                Key: {
                    "id": get_data.Items[0].id,
                    "created_ts": get_data.Items[0].created_ts
                },
                UpdateExpression: "set asset_name = :ed",
                ExpressionAttributeValues: {

                    ":ed": asset_name
                },
                ReturnValues: "UPDATED_NEW"
            };

            docClient.update(params, function (err, data) {
                if (err) {
                    console.error("Unable to update folder name table Error JSON:", JSON.stringify(err, null, 2));
                    callback(err, data)
                } else {
                    console.log("Successfully updated folder name in folderinfo table", JSON.stringify(data, null, 2));
                    callback(err, data);
                }
            });

        }

    });
    /** END SELECT PART */


}
