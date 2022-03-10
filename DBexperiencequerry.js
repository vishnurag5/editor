const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

exports.DB_experience_data = function (user_id, callback) {
    /** SELECT PART */
    var table = "3d_experience_info";
    //var uid = "jhzmt8bnzhi0b1";

    var read_params =
    {
        TableName: table,
        IndexName: "user_id-index",
        KeyConditionExpression: "user_id = :sid",
        ExpressionAttributeValues: {
            ":sid": user_id
        }
    }


    docClient.query(read_params, function (get_err, get_data) {

        if (get_err) {
            console.error("Unable to read session_ids item. Error JSON:", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("GetItem of session_ids succeeded:", JSON.stringify(get_data, null, 2));
            console.log(get_data.Items.length);
            callback(get_err, get_data.Items);
        }

    });
    /** END SELECT PART */


}

exports.DB_experience_id = function (experience_id, callback) {
    /** SELECT PART */
    var table = "3d_experience_info";
    //var uid = "jhzmt8bnzhi0b1";

    var read_params =
    {
        TableName: table,
        IndexName: "experience_id-index",
        KeyConditionExpression: "experience_id = :sid",
        ExpressionAttributeValues: {
            ":sid": experience_id
        }
    }


    docClient.query(read_params, function (get_err, get_data) {

        if (get_err) {
            console.error("Unable to read session_ids item. Error JSON:", JSON.stringify(get_err, null, 2));
            callback(get_err, get_data);
        } else {
            console.log("GetItem of session_ids succeeded:", JSON.stringify(get_data, null, 2));
            console.log(get_data.Items.length);
            callback(get_err, get_data.Items);
        }

    });
    /** END SELECT PART */


}

// exports.DB_experience_update = function (experience_id,experience_data, callback) {
//     /** UPDATE PART */
//     var table = "3d_experience_info";

//     var params = {
//         TableName: table,
//         Key: {
//             "experience_id": experience_id 
//         },
//         UpdateExpression: "set experience_data = :ed",
//         ExpressionAttributeValues: {

//             ":ed": experience_data
//         },
//         ReturnValues: "UPDATED_NEW"
//     };

//     docClient.update(params, function (err, data) {
//         if (err) {
//             console.error("Unable to update experience table Error JSON:", JSON.stringify(err, null, 2));
//             callback(err, data)
//         } else {
//             console.log("Successfully updated 3dExperience info table", JSON.stringify(data, null, 2));
//             callback(err, data);
//         }
//     });


// }


// var table = "3d_experience_info";

// var year = 2015;
// var title = "The Big New Movie";

// // Conditional update (will fail)

// var params = {
//     TableName:table,
//     Key:{
//         "year": year,
//         "title": title
//     },
//     UpdateExpression: "remove info.actors[0]",
//     ConditionExpression: "size(info.actors) > :num",
//     ExpressionAttributeValues:{
//         ":num": 3
//     },
//     ReturnValues:"UPDATED_NEW"
// };

// console.log("Attempting a conditional update...");
// docClient.update(params, function(err, data) {
//     if (err) {
//         console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
//     }
// });

exports.DB_experience_update = function(experience_id, experience_data, hotspot_data, callback) {



    var table = "3d_experience_info";



    var params = {

        TableName: table,

        Key: {

            "experience_id": experience_id

        },

        UpdateExpression: "set experience_data = :ed, hotspot_data = :hd",

        ExpressionAttributeValues: {

            ":ed": experience_data,

            ":hd": hotspot_data

        },

        ReturnValues: "UPDATED_NEW"

    };



    docClient.update(params, function(err, data) {

        if (err) {

            console.error("Unable to update experience table Error JSON:", JSON.stringify(err, null, 2));

            callback(err, data)

        } else {

            console.log("Successfully updated 3dExperience info table", JSON.stringify(data, null, 2));

            callback(err, data);

        }

    });

}