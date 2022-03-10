var http = require("http");
var express = require("express");
var app = express();
const fileUpload = require("express-fileupload");
const path = require("path");
var bodyParser = require("body-parser");
// var formidable = require("formidable");
const fs = require("fs");
const multer = require("multer");
var crypto = require("crypto");
var uuid = require("uuidv4");
var Console = require("console");
var extractZip = require('extract-zip');

// HTML view
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.json({
    type: "application/vnd.api+json",
}));

var host_ = "127.0.0.1:3000";
// ----------------------------------------------------------------------------------------------------------

app.get("/", function (req, res) {
    var host_url = req.headers.host;

    if (host_url == "127.0.0.1:3000") {
        res.render(__dirname + "/pages/auth-login-cover.html");
    } else {
        console.log("Authentication failed!");
        res.sendStatus(500);
    }
});

// app.get("/folderpage", function (req, res) {
//     var host_url = req.headers.host;

//     if (host_url == host_) {
//         res.render(__dirname + "/pages/file-manager.html");
//     } else {
//         console.log("Authentication failed!");
//         res.sendStatus(500);
//     }
// });
// app.get("/dashboard", function (req, res) {
//     var host_url = req.headers.host;

//     if (host_url == "127.0.0.1:3000") {
//         if (req.query.session_id == undefined || req.query.session_id == "undefined") {
//             console.log("Invalid Session");
//             res.render(__dirname + "/pages/index.html");
//         } else {
//             var s_id = req.query.session_id;

//             console.log("s_id", s_id);
//             var DBSession = require("./DBSession");
//             DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
//                 if (DBErr > 0) {
//                     console.log("DB Session Error!");
//                     console.log(DBErr);
//                     res.render(__dirname + "/pages/index.html");
//                 } else {
//                     res.render(__dirname + "/pages/dashboard.html");
//                 }
//             });
//         }
//     } else {
//         res.sendStatus(500);
//         console.log("Authentication failed!");
//     }
// });

app.get("/dashboard", function (req, res) {
    var host_url = req.headers.host;
    console.log("INSIDE DASHBOARD !");
    console.log(host_url);

    if (host_url == "127.0.0.1:3000") {
        console.log("Inside Dashboard Session ID:");
        console.log("req.query", req.query);
        console.log("req.query.session_id", req.query.session_id);

        if (req.query.session_id == undefined || req.query.session_id == "undefined") {
            console.log("Invalid Session");
            res.render(__dirname + "/pages/auth-login-cover.html");
        } else {
            var s_id = req.query.session_id;

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.render(__dirname + "/pages/auth-login-cover.html");
                } else {
                    res.render(__dirname + "/pages/Project Manager.html");
                }
            });
        }
    } else {
        res.render(__dirname + "/pages/auth-login-cover.html");
    }
});
app.post("/get_experience_details", function (req, res) {
    var user_id = req.body.user_id;
    var experience_id = req.body.experience_id;
    var session_id = req.body.session_id;
    

    var host_url = req.headers.host;
    console.log(user_id, "user_id");
    console.log(session_id, "session_id");
    console.log(experience_id, "experience_id");

    if (host_url == "127.0.0.1:3000") {
        console.log("Inside Dashboard Session ID:");
        
        if (session_id == undefined || session_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
        } else {
            var s_id = session_id;
            console.log("s_id");

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                } else {
                    console.log("User is loged in!")

                    var exp_insert = require("./DBexperiencequerry");
                    exp_insert.DB_experience_id(experience_id, function (DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("did'nt get querry error!");
                            console.log(DBErr);
                            res.sendStatus(502); // User not registred
                        } else {
                            // console.log("got querry");
                            console.log("DB success");
                            // console.log(DBSuccess);
                            res.send(DBSuccess);
                        }
                    });


                }
            });
        }
    } else {
        res.sendStatus(504);
    }
    


})
app.get("/display_preview", function (req, res) {
    var host_url = req.headers.host;
    console.log('display_editor');
    
    if (host_url == "127.0.0.1:3000" || host_url == "192.168.1.80:3000") {
        if (req.query.session_id == undefined || req.query.session_id == "undefined") {
            console.log("Invalid Session");
            res.render(__dirname + "/pages/index.html");
        } else {
            var s_id = req.query.session_id;

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.render(__dirname + "/pages/index.html");
                } else {
                    res.render(__dirname + "/pages/3d_preview.html");
                }
            });
        }
    } else {
        res.render(__dirname + "/pages/index.html");
    }
});
app.get("/display_settings", function (req, res) {
    var host_url = req.headers.host;
    
    if (host_url == "127.0.0.1:3000" || host_url == "192.168.1.80:3000") {
        if (req.query.session_id == undefined || req.query.session_id == "undefined") {
            console.log("Invalid Session");
            res.render(__dirname + "/pages/index.html");
        } else {
            var s_id = req.query.session_id;

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.render(__dirname + "/pages/index.html");
                } else {
                    res.render(__dirname + "/pages/settings.html");
                }
            });
        }
    } else {
        res.render(__dirname + "/pages/index.html");
    }
});
app.get("/display_analytics", function (req, res) {
    var host_url = req.headers.host;
    console.log('display_editor');
    
    if (host_url == "127.0.0.1:3000") {
        if (req.query.session_id == undefined || req.query.session_id == "undefined") {
            console.log("Invalid Session");
            res.render(__dirname + "/pages/index.html");
        } else {
            var s_id = req.query.session_id;

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.render(__dirname + "/pages/index.html");
                } else {
                    res.render(__dirname + "/pages/dashboard-analytics.html");
                }
            });
        }
    } else {
        res.render(__dirname + "/pages/index.html");
    }
});
app.get("/display_editor", function (req, res) {
    var host_url = req.headers.host;
    console.log('display_editor');
    
    if (host_url == "127.0.0.1:3000") {
        if (req.query.session_id == undefined || req.query.session_id == "undefined") {
            console.log("Invalid Session");
            res.render(__dirname + "/pages/auth-login-cover.html");
        } else {
            var s_id = req.query.session_id;

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.render(__dirname + "/pages/auth-login-cover.html");
                } else {
                    res.render(__dirname + "/pages/vishnuexp.html");
                }
            });
        }
    } else {
        res.render(__dirname + "/pages/auth-login-cover.html");
    }
});

// app.get("/create_fixed_page_multiple", function (req, res) {
//     var host_url = req.headers.host;

//     if (host_url == "127.0.0.1:3000") {
//         if (req.query.session_id == undefined || req.query.session_id == "undefined") {
//             console.log("Invalid Session");
//             res.render(__dirname + "/pages/index.html");
//         } else {
//             var s_id = req.query.session_id;

//             console.log("s_id", s_id);
//             var DBSession = require("./DBSession");
//             DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
//                 if (DBErr > 0) {
//                     console.log("DB Session Error!");
//                     console.log(DBErr);
//                     res.render(__dirname + "/pages/index.html");
//                 } else {
//                     console.log("rendering to multiple pages");
//                     res.render(__dirname + "/dashboard/create_fixed_page_multiple.html");
//                 }
//             });
//         }
//     } else {
//         res.sendStatus(500);
//         console.log("Authentication failed!");
//     }
// });

// ----------------------------------------------------------------------------------------------------------

// app.post("/validation_signup", function (req, res) {
//     console.log(req);
//     console.log(req.body.user_email);
//     res.sendStatus(200);
// });

app.post("/validation_signup", function (req, res) {
    console.log(req.body);
    console.log(req.files);

    var user_email = req.body.user_email;
    var user_password = req.body.user_password;
    var user_phone = req.body.user_phone;
    var user_name = req.body.user_name;

    /** FILE UPLOAD **/
    let sampleFile;
    let uploadPath;

    var file_ext, file_mime_type, file_type;
    file_mime_type = req.files.file.mimetype;
    switch (file_mime_type) {
        case "image/jpeg":
            file_ext = ".jpg";
            file_type = "jpg";
            break;

        case "image/png":
            file_ext = ".png";
            file_type = "png";
            break;

        default:
            console.log("file type is not allowed.");
            res.sendStatus(510);
            return;
    }
    var random_string2 = crypto.randomBytes(20).toString("hex");
    var temp2 = uuid.fromString(random_string2);
    var file_name = temp2 + file_ext;
    var user_profile = temp2 + file_ext;

    sampleFile = req.files.file,
        avatar = file_name;
    uploadPath = __dirname + "/public/image/profile/" + avatar;

    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(502);
        }
        else {
            console.log("profile updated !")
            /** STORE DETAILS IN DYNAMO DB **/
            console.log("File uploaded!");

            var SignupUser = require("./SignupUser");
            SignupUser.User_Signup(user_email, user_password, user_profile, user_name, user_phone,
                function (DBErr, DBSuccess) {
                    if (DBErr) {
                        console.log("Signup Error!");
                        console.log(DBErr);
                        res.sendStatus(500); // DB ERROR
                    } else {
                        console.log("Signup Part!");
                        console.log(DBSuccess);
                        res.sendStatus(DBSuccess); //200 or 501
                    }
                }
            );
            /** STORE DETAILS IN DYNAMO DB **/
        }
    });
});

