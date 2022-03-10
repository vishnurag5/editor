const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

exports.db_getfolder = function (folder_id, asset_name, user_id, callback) {

    var table = "3d_folder_info";

    var read_params = {
        TableName: table,
        IndexName: "folder_id-index",
        KeyConditionExpression: "folder_id = :sid",
        FilterExpression: "asset_format = :af",
        ExpressionAttributeValues: {
            ":sid": folder_id,
            ":af": "main",
        }
    }

    docClient.query(read_params, function (get_err, get_data) {
        if (get_err) {
            console.error("Unable to read 3d_folder_info item. Error JSON:", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("GetItem of 3d_folder_info succeeded:", JSON.stringify(get_data, null, 2));
            console.log("MAIN FOLDER NAMES FETCHED");
            callback(get_err, get_data);
        }
    });
}

exports.db_insub_directory = function (user_id, folder_id, asset_name, callback) {

    console.log("user_id: ", user_id);
    console.log("asset_name: ", asset_name);

    var insert_table = "3d_folder_info";

    var random_seed = new Date().getUTCMilliseconds();
    var id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);

    var random_seed = new Date().getUTCMilliseconds();
    var asset_id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);

    const today = new Date();
    var timestamp = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var insert_params = {
        TableName: insert_table,
        Item: {
            "id": id,
            "folder_id": folder_id,
            "user_id": user_id,
            "asset_extension": "N.A.",
            "asset_name": asset_name,
            "asset_original_name": "N.A.",
            "asset_type": "folder",
            "asset_format": "N.A.",
            "asset_id": asset_id,
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
            console.log("FIRST INSERTION COMPLETED");

            var random_seed = new Date().getUTCMilliseconds();
            var sec_id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);

            var insert_params = {
                TableName: insert_table,
                Item: {
                    "id": sec_id,
                    "folder_id": asset_id,
                    "user_id": user_id,
                    "asset_extension": "N.A.",
                    "asset_name": asset_name,
                    "asset_original_name": "N.A.",
                    "asset_type": "folder",
                    "asset_format": "N.A.",
                    "asset_id": "N.A.",
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
                    console.log("SECOND INSERTION COMPLETED");
                    callback(in_err, in_data);
                }
            });
        }
    });
}

//////-----------------------get subfolder----------------------------------///////

exports.DB_getsubfolder = function (folder_id, callback) {

    var table = "3d_folder_info";

    var read_params = {
        TableName: table,
        IndexName: "folder_id-index",
        KeyConditionExpression: "folder_id = :bid",
        FilterExpression: "asset_format = :bf",
        ExpressionAttributeValues: {
            ":bid": folder_id,
            ":bf": "N.A.",
        }
    }

    docClient.query(read_params, function (get_err, get_data) {
        if (get_err) {
            console.error("Unable to read 3d_sub_folder item. Error JSON:", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("Getting 3d_sub_folder succeeded: ", JSON.stringify(get_data, null, 2));
            console.log("-- checking --");

            var sub_folder = [];

            function loop(i) {
                if (i < get_data.Items.length) {

                    if (get_data.Items[i].asset_type == 'file') {
                        sub_folder.push(get_data.Items[i]);
                        i++;
                        loop(i);
                    }
                    else {
                        var table = "3d_folder_info";
                        var read_params = {
                            TableName: table,
                            IndexName: "folder_id-index",
                            KeyConditionExpression: "folder_id = :sid",
                            ExpressionAttributeValues: {
                                ":sid": get_data.Items[i].asset_id,
                            }
                        }

                        docClient.query(read_params, function (get_err1, get_data1) {
                            if (get_err1) {
                                console.error("Unable to get sub-folders item. Error JSON:", JSON.stringify(get_err, null, 2));
                                i++;
                                loop(i);
                            } else {
                                console.log("Got sub-folders succeeded:", JSON.stringify(get_data1, null, 2));

                                if (get_data1.Count > 0) {

                                    function loop2(z) {
                                        if (z < get_data1.Items.length) {
                                            if (get_data1.Items[z].asset_id == 'N.A.') {
                                                sub_folder.push(get_data1.Items[z]);
                                            }
                                            z++;
                                            loop2(z);
                                        } else {
                                            i++;
                                            loop(i);
                                        }
                                    }
                                    loop2(0);
                                } else {
                                    i++;
                                    loop(i);
                                }
                            }
                        });
                    }
                } else {
                    console.log("got 3d sub_folder");
                    console.log(sub_folder);
                    callback(0, sub_folder);
                }
            }
            loop(0);
        }
    });
}