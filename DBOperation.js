const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

exports.delete_single_file = function (id, callback) {

    console.log("File Id:", id);

    /** SELECT created_ts **/
    var select_table = "3d_folder_info";

    var select_params = {
        TableName: select_table,
        KeyConditionExpression: "id = :fid",
        ExpressionAttributeValues: {
            ":fid": id
        }
    };

    docClient.query(select_params, function (sel_err, sel_data) {
        if (sel_err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(sel_err, null, 2));
            callback(sel_err, sel_data);
        } else {
            console.log("GetItem succeeded:", JSON.stringify(sel_data, null, 2));
            console.log("created ts", sel_data.Items[0].created_ts);
            var created_ts = sel_data.Items[0].created_ts;
            /** DELETE FILE **/

            var table = "3d_folder_info";

            var params = {
                TableName: table,
                Key: {
                    "id": id,
                    "created_ts": created_ts
                }
            };
            console.log("Attempting a conditional delete...");
            docClient.delete(params, function (err, data) {
                if (err) {
                    console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                    callback(err, data);
                } else {
                    console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                    callback(err, data);
                }
            });

            /** END DELETE FILE **/
        }
    });
    /** END SELECT created_ts **/
}

exports.duplicate_single_file = function (id, folder_id, callback) {

    console.log("File Id:", id);
    console.log("Folder Id:", folder_id);

    /** SELECT created_ts **/
    var select_table = "3d_folder_info";

    var select_params = {
        TableName: select_table,
        KeyConditionExpression: "id = :fid",
        ExpressionAttributeValues: {
            ":fid": id
        }
    };

    docClient.query(select_params, function (sel_err, sel_data) {
        if (sel_err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(sel_err, null, 2));
            callback(sel_err, sel_data);
        } else {
            console.log("GetItem succeeded:", JSON.stringify(sel_data, null, 2));

            /** DUPLICATE FILE **/
            var insert_table = "3d_folder_info";

            var id_random_seed = new Date().getUTCMilliseconds();
            var new_id = (id_random_seed + Math.random() + 1).toString(36).substring(7) + (id_random_seed + Math.random() + 2).toString(36).substring(7) + (id_random_seed + Math.random() + 3).toString(36).substring(7);

            const today = new Date();
            var timestamp = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            var insert_params = {
                TableName: insert_table,
                Item: {
                    "id": new_id,
                    "folder_id": folder_id,
                    "user_id": sel_data.Items[0].user_id,
                    "asset_format": sel_data.Items[0].asset_format,
                    "asset_name": sel_data.Items[0].asset_name,
                    "asset_extension": sel_data.Items[0].asset_extension,
                    "asset_type": sel_data.Items[0].asset_type,
                    "asset_id": sel_data.Items[0].asset_id,
                    "created_ts": timestamp,
                    "updated_ts": timestamp

                }
            }

            console.log("Adding a new item!");
            docClient.put(insert_params, function (in_err, in_data) {
                if (in_err) {
                    console.error("Unable to add folder item in 3d_folder_info. Error JSON:", JSON.stringify(in_err, null, 2));
                    callback(in_err, in_data);
                } else {
                    console.log("Added item:", JSON.stringify(in_data));
                    console.log("200");
                    callback(in_err, in_data);
                    /** 200 */
                }
            });
            /** END DUPLICATE FILE **/

        }
    });
    /** END SELECT created_ts **/
}

