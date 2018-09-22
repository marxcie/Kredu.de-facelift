/* Minification failed. Returning unminified contents.
(93,13-24): run-time error JS1300: Strict-mode does not allow assignment to undefined variables: isValidated
 */
(function ($) {
    "use strict";

    if (_isAuthenticated === "True") {
        $("#kpLoanApplicationInputNameFirst").attr("disabled", "disabled");
        $("#kpLoanApplicationInputNameLast").attr("disabled", "disabled");
        $("#kpLoanApplicationInputBirthDate").attr("disabled", "disabled");
        $("#kpLoanApplicationInputBirthName").attr("disabled", "disabled");
        $("#kpLoanApplicationInputPasswordRepeat").attr("disabled", "disabled");
        $("#kpLoanApplicationInputPassword").attr("disabled", "disabled");
        $("#kpLoanApplicationInputEmailRepeat").attr("disabled", "disabled");
        $("#kpLoanApplicationInputEmail").attr("disabled", "disabled");

        $("#kpLoanApplicationInputStreet").val($("#OldStreet").val()).removeClass("input-validation-error").attr("disabled", "disabled");
        $("#kpLoanApplicationInputStreetNumber").val($("#OldHouseNumber").val()).removeClass("input-validation-error").attr("disabled", "disabled");
        $("#kpLoanApplicationInputZip").val($("#OldZipCode").val()).removeClass("input-validation-error").attr("disabled", "disabled");
        $("#kpLoanApplicationInputCity").val($("#OldCity").val()).removeClass("input-validation-error").attr("disabled", "disabled");
    }

    function setOldAddress() {
        $("#errorSpanStreet span span").html("");
        $("#errorSpanHouseNumber span span").html("");
        $("#errorSpanZipCode span span").html("");
        $("#errorSpanCity span span").html("");

        $("#OldAddress").val("1");
        $("#kpLoanApplicationInputStreet").val($("#OldStreet").val()).removeClass("input-validation-error").attr("disabled", "disabled");
        $("#kpLoanApplicationInputStreetNumber").val($("#OldHouseNumber").val()).removeClass("input-validation-error").attr("disabled", "disabled");
        $("#kpLoanApplicationInputZip").val($("#OldZipCode").val()).removeClass("input-validation-error").attr("disabled", "disabled");
        $("#kpLoanApplicationInputCity").val($("#OldCity").val()).removeClass("input-validation-error").attr("disabled", "disabled");
        $("#InfoChangeAddress").hide();

        $('[data-field-name="AddressField"]').closest(".form-group").removeClass("has-error");
    }

    $("[name='IsOldAddress']").on("click", function () {

        if ($(this).attr('id') === "IsOldAddressYes") {
            setOldAddress();
        }
        else {
            $("#OldAddress").val("0");
            $("#kpLoanApplicationInputStreet").val("").addClass("input-validation-error").removeAttr("disabled");
            $("#kpLoanApplicationInputStreetNumber").val("").addClass("input-validation-error").removeAttr("disabled");
            $("#kpLoanApplicationInputZip").val("").addClass("input-validation-error").removeAttr("disabled");
            $("#kpLoanApplicationInputCity").val("").addClass("input-validation-error").removeAttr("disabled");
            $("#InfoChangeAddress").show();

            $('[data-field-name="AddressField"]').closest(".form-group").addClass("has-error");
        }

        //$(this).rules('remove');
    });

    if (typeof $("#IsOldAddressYes").val() !== 'undefined') {
        $("#IsOldAddressYes").click();
        setOldAddress();
    }

    $(".radioValidation").each(function () {
        if ($(this).is(":checked")) {
            $(this).parent().addClass("active");
        }
    });

    function validateCheckboxes() {
        var isValidated = true;

        $(".requiredCheckbox").each(function () {
            if ($(this).is(":checked")) {
                $(this).removeClass("input-validation-error");
                $(this).parent().removeClass("input-validation-error");
                $(this).closest(".checkbox").removeClass("has-error");
            }
            else {
                isValidated = false;
                $(this).addClass("input-validation-error");
                $(this).parent().addClass("input-validation-error");
                $(this).closest(".checkbox").addClass("has-error");
            }
        });

        return isValidated;
    }

    $(".requiredCheckbox").on("click", function () {
        if ($(this).is(":checked")) {
            $(this).removeClass("input-validation-error");
            $(this).parent().removeClass("input-validation-error");
            $(this).closest(".checkbox").removeClass("has-error");
        }
        else {
            isValidated = false;
            $(this).addClass("input-validation-error");
            $(this).parent().addClass("input-validation-error");
            $(this).closest(".checkbox").addClass("has-error");
        }
    });

    $("#kpLoanApplicationToggleGenderFemale").parent().on("click", function (e) {
        $("#kpLoanApplicationToggleGenderFemale").parents("div.form-group").addClass('has-success');
        $("#kpLoanApplicationToggleGenderFemale").attr("checked", "checked");
        $("#kpLoanApplicationToggleGenderMale").removeAttr("checked");
        if ($("#kpValidationMessageGender").children().length > 0) {
            $("#kpLoanApplicationStep1Form").validate().form();
        }
    });

    $("#kpLoanApplicationToggleGenderMale").parent().on("click", function (e) {
        $("#kpLoanApplicationToggleGenderMale").parents("div.form-group").addClass('has-success');
        $("#kpLoanApplicationToggleGenderMale").attr("checked", "checked");
        $("#kpLoanApplicationToggleGenderFemale").removeAttr("checked");
        if ($("#kpValidationMessageGender").children().length > 0) {
            $("#kpLoanApplicationStep1Form").validate().form();
        }
    });

    $("#kpBtnSubmitLoanApplicationStep1").off().on("click", function (e) {

        $('#kpErrorList').addClass("hidden");
        $('#kpErrorList ul li').remove();

        e.preventDefault();

        var isFormValid = $("#kpLoanApplicationStep1Form").valid();

        var isDateOfBirthValid = validateStepOneDate();

        var isCheckboxValid = validateCheckboxes();

        if (isFormValid && isDateOfBirthValid && isCheckboxValid) {
            $("#kpBtnReturnToHomePage").attr('disabled', 'disabled');
            $("#kpBtnSubmitLoanApplicationStep1").attr('disabled', 'disabled');

            $("#kpBtnSubmitLoanApplicationStep1").find("[data-field-name='state-ready']").addClass("hidden");;
            $("#kpBtnSubmitLoanApplicationStep1").find("[data-field-name='state-processing']").removeClass("hidden");

            var data = $("#kpLoanApplicationStep1Form").serialize();
            $.ajax({
                type: "POST",
                url: _stepTwoUrl,
                data: data,
                dataType: 'json',
                headers: {
                    'RequestVerificationToken': $('#kpLoanApplicationStep1Form input[name=__RequestVerificationToken]').val()
                },
                success: function (result) {
                    if (result.IsSuccess) {
                        window.location = result.RedirectTo;
                    } else {
                        $.each(result.Errors, function (index, item) {
                            if (index === 0) {
                                $('#kpErrorList ul li').remove();
                            }
                            $("#kpErrorList ul").append("<li>" + item + "</li>");
                        });
                        $('#kpErrorList').removeClass("hidden");
                        $("#kpBtnSubmitLoanApplicationStep1").find("[data-field-name='state-ready']").removeClass("hidden");
                        $("#kpBtnSubmitLoanApplicationStep1").find("[data-field-name='state-processing']").addClass("hidden");
                        $("#kpBtnSubmitLoanApplicationStep1").removeAttr('disabled');
                        $("#kpBtnReturnToHomePage").removeAttr('disabled');
                    }
                },
                error: function (ex) {
                    $("#kpBtnSubmitLoanApplicationStep1").find("[data-field-name='state-ready']").removeClass("hidden");
                    $("#kpBtnSubmitLoanApplicationStep1").find("[data-field-name='state-processing']").addClass("hidden");
                    $("#kpBtnSubmitLoanApplicationStep1").removeAttr('disabled');
                    $("#kpBtnReturnToHomePage").removeAttr('disabled');
                    $('#kpErrorList').removeClass("hidden");
                    $("#kpErrorList ul").append("<li>" + "<strong>Es ist ein Fehler aufgetreten!</strong> Das tut uns leid.Bitte versuchen Sie es erneut, oder kontaktieren Sie unser Support- Team." + "</li>");
                }
            });
        } else {
            var scrollToErrorPos = $('.input-validation-error').first().offset().top;
            if (scrollToErrorPos > 0) {
                disable_scroll();
                $('html, body').animate({
                    scrollTop: scrollToErrorPos - 100
                }, 700, function () {
                    enable_scroll();
                });
            }
        }
    });

    function keydown(e) {
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                e.preventDefault();
                return;
            }
        }
    }

    function wheel(e) {
        e.preventDefault();
    }

    function disable_scroll() {
        if (window.addEventListener) {
            window.addEventListener("DOMMouseScroll", wheel, false);
        }
        window.onmousewheel = document.onmousewheel = wheel;
        document.onkeydown = keydown;
    }

    function enable_scroll() {
        if (window.removeEventListener) {
            window.removeEventListener("DOMMouseScroll", wheel, false);
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    }

    $("#kpLoanApplicationInputBirthDate").change(function () {
        validateStepOneDate();
    });

    function stepOneDateValidate(elementJqId, isValid) {
        if (isValid) {
            elementJqId.removeClass("input-validation-error").addClass("valid");
        }
        else {
            elementJqId.removeClass("valid").addClass("input-validation-error");
        }
    }

    function stepOneDateValidate() {
        var isValidated = validateStepOneDate();

        $("#kpLoanApplicationInputBirthDate").on("keyup", function (e) {
            var isValid = validateStepOneDate();

            if (typeof (window.delayerDate) != 'undefined') {
                clearTimeout(window.delayerDate);
            }

            window.delayerDate = setTimeout(function () { stepOneDateValidate($("#kpLoanApplicationInputBirthDate"), isValid); }, 100);
        });

        return isValidated;
    }


    function validateStepOneDate() {
        var regex = /^(((((0[1-9])|(1\d)|(2[0-8]))\.((0[1-9])|(1[0-2])))|((31\.((0[13578])|(1[02])))|((29|30)\.((0[1,3-9])|(1[0-2])))))\.((20[0-9][0-9])|(19[0-9][0-9])))|((29\.02\.(19|20)(([02468][048])|([13579][26]))))$/;
        var isValidated = true;
        var val = $("#kpLoanApplicationInputBirthDate").val();
        var isMatch = regex.test(val);

        if (val !== "" && isMatch) {

            $('#kpBirthdateErrorSpan').empty();
            $("#kpLoanApplicationInputBirthDate").removeClass("input-validation-error").addClass("valid");
        } else {
            if (val === "") {

                $('#kpBirthdateErrorSpan').text("Bitte geben Sie Ihr Geburtsdatum an.");
            }
            else {

                $('#kpBirthdateErrorSpan').text("Falsches Datumsformat. Bitte verwenden sie folgendes Format: TT.MM.YYYY");
            }

            isValidated = false;
            $("#kpLoanApplicationInputBirthDate").addClass("input-validation-error").removeClass("valid");
        }

        return isValidated;
    }

}(jQuery));;
