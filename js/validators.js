define(["helper_functions"], function(helpers){
    /***
    * `nameValidator` function callback
    * Returns boolean value to check if the validation passed or not 
    * Check the name field that it is not empty and doesn't have invalid characters
    * Calls showHideError function to display the error message if any
    ***/
    function nameValidator(){
        const name = document.getElementById("name");
        let nameValue = name.value, 
            whatToDo = "", 
            errorText = "",
            validInput = false;
        nameValue = nameValue.trim();
        const errorSpan = name.nextElementSibling;
        const validCharacters = helpers.validateSpecialCharacters(nameValue);

        if(nameValue.length > 0 && validCharacters){
            whatToDo = "hide";
            validInput = true;
        } else if(!validCharacters){
            whatToDo = "show";
            errorText = "The input cannot contain any special character, such as &lt!@?...";
        } else {
            whatToDo = "show";
            errorText = "The name field cannot be empty!";
        }

        helpers.showHideError({
            element: name,
            errorElement: errorSpan,
            whatToDo: whatToDo,
            errorText: errorText
        });
        return validInput;
    }

    /***
     * `emailValidator` function callback
     * Returns boolean value to check if the validation passed or not 
     * Check the email field that it is not empty and doesn't have invalid characters
     * Calls showHideError function to display the error message if any
     ***/
    function emailValidator(){
        const email = document.getElementById("mail");
        const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
        const specialCharactersRegex = /[\!\#\$\%\^\&\*\(\)\+\=\~\`\<\>\"\/\|\\\?\s*]/gm;
        let emailValue = email.value
            whatToDo = "",
            errorText = "",
            validInput = false;
        emailValue = emailValue.trim();
        const errorSpan = email.nextElementSibling;

        if(emailValue === ""){
            whatToDo = "show";
            errorText = "The email field cannot be empty!";
        } else if(specialCharactersRegex.test(emailValue)){
            whatToDo = "show";
            errorText = "The email field cannot receive special characters different than @ and cannot contain spaces!";
        } else if(!emailRegex.test(emailValue)){
            whatToDo = "show";
            errorText = "The email must be a valid email address!";
        } else {
            whatToDo = "hide";
            validInput = true;
        }

        helpers.showHideError({
            element: email,
            errorElement: errorSpan,
            whatToDo: whatToDo,
            errorText: errorText
        });
        return validInput;
    }

    /***
    * `activitiesValidator` function callback
    * Returns boolean value to check if the validation passed or not 
    * Check if at least one activitie is selected
    * Calls showHideError function to display the error message if any
    ***/
    function activitiesValidator(){
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        const errorSpan = checkboxes[6].parentNode.nextElementSibling;
        let whatToDo = "",
            errorText = "",
            validInput = false;

        for(let i = 0, len = checkboxes.length; i < len; i++){
            if(checkboxes[i].checked){
                whatToDo = "hide";
                validInput = true;
                break;
            }
        }

        if(!validInput){
            whatToDo = "show";
            errorText = "Please select at least one activity!";
        }

        helpers.showHideError({
            errorElement: errorSpan,
            whatToDo: whatToDo,
            errorText: errorText
        });
        return validInput;
    }

    /***
    * `paymentValidator` function callback
    * Returns boolean value to check if the validation passed or not 
    * @param {Object} eventOrElement - holds the object that fired the event or the element we need to validate
    * Check that credit card, zip code and cvv are filled out correctly and are not empty. This function checks every field independently
    * Calls showHideError function to display the error message if any
    ***/
    function paymentValidator(eventOrElement){
        const target = eventOrElement.target ? eventOrElement.target : eventOrElement;
        let input = target.value;
        input = input.replace(/\s*/g, "");
        target.value = input;
        const validInput = /^\d*$/.test(input);
        const errorSpan = target.nextElementSibling;
        const creditCard = document.getElementById("cc-num");
        const zipCode = document.getElementById("zip");
        const cvv = document.getElementById("cvv");
        let whatToDo = "show",
            errorText = "",
            validInformation = false;
        /* Validate if the field is empty */
        if(input === ""){
            if(target === creditCard){
                errorText = "You must enter a credit card number, this field cannot be empty!";
            } else if(target === zipCode){
                errorText = "You must enter a zip code number, this field cannot be empty!";
            } else if(target === cvv){
                errorText = "You must enter a cvv number, this field cannot be empty!";
            }
            helpers.showHideError({
                element: target,
                errorElement: errorSpan,
                whatToDo: whatToDo,
                errorText: errorText
            });
        } /*Validate if the input is a number*/    
        else if(!validInput){
            if(target === creditCard){
                errorText = "You must enter a credit card number, this field cannot contain any other type of character!";
            } else if(target === zipCode){
                errorText = "You must enter a zip code number, this field cannot contain any other type of character!!";
            } else if(target === cvv){
                errorText = "You must enter a cvv number, this field cannot contain any other type of character!!";
            }
            helpers.showHideError({
                element: target,
                errorElement: errorSpan,
                whatToDo: whatToDo,
                errorText: errorText
            });
        } /** If the target was fired by the credit card field, check if its value is between 13 and 16 characters long */
        else if(target === creditCard){
            if(input.length < 13 || input.length > 16){
                errorText = "You must enter a valid credit card number!";
            } else {
                whatToDo = "hide";
                validInformation = true;
            }
            helpers.showHideError({
                element: target,
                errorElement: errorSpan,
                whatToDo: whatToDo,
                errorText: errorText
            });
            return validInformation;
        } /** If the target was fired by the zip code field, check if its value is 5 digits long */
        else if(target === zipCode){
            if(input.length < 5 || input.length > 5){
                errorText = "You must enter a valid zip code number!";
            } else {
                whatToDo = "hide";
                validInformation = true;
            }
            helpers.showHideError({
                element: target,
                errorElement: errorSpan,
                whatToDo: whatToDo,
                errorText: errorText
            });
            return validInformation;
        } /** If the target was fired by the cvv field, check if its value is 3 digits long */
        else if(target === cvv){
            if(input.length < 3 || input.length > 3){
                errorText = "You must enter a valid cvv number!";
            } else {
                whatToDo = "hide";
                validInformation = true;
            }
            helpers.showHideError({
                element: target,
                errorElement: errorSpan,
                whatToDo: whatToDo,
                errorText: errorText
            });
            return validInformation;
        }
        return validInformation;
    } //end paymentValidator

    return {
        nameValidator: nameValidator,
        emailValidator: emailValidator,
        activitiesValidator: activitiesValidator,
        paymentValidator: paymentValidator
    };

});