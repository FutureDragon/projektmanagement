/**
 * Created by Dominik on 06.01.2017.
 */
$(document).ready(function () {
    var lv = require ('./Controller/LoginValidator');

    $('#login').ajaxForm({
        beforeSubmit : function(formData, jqForm, options){
            if (!(lv.validateForm())){
                return false;
            } 	else{
                // append 'remember-me' option to formData to write local cookie //
                formData.push({name:'remember-me', value:$('.button-rememember-me-glyph').hasClass('glyphicon-ok')});
                return true;
            }
        },
        success	: function(responseText, status, xhr, $form){
            if (status == 'success') window.location.href = '/backlog';
        },
        error : function(err){
            throw err;
        }
    });
    $('#user-tf').focus();
});