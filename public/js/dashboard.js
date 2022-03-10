function create() {
    var user_id = sessionStorage.getItem("user_id");
    var session_id = sessionStorage.getItem("session_id");
    var experience_title = document.getElementById("experience_name").value;

    if (experience_title == "") {
        alert("enter experience title!");
        return;
    }

    $.post('/experience', {
        user_id: user_id,
        session_id: session_id,
        experience_name: experience_title
    }, function (data) {
        console.log(data);
        alert("experience created !");
        window.location = 'http://127.0.0.1:3000/dashboard?session_id=' + session_id;

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

function get_experience_datas() {
    // alert("OK");
    var user_id = sessionStorage.getItem("user_id");
    var session_id = sessionStorage.getItem("session_id");

    $.post('/get_experience_data', {
        user_id: user_id,
        session_id: session_id
    }, function (data) {
        console.log(data);
        console.log("LENGTH : ");
        console.log(data.length);

        var blocks = '';

        for (var i = 0; i < data.length; i++) {
            console.log(data[i].experience_title);

            // blocks += '<div class="col-md-4"><div class="card" id="experience_card" + i><img src="/images/3d new.jpg" alt="Avatar" style="width:100%"><div class="container"><h4 onclick="open_experience(\''+ data[i].experience_id + '\')"><b>'+ data[i].experience_title +'</b></h4><p></p></div></div></div>'

            // blocks += '<div class="col-md-6 col-lg-4"> <div class="card"> <img class="card-img-top" src="app-assets/images/slider/04.jpg" alt="Card image cap"/> <div class="card-body"> <h4 class="card-title" style="cursor: pointer;" onclick="open_experience(\''+ data[i].experience_id + '\')">'+ data[i].experience_title +'</h4> <p class="card-text"> Some quick example text to build on the card title and make up the bulk of the card</p><a href="#" class="btn btn-outline-primary">Go somewhere</a> </div></div></div>';

            // blocks += '<div class="form-check"> <input type="checkbox" class="form-check-input" id="customCheck1"/> <label class="form-check-label" for="customCheck1"></label> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <i data-feather="folder"></i> </div></div><div class="card-body" > <div class="content-wrapper"> <h4 class="card-text file-name mb-0" style="cursor: pointer;" onclick="open_experience(\''+ data[i].experience_id + '\')"><b>'+ data[i].experience_title +'</b></h4><p ></p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date">01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div>'

            blocks += '<div class="card file-manager-item folder" > <div class="form"> <input type="checkbox" class="form-check-input" id="'+data[i].experience_id+'" onclick="get_id(\'' + data[i].experience_id + '\');" /> <label class="form-check-label" for="customCheck1"></label> </div><div class="card-img-top file-logo-wrapper"> <div class="dropdown float-end"> <i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i> </div><div class="d-flex align-items-center justify-content-center w-100"> <i data-feather="folder"></i> </div></div><div class="card-body" > <div class="content-wrapper"> <p class="card-text file-name mb-0" style="cursor: pointer;" onclick="open_experience(\'' + data[i].experience_id + '\')"><b>' + data[i].experience_title + '</b></p><p class="card-text file-size mb-0">2gb</p><p class="card-text file-date">01 may 2019</p></div><small class="file-accessed text-muted">Last accessed: 21 hours ago</small> </div></div>';
        }
        document.getElementById('experience_card').innerHTML = blocks;


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

function open_experience(experience_id) {
    // $.post('/get_experience_details', {
    //     user_id: user_id,
    //     session_id: session_id,
    //     experience_id: experience_id
    // }, function (data) {
    //     console.log(data);

    //     var blocks = '';

    //     for(var i=0; i < data.length; i++) 
    //     {
    //         console.log(data[i].experience_title);

    //         // blocks += '<div class="feature is-revealing"> <div class="feature-inner"> <div class="feature-icon"> <svg width="48" height="48" xmlns="../"> <defs> <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="feature-1-a"> <stop stop-color="#007CFE" stop-opacity="0" offset="0%"/> <stop stop-color="#007DFF" offset="100%"/> </linearGradient> <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="feature-1-b"> <stop stop-color="#FF4F7A" stop-opacity="0" offset="0%"/> <stop stop-color="#FF4F7A" offset="100%"/> </linearGradient> </defs> <g fill="none" fill-rule="evenodd"> <path d="M8 0h24v24a8 8 0 0 1-8 8H0V8a8 8 0 0 1 8-8z" fill="url(#feature-1-a)"/> <path d="M48 16v24a8 8 0 0 1-8 8H16c0-17.673 14.327-32 32-32z" fill="url(#feature-1-b)"/> </g> </svg> </div><h4 class="feature-title h3-mobile">'+ data[i].experience_title +'</h4> <p class="text-sm">A pseudo-Latin text used in web design, layout, and printing in place of English to emphasise design elements.</p></div></div>';

    //         blocks += '<div class="col-md-4"><div class="card" id="experience_card" + i><img src="/images/3d new.jpg" alt="Avatar" style="width:100%"><div class="container"><h4 onclick="open_experience(\''+ data[i].experience_id + '\')"><b>'+ data[i].experience_title +'</b></h4><p></p></div></div></div>'
    //     }
    //     document.getElementById('experience_card').innerHTML = blocks;

    // })
    // .fail(function (xhr) {
    //         switch (xhr.status) {
    //             case 500:
    //                 alert('your session is invalid');
    //                 break;
    //             case 501:
    //                 alert('session db error!');
    //                 break;
    //             case 502:
    //                 alert('DB Session Error!');
    //                 break;
    //             default:
    //                 alert('Default Error!');
    //                 break;
    //         }
    //     })
    sessionStorage.setItem('experience_id', experience_id)
    window.location = sessionStorage.getItem('connection_url') + 'display_editor?session_id=' + sessionStorage.getItem('session_id');
}



function getfolderpage() {
    window.location = 'http://127.0.0.1:3000/folderpage'
}

var exp_id = "";
var arrexp =[]
function get_id(experience_id) {
    // alert(experience_id);
    if (document.getElementById(experience_id).checked) {
        exp_id = experience_id;
        arrexp.push(exp_id)
        console.log("CHECKED ID", exp_id,arrexp);
    } else {
        for(let i=0;i<=arrexp.length;i++){
            if(experience_id == arrexp[i]){
                const index = arrexp.indexOf(experience_id);
                if (index > -1) {
                    arrexp.splice(index, 1);
                  }
            }
        }
        console.log("CHECKED ID", exp_id,arrexp);
    }
}

function open_rename() {
    
    if( exp_id != "")
    {
        $('#renameCard').modal('show');
    }
    
}

function renameexp() {
    alert('came here');
    var session_id = sessionStorage.getItem("session_id");
    var experience_rename = document.getElementById("experience_rename").value;

    if (experience_rename == "") {
        alert("enter experience title!");
        return;
    }

    $.post('/rename_experience', {
        experience_id: exp_id,
        session_id: session_id,
        experience_rename: experience_rename
    }, function (data) {
        console.log(data);
        alert("your experience renamed !");
        window.location = 'http://127.0.0.1:3000/dashboard?session_id=' + session_id;
        

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

function delete_exp()
{
    var session_id = sessionStorage.getItem("session_id");

    if(arrexp.length > 0)
    {
        if (confirm('Are you sure you want to delete ?')) {

            /** DELETE EXPERIENCE **/
            $.post('/delete_experience', {
                experience_id: JSON.stringify(arrexp),
                session_id: session_id
            }, function (data) {
                console.log(data);
                alert("your experience deleted !");
                window.location = 'http://127.0.0.1:3000/dashboard?session_id=' + session_id;
                
        
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
            /** END DELETE EXPERIENCE **/
          } else {
            window.location = 'http://127.0.0.1:3000/dashboard?session_id=' + session_id;

          }
    }
}

function copy_exp()
{
    var session_id = sessionStorage.getItem("session_id");
    if( exp_id != "")
    {
        if (confirm('Are you sure you want to copy ?')) {
            /** COPY EXPERIENCE **/
            $.post('/copy_experience', {
                experience_id: exp_id,
                session_id: session_id
            }, function (data) {
                console.log(data);
                alert("your experience duplicated !");
                window.location = 'http://127.0.0.1:3000/dashboard?session_id=' + session_id;
                
        
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

            /** END COPY EXPERIENCE **/
          } else {
            window.location = 'http://127.0.0.1:3000/dashboard?session_id=' + session_id;

          }
    }

}