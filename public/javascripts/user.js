$(document).ready(function (event) {
    var dialogLogin, form ,logoutConfirm;
    var loginText =
        '<p class="lead">Bitte loggen Sie sich ein:</p>' +
        '<button id="loginScreen" class="btn btn-default">Login</button> ';
    checkCookie();

    function checkCookie() {
        if(Cookies.get("Login") == "true") {
            $("#container").show();
            $("#login").text("Logout");
            $("#noLogin").hide();
            $("#backlogNav").show();
            $("#sprintNav").show();
            $("#planningPokerNav").show();
            if(Cookies.get("Role") == "admin") {
                $("#userNav").show();
            }
            else {
                $("#userNav").hide();
            }
        }
        else{
            $("#container").after("<div id='noLogin' class='noLogin center'>" + loginText + "</div>");
            $("#container").hide();
            $("#userNav").hide();
            $("#backlogNav").hide();
            $("#sprintNav").hide();
            $("#planningPokerNav").hide();
        }
    }

    dialogLogin = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: "auto",
        width: 450,
        modal: true,
        buttons: {
            "Login": function () {
                login();
            },
            "Schließen": function () {
                dialogLogin.dialog("close");
            }
        },
        close: function () {
            loginReset();
        }
    });

    logoutConfirm = $( "#dialog-logout-confirm" ).dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Ja": function() {
                logout()
            },
            "Nein": function() {
                $( this ).dialog( "close" );
            }
        }
    });

    $("#login").click(function () {
        var text = $("#login").text();
        if( text == "Login") {
            dialogLogin.dialog( "open" );
        }
        else {
            //logout();
            logoutConfirm.dialog( "open" );
        }
    });

    function login() {
        var email = $("#emailLogin").val();
        var password = $("#passwordLogin").val();
        $.ajax(
            {
                type: "POST",
                url: "/users/rest/login",
                contentType: "application/json; charset=utf-8",
                dataType : 'json',
                data: JSON.stringify(
                    {
                        "email" : email,
                        "password" : password
                    }),
                statusCode: {
                    900: function (response) {
                        loginfailed();
                    }
                },
                success: function (response) {
                    loginsuccess(response);
                }
            }
        );
    }



    function loginsuccess(user) {
        $("#login").text("Logout");
        Cookies.set('Login', 'true');
        Cookies.set('Role', user.role);
        Cookies.set('Email', user.email);
        Cookies.set('Id', user._id);
        dialogLogin.dialog("close");
        checkCookie();
    }
    function loginfailed() {
        alert("Login nicht Erfolgreich");
    }
    
    function logout() {
        $("#login").text("Login");
        Cookies.remove('Login');
        Cookies.remove('Role');
        Cookies.remove('Email');
        Cookies.remove('Id');
        logoutConfirm.dialog("close");
        checkCookie()
    }

    $('body').on('click', '#loginScreen', function () {
        dialogLogin.dialog( "open" );
    });


    function loginReset() {
        $("#emailLogin").val("");
        $("#passwordLogin").val("");
    }
});