const AWS = require("aws-sdk");
const fs = require("fs");
var fse = require("fs-extra");
var crypto = require("crypto");
var uuid = require("uuidv4");
const path = require("path");

AWS.config.update({
    region: "ap-south-1",
});

const DynamoDB = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

// --------------------------------------------------------------------------------------------------------

exports.DBFileUploadData = function(user_id, parent_folder_id, asset_name, asset_original_name, asset_format, asset_extension, asset_type, callback) {

    console.log('\n');
    console.log(user_id);
    console.log(parent_folder_id); // folder in which the files are present
    console.log(asset_name); // file name in database
    console.log(asset_original_name); // original file name
    console.log(asset_format); // main (or) N.A.
    console.log(asset_extension); // .jpeg, .jpg, .gif, .zip
    console.log(asset_type); // folder (or) file [i.e] image, zip, etc,.
    console.log('\n');

    var random_seed = new Date().getUTCMilliseconds();
    var id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);

    var random_seed = new Date().getUTCMilliseconds();
    var asset_id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);

    const today = new Date();
    var timestamp = today.toISOString();

    var insert_table = "3d_folder_info";

    var insert_params = {
        TableName: insert_table,
        Item: {
            "id": id,
            "folder_id": parent_folder_id,
            "asset_name": asset_name,
            "asset_original_name": asset_original_name,
            "asset_format": asset_format,
            "asset_extension": asset_extension,
            "asset_id": asset_id,
            "asset_type": asset_type,
            "user_id": user_id,
            "created_ts": timestamp,
            "updated_ts": timestamp
        }
    }

    console.log("Adding a new item!");
    docClient.put(insert_params, function(in_err, in_data) {
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

// --------------------------------------------------------------------------------------------------------

exports.DBCutFiles = function (user_id, asset_id, current_folder_id, destination_folder_id, callback) {

    var table = "3d_folder_info";

    var read_params = {
        TableName: table,
        IndexName: "user_id-index",
        KeyConditionExpression: "user_id = :sid",
        FilterExpression: "asset_id = :ai AND folder_id = :fi",
        ExpressionAttributeValues: {
            ":sid": user_id,
            ":ai": asset_id,
            ":fi": current_folder_id
        }
    }

    docClient.query(read_params, function (get_err, get_data) {
        if (get_err) {
            console.error("\n Fetching Files Error JSON :", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("\n File details : ", JSON.stringify(get_data, null, 2));
            console.log(get_data.Items.length);

            if (get_data.Items.length == 1) {
                console.log('\n Cut method start.');
                const today = new Date();
                var timestamp = today.toISOString();

                var update_table = "3d_folder_info";

                var params = {
                    TableName: update_table,
                    Key: {
                        "id": get_data.Items[0].id,
                        "created_ts": get_data.Items[0].created_ts
                    },
                    UpdateExpression: "set folder_id = :fi, updated_ts = :ut",
                    ExpressionAttributeValues: {
                        ":fi": destination_folder_id,
                        ":ut": timestamp
                    },
                    ReturnValues: "UPDATED_NEW"
                };

                docClient.update(params, function (err, data) {
                    if (err) {
                        console.error("\n Update folder_id for file error JSON : ", JSON.stringify(err, null, 2));
                        callback(err, data)
                    } else {
                        console.log("\n Updated folder_id for file successfully.", JSON.stringify(data, null, 2));
                        callback(err, data);
                    }
                });
            }
            else {
                callback('Multiple data present', get_data);
            }
        }
    });
}

exports.DBCopyFiles = function (user_id, asset_id, current_folder_id, destination_folder_id, callback) {

    var table = "3d_folder_info";

    var read_params = {
        TableName: table,
        IndexName: "user_id-index",
        KeyConditionExpression: "user_id = :sid",
        FilterExpression: "asset_id = :ai AND folder_id = :fi",
        ExpressionAttributeValues: {
            ":sid": user_id,
            ":ai": asset_id,
            ":fi": current_folder_id
        }
    }

    docClient.query(read_params, function (get_err, get_data) {
        if (get_err) {
            console.error("\n Fetching Files Error JSON :", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("\n File details : ", JSON.stringify(get_data, null, 2));
            console.log(get_data.Items.length);

            if (get_data.Items.length == 1) {
                console.log('\n Copy method start.');

                var src_path = __dirname + "/uploads/" + get_data.Items[0].asset_name;

                var r_string = crypto.randomBytes(20).toString("hex");
                var temp_1 = uuid.fromString(r_string);

                var file_name = temp_1 + '' + get_data.Items[0].asset_extension;
                console.log('\n', file_name);

                var dest_path = __dirname + "/uploads/" + file_name;

                fs.copyFile(src_path, dest_path, (err) => {
                    if (err) {
                        callback(err, '500');
                    }
                    else {
                        console.log('\n copy success.');

                        var random_seed = new Date().getUTCMilliseconds();
                        var id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);

                        var random_seed = new Date().getUTCMilliseconds();
                        var asset_id = (random_seed + Math.random() + 1).toString(36).substring(7) + (random_seed + Math.random() + 2).toString(36).substring(7) + (random_seed + Math.random() + 3).toString(36).substring(7);

                        const today = new Date();
                        var timestamp = today.toISOString();

                        var insert_table = "3d_folder_info";

                        var insert_params = {
                            TableName: insert_table,
                            Item: {
                                "id": id,
                                "folder_id": destination_folder_id,
                                "asset_name": file_name,
                                "asset_original_name": get_data.Items[0].asset_original_name,
                                "asset_format": get_data.Items[0].asset_format,
                                "asset_extension": get_data.Items[0].asset_extension,
                                "asset_id": asset_id,
                                "asset_type": get_data.Items[0].asset_type,
                                "user_id": get_data.Items[0].user_id,
                                "created_ts": timestamp,
                                "updated_ts": timestamp
                            }
                        }

                        console.log("Adding a new item!");
                        docClient.put(insert_params, function (in_err, in_data) {
                            if (in_err) {
                                console.error("Unable to add file data. Error JSON:", JSON.stringify(in_err, null, 2));
                                callback(in_err, in_data);
                            } else {
                                console.log("Added item:", JSON.stringify(in_data));
                                console.log("200");
                                callback(in_err, in_data);
                                /** 200 */
                            }
                        });
                    }
                });
            }
            else {
                callback('Multiple data present', get_data);
            }
        }
    });
}

// --------------------------------------------------------------------------------------------------------

exports.DBCutFolders = function (user_id, current_folder_id, destination_folder_id, callback) {

    var table = "3d_folder_info"; // id <> :iid AND folder_id = :fi AND           ":iid": id, ":fi": current_folder_id,

    var read_params = {
        TableName: table,
        IndexName: "user_id-index",
        KeyConditionExpression: "user_id = :sid",
        FilterExpression: "asset_id = :ai AND asset_type = :at",
        ExpressionAttributeValues: {
            ":sid": user_id,
            ":ai": current_folder_id,
            ":at": "folder"
        }
    }

    docClient.query(read_params, function (get_err, get_data) {
        if (get_err) {
            console.error("\n Fetching Files Error JSON :", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("\n File details : ", JSON.stringify(get_data, null, 2));
            console.log(get_data.Items.length);

            if (get_data.Items.length == 1) {
                console.log('\n Folder Cut method start.');

                const today = new Date();
                var timestamp = today.toISOString();

                var update_table = "3d_folder_info";

                var params = {
                    TableName: update_table,
                    Key: {
                        "id": get_data.Items[0].id,
                        "created_ts": get_data.Items[0].created_ts
                    },
                    UpdateExpression: "set folder_id = :fi, updated_ts = :ut",
                    ExpressionAttributeValues: {
                        ":fi": destination_folder_id,
                        ":ut": timestamp
                    },
                    ReturnValues: "UPDATED_NEW"
                };

                docClient.update(params, function (err, data) {
                    if (err) {
                        console.error("\n Update folder_id for folder cut error JSON : ", JSON.stringify(err, null, 2));
                        callback(err, data)
                    } else {
                        console.log("\n Updated folder_id for folder cut successfully.", JSON.stringify(data, null, 2));
                        callback(err, data);
                    }
                });
            }
            else {
                callback('Multiple data present', get_data);
            }
        }
    });
}

// --------------------------------------------------------------------------------------------------------

exports.DBAssetURL = function (user_id, asset_id, callback) {

    var table = "3d_folder_info";

    var read_params = {
        TableName: table,
        IndexName: "user_id-index",
        KeyConditionExpression: "user_id = :sid",
        FilterExpression: "asset_id = :ai",
        ExpressionAttributeValues: {
            ":sid": user_id,
            ":ai": asset_id
        }
    }

    docClient.query(read_params, function (get_err, get_data) {
        if (get_err) {
            console.error("\n Fetching File Error JSON :", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("\n File details : ", JSON.stringify(get_data, null, 2));
            console.log(get_data.Items.length);

            if (get_data.Items.length == 1) {

                if (get_data.Items[0].asset_extension == '.gltf') {

                    console.log('\n Copy method start for GLTF type of files.');

                    var at_name = get_data.Items[0].asset_name;
                    var folder_name = at_name.split('/');

                    var src_path = __dirname + "/uploads/" + folder_name[1];

                    var r_string = crypto.randomBytes(20).toString("hex");
                    var temp_1 = uuid.fromString(r_string);

                    console.log('\n', temp_1);

                    var fileExists = fs.existsSync(__dirname + "/public/temp/" + temp_1);

                    if (fileExists == 'false' || fileExists == false) { // folder does not exist

                        console.log('folder name does not exist.');

                        var folder_path = __dirname + "/public/temp/" + temp_1;

                        fs.mkdir(folder_path, { recursive: true }, function (err) {
                            if (err) {
                                console.log(err);
                                res.sendStatus(511);
                            } else {
                                console.log('\n Upload part folder created.');

                                var dest_path = __dirname + "/public/temp/" + temp_1;

                                console.log('\n', src_path);
                                console.log('\n', dest_path);

                                fse.copy(src_path, dest_path, function (err) {
                                    if (err) {
                                        console.log('\n Copy option error.');
                                        console.error(err);
                                        callback(err, '500');
                                    }
                                    else {
                                        console.log('\n copy success.');

                                        fs.readdir(dest_path, (err, files) => {
                                            if (err) {
                                                console.log(err);

                                                fs.rmdir(dest_path, { recursive: true, }, (error) => {
                                                    if (error) {
                                                        console.log(error);
                                                    }
                                                    else {
                                                        console.log("Recursive: Directories Deleted!");
                                                        callback('Unalble to read files', 0);
                                                    }
                                                });
                                            }
                                            else {

                                                console.log("\nCurrent directory filenames:");
                                                console.log(files.length);

                                                if (files.length > 0) {

                                                    var gltf_File = files.filter(el => path.extname(el) === '.gltf');
                                                    console.log(gltf_File[0]);

                                                    if (gltf_File.length > 0) {

                                                        var newFileName = temp_1 + '.gltf';
                                                        console.log(newFileName);
                                                        var oldPath = __dirname + '/public/temp/' + temp_1 + '/' + folder_name[2];
                                                        console.log(oldPath);
                                                        var newPath = __dirname + '/public/temp/' + temp_1 + '/' + newFileName;
                                                        console.log(newPath);

                                                        fs.rename(oldPath, newPath, (error) => {
                                                            if (error) {
                                                                console.log(error);

                                                                fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                                    if (error) {
                                                                        console.log(error);
                                                                    }
                                                                    else {
                                                                        console.log("Recursive: Directories Deleted!");
                                                                        callback('Unalble to rename file', 0);
                                                                    }
                                                                });
                                                            }
                                                            else {
                                                                console.log("\nFile Renamed!\n");

                                                                var file_url = '/temp/' + temp_1 + '/' + newFileName;

                                                                var data_arr = [];
                                                                data_arr.push(file_url);
                                                                data_arr.push(get_data.Items[0].asset_extension);

                                                                callback(get_err, data_arr);
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                    else {
                        res.sendStatus('Unable to create folder, please try again', 0);
                    }
                }
                else {
                    console.log('\n Copy method start for other type of files.');

                    var src_path = __dirname + "/uploads/" + get_data.Items[0].asset_name;

                    var r_string = crypto.randomBytes(20).toString("hex");
                    var temp_1 = uuid.fromString(r_string);

                    var file_name = temp_1 + '' + get_data.Items[0].asset_extension;
                    console.log('\n', file_name);

                    var dest_path = __dirname + "/public/temp/" + file_name;

                    fs.copyFile(src_path, dest_path, (err) => {
                        if (err) {
                            console.log('\n Copy option error.');
                            console.log(err);
                            callback(err, '500');
                        }
                        else {
                            console.log('\n copy success.');

                            var file_url = '/temp/' + file_name;

                            var data_arr = [];
                            data_arr.push(file_url);
                            data_arr.push(get_data.Items[0].asset_extension);

                            callback(get_err, data_arr);
                        }
                    });
                }
            }
            else {
                console.log('\n File not found.');
                callback('File not found.', get_data);
            }
        }
    });
}