app.post("/validation_login", function (req, res) {
    //var obj = JSON.parse(JSON.stringify(req.body))
    //var username = obj.username;
    //var password = obj.password;

    // console.log('Req validation_login:', req.body);
    var user_email = req.body.user_email;
    var user_password = req.body.user_password;
    console.log("login_id", user_email);
    console.log("login_pass", user_password);


    var LoginUser = require("./LoginUser");
    LoginUser.User_Login(user_email, user_password, function (DBErr, DBSuccess) {
        if (DBErr) {
            console.log("Login Error!");
            console.log(DBErr);
            res.sendStatus(500); // User not registred
        } else {
            console.log("Login Part!");
            console.log(DBSuccess);
            //res.sendStatus(DBSuccess);  //200 or 501
            if (DBSuccess == 500) {
                res.sendStatus(500);
            } else if (DBSuccess == 501) {
                res.sendStatus(DBSuccess);
            } else {
                var DBSession = require("./DBSession");
                var user_id = DBSuccess;
                console.log("user_id", user_id);
                DBSession.DB_Session(user_id, function (DBErr, s_id) {
                    if (DBErr > 0) {
                        console.log("DB Session Error!");
                        console.log(DBErr);
                        res.sendStatus(502); // User not registred
                    } else {
                        console.log("DB Session Part!");
                        res.send({ "s_id": s_id, "user_id": user_id });
                        
                    }
                });
            }
        }
    });
});

// forgot password 
// singnup

app.post("/experience", function (req, res) {
    var user_id = req.body.user_id;
    var session_id = req.body.session_id;
    var experience_name = req.body.experience_name;

    var host_url = req.headers.host;
    console.log(user_id, "user_id");
    console.log(session_id, "session_id");
    console.log(experience_name, "experience_name");

    if (host_url == "127.0.0.1:3000") {
        console.log("Inside Dashboard Session ID:");
        
        if (session_id == undefined || session_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
        } else {
            var s_id = session_id;
            console.log("s_id");

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                } else {
                    console.log("User is loged in!")

                    var exp_insert = require("./DBexperience");
                    exp_insert.db_experience(user_id,experience_name, function (DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("experience insert error!");
                            console.log(DBErr);
                            res.sendStatus(502); // User not registred
                        } else {
                            console.log("experience added");
                            console.log("Experience ID:", DBSuccess);
                            res.send(DBSuccess);
                        }
                    });


                }
            });
        }
    } else {
        res.sendStatus(504);
    }
})
app.get("/folderpage", function (req, res) {
    var host_url = req.headers.host;

    if (host_url == "127.0.0.1:3000") {
        res.render(__dirname + "/pages/folder_page.html");
    } else {
        console.log("Authentication failed!");
        res.sendStatus(500);
    }
});


app.get("/Rulespage", function (req, res) {
    var host_url = req.headers.host;

    if (host_url == "127.0.0.1:3000") {
        res.render(__dirname + "/pages/form-repeater.html");
    } else {
        console.log("Authentication failed!");
        res.sendStatus(500);
    }
});


app.post("/create_directory", function (req, res) {
    console.log("CREATE FOLDER !");
    var user_id = req.body.user_id;
    var session_id = req.body.session_id;
    var asset_name = req.body.asset_name;

    var host_url = req.headers.host;
    console.log(user_id, "user_id");
    console.log(session_id, "session_id");
    console.log(asset_name, "asset_name");

    if (host_url == "127.0.0.1:3000") {
        console.log("Inside Dashboard Session ID:");

        if (session_id == undefined || session_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
        } else {
            var s_id = session_id;
            console.log("s_id");

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                } else {
                    console.log("User is loged in!")

                    var folder_path = __dirname + "/uploads/"+asset_name;
                    fs.mkdir(folder_path, { recursive: true }, function (err) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(511);
                        }
                        else {
                            console.log("Folder creation done.");
                            var db_dir = require("./DBdirectoryquerry");
                            db_dir.db_directory(user_id, asset_name, function (DBErr, DBSuccess) {
                                if (DBErr) {
                                    console.log("experience insert error!");
                                    console.log(DBErr);
                                    res.sendStatus(502); // User not registred
                                } else {
                                    console.log("experience added");
                                    console.log("Experience ID:", DBSuccess);
                                    res.send(DBSuccess);
                                }
                            });

                        }

                    });


                }
            });
        }
    } else {
        res.sendStatus(504);
    }
})


app.get("/registercover", function (req, res) {

    var host_url = req.headers.host;



    if (host_url == host_) {

        res.render(__dirname + "/pages/auth-register-cover.html");

    } else {

        console.log("Authentication failed!");

        res.sendStatus(500);

    }

});
app.post("/rename_folder", function (req, res) {
    var session_id = req.body.session_id;
    var id = req.body.id;
    var asset_name = req.body.asset_name;


    var host_url = req.headers.host;

    if (host_url == "127.0.0.1:3000") {
        console.log("Inside Dashboard Session ID:");

        if (session_id == undefined || session_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
        } else {
            var s_id = session_id;
            console.log("s_id");

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                } else {
                    console.log("User is loged in!")

                    var queryfoldernewname = require("./DBdirectoryquerry");
                    queryfoldernewname.DB_queryrenamefolder(id,asset_name, function (DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("did'nt get querry error!");
                            console.log(DBErr);
                            res.sendStatus(502); // User not registred
                        } else {
                            console.log("folder_rename done");
                            res.send(DBSuccess);
                        }
                    });


                }
            });
        }
    } else {
        res.sendStatus(504);
    }
})


app.post("/get_folder_details", function(req, res) {
    var user_id = req.body.user_id;
    var s_id = req.body.session_id;

    console.log("FIRST API");
    console.log('');

    var host_url = req.headers.host;
    console.log("user_id : ", user_id);
    console.log("session_id : ", s_id);
    console.log('');

    if (host_url == "127.0.0.1:3000") {
        console.log("Inside Dashboard Session ID:");
        console.log('');

        if (s_id == undefined || s_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
        } else {
            var DBSession = require("./DBSession");

            DBSession.DB_CheckSession(s_id, function(DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                } else {
                    console.log("User is loged in!");
                    console.log('');

                    var exp_insert = require("./DBdirectoryquerry");
                    exp_insert.DB_directory_data(user_id, function(DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("did'nt get querry error!");
                            console.log(DBErr);
                            res.sendStatus(502); // User not registred
                        } else {
                            console.log("got querry");
                            console.log('');
                            console.log(DBSuccess);

                            res.send(DBSuccess);
                        }
                    });
                }
            });
        }
    } else {
        res.sendStatus(504);
    }
});

