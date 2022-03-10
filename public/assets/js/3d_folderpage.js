
window.addEventListener("contextmenu", e => e. preventDefault());
function crud(key) {
    switch (key) {
        case "cut":
            break;
        case "copy":
            break;
        case "paste":
            break;
        case "delete":
            enable_delete()
            break;
        case "rename":
            open_rename()
            break;

        default:
            break;
    }
}



function contextMenu(id, _id) {
   
    //id is folder id and id is simple id 
   
        $("#" + id).addClass("selected")
        document.getElementById(_id).checked = true;
        event.preventDefault()
        get_id(_id, id)
        var contextElement = document.getElementById("context-menu");
        $("#" + id).append(contextElement)
        console.log("getting out context", contextElement)
        contextElement.style.top = event.offsetY + "px";
        contextElement.style.left = event.offsetX + "px";
        contextElement.classList.add("active");
   
    window.addEventListener("mousedown", function () {
            // $("#" + id).removeClass("selected")
            // document.getElementById(_id).checked = false;
            document.getElementById("context-menu").classList.remove("active");
    });
    
}

function getUrl(assetId){
    $.post('/fetch_file_url',
    {
        user_id: sessionStorage.getItem('user_id'),
        session_id: sessionStorage.getItem('session_id'),
        asset_id:assetId
    },
    function (data) {
        console.log("get direct url", data);
        var file_url = 'http://127.0.0.1:3000' + data.url;
        var file_type=data.file_type
        sessionStorage.setItem('file_url', file_url);
        sessionStorage.setItem('file_type3d', file_type);
        console.log("aghfdshfklasuflasyafldsaj",selected_object_id,currentScene_View)
        var findscene = document.getElementById(currentScene_View)
        var findObj = document.getElementById(selected_object_id)
        findObj.setAttribute('src', file_url)
        // findscene.appendChild(findObj)
    })
    .fail(function (xhr) {
        switch (xhr.status) {
            case 500:
                alert('your session is invalid');
                break;
            case 501:
                alert('session db error!');
                break;
            case 502:
                alert('DB Session Error!');
                break;
            default:
                alert('Error!');
                break;
        }
    })
}


function folderDetails() {
    var user_id = sessionStorage.getItem('user_id');
    var session_id = sessionStorage.getItem('session_id');
    $.post('/get_folder_details', {
        user_id: user_id,
        session_id: session_id
    },
        function (data) {
            console.log("folder data", data);
            var blocks = '';
            for (var i = 0; i < data.length; i++) {
                if (data[i].asset_extension == ".mp4") {
                    //breadcrumb

                    //endbreadcrumb
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper" > <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/MP4.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                } else if (data[i].asset_extension == "N.A.") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].folder_id + '" oncontextmenu="contextMenu(\'' + data[i].folder_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].folder_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <i data-feather="folder"></i> </div></div><div class="card-body"> <div class="content-wrapper"> <p class="card-text file-name mb-0"onclick="get_folder_files(\'' + data[i].folder_id + '\', \'' + data[i].asset_name + '\');">' + data[i].asset_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".glb") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/GLB.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".gif") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/GIF.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".wav") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/WAV.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".png") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/PNG.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".mp3") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/MP3.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".jpeg") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/JPEG.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".jpg") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/JPG.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".gltf") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/zip.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }
            }
            

            document.getElementById("fetchfolder").innerHTML = blocks;
        })
        .fail(function (xhr) {
            switch (xhr.status) {
                case 500:
                    alert('your session is invalid');
                    break;
                case 501:
                    alert('session db error!');
                    break;
                case 502:
                    alert('DB Session Error!');
                    break;
                default:
                    alert('Default Error!');
                    break;
            }
        })
}


