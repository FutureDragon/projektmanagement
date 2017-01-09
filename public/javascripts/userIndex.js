$(document).ready(function (event) {
    var dialogRegister, form, dialogRegisterShow, formShow;
    var firstName ;
    var lastName;
    var email ;
    var password;
    var employeeStatus;
    var openUserId;
    getUsers();

    dialogRegister = $( "#dialog-newUser-form" ).dialog({
        autoOpen: false,
        height: "auto",
        width: 450,
        modal: true,
        buttons: {
            "Anlegen": function () {
                validateNewUser();
            },
            "Abbrechen": function () {
                dialogRegister.dialog("close");
            }
        },
        close: function () {
            $("#registerUserMessage").text("").removeClass("alert-danger alert-success");
            registerReset();
            location.reload();
        }
    });

    dialogRegisterShow = $( "#dialog-showUser-form" ).dialog({
        autoOpen: false,
        height: "auto",
        width: 450,
        modal: true,
        buttons: {
            "Löschen": function () {
                validateNewUser();
            },
            "Bearbeiten":{
                id : "changeUser",
                text : "Bearbeiten",
                click: function () {
                }
            },
            "Abbrechen": function () {
                dialogRegisterShow.dialog("close");
            }
        },
        close: function () {
        }
    });

    $("#newUserBtn").click(function () {
       dialogRegister.dialog("open");
    });

    function validateNewUser() {
        firstName = $("#firstNameRegister").val();
        lastName = $("#lastNameRegister").val();
        email = $("#emailRegister").val();
        password = $("#passwordRegister").val();
        employeeStatus = $( "#employeeStatus option:selected" ).val();
        var error = 0;
        if(firstName == "") {
            error++;
        }
        if(lastName == "") {
            error++;
        }
        if(email == "") {
            error++;
        }
        if(password == "") {
            error++;
        }
        if(error > 0) {
            $("#registerUserMessage").text("Bitte füllen Sie alle Felder aus").removeClass("alert-success").addClass("alert alert-danger");
        }
        else {
            setTimeout(existUser(),100);
        }
    }

    $('body').on('click', '#changeUser', function () {
        if($(this).text() == "Bearbeiten") {
            $(this).text("Speichern");
            setFormInEditMode();
        }
        else {
            $(this).text("Bearbeiten");
        }

    });

    function setFormInEditMode() {
        $("#firstNameShow").prop("disabled", false);
        $("#lastNameShow").prop("disabled", false);
        $("#emailShow").prop("disabled", false);
        $("#passwordShow").prop("disabled", false);
        $("#employeeStatusShow").prop("disabled", false);
    }


    function existUser() {
        $.ajax(
            {
                type: "POST",
                url: "/users/rest/existUser",
                contentType: "application/json; charset=utf-8",
                dataType : 'json',
                data: JSON.stringify(
                    {
                        "email" : email
                    }),
                statusCode: {
                    200: function (response) {
                        $("#registerUserMessage").text("Email Adresse wird bereits verwendet").removeClass("alert-success").addClass("alert alert-danger");
                    },
                    901: function (response) {
                        setTimeout(createNewUser(firstName,lastName,email,password,employeeStatus),200);
                    }
                },
                success: function (data) {
                    alert(data.getResponseHeader());
                }
            }
        );
    }

    function createNewUser(firstName, lastName, email, password) {
        $.ajax(
            {
                type: "POST",
                url: "/users/rest/",
                contentType: "application/json; charset=utf-8",
                dataType : 'json',
                data: JSON.stringify(
                    {
                        "firstName" : firstName,
                        "lastName" : lastName,
                        "email" : email,
                        "password" : password,
                        "role" : employeeStatus
                    }),
                statusCode: {
                    200: function (response) {
                        $("#registerUserMessage").text("User erfolgreich angelegt").removeClass("alert-danger").addClass("alert alert-success");
                        registerReset();
                    }
                },
                success: function (data) {

                }
            }
        );
    }

    function registerReset() {
        $("#firstNameRegister").val("");
        $("#lastNameRegister").val("");
        $("#emailRegister").val("");
        $("#passwordRegister").val("");
    }

    function getUsers() {
        $("#userTable").hide();
        $.getJSON( "/users/rest", function( data ) {
            $.each(data, function (key ,val) {
                var text = '<tr class="click" id="'+ val._id +'">' +
                    '<td>'+ val.firstname + '</td>' +
                    '<td>'+ val.lastname + '</td>' +
                    '<td>'+ val.email + '</td>' +
                    '<td>'+ val.role + '</td>' +
                    '</tr>';

                $("#userTable tr:last").after(text);

            });
            if(data.length == 0) {
                $("#newTaskMessage").text("Es sind noch keine Tasks angelegt").addClass("alert alert-warning");
            }
            $("#userTable").fadeIn(500);
        });
    }

    function getUser() {
        $.getJSON( "/users/rest/" + openUserId, function( data ) {
            $("#firstNameShow").val(data[0].firstname);
            $("#lastNameShow").val(data[0].lastname);
            $("#emailShow").val(data[0].email);
            $("#passwordShow").val(data[0].password);
            
        }).done(function () {
            dialogRegisterShow.dialog("open");
        });
    }


    $('body').on('click', 'table > tbody > tr.click', function () {
        openUserId = $(this).attr("id");
        getUser();
    });

});