app.post('/upload_folder_files', function (req, res) {

    console.log(req.body);
    console.log('');
    console.log(req.files);
    console.log('');

    var user_id = req.body.user_id;
    var session_id = req.body.session_id;
    var parent_folder_id = req.body.parent_folder_id; // main [or] folder_id

    if (session_id == undefined || session_id == "undefined") {
        console.log("Invalid Session");
        res.sendStatus(501);
    } else {
        var DBSession = require("./DBSession");
        DBSession.DB_CheckSession(session_id, function (DBErr, user_id) {
            if (DBErr > 0) {
                console.log("DB Session Error!");
                console.log(DBErr);
                res.sendStatus(501);
            } else {

                if (req.files.file.length == undefined || req.files.file.length == 'undefined') {

                    console.log('Single File Upload. \n');

                    var file_mime_type = req.files.file.mimetype;

                    console.log("file_mime_type: ", file_mime_type);

                    if (file_mime_type == 'application/zip' || file_mime_type == 'application/x-zip-compressed' || file_mime_type == 'multipart/x-zip') {
                        console.log('Zip File type. \n');

                        var r_string = crypto.randomBytes(20).toString("hex");
                        var temp_1 = uuid.fromString(r_string);
                        console.log(temp_1);

                        var folder_path = __dirname + "/uploads/" + temp_1;
                        var folder_path_2 = __dirname + "/zip/" + temp_1;

                        fs.mkdir(folder_path, { recursive: true }, function (err) {
                            if (err) {
                                console.log(err);
                                res.sendStatus(511);
                            } else {
                                console.log('Upload part folder created. \n');

                                fs.mkdir(folder_path_2, { recursive: true }, function (err) {
                                    if (err) {
                                        console.log(err);

                                        fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                            if (error) {
                                                console.log(error);
                                            }
                                            else {
                                                console.log("Recursive: Directories Deleted!");
                                                res.sendStatus(511);
                                            }
                                        });
                                    } else {
                                        console.log('Zip part folder created. \n');

                                        var file_ext;

                                        switch (file_mime_type) {
                                            case "application/zip":
                                                file_ext = ".zip";
                                                break;

                                            case "application/x-zip-compressed":
                                                file_ext = ".zip";
                                                break;

                                            case "multipart/x-zip":
                                                file_ext = ".zip";
                                                break;

                                            default:
                                                console.log("file type is not allowed.");

                                                fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                    if (error) {
                                                        console.log(error);
                                                    }
                                                    else {
                                                        console.log("Recursive: Directories Deleted!");

                                                        fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                            if (error) {
                                                                console.log(error);
                                                            }
                                                            else {
                                                                console.log("Recursive: Directories Deleted!");
                                                                res.sendStatus(510);
                                                                return;
                                                            }
                                                        });
                                                    }
                                                });
                                        }

                                        var file_name_1 = req.files.file.name;

                                        sampleFile = req.files.file;
                                        uploadPath = __dirname + "/zip/" + temp_1 + "/" + file_name_1;

                                        sampleFile.mv(uploadPath, function (err) {
                                            if (err) {
                                                console.log(err);

                                                fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                    if (error) {
                                                        console.log(error);
                                                    }
                                                    else {
                                                        console.log("Recursive: Directories Deleted!");

                                                        fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                            if (error) {
                                                                console.log(error);
                                                            }
                                                            else {
                                                                console.log("Recursive: Directories Deleted!");
                                                                res.sendStatus(512);
                                                            }
                                                        });
                                                    }
                                                });
                                            } else {
                                                console.log("File uploaded!");

                                                async function main() {
                                                    try {
                                                        await extractZip(uploadPath, { dir: __dirname + '/uploads/' + temp_1 });
                                                        console.log('Extraction complete.');

                                                        fs.readdir(__dirname + '/uploads/' + temp_1, (err, files) => {
                                                            if (err) {
                                                                console.log(err);

                                                                fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                                    if (error) {
                                                                        console.log(error);
                                                                    }
                                                                    else {
                                                                        console.log("Recursive: Directories Deleted!");

                                                                        fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                            if (error) {
                                                                                console.log(error);
                                                                            }
                                                                            else {
                                                                                console.log("Recursive: Directories Deleted!");
                                                                                res.sendStatus(513);
                                                                            }
                                                                        });
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
                                                                        var oldPath = __dirname + '/uploads/' + temp_1 + '/' + gltf_File[0];
                                                                        console.log(oldPath);
                                                                        var newPath = __dirname + '/uploads/' + temp_1 + '/' + newFileName;
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

                                                                                        fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                                            if (error) {
                                                                                                console.log(error);
                                                                                            }
                                                                                            else {
                                                                                                console.log("Recursive: Directories Deleted!");
                                                                                                res.sendStatus(514);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                            else {
                                                                                console.log("\nFile Renamed!\n");

                                                                                var parent_folder_id = req.body.parent_folder_id;
                                                                                var asset_format = 'N.A.';

                                                                                if (parent_folder_id == 'main') {
                                                                                    parent_folder_id = 'N.A.';
                                                                                    asset_format = 'main';
                                                                                }
                                                                                else {
                                                                                    parent_folder_id = req.body.parent_folder_id;
                                                                                    asset_format = 'N.A.';
                                                                                }

                                                                                var user_id = req.body.user_id;
                                                                                var asset_name = '/' + temp_1 + '/' + newFileName; //   /5cce-809b/5cce-809b.gltf
                                                                                console.log(asset_name);
                                                                                var asset_extension = '.gltf';
                                                                                var asset_type = 'file';

                                                                                var asset_original_name = gltf_File[0];

                                                                                var FileUploadData = require("./DBFileUploadDetails");
                                                                                FileUploadData.DBFileUploadData(user_id, parent_folder_id, asset_name, asset_original_name, asset_format, asset_extension, asset_type, function (DBErr, DBSuccess) {
                                                                                    if (DBErr) {
                                                                                        console.log("Asset Insert db error!");
                                                                                        console.log(DBErr);

                                                                                        fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                                                            if (error) {
                                                                                                console.log(error);
                                                                                            }
                                                                                            else {
                                                                                                console.log("Recursive: Directories Deleted!");

                                                                                                fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                                                    if (error) {
                                                                                                        console.log(error);
                                                                                                    }
                                                                                                    else {
                                                                                                        console.log("Recursive: Directories Deleted!");
                                                                                                        res.sendStatus(502); // User not registred
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        });
                                                                                    } else {
                                                                                        console.log("Asset data inserted successfully ! \n");
                                                                                        console.log(DBSuccess);
                                                                                        res.sendStatus(200);
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                    else {
                                                                        console.log('zip files uploaded not supported.');

                                                                        fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                                            if (error) {
                                                                                console.log(error);
                                                                            }
                                                                            else {
                                                                                console.log("Recursive: Directories Deleted!");

                                                                                fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                                    if (error) {
                                                                                        console.log(error);
                                                                                    }
                                                                                    else {
                                                                                        console.log("Recursive: Directories Deleted!");
                                                                                        res.sendStatus(517);
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                                else {
                                                                    console.log('zip folder contains multiple sub folders');

                                                                    fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                                        if (error) {
                                                                            console.log(error);
                                                                        }
                                                                        else {
                                                                            console.log("Recursive: Directories Deleted!");

                                                                            fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                                if (error) {
                                                                                    console.log(error);
                                                                                }
                                                                                else {
                                                                                    console.log("Recursive: Directories Deleted!");
                                                                                    res.sendStatus(516);
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    } catch (err) {
                                                        console.log(err);

                                                        fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                            if (error) {
                                                                console.log(error);
                                                            }
                                                            else {
                                                                console.log("Recursive: Directories Deleted!");

                                                                fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                    if (error) {
                                                                        console.log(error);
                                                                    }
                                                                    else {
                                                                        console.log("Recursive: Directories Deleted!");
                                                                        res.sendStatus(515);
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                }
                                                main();
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                    else {
                        console.log('Other File Type. \n');

                        var file_ext;

                        switch (file_mime_type) {
                            case "image/jpeg":
                                file_ext = ".jpeg";
                                break;

                            case "image/jpg":
                                file_ext = ".jpg";
                                break;

                            case "image/png":
                                file_ext = ".png";
                                break;

                            case "image/gif":
                                file_ext = ".gif";
                                break;

                            case "audio/wav":
                                file_ext = ".wav";
                                break;

                            case "audio/mpeg":
                                file_ext = ".mp3";
                                break;

                            case "video/mp4":
                                file_ext = ".mp4";
                                break;

                            case "application/octet-stream":
                                var flNm = req.files.file.name;
                                var lastFour = flNm.substr(flNm.length - 4);
                                if (lastFour == '.glb') {
                                    file_ext = ".glb";
                                    break;
                                } else {
                                    res.sendStatus(510);
                                    break;
                                }

                            default:
                                console.log("file type is not allowed.");
                                res.sendStatus(510);
                                return;
                        }

                        var r_string = crypto.randomBytes(20).toString("hex");
                        var temp_1 = uuid.fromString(r_string);

                        var file_name_2 = temp_1 + '' + file_ext;
                        console.log(file_name_2);

                        var asset_original_name = req.files.file.name;
                        console.log(asset_original_name);

                        sampleFile = req.files.file,
                            png_file = file_name_2;
                        uploadPath = __dirname + "/uploads/" + png_file;

                        sampleFile.mv(uploadPath, function (err) {
                            if (err) {
                                console.log(err);
                                res.sendStatus(512);
                            } else {
                                console.log("File uploaded!");

                                var parent_folder_id = req.body.parent_folder_id;
                                var asset_format = 'N.A.';

                                if (parent_folder_id == 'main') {
                                    parent_folder_id = 'N.A.';
                                    asset_format = 'main';
                                }
                                else {
                                    parent_folder_id = req.body.parent_folder_id;
                                    asset_format = 'N.A.';
                                }

                                var user_id = req.body.user_id;
                                var asset_name = file_name_2;
                                var asset_extension = file_ext;
                                var asset_type = 'file';

                                var FileUploadData = require("./DBFileUploadDetails");
                                FileUploadData.DBFileUploadData(user_id, parent_folder_id, asset_name, asset_original_name, asset_format, asset_extension, asset_type, function (DBErr, DBSuccess) {
                                    if (DBErr) {
                                        console.log("Asset Insert db error!");
                                        console.log(DBErr);
                                        res.sendStatus(502); // User not registred
                                    } else {
                                        console.log("Asset data inserted successfully ! \n");
                                        console.log(DBSuccess);
                                        res.sendStatus(200);
                                    }
                                });
                            }
                        });
                    }
                }
                else {
                    console.log('Multiple File types. \n');

                    function audit_files(z) {
                        console.log(z + '\n');

                        if (z < req.files.file.length) {

                            var file_mime_type = req.files.file[z].mimetype;

                            console.log("file_mime_type: ", file_mime_type);

                            if (file_mime_type == 'application/zip' || file_mime_type == 'application/x-zip-compressed' || file_mime_type == 'multipart/x-zip') {

                                console.log('Zip File type. \n');

                                var r_string = crypto.randomBytes(20).toString("hex");
                                var temp_1 = uuid.fromString(r_string);
                                console.log(temp_1);

                                var folder_path = __dirname + "/uploads/" + temp_1;
                                var folder_path_2 = __dirname + "/zip/" + temp_1;

                                fs.mkdir(folder_path, { recursive: true }, function (err) {
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(511);
                                    } else {
                                        console.log('Upload part folder created. \n');

                                        fs.mkdir(folder_path_2, { recursive: true }, function (err) {
                                            if (err) {
                                                console.log(err);

                                                fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                    if (error) {
                                                        console.log(error);
                                                    }
                                                    else {
                                                        console.log("Recursive: Directories Deleted!");
                                                        res.sendStatus(511);
                                                    }
                                                });
                                            } else {
                                                console.log('Zip part folder created. \n');

                                                var file_ext;

                                                switch (file_mime_type) {
                                                    case "application/zip":
                                                        file_ext = ".zip";
                                                        break;

                                                    case "application/x-zip-compressed":
                                                        file_ext = ".zip";
                                                        break;

                                                    case "multipart/x-zip":
                                                        file_ext = ".zip";
                                                        break;

                                                    default:
                                                        console.log("file type is not allowed.");

                                                        fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                            if (error) {
                                                                console.log(error);
                                                            }
                                                            else {
                                                                console.log("Recursive: Directories Deleted!");

                                                                fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                    if (error) {
                                                                        console.log(error);
                                                                    }
                                                                    else {
                                                                        console.log("Recursive: Directories Deleted!");
                                                                        res.sendStatus(510);
                                                                        return;
                                                                    }
                                                                });
                                                            }
                                                        });
                                                }

                                                var file_name_1 = req.files.file[z].name;

                                                sampleFile = req.files.file[z];
                                                uploadPath = __dirname + "/zip/" + temp_1 + "/" + file_name_1;

                                                sampleFile.mv(uploadPath, function (err) {
                                                    if (err) {
                                                        console.log(err);

                                                        fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                            if (error) {
                                                                console.log(error);
                                                            }
                                                            else {
                                                                console.log("Recursive: Directories Deleted!");

                                                                fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                    if (error) {
                                                                        console.log(error);
                                                                    }
                                                                    else {
                                                                        console.log("Recursive: Directories Deleted!");
                                                                        res.sendStatus(512);
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    } else {
                                                        console.log("File uploaded!");

                                                        async function main() {
                                                            try {
                                                                await extractZip(uploadPath, { dir: __dirname + '/uploads/' + temp_1 });
                                                                console.log('Extraction complete.');

                                                                fs.readdir(__dirname + '/uploads/' + temp_1, (err, files) => {
                                                                    if (err) {
                                                                        console.log(err);

                                                                        fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                                            if (error) {
                                                                                console.log(error);
                                                                            }
                                                                            else {
                                                                                console.log("Recursive: Directories Deleted!");

                                                                                fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                                    if (error) {
                                                                                        console.log(error);
                                                                                    }
                                                                                    else {
                                                                                        console.log("Recursive: Directories Deleted!");
                                                                                        res.sendStatus(513);
                                                                                    }
                                                                                });
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
                                                                                var oldPath = __dirname + '/uploads/' + temp_1 + '/' + gltf_File[0];
                                                                                var newPath = __dirname + '/uploads/' + temp_1 + '/' + newFileName;

                                                                                fs.rename(oldPath, newPath, (error) => {
                                                                                    if (error) {
                                                                                        console.log(error);

                                                                                        fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                                                            if (error) {
                                                                                                console.log(error);
                                                                                            }
                                                                                            else {
                                                                                                console.log("Recursive: Directories Deleted!");

                                                                                                fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                                                    if (error) {
                                                                                                        console.log(error);
                                                                                                    }
                                                                                                    else {
                                                                                                        console.log("Recursive: Directories Deleted!");
                                                                                                        res.sendStatus(514);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    else {
                                                                                        console.log("\nFile Renamed!\n");

                                                                                        var parent_folder_id = req.body.parent_folder_id;
                                                                                        var asset_format = 'N.A.';

                                                                                        if (parent_folder_id == 'main') {
                                                                                            parent_folder_id = 'N.A.';
                                                                                            asset_format = 'main';
                                                                                        }
                                                                                        else {
                                                                                            parent_folder_id = req.body.parent_folder_id;
                                                                                            asset_format = 'N.A.';
                                                                                        }

                                                                                        var user_id = req.body.user_id;
                                                                                        var asset_name = '/' + temp_1 + '/' + newFileName; //   /5cce-809b/5cce-809b.gltf
                                                                                        console.log(asset_name);
                                                                                        var asset_extension = '.gltf';
                                                                                        var asset_type = 'file';

                                                                                        var asset_original_name = gltf_File[0];

                                                                                        var FileUploadData = require("./DBFileUploadDetails");
                                                                                        FileUploadData.DBFileUploadData(user_id, parent_folder_id, asset_name, asset_original_name, asset_format, asset_extension, asset_type, function (DBErr, DBSuccess) {
                                                                                            if (DBErr) {
                                                                                                console.log("Asset Insert db error!");
                                                                                                console.log(DBErr);

                                                                                                fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                                                                    if (error) {
                                                                                                        console.log(error);
                                                                                                    }
                                                                                                    else {
                                                                                                        console.log("Recursive: Directories Deleted!");

                                                                                                        fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                                                            if (error) {
                                                                                                                console.log(error);
                                                                                                            }
                                                                                                            else {
                                                                                                                console.log("Recursive: Directories Deleted!");
                                                                                                                res.sendStatus(502); // User not registred
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                });
                                                                                            } else {
                                                                                                console.log("Asset data inserted successfully ! \n");
                                                                                                console.log(DBSuccess);
                                                                                                // res.sendStatus(200);

                                                                                                z++;
                                                                                                audit_files(z);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                            else {
                                                                                console.log('zip files uploaded not supported.');

                                                                                fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                                                    if (error) {
                                                                                        console.log(error);
                                                                                    }
                                                                                    else {
                                                                                        console.log("Recursive: Directories Deleted!");

                                                                                        fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                                            if (error) {
                                                                                                console.log(error);
                                                                                            }
                                                                                            else {
                                                                                                console.log("Recursive: Directories Deleted!");
                                                                                                res.sendStatus(517);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                        else {
                                                                            console.log('zip folder contains multiple sub folders');

                                                                            fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                                                if (error) {
                                                                                    console.log(error);
                                                                                }
                                                                                else {
                                                                                    console.log("Recursive: Directories Deleted!");

                                                                                    fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                                        if (error) {
                                                                                            console.log(error);
                                                                                        }
                                                                                        else {
                                                                                            console.log("Recursive: Directories Deleted!");
                                                                                            res.sendStatus(516);
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                            } catch (err) {
                                                                console.log(err);

                                                                fs.rmdir(folder_path, { recursive: true, }, (error) => {
                                                                    if (error) {
                                                                        console.log(error);
                                                                    }
                                                                    else {
                                                                        console.log("Recursive: Directories Deleted!");

                                                                        fs.rmdir(folder_path_2, { recursive: true, }, (error) => {
                                                                            if (error) {
                                                                                console.log(error);
                                                                            }
                                                                            else {
                                                                                console.log("Recursive: Directories Deleted!");
                                                                                res.sendStatus(515);
                                                                            }
                                                                        });
                                                                    }
                                                                });

                                                                // z++;
                                                                // audit_files(z);
                                                            }
                                                        }
                                                        main();
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                var file_ext;

                                console.log('Other File type. \n');

                                switch (file_mime_type) {
                                    case "image/jpeg":
                                        file_ext = ".jpeg";
                                        break;

                                    case "image/jpg":
                                        file_ext = ".jpg";
                                        break;

                                    case "image/png":
                                        file_ext = ".png";
                                        break;

                                    case "image/gif":
                                        file_ext = ".gif";
                                        break;

                                    case "audio/wav":
                                        file_ext = ".wav";
                                        break;

                                    case "audio/mpeg":
                                        file_ext = ".mp3";
                                        break;

                                    case "video/mp4":
                                        file_ext = ".mp4";
                                        break;

                                    case "application/octet-stream":
                                        var flNm = req.files.file[z].name;
                                        var lastFour = flNm.substr(flNm.length - 4);
                                        if (lastFour == ".glb") {
                                            file_ext = ".glb";
                                            break;
                                        } else {
                                            res.sendStatus(510);
                                            break;
                                        }

                                    default:
                                        console.log("file type is not allowed.");
                                        res.sendStatus(510);
                                        return;
                                }

                                var r_string = crypto.randomBytes(20).toString("hex");
                                var temp_1 = uuid.fromString(r_string);
                                console.log(temp_1);

                                var file_name_2 = temp_1 + '' + file_ext;
                                console.log(file_name_2);

                                var asset_original_name = req.files.file[z].name;
                                console.log(asset_original_name);

                                sampleFile = req.files.file[z],
                                    png_file = file_name_2;
                                uploadPath = __dirname + "/uploads/" + png_file;

                                sampleFile.mv(uploadPath, function (err) {
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(512);
                                    } else {
                                        console.log("File uploaded!");

                                        var parent_folder_id = req.body.parent_folder_id;
                                        var asset_format = 'N.A.';

                                        if (parent_folder_id == 'main') {
                                            parent_folder_id = 'N.A.';
                                            asset_format = 'main';
                                        }
                                        else {
                                            parent_folder_id = req.body.parent_folder_id;
                                            asset_format = 'N.A.';
                                        }

                                        var user_id = req.body.user_id;
                                        var asset_name = file_name_2;
                                        var asset_extension = file_ext;
                                        var asset_type = 'file';

                                        var FileUploadData = require("./DBFileUploadDetails");
                                        FileUploadData.DBFileUploadData(user_id, parent_folder_id, asset_name, asset_original_name, asset_format, asset_extension, asset_type, function (DBErr, DBSuccess) {
                                            if (DBErr) {
                                                console.log("Asset Insert db error!");
                                                console.log(DBErr);
                                                res.sendStatus(502); // User not registred
                                            } else {
                                                console.log("Asset data inserted successfully ! \n");
                                                console.log(DBSuccess);
                                                z++;
                                                audit_files(z);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                        else {
                            console.log('Multiple Files uploaded.');
                            res.sendStatus(200);
                        }
                    }
                    audit_files(0);
                }
            }
        });
    }
});

// app.post('/upload_additional_files_gltf', function (req, res) {
//     console.log("getting body",req.body);
//     console.log("getting body",req.files);
//     console.log('');
//     // console.log("getting files",req.files);
//     console.log('');
//     const filename = req.files
//     console.log(filename)

//     var session_id = req.body.session_id;
//     var user_id = req.body.user_id;
//     var folder_name = req.body.folder_name;

//     console.log(JSON.parse(req.body.test12));

//     var folder_structure_bin = JSON.parse(req.body.folder_structure_bin);
//     var folder_structure_img = JSON.parse(req.body.folder_structure_img);

//     var initial_bin_files = JSON.parse(req.body.initial_bin_files);
//     var initial_img_files = JSON.parse(req.body.initial_img_files);

//     console.log(folder_structure_bin.length);
//     console.log(folder_structure_bin[0]);

//     console.log(folder_structure_img.length);
//     console.log(folder_structure_img[0]);

//     console.log(initial_bin_files);
//     console.log(initial_img_files);

//     console.log(req.files.bin_file);
//     console.log(req.files.bin_file.length);
//     console.log(req.files.png_for_gltf);
//     console.log(req.files.png_for_gltf.length);

//     var DBSession = require("./DBSession");
//     DBSession.DB_CheckSession(session_id, function (DBErr, u_id) {
//         if (DBErr > 0) {
//             console.log("DB Session Error!");
//             console.log(DBErr);
//             res.sendStatus(501);
//             // res.render(__dirname + "/pages/index.html");
//         } else {
//             creating_bin_files();
//         }
//     });

//     function creating_bin_files() {
//         if ((folder_structure_bin.length > 0) && (folder_structure_bin.length == 1)) {
//             if (folder_structure_bin[0] == '') {
//                 if (req.files.bin_file.length == undefined || req.files.bin_file.length == 'undefined') // It means there is only 1 file
//                 {
//                     var file_ext, file_mime_type;

//                     file_mime_type = req.files.bin_file.mimetype;

//                     console.log("file_mime_type: ", file_mime_type);

//                     switch (file_mime_type) {
//                         case "application/octet-stream":
//                             file_ext = ".bin";
//                             break;

//                         case "image/jpeg":
//                             file_ext = ".jpg";
//                             break;

//                         case "image/png":
//                             file_ext = ".png";
//                             break;

//                         case "image/gif":
//                             file_ext = ".gif";
//                             break;

//                         default:
//                             console.log("file type is not allowed.");
//                             res.sendStatus(510);
//                             return;
//                     }

//                     var file_name3 = req.files.bin_file.name;

//                     sampleFile = req.files.bin_file,
//                         bin_file = file_name3;
//                     uploadPath = __dirname + "/public/uploads/3D_UploadedFiles/" + folder_name + "/" + bin_file;

//                     sampleFile.mv(uploadPath, function (err) {
//                         if (err) {
//                             console.log(err);
//                             res.sendStatus(512);
//                         } else {
//                             console.log("File uploaded!");

//                             // call function for uploading image files
//                             creating_image_files();
//                         }
//                     });
//                 } else {
//                     function file_upload_bin_empty(d) {
//                         if (d < initial_bin_files.length) {
//                             var file_ext, file_mime_type;

//                             file_mime_type = req.files.bin_file[d].mimetype;

//                             console.log("file_mime_type: ", file_mime_type);

//                             switch (file_mime_type) {
//                                 case "application/octet-stream":
//                                     file_ext = ".bin";
//                                     break;

//                                 case "image/jpeg":
//                                     file_ext = ".jpg";
//                                     break;

//                                 case "image/png":
//                                     file_ext = ".png";
//                                     break;

//                                 case "image/gif":
//                                     file_ext = ".gif";
//                                     break;

//                                 default:
//                                     console.log("file type is not allowed.");
//                                     res.sendStatus(510);
//                                     return;
//                             }

//                             var file_name3 = req.files.bin_file[d].name;

//                             sampleFile = req.files.bin_file[d],
//                                 bin_file = file_name3;
//                             uploadPath = __dirname + "/public/uploads/3D_UploadedFiles/" + folder_name + "/" + bin_file;

//                             sampleFile.mv(uploadPath, function (err) {
//                                 if (err) {
//                                     console.log(err);
//                                     res.sendStatus(512);
//                                 } else {
//                                     console.log("File uploaded!");
//                                     d++;
//                                     file_upload_bin_empty(d);
//                                 }
//                             });
//                         } else {
//                             // call function for uploading image files
//                             creating_image_files();
//                         }
//                     }
//                     file_upload_bin_empty(0);
//                 }
//             } else {
//                 // create single directory
//                 console.log('create single directory');

//                 console.log(folder_structure_bin[0]);
//                 var sub_folder_name = folder_structure_bin[0];

//                 var path = __dirname + "/public/uploads/3D_UploadedFiles/" + folder_name + "/" + sub_folder_name;

//                 fs.mkdir(path, {
//                     recursive: true
//                 }, function (err) {
//                     if (err) {
//                         console.log(err);
//                         res.sendStatus(511);
//                     } else {
//                         console.log("Folder creation done.");

//                         if (req.files.bin_file.length == undefined || req.files.bin_file.length == 'undefined') // It means there is only 1 file
//                         {
//                             var file_ext, file_mime_type;

//                             file_mime_type = req.files.bin_file.mimetype;

//                             console.log("file_mime_type: ", file_mime_type);

//                             switch (file_mime_type) {
//                                 case "application/octet-stream":
//                                     file_ext = ".bin";
//                                     break;

//                                 case "image/jpeg":
//                                     file_ext = ".jpg";
//                                     break;

//                                 case "image/png":
//                                     file_ext = ".png";
//                                     break;

//                                 case "image/gif":
//                                     file_ext = ".gif";
//                                     break;

//                                 default:
//                                     console.log("file type is not allowed.");
//                                     res.sendStatus(510);
//                                     return;
//                             }

//                             var file_name3 = req.files.bin_file.name;

//                             sampleFile = req.files.bin_file,
//                                 bin_file = file_name3;
//                             uploadPath = __dirname + "/public/uploads/3D_UploadedFiles/" + folder_name + "/" + bin_file;

//                             sampleFile.mv(uploadPath, function (err) {
//                                 if (err) {
//                                     console.log(err);
//                                     res.sendStatus(512);
//                                 } else {
//                                     console.log("File uploaded!");

//                                     // call function for uploading image files
//                                     creating_image_files();
//                                 }
//                             });
//                         } else {
//                             function file_upload_bin_empty1(d) {
//                                 if (d < initial_bin_files.length) {
//                                     var file_ext, file_mime_type;

//                                     file_mime_type = req.files.bin_file[d].mimetype;

//                                     console.log("file_mime_type", file_mime_type);

//                                     switch (file_mime_type) {
//                                         case "application/octet-stream":
//                                             file_ext = ".bin";
//                                             break;

//                                         case "image/jpeg":
//                                             file_ext = ".jpg";
//                                             break;

//                                         case "image/png":
//                                             file_ext = ".png";
//                                             break;

//                                         case "image/gif":
//                                             file_ext = ".gif";
//                                             break;

//                                         default:
//                                             console.log("file type is not allowed.");
//                                             res.sendStatus(510);
//                                             return;
//                                     }

//                                     var file_name3 = req.files.bin_file[d].name;

//                                     sampleFile = req.files.bin_file[d],
//                                         bin_file = file_name3;
//                                     uploadPath = __dirname + "/public/uploads/3D_UploadedFiles/" + folder_name + "/" + sub_folder_name + "/" + bin_file;

//                                     sampleFile.mv(uploadPath, function (err) {
//                                         if (err) {
//                                             console.log(err);
//                                             res.sendStatus(512);
//                                         } else {
//                                             console.log("File uploaded!");
//                                             d++;
//                                             file_upload_bin_empty1(d);
//                                         }
//                                     });
//                                 } else {
//                                     // call function for uploading image files
//                                     creating_image_files();
//                                 }
//                             }
//                             file_upload_bin_empty1(0);
//                         }
//                     }
//                 });
//             }
//         } else {
//             // create function for creating multiple sub folders
//             console.log('create function for creating multiple sub folders');
//             res.sendStatus(513);
//         }
//     }

//     function creating_image_files() {
//         if ((folder_structure_img.length > 0) && (folder_structure_img.length == 1)) {
//             if (folder_structure_img[0] == '') {
//                 if (req.files.png_for_gltf.length == undefined || req.files.png_for_gltf.length == 'undefined') {
//                     var file_ext, file_mime_type;

//                     file_mime_type = req.files.png_for_gltf.mimetype;

//                     console.log("file_mime_type", file_mime_type);

//                     switch (file_mime_type) {
//                         case "application/octet-stream":
//                             file_ext = ".bin";
//                             break;

//                         case "image/jpeg":
//                             file_ext = ".jpg";
//                             break;

//                         case "image/png":
//                             file_ext = ".png";
//                             break;

//                         case "image/gif":
//                             file_ext = ".gif";
//                             break;

//                         default:
//                             console.log("file type is not allowed.");
//                             res.sendStatus(510);
//                             return;
//                     }

//                     var file_name3 = req.files.png_for_gltf.name;

//                     sampleFile = req.files.png_for_gltf,
//                         png_for_gltf = file_name3;
//                     uploadPath = __dirname + "/public/uploads/3D_UploadedFiles/" + folder_name + "/" + png_for_gltf;

//                     sampleFile.mv(uploadPath, function (err) {
//                         if (err) {
//                             console.log(err);
//                             res.sendStatus(512);
//                         } else {
//                             console.log("File uploaded!");

//                             res.sendStatus(200);
//                         }
//                     });
//                 } else {
//                     function file_upload_img_empty(k) {
//                         if (k < initial_img_files.length) {
//                             var file_ext, file_mime_type;

//                             file_mime_type = req.files.png_for_gltf[k].mimetype;

//                             console.log("file_mime_type", file_mime_type);

//                             switch (file_mime_type) {
//                                 case "application/octet-stream":
//                                     file_ext = ".bin";
//                                     break;

//                                 case "image/jpeg":
//                                     file_ext = ".jpg";
//                                     break;

//                                 case "image/png":
//                                     file_ext = ".png";
//                                     break;

//                                 case "image/gif":
//                                     file_ext = ".gif";
//                                     break;

//                                 default:
//                                     console.log("file type is not allowed.");
//                                     res.sendStatus(510);
//                                     return;
//                             }

//                             var file_name3 = req.files.png_for_gltf[k].name;

//                             sampleFile = req.files.png_for_gltf[k],
//                                 png_for_gltf = file_name3;
//                             uploadPath = __dirname + "/public/uploads/3D_UploadedFiles/" + folder_name + "/" + png_for_gltf;

//                             sampleFile.mv(uploadPath, function (err) {
//                                 if (err) {
//                                     console.log(err);
//                                     res.sendStatus(512);
//                                 } else {
//                                     console.log("File uploaded!");
//                                     k++;
//                                     file_upload_img_empty(k);
//                                 }
//                             });
//                         } else {
//                             res.sendStatus(200);
//                         }
//                     }
//                     file_upload_img_empty(0);
//                 }
//             } else {
//                 // create single directory images part
//                 console.log('create single directory images part');

//                 console.log(folder_structure_img[0]);
//                 var sub_folder_name = folder_structure_img[0];

//                 var path = __dirname + "/public/uploads/3D_UploadedFiles/" + folder_name + "/" + sub_folder_name;

//                 fs.mkdir(path, {
//                     recursive: true
//                 }, function (err) {
//                     if (err) {
//                         console.log(err);
//                         res.sendStatus(511);
//                     } else {
//                         console.log("Folder creation done.");

//                         if (req.files.png_for_gltf.length == undefined || req.files.png_for_gltf.length == 'undefined') {
//                             var file_ext, file_mime_type;

//                             file_mime_type = req.files.png_for_gltf.mimetype;

//                             console.log("file_mime_type", file_mime_type);

//                             switch (file_mime_type) {
//                                 case "application/octet-stream":
//                                     file_ext = ".bin";
//                                     break;

//                                 case "image/jpeg":
//                                     file_ext = ".jpg";
//                                     break;

//                                 case "image/png":
//                                     file_ext = ".png";
//                                     break;

//                                 case "image/gif":
//                                     file_ext = ".gif";
//                                     break;

//                                 default:
//                                     console.log("file type is not allowed.");
//                                     res.sendStatus(510);
//                                     return;
//                             }

//                             var file_name3 = req.files.png_for_gltf.name;

//                             sampleFile = req.files.png_for_gltf,
//                                 png_for_gltf = file_name3;
//                             uploadPath = __dirname + "/public/uploads/3D_UploadedFiles/" + folder_name + "/" + sub_folder_name + "/" + png_for_gltf;

//                             sampleFile.mv(uploadPath, function (err) {
//                                 if (err) {
//                                     console.log(err);
//                                     res.sendStatus(512);
//                                 } else {
//                                     console.log("File uploaded!");

//                                     res.sendStatus(200);
//                                 }
//                             });
//                         } else {
//                             function file_upload_img_empty1(k) {
//                                 if (k < initial_img_files.length) {
//                                     var file_ext, file_mime_type;

//                                     file_mime_type = req.files.png_for_gltf[k].mimetype;

//                                     console.log("file_mime_type", file_mime_type);

//                                     switch (file_mime_type) {
//                                         case "application/octet-stream":
//                                             file_ext = ".bin";
//                                             break;

//                                         case "image/jpeg":
//                                             file_ext = ".jpg";
//                                             break;

//                                         case "image/png":
//                                             file_ext = ".png";
//                                             break;

//                                         case "image/gif":
//                                             file_ext = ".gif";
//                                             break;

//                                         default:
//                                             console.log("file type is not allowed.");
//                                             res.sendStatus(510);
//                                             return;
//                                     }

//                                     var file_name3 = req.files.png_for_gltf[k].name;

//                                     sampleFile = req.files.png_for_gltf[k],
//                                         png_for_gltf = file_name3;
//                                     uploadPath = __dirname + "/public/uploads/3D_UploadedFiles/" + folder_name + "/" + sub_folder_name + "/" + png_for_gltf;

//                                     sampleFile.mv(uploadPath, function (err) {
//                                         if (err) {
//                                             console.log(err);
//                                             res.sendStatus(512);
//                                         } else {
//                                             console.log("File uploaded!");
//                                             k++;
//                                             file_upload_img_empty1(k);
//                                         }
//                                     });
//                                 } else {
//                                     res.sendStatus(200);
//                                 }
//                             }
//                             file_upload_img_empty1(0);
//                         }
//                     }
//                 });
//             }
//         } else {
//             // create function for creating multiple sub folders
//             console.log('create function for creating multiple sub folders');
//             res.sendStatus(513);
//         }
//     }
// });


app.post("/get_subfolder_details", function(req, res) {

    // var user_id = req.body.user_id;
    var session_id = req.body.session_id;
    var folder_id = req.body.folder_id;

    console.log("session_id", session_id);

    var host_url = req.headers.host;

    if (host_url == "127.0.0.1:3000") {
        console.log("Inside Dashboard Session ID:");

        if (session_id == undefined || session_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
        } else {
            var s_id = session_id;
            console.log("s_id");

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function(DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                } else {
                    console.log("User is loged in!")

                    var getsubfolder = require("./DBsubdirectoryquerry");
                    getsubfolder.DB_getsubfolder(folder_id, function(DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("did'nt get querry error!");
                            console.log(DBErr);
                            res.sendStatus(502); // User not registred
                        } else {
                            console.log("got querry");
                            res.send(DBSuccess);
                        }
                    });


                }
            });
        }
    } else {
        res.sendStatus(504);
    }
});

app.post("/get_sub_directory", function(req, res) {

    var user_id = req.body.user_id;
    var session_id = req.body.session_id;
    var folder_id = req.body.folder_id;
    var asset_name = req.body.asset_name;

    var host_url = req.headers.host;

    console.log(user_id, "user_id");
    console.log(session_id, "session_id");
    console.log(folder_id, "folder_id");

    var sub_folder_id = req.body.folder_id;

    if (host_url == "127.0.0.1:3000") {
        console.log("Inside Dashboard Session ID:");

        if (session_id == undefined || session_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
        } else {
            var s_id = session_id;
            console.log("s_id");

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function(DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                } else {
                    console.log("User is loged in!")

                    var dbsub_dir = require("./DBsubdirectoryquerry");
                    dbsub_dir.db_getfolder(folder_id, asset_name, user_id, function(DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("folder name error!");
                            console.log(DBErr);
                            res.sendStatus(502); // User not registred
                        } else {
                            console.log("folder name get");
                            console.log("directory:", DBSuccess);

                            if (DBSuccess.Items.length > 0) {

                                console.log(DBSuccess.Items[0].asset_name);

                                var folder_id = DBSuccess.Items[0].folder_id;

                                // var sub_folder_path = __dirname + "/uploads/user_id/sub_folder_id/file_name";
                                var sub_folder_path = __dirname + "/uploads/" + DBSuccess.Items[0].asset_name + "/" + asset_name;
                                fs.mkdir(sub_folder_path, { recursive: true }, function(err) {
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(511);
                                    } else {
                                        console.log("Folder creationss done.");

                                        var dbisub_dir = require("./DBsubdirectoryquerry");
                                        dbisub_dir.db_insub_directory(user_id, folder_id, asset_name, function(DBErr, DBSuccess) {
                                            if (DBErr) {
                                                console.log("subfolder db error!");
                                                console.log(DBErr);
                                                res.sendStatus(502); // User not registred
                                            } else {
                                                console.log("sub-folder created");
                                                console.log(DBSuccess);
                                                res.sendStatus(200);
                                            }
                                        });
                                    }
                                });
                            } else {

                                console.log('');
                                console.log('sub_folder_id');
                                console.log(sub_folder_id);
                                console.log('');

                                var dbisub_dir = require("./DBsubdirectoryquerry");
                                dbisub_dir.db_insub_directory(user_id, sub_folder_id, asset_name, function(DBErr, DBSuccess) {
                                    if (DBErr) {
                                        console.log("subfolder db error!");
                                        console.log(DBErr);
                                        res.sendStatus(502); // User not registred
                                    } else {
                                        console.log("sub-folder created");
                                        console.log(DBSuccess);
                                        res.sendStatus(200);
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    } else {
        res.sendStatus(504);
    }
});



app.post("/fetch_sub_folders", function (req, res) {

    var folder_id = req.body.folder_id;  // folder id
    var session_id = req.body.session_id;

    var host_url = req.headers.host;
    console.log("session_id", session_id);
    if (host_url == this_host) {
        console.log("Inside Dashboard Session ID:");

        if (session_id == undefined || session_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
            // ERROR INVALID SESSION
        } else {
            var s_id = session_id;
            console.log("s_id");

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                    // ERROR SESSION 
                } else {
                    console.log("User is loged in!");

                    var SubFolderFetch = require("./DBOperation");
                    SubFolderFetch.Fetch_sub_folders(folder_id, function (DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("DB ERROR");
                            console.log(DBErr);
                            res.sendStatus(502);
                            // DB ERROR
                        } else {
                            console.log("GOT SUB FOLDERS !");
                            res.send(DBSuccess);
                        }
                    });

                }
            });
        }
    } else {
        res.sendStatus(504);
        //  ERROR HOST
    }
})



app.get("/preview", function (req, res) {
    var host_url = req.headers.host;
   
   
    if (host_url == "127.0.0.1:3000" || host_url == "192.168.1.80:3000") {
        if (req.query.session_id == undefined || req.query.session_id == "undefined") {
            console.log("Invalid Session");
            res.render(__dirname + "/pages/index.html");
        } else {
            var s_id = req.query.session_id;
            var DBSession = require("./DBSession");
            console.log("s_id", s_id);
            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.render(__dirname + "/pages/index.html");
                } else {
                    res.render(__dirname + "/pages/checkbehaviour.html");
                }
            });
        }
    } else {
        res.render(__dirname + "/pages/index.html");
    }
});



var this_host = "127.0.0.1:3000";
app.post("/delete_file_or_folder_from_asset", function (req, res) {

    var id = req.body.id;  // file id - partition key
    var session_id = req.body.session_id;

    var host_url = req.headers.host;
    console.log("session_id", session_id);
    if (host_url == this_host) {
        console.log("Inside Dashboard Session ID:");

        if (session_id == undefined || session_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
            // ERROR INVALID SESSION
        } else {
            var s_id = session_id;
            console.log("s_id");

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                    // ERROR SESSION 
                } else {
                    console.log("User is loged in!");

                    var file_delete = require("./DBOperation");
                    file_delete.delete_single_file(id, function (DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("DB ERROR");
                            console.log(DBErr);
                            res.sendStatus(502);
                            // DB ERROR
                        } else {
                            console.log("FILE DELETED !");
                            res.sendStatus(200);
                        }
                    });

                }
            });
        }
    } else {
        res.sendStatus(504);
        //  ERROR HOST
    }
})


app.post("/get_experience_data", function (req, res) {
    var user_id = req.body.user_id;
    var session_id = req.body.session_id;
    

    var host_url = req.headers.host;
    console.log(user_id, "user_id");
    console.log(session_id, "session_id");

    if (host_url == "127.0.0.1:3000") {
        console.log("Inside Dashboard Session ID:");
        
        if (session_id == undefined || session_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
        } else {
            var s_id = session_id;
            console.log("s_id");

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                } else {
                    console.log("User is loged in!")

                    var exp_insert = require("./DBexperiencequerry");
                    exp_insert.DB_experience_data(user_id, function (DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("did'nt get querry error!");
                            console.log(DBErr);
                            res.sendStatus(502); // User not registred
                        } else {
                            console.log("got querry");
                            res.send(DBSuccess);
                        }
                    });


                }
            });
        }
    } else {
        res.sendStatus(504);
    }
})

app.post("/get_experience_details", function (req, res) {
    var user_id = req.body.user_id;
    var experience_id = req.body.experience_id;
    var session_id = req.body.session_id;
    

    var host_url = req.headers.host;
    console.log(user_id, "user_id");
    console.log(session_id, "session_id");
    console.log(experience_id, "experience_id");

    if (host_url == "127.0.0.1:3000") {
        console.log("Inside Dashboard Session ID:");
        
        if (session_id == undefined || session_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
        } else {
            var s_id = session_id;
            console.log("s_id");

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                } else {
                    console.log("User is loged in!")

                    var exp_insert = require("./DBexperiencequerry");
                    exp_insert.DB_experience_id(experience_id, function (DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("did'nt get querry error!");
                            console.log(DBErr);
                            res.sendStatus(502); // User not registred
                        } else {
                            // console.log("got querry");
                            console.log("DB success");
                            // console.log(DBSuccess);
                            res.send(DBSuccess);
                        }
                    });


                }
            });
        }
    } else {
        res.sendStatus(504);
    }
    


})

app.post("/save_experience_data", function(req, res) {

    var experience_data = req.body.experience_data;
    var user_id = req.body.user_id;
    var experience_id = req.body.experience_id;
    var session_id = req.body.session_id;

    var hotspot_data = req.body.hotspot_data;

    console.log("Inside Dashboard Session ID:");

    if (session_id == undefined || session_id == "undefined") {
        console.log("Invalid Session");
        res.sendStatus(500);
    } else {
        var s_id = session_id;
        console.log("s_id");

        var DBSession = require("./DBSession");
        console.log("s_id", s_id);

        DBSession.DB_CheckSession(s_id, function(DBErr, user_id) {
            if (DBErr > 0) {
                console.log("DB Session Error!");
                console.log(DBErr);
                res.sendStatus(501);
            } else {
                console.log("User is loged in!")

                var exp_insert = require("./DBexperiencequerry");
                exp_insert.DB_experience_update(experience_id, experience_data, hotspot_data, function(DBErr, DBSuccess) {
                    if (DBErr) {
                        console.log("\n" + DBErr);
                        res.sendStatus(502); // User not registred
                    } else {
                        console.log("3d Data Saved");
                        res.sendStatus(200);
                    }
                });
            }
        });
    }
});


app.post("/rename_experience", function (req, res) {
    var session_id = req.body.session_id;
    var experience_id = req.body.experience_id;
    var experience_title = req.body.experience_rename;


    var host_url = req.headers.host;
    console.log(session_id, "session_id");

    if (host_url == "127.0.0.1:3000") {
        console.log("Inside Dashboard Session ID:");

        if (session_id == undefined || session_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
        } else {
            var s_id = session_id;
            console.log("s_id");

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                } else {
                    console.log("User is loged in!")

                    var getnewname = require("./DBexperience");
                    getnewname.DB_renameexperience(experience_id,experience_title, function (DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("did'nt get querry error!");
                            console.log(DBErr);
                            res.sendStatus(502); // User not registred
                        } else {
                            console.log("experience_rename done");
                            res.send(DBSuccess);
                        }
                    });


                }
            });
        }
    } else {
        res.sendStatus(504);
    }
})


app.post("/delete_experience", function (req, res) {
    var session_id = req.body.session_id;
    var experience_id = req.body.experience_id; // stringify data of array


    var host_url = req.headers.host;
    console.log(session_id, "session_id");

    if (host_url == "127.0.0.1:3000") {
        console.log("Inside Dashboard Session ID:");

        if (session_id == undefined || session_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
        } else {
            var s_id = session_id;
            console.log("s_id");

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                } else {
                    console.log("User is loged in!")

                    var deletename = require("./DBOperation");
                    deletename.DB_delete_multi_experience(experience_id, function (DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("experience not deleted!");
                            console.log(DBErr);
                            res.sendStatus(502); // User not registred
                        } else {
                            
                            if(DBSuccess == "2")
                            {
                                console.log("experience deleted");
                                res.sendStatus(200);
                            }
                            else if(DBSuccess == "1")
                            {
                                res.sendStatus(503);

                            }
                            // reDBSuccesss.send();
                        }
                    });


                }
            });
        }
    } else {
        res.sendStatus(504);
    }
})

app.post("/copy_experience", function (req, res) {
    var session_id = req.body.session_id;
    var experience_id = req.body.experience_id;


    var host_url = req.headers.host;
    console.log(session_id, "session_id");

    if (host_url == "127.0.0.1:3000") {
        console.log("Inside Dashboard Session ID:");

        if (session_id == undefined || session_id == "undefined") {
            console.log("Invalid Session");
            res.sendStatus(500);
        } else {
            var s_id = session_id;
            console.log("s_id");

            var DBSession = require("./DBSession");
            console.log("s_id", s_id);

            DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
                if (DBErr > 0) {
                    console.log("DB Session Error!");
                    console.log(DBErr);
                    res.sendStatus(501);
                } else {
                    console.log("User is loged in!")

                    var copyname = require("./DBexperience");
                    copyname.DB_copyexperience(experience_id, function (DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("experience details not got!");
                            console.log(DBErr);
                            res.sendStatus(502); // User not registred
                        } else {
                            console.log("experience details");
                            res.send(DBSuccess);
                            console.log("experience_details:", DBSuccess);
                            
                        }
                    });


                }
            });
        }
    } else {
        res.sendStatus(504);
    }
})

app.post("/fetch_file_url", function (req, res) {

    console.log(req.body);
    console.log('');

    var s_id = req.body.session_id;
    var user_id = req.body.user_id;
    var asset_id = req.body.asset_id;

    if (s_id == undefined || s_id == "undefined") {
        console.log("Invalid Session");
        res.sendStatus(500);
    } else {
        var DBSession = require("./DBSession");
        DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
            if (DBErr > 0) {
                console.log("DB Session Error!");
                console.log(DBErr);
                res.sendStatus(501);
            } else {
                console.log("User is loged in !")

                var assetURL = require("./DBFileUploadDetails");
                assetURL.DBAssetURL(user_id, asset_id, function (DBErr, DBSuccess) {
                    if (DBErr) {
                        console.log("Asset Details not available !");
                        console.log(DBErr);
                        res.sendStatus(502); // User not registred
                    } else {
                        console.log("Asset Details :");
                        console.log(DBSuccess);
                        res.send({'url': DBSuccess[0], 'file_type': DBSuccess[1]});
                    }
                });
            }
        });
    }
});

app.post("/cut_and_copy_files_and_folders", function (req, res) {

    console.log(req.body);
    console.log('');

    var s_id = req.body.session_id;
    var method = req.body.method; // cut [or] copy
    var type = req.body.type; // file [or] folder

    var user_id = req.body.user_id;
    var asset_id = req.body.asset_id;
    var current_folder_id = req.body.current_folder_id;
    var destination_folder_id = req.body.destination_folder_id;

    var DBSession = require("./DBSession");
    DBSession.DB_CheckSession(s_id, function (DBErr, user_id) {
        if (DBErr > 0) {
            console.log("DB Session Error!");
            console.log(DBErr);
            res.sendStatus(501);
        } else {
            console.log("User session present !");

            if (type == 'file') {
                console.log(type);
                if (method == 'cut') {
                    console.log('\n', method);
                    var cutFiles = require("./DBFileUploadDetails");
                    cutFiles.DBCutFiles(user_id, asset_id, current_folder_id, destination_folder_id, function (DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("\n Folder [or] Files details not available !!!");
                            console.log(DBErr);
                            res.sendStatus(502);
                        } else {
                            console.log("\nFolder [or] File details.");
                            console.log("\n", DBSuccess);
                            res.sendStatus(200);
                        }
                    });
                }
                else if (method == 'copy') {
                    console.log('\n', method);
                    var copyFiles = require("./DBFileUploadDetails");
                    copyFiles.DBCopyFiles(user_id, asset_id, current_folder_id, destination_folder_id, function (DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("\n Folder [or] Files details not available !!!");
                            console.log(DBErr);
                            res.sendStatus(502);
                        } else {
                            console.log("\nFolder [or] File details.");
                            console.log("\n", DBSuccess);
                            res.sendStatus(200);
                        }
                    });
                }
                else {
                    res.sendStatus(500);
                }
            }
            else if (type == 'folder') {
                console.log('\n', type);
                if (method == 'cut') {
                    console.log('\n', method);
                    var cutFolders = require("./DBFileUploadDetails");
                    cutFolders.DBCutFolders(user_id, current_folder_id, destination_folder_id, function (DBErr, DBSuccess) {
                        if (DBErr) {
                            console.log("\n Folder [or] Files details not available !!!");
                            console.log(DBErr);
                            res.sendStatus(502);
                        } else {
                            console.log("\nFolder [or] File details.");
                            console.log("\n", DBSuccess);
                            res.sendStatus(200);
                        }
                    });
                }
                else if (method == 'copy') {
                    console.log('\n', method);
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(500);
                }
            }
            else {
                res.sendStatus(500);
            }
        }
    });
});

// ----------------------------------------------------------------------------------------------------------

app.set("port", process.env.PORT || 3000);

var server = http.createServer(app);

server.listen(app.get("port"), "0.0.0.0", function () {
    console.log("Express server listening on port " + app.get("port"));
});