function create_Folder() {
    var name = document.getElementById("validationTooltip02").value;
    console.log(sessionStorage.getItem('user_id'));
    console.log(sessionStorage.getItem('session_id'));

    if (insideSub != "") {
        $.post('/get_sub_directory',
            {
                user_id: sessionStorage.getItem('user_id'),
                session_id: sessionStorage.getItem('session_id'),
                asset_name: name,
                folder_id: insideSub
            },
            function (data) {
                console.log("Sub folder data", data);
                window.location = "http://127.0.0.1:3000/folderpage"
            })
            .fail(function (xhr) {
                switch (xhr.status) {
                    case 500:
                        alert('your session is invalid');
                        break;
                    case 501:
                        alert('session db error!');
                        break;
                    case 502:
                        alert('DB Session Error!');
                        break;
                    default:
                        alert('Default Error!');
                        break;
                }
            })
    } else {

        $.post('/create_directory',
            {
                user_id: sessionStorage.getItem('user_id'),
                session_id: sessionStorage.getItem('session_id'),
                asset_name: name
            },
            function (data) {
                console.log("Sub folder data", data);
                window.location = "http://127.0.0.1:3000/folderpage"
            })
            .fail(function (xhr) {
                switch (xhr.status) {
                    case 500:
                        alert('your session is invalid');
                        break;
                    case 501:
                        alert('session db error!');
                        break;
                    case 502:
                        alert('DB Session Error!');
                        break;
                    default:
                        alert('Default Error!');
                        break;
                }
            })
    }
}



function rename_Folder() {

    var name = document.getElementById("renaming_folder").value;
    alert(name);
    console.log(sessionStorage.getItem('user_id'));
    console.log(sessionStorage.getItem('session_id'));
    $.post('/rename_folder',
        {
            session_id: sessionStorage.getItem('session_id'),
            asset_name: name,
            id: api_id
        },
        function (data) {
            alert("FOLDER RENAMED !");
            window.location = "http://127.0.0.1:3000/folderpage"
        })
        .fail(function (xhr) {
            switch (xhr.status) {
                case 500:
                    alert('your session is invalid');
                    break;
                case 501:
                    alert('session db error!');
                    break;
                case 502:
                    alert('DB Session Error!');
                    break;
                default:
                    alert('Default Error!');
                    break;
            }
        })
}

function delete_folder() {
    console.log("dgfaykgsdakfjgaksfvhsajb", arr_for_ids)
    $.post('/delete_file_or_folder_from_asset',
        {
            session_id: sessionStorage.getItem('session_id'),
            id: JSON.stringify(arr_for_ids)
        },
        function (data) {
            alert("FOLDER DELETED !");
            window.location = "http://127.0.0.1:3000/folderpage"
        })
        .fail(function (xhr) {
            switch (xhr.status) {
                case 500:
                    alert('your session is invalid');
                    break;
                case 501:
                    alert('session db error!');
                    break;
                case 502:
                    alert('DB Session Error!');
                    break;
                default:
                    alert('Default Error!');
                    break;
            }
        })
}




var api_id = "";
var api_folder_id = "";
var arr_for_ids = []
var api_ids = []

function get_id(id, folder_id) {
    // for delete

    if (document.getElementById(id).checked) {
        document.getElementById(id).checked = true;
        $("#" + folder_id).addClass("selected")

        api_id = id;

        api_folder_id = folder_id;
        if (!arr_for_ids.includes(api_id)) {
            arr_for_ids.push(
                api_id,
            )
        }
        if (!api_ids.includes(api_folder_id)) {
            api_ids.push(
                api_folder_id,
            )
        }
        console.log("ID : ", arr_for_ids, api_ids);
    } else {
        for (let i = 0; i <= arr_for_ids.length; i++) {
            if (id == arr_for_ids[i]) {
                // console.log("FOLDER IDfvdc : ",api_id);
                $("#" + folder_id).removeClass("selected")

                const index = arr_for_ids.indexOf(id);
                if (index > -1) {
                    arr_for_ids.splice(index, 1);
                    api_ids.splice(index, 1);
                    api_id = ""
                    console.log("ID : ", arr_for_ids, api_ids);
                }
            }
        }
    }
}

function open_rename() {

    if (api_id != "") {
        $('#renameclick').modal('show');
    } else {
        alert("select a folder")
        $('#renameclick').modal('hide');
    }

}


// function pollutingSidebar(){
//     var block12 = ''
//     block12 = 
//     document.getElementById("my-contentside").append(block12)
// }

function open_import_asset() {

    if (api_id == "") {
        window.location = "http://127.0.0.1:3000/folderpage";
    }
}

function enable_delete() {
    if (api_id) {

        if (confirm('Are you sure you want to delete ?')) {
            delete_folder()
        }
        else {
            window.location = "http://127.0.0.1:3000/folderpage"

        }
    } else {
        alert("select a folder to delete")
    }
}