exports.insert_stored_file_details = function (user_id, folder_id, act_file_name, asset_format, asset_extension, asset_name, callback) {

    console.log("asset_name : ", asset_name); // have to check

    /** INSERT DETAILS **/
    var insert_table = "3d_folder_info";

    var id_random_seed = new Date().getUTCMilliseconds();
    var new_id = (id_random_seed + Math.random() + 1).toString(36).substring(7) + (id_random_seed + Math.random() + 2).toString(36).substring(7) + (id_random_seed + Math.random() + 3).toString(36).substring(7);

    var random_seed = new Date().getUTCMilliseconds();
    var asset_id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);
    
    const today = new Date();
    var timestamp = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var insert_params = {
        TableName: insert_table,
        Item: {
            "id": new_id,
            "folder_id": folder_id,
            "user_id": user_id,
            "asset_format": asset_format,
            "asset_name": asset_name, // have to check
            "asset_extension": asset_extension,
            "asset_type": "file",
            "asset_id": asset_id,
            "created_ts": timestamp,
            "updated_ts": timestamp,
            "asset_actual_name" : act_file_name
        }
    }

    console.log("Adding a new item!");
    docClient.put(insert_params, function (in_err, in_data) {
        if (in_err) {
            console.error("Unable to add file details in 3d_folder_info. Error JSON:", JSON.stringify(in_err, null, 2));
            callback(in_err, in_data);
        } else {
            console.log("Added item:", JSON.stringify(in_data));
            console.log("200");
            callback(in_err, in_data);
            /** 200 */
        }
    });
    /** INSERT DETAILS **/
}

exports.Fetch_sub_folders = function (folder_id, callback) {

    console.log("folder_id : ", folder_id);

    /** FETCH SUB FOLDERS DETAILS **/
    var table = "3d_folder_info";
    
    var read_params =
    {
        TableName: table,
        IndexName: "folder_id-index",
        KeyConditionExpression: "folder_id = :fid",
        ExpressionAttributeValues: {
            ":fid": folder_id
        }
    }


    docClient.query(read_params, function (get_err, get_data) {

        if (get_err) {
            console.error("Unable to read 3d_folder_info item. Error JSON:", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("GetItem of session_ids succeeded:", JSON.stringify(get_data, null, 2));
            console.log(get_data.Items.length);
            // callback(get_err, get_data.Items);

            /** GET SUB FOLDERS **/
            var sub_folders = [];

            function loop(i)
            {
                if(i < get_data.Items.length)
                {
                    if(get_data.Items[i].asset_id != "N.A.")
                    {
                        sub_folders.push(get_data.Items[i]);
                        i++;
                        loop(i);
                    }
                    else
                    {
                        i++;
                        loop(i);
                    }
                }
                else
                {
                    console.log("******* SUB FOLDERS ONLY HERE **********");
                    console.log(sub_folders);
                    callback(get_err, sub_folders);
                }
            }
            loop(1);
            /** END GET SUB FOLDERS **/
        }

    });
    /** FETCH SUB FOLDERS DETAILS **/
}


exports.DB_delete_multi_experience = function (experience_id, callback) {
    
    console.log("File Id:", experience_id);

    var multi_id = JSON.parse(experience_id); //array
    var count = 0;
    var null_val = null;

    /** LOOPING DELETE **/
    function multi_exp_delete(i)
    {
        if(i < multi_id.length)
        {
            var dtable = "3d_experience_info";

            var params = {
                TableName: dtable,
                Key: {
                    "experience_id": multi_id[i]
                }
            }

            docClient.delete(params, function (err, data) {
                if (err) {
                    console.error("Unable to delete experience id Error JSON:", JSON.stringify(err, null, 2));
                    i++;
                    multi_exp_delete(i);
                } else {
                    console.log("Successfully deleted experience id", JSON.stringify(data, null, 2));
                    count++;
                    i++;
                    multi_exp_delete(i);
                    // callback(err, data);
                }
            });
        }
        else
        {
            if(count == multi_id.length)
            {
                console.log("MULTIPLE EXP DATAS ARE DELETED !");
                callback(null_val, 2);
            }
            else
            {
                console.log("MULTIPLE EXP DELETED ERROR !");
                console.log("count : ", count);
                console.log("multi_id.length : ", multi_id.length);
                callback(null_val, 1);
            }
        }
    }
    multi_exp_delete(0);
    /** END LOOPING DELETE **/

}