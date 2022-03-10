function signup() {
    document.querySelector(".login-form-container").style.cssText = "display: none;";
    document.querySelector(".signup-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(56, 189, 149),  rgb(28, 139, 106));";
    document.querySelector(".button-1").style.cssText = "display: none";
    document.querySelector(".button-2").style.cssText = "display: block";
    console.log("Inside Sign up");
}

function login() {
    document.querySelector(".signup-form-container").style.cssText = "display: none;";
    document.querySelector(".login-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(6, 108, 224),  rgb(14, 48, 122));";
    document.querySelector(".button-2").style.cssText = "display: none";
    document.querySelector(".button-1").style.cssText = "display: block";
    console.log("Inside Login ");
}

function login1() {
    console.log("Login");

    var login_id = document.getElementById("login_id").value;
    var login_pass = document.getElementById("login_pass").value;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login_id)) {

        $.post('/validation_login', {
            user_email: login_id,
            user_password: login_pass,
        }, function (data) {
            console.log("---------------------DATA------------------------", data);
            sessionStorage.setItem('session_id', data.s_id);
            sessionStorage.setItem('user_id', data.user_id);
            sessionStorage.setItem('connection_url', "http://127.0.0.1:3000/");
            alert('Login Successful');
            window.location = 'http://127.0.0.1:3000/dashboard?session_id=' + data.s_id;
        })
        .fail(function (xhr) {
                switch (xhr.status) {
                    case 500:
                        alert('Invalid credentials!');
                        break;
                    case 501:
                        alert('Invalid credentials!');
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
        alert("Please Enter A Valid Email Address!");
        return;
    }
}

// function signup1() {
//     console.log("Sign up");

//     var signup_id = document.getElementById("signup_id").value;
//     var signup_pass = document.getElementById("signup_pass").value;
//     var signup_pass1 = document.getElementById("signup_pass1").value;
//     var signup_phone = document.getElementById("signup_phone").value;
//     var signup_name = document.getElementById("signup_name").value;

//     console.log("signup_id", signup_id);
//     console.log("signup_pass", signup_pass);
//     console.log("signup_pass1", signup_pass1);
//     console.log("signup_phone", signup_phone);

//     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signup_id)) {
//         if (signup_pass === signup_pass1) {
//             $.post('/validation_signup', {
//                 signup_pass_key : signup_pass,
//             }, function (data) {
//                 //alert(data);
//                 window.location = 'http://127.0.0.1:3000/';
//             })
//                 .fail(function (xhr) {
//                     switch (xhr.status) {
//                         case 500:
//                             alert('Database Error!');
//                             break;
//                         case 501:
//                             alert('The Email ID you have entered is registered already!');
//                             break;
//                         default:
//                             alert('Default Error!');
//                             break;
//                     }
//                 })
//         } else {
//             alert("Please, check your password and confirm it again!");
//         }
//     } else {
//         alert("Please Enter A Valid Email Address!");
//         return;
//     }
// }

$(document).ready(function (e) {

    $("#SendChat").on('submit', (function (e) {

        e.preventDefault();
        var form = new FormData();

        var signup_id = document.getElementById("signup_id").value;
        var signup_pass = document.getElementById("signup_pass").value;
        var signup_pass1 = document.getElementById("signup_pass1").value;
        var signup_phone = document.getElementById("signup_phone").value;
        var signup_name = document.getElementById("signup_name").value;

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signup_id))) {
            alert("enter valid email id");
            return;
        }
        if (signup_pass == "") {
            alert("enter password !");
            return;
        }
        else {
            if (signup_pass != signup_pass1) {
                alert("password is missmatched !");
                return;
            }
        }

        form.append("file", $('input[type=file]')[0].files[0]);

        form.append("user_email", signup_id);
        //form.append("s_i", s_i);
        form.append("user_password", signup_pass);
        form.append("user_phone", signup_phone);
        form.append("user_name", signup_name);

        $.ajax({

            url: "http://127.0.0.1:3000/validation_signup",

            data: form,

            processData: false,

            contentType: false,

            type: 'POST',

            success: function (data) {

                $('#user_message').val("");

                alert("Registered");

                console.log(data);

            },
            error: function (xhr) {
                switch (xhr.status) {
                    case 500:
                        alert('500');
                        break;
                    case 501:
                        alert('Email id already in use');
                        break;
                    case 502:
                        alert('502');
                        break;
                    default:
                        alert('Default Error');
                }
            }



        })

    }));

})


    

// function readURL(input) {​​
// if (input.files && input.files[0]) {​​
// var reader = new FileReader();
// reader.onload = function (e) {​​
// $('#show_pro').attr('src', e.target.result);
// $('#show_pro').css('width', '100px');
// $('#show_pro').css('height', '100px');
// $('#show_pro').css('border-radius', '50%');
// }​​;
// reader.readAsDataURL(input.files[0]);
// console.log(input.files[0]);
// }​​
// }​​


var loadFile = function (event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
};
function register_page() {

    window.location = 'http://127.0.0.1:3000/registercover'

}