$(document).ready(function (e) {

    $("#resume_form").on('submit', (function (e) {
        e.preventDefault();
        var user_id = sessionStorage.getItem('user_id');
        var folder_id = api_folder_id;
        var session_id = sessionStorage.getItem("session_id");
        var fd = new FormData(this);

        fd.append("session_id", session_id);

        fd.append("user_id", user_id);

        fd.append("folder_id", folder_id);

        $.ajax({

            url: "http://127.0.0.1:3000/add_new_file",

            data: fd,

            processData: false,

            contentType: false,

            type: 'POST',

            success: function (data) {

                console.log(data);

                alert("The file is uploaded successfully.");
                window.location = "http://127.0.0.1:3000/folderpage"

            },
            fail: function (xhr) {

                switch (xhr.status) {

                    case 400:

                        alert('No files were uploaded.');

                        break;
                    default:

                        alert('Default Error : ' + xhr.status);

                        break;

                }

            }
        });

    }));

});

const breadcrumbdatacall = (fid, bname) => {
    get_folder_files(fid, bname)
}

var insideSub = "";
var bread = '';

sessionStorage.setItem('parent_folder_id', '');
sessionStorage.setItem('parent_folder_id', 'main');

function get_folder_files(folder_id, breadcrumbname) {
    console.log("new file getting", folder_id, breadcrumbname)
    console.log($(".breadcrumb-wrapper", ".breadcrumb"))
    insideSub = folder_id;

    if (folder_id != '' || folder_id != undefined || folder_id != 'undefined') {
        sessionStorage.setItem('parent_folder_id', folder_id);
    }

    console.log("ajdfjdsafjhasdkjfsdhj", insideSub, breadcrumbname)
    var session_id = sessionStorage.getItem('session_id');
    $.post('/get_subfolder_details', {
        folder_id: folder_id,
        session_id: session_id
    },
        function (data) {
            bread = '<li class="breadcrumb-item" onclick=breadcrumbdatacall(\'' + folder_id + '\',\'' + breadcrumbname + '\')><a href="/"></a>' + breadcrumbname + '</li>'
            const breadval = document.querySelectorAll('.breadcrumb-wrapper .breadcrumb')

            $(breadval).append(bread)
            $("#fetchfolder").hide()
            console.log("sub folder data", data);

            var blocks = '';
            for (var i = 0; i < data.length; i++) {
                if (data[i].asset_extension == ".mp4") {
                    //breadcrumb

                    //endbreadcrumb
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/MP4.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                } else if (data[i].asset_extension == "N.A.") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].folder_id + '" oncontextmenu="contextMenu(\'' + data[i].folder_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].folder_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <i data-feather="folder"></i> </div></div><div class="card-body"> <div class="content-wrapper"> <p class="card-text file-name mb-0"onclick="get_folder_files(\'' + data[i].folder_id + '\', \'' + data[i].asset_name + '\');">' + data[i].asset_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".glb") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/GLB.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".gif") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/GIF.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".wav") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/WAV.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".png") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/PNG.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".mp3") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/MP3.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".jpeg") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/JPEG.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".jpg") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/JPG.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }else if (data[i].asset_extension == ".gltf") {
                    // breadcrumb(data[i].asset_name)
                    blocks += '<div class=" file-manager-item card folder"id="' + data[i].asset_id + '" oncontextmenu="contextMenu(\'' + data[i].asset_id + '\',\'' + data[i].id + '\')" contextmenu="context-menu"> <div class="form-check" > <input type="checkbox" id="' + data[i].id + '" class="form-check-input"  onclick="get_id(\'' + data[i].id + '\', \'' + data[i].asset_id + '\' );"/> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <img src="../../../app-assets/images/icons/filesimagesvg/zip.svg" alt="file-icon" height="35"/> </div></div><div class="card-body"> <div class="content-wrapper" onclick="getUrl(\'' + data[i].asset_id + '\')"> <p class="card-text file-name mb-0">' + data[i].asset_original_name + '</p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date" >01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>'
                    $("#fetchfolder").show()
                }
            }

            document.getElementById("fetchfolder").innerHTML = blocks;
        })
        .fail(function (xhr) {
            switch (xhr.status) {
                case 500:
                    alert('your session is invalid');
                    break;
                case 501:
                    alert('session db error!');
                    break;
                case 502:
                    alert('DB Session Error!');
                    break;
                default:
                    alert('Default Error!');
                    break;
            }
        })
}

console.log("ajdfjdsafjhasdkjfsdhj", insideSub);