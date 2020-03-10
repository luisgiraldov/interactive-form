/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

/*** 
 * IIFE to not clutter the Global Object
***/
(function(){
    /*** 
    * Global variables
    ***/
    const name = document.getElementById("name");
    const email = document.getElementById("mail");
    const jobTitle = document.getElementById("title");
    const designMenu = document.getElementById("design");
    const activitiesFieldset = document.querySelector(".js-activities");
    const payment = document.getElementById("payment");
    const creditCard = document.getElementById("cc-num");
    const zipCode = document.getElementById("zip");
    const cvv = document.getElementById("cvv");
    const form = document.getElementsByTagName("form")[0];
    let totalCost = 0;

    /*** 
    * `replaceSpecialCharacters` function
    * Returns a string without HTML entities or special characters
    * @param {String} userInput - Holds the string value the user typed into the search bar
    * Find any HTML entity and replace with an empty string, simulates a basic html sanitizer, and avoid creating an unexpected regex.
    ***/
    function validateSpecialCharacters(userInput){
        const regexValidation = /[\!\@\#\$\%\^\&\*\(\)\+\=\~\`\<\>\"\/\|\\\?]/gm;
        return !regexValidation.test(userInput);
    }

    /***
     * `initializer` function
     * Hides other-title field
     * Creates and append label that shows price when checking activities
     * Hides the color's menu
     ***/
    function initializer(){
        const colorContainer = document.getElementById("colors-js-puns");
        const otherJobRole = document.getElementById("other-title");
        const label = document.createElement("LABEL");
        label.textContent = 0;
        label.hidden = true;
        activitiesFieldset.appendChild(label);
        otherJobRole.hidden = true;
        colorContainer.classList.add("is-hidden");
        showDesignatedColors();
        showPaymentMethod();
    }

    /***
     * `showDesignatedColors` function callback
     * @param {Object} event - holds the object that fired the event
     * show designated colors when the design menu is changed
     ***/    
    function showDesignatedColors(event){
        const colorContainer = document.getElementById("colors-js-puns");
        const colorMenu = document.getElementById("color");
        // const option = document.createElement('OPTION');
        // option.textContent = "Please select a T-shirt theme";
        // option.selected = true;
        // colorMenu.prepend(option);
        const colorOptions = colorMenu.children;
        const selection = event ? event.target.value : "Select Theme";
        const midPoint = Math.round(colorOptions.length / 2);

        for(let i = 0, len = colorOptions.length; i < len; i++){
            if(colorOptions[i].hasAttribute("selected")){
                colorOptions[i].removeAttribute("selected");
            }
            colorOptions[i].hidden = true;

            // if(selection === "js puns" && i < midPoint && i > 0){
            if(selection === "js puns" && i < midPoint){
                colorOptions[i].hidden = false;
            } else if(selection === "heart js" && i >= midPoint){
                colorOptions[i].hidden = false;
            } 
        }

        if(selection === "Select Theme"){
            // colorOptions[0].setAttribute("selected", true);
            if(!colorContainer.classList.contains("is-hidden")){
                colorContainer.classList.add("is-hidden");
            }
        } else if(selection === "js puns"){
            colorOptions[0].setAttribute("selected", true);

            if(colorContainer.classList.contains("is-hidden")){
                colorContainer.classList.remove("is-hidden");
            }
        } else if(selection === "heart js"){
            colorOptions[midPoint].setAttribute("selected", true);
            if(colorContainer.classList.contains("is-hidden")){
                colorContainer.classList.remove("is-hidden");
            }
        } 
    }//end showDesignatedColors

    /***
     * `checkingCheckboxes` function callback
     * @param {Object} event - holds the object that fired the event
     * Check that workshops don't interfere with each other, disabling the one that does
     * Calculates the total price for workshops
     ***/ 
    function checkingCheckboxes(event){
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        const clicked = event.target;
        const clickedData = clicked.getAttribute("data-day-and-time");
        const label = activitiesFieldset.lastElementChild;
        label.hidden = false;
        let cost = clicked.getAttribute("data-cost");
        cost = parseInt(cost);
        
        for(let i = 0, len = checkboxes.length; i < len; i++){
            const checkboxData = checkboxes[i].getAttribute("data-day-and-time");
            if(clickedData === checkboxData && clicked !== checkboxes[i]){
                if(clicked.checked){
                    checkboxes[i].disabled = true;
                    checkboxes[i].parentNode.classList.add("unavailable");
                } else {
                    checkboxes[i].disabled = false;
                    checkboxes[i].parentNode.classList.remove("unavailable");
                       }
            }
        }

        if(clicked.checked){
           totalCost += cost;
           label.textContent = `Total: $${totalCost}`;
        } else {
           totalCost -= cost;
           label.textContent = `Total: $${totalCost}`;
        }
    }//end checkingCheckboxes

    /***
     * `showPaymentMethod` function callback
     * @param {Object} event - holds the object that fired the event
     * Check which option is selected, and display the correct one depending on the selection
     ***/ 
    function showPaymentMethod(event){
        const selection = event ? event.target.value : "";
        const selectPaymentOption = payment.firstElementChild;
        selectPaymentOption.disabled = true;
        const creditCardSection = payment.nextElementSibling;
        const paypalSection = creditCardSection.nextElementSibling;
        const bitcoinSection = paypalSection.nextElementSibling;
        paypalSection.hidden = true;
        bitcoinSection.hidden = true;

        if(selection === "credit card"){
            creditCardSection.hidden = false;
            paypalSection.hidden = true;
            bitcoinSection.hidden = true;
        } else if(selection === "paypal"){
            creditCardSection.hidden = true;
            paypalSection.hidden = false;
            bitcoinSection.hidden = true;
        } else if(selection === "bitcoin"){
            creditCardSection.hidden = true;
            paypalSection.hidden = true;
            bitcoinSection.hidden = false;
        }
    }

    /***
     * `nameValidator` function callback
     * Returns boolean value to check if the validation passed or not 
     * Check the name field that it is not empty and doesn't have invalid characters
     * Calls showHideError function to display the error message if any
     ***/
    function nameValidator(){
        let nameValue = name.value, 
            whatToDo = "", 
            errorText = "",
            validInput = false;
        nameValue = nameValue.trim();
        const errorSpan = name.nextElementSibling;
        const validCharacters = validateSpecialCharacters(nameValue);

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

        showHideError({
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

        showHideError({
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

        showHideError({
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
            showHideError({
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
            showHideError({
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
            showHideError({
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
            showHideError({
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
            showHideError({
                element: target,
                errorElement: errorSpan,
                whatToDo: whatToDo,
                errorText: errorText
            });
            return validInformation;
        }
        return validInformation;
    } //end paymentValidator

    /***
     * `showHideError` function
     * @param {Object} data - holds an object that holds element, type of action to execute, and text to add to the element
     * Remove and add classes to display successful or error messages
     ***/
    function showHideError(data){
        const errorSpan = data.errorElement;
        if(data.whatToDo === "show"){
            if(data.element){
                const element = data.element;
                if(element.classList.contains("validInput")){
                    element.classList.remove("validInput");
                }
                element.classList.add("invalidInput");
            }

            errorSpan.classList.remove("is-hidden");
            errorSpan.classList.add("show-message");
            // errorSpan.textContent = data.errorText;
            errorSpan.innerHTML = data.errorText;
        } else if(data.whatToDo === "hide"){
            if(data.element){
                const element = data.element;
                if(element.classList.contains("invalidInput")){
                    element.classList.remove("invalidInput");
                }
                element.classList.add("validInput");
            }

            errorSpan.classList.remove("show-message");
            errorSpan.classList.add("is-hidden");
            // errorSpan.textContent = data.errorText;
            errorSpan.innerHTML = data.errorText;
        } 
    }

    /***
     * `resetFields` function callback
     * Resets every input field on the form
     ***/
    function resetFields(){
        name.value = "";
        name.classList.remove("validInput");

        email.value = "";
        email.classList.remove("validInput");


        const titlesOptions = jobTitle.children;
        for(let i = 0, len = titlesOptions.length; i < len; i++){
            if(titlesOptions[i].hasAttribute("selected")){
                titlesOptions[i].removeAttribute("selected");
            }
        }
        jobTitle.firstElementChild.setAttribute("selected", true);
        const otherJobRole = document.getElementById("other-title");
        otherJobRole.hidden = true;

        const themeOptions = designMenu.children;
        for(let i = 0, len = themeOptions.length; i < len; i++){
            if(themeOptions[i].hasAttribute("selected")){
                themeOptions[i].removeAttribute("selected");
            }
        }
        designMenu.firstElementChild.setAttribute("selected", true);
        const colorContainer = document.getElementById("colors-js-puns");
        colorContainer.classList.add("is-hidden");

        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        for(let i = 0, len = checkboxes.length; i < len; i++){
            if(checkboxes[i].checked){
                checkboxes[i].checked = false;
            }

            if(checkboxes[i].parentNode.classList.contains("unavailable")){
                checkboxes[i].parentNode.classList.remove("unavailable");
            }

            if(checkboxes[i].hasAttribute("disabled")){
                checkboxes[i].removeAttribute("disabled");
            }
        }
        totalCost = 0;
        const label = activitiesFieldset.lastElementChild;
        label.hidden = true;

        const paymentOptions = payment.children;
        for(let i = 0, len = paymentOptions.length; i < len; i++){
            if(paymentOptions[i].hasAttribute("selected")){
                paymentOptions[i].removeAttribute("selected");
            }
        }
        payment.firstElementChild.selected = true;
        creditCard.value = "";
        creditCard.classList.remove("validInput");
        zipCode.value = "";
        zipCode.classList.remove("validInput");
        cvv.value = "";
        cvv.classList.remove("validInput");
    }

    /***
     * `checkForm` function callback
     * Check every input element to see if it can be submitted
     * Calls showHideError function to display the error message if any
     * Calls resetFields function after submitting the data
     ***/
    function checkForm(){
        const errorDiv = form.lastElementChild.previousElementSibling;
        const successSubmition = errorDiv.previousElementSibling;
        let errorText = ""
            whatToDo = "show",
            validInput = true;
        
        if(!nameValidator()){
            validInput = false;
            errorText += "<p>Name field is invalid, please check the information provided!</p>";
        } 
        
        if(!emailValidator()){
            validInput = false;
            errorText += "<p>Email field is invalid, please check the information provided!</p>";
        } 
        
        
        if (!activitiesValidator()){
            validInput = false;
            errorText += "<p>You haven't checked any activity, please check at least one!</p>";
        } 

        if(payment.selectedIndex === 0 || payment.selectedIndex === 1){
            const creditCardField = paymentValidator(creditCard);
            const zipCodeField = paymentValidator(zipCode);
            const cvvField = paymentValidator(cvv);
            if(!creditCardField || !zipCodeField || !cvvField){
                validInput = false;
                errorText += "<p>Please check the credit card information provided!</p>";
            }
        }

        if(validInput) {
            errorText = "Information submitted, Thank you!";
            successSubmition.classList.remove("is-hidden");
            successSubmition.classList.add("show-message");
            successSubmition.innerHTML = errorText;

            if(errorDiv.classList.contains("show-message")){
                errorDiv.classList.remove("show-message");
                errorDiv.classList.add("is-hidden");
                errorDiv.innerHTML = "";
            }
            resetFields();
        } else {
            errorDiv.classList.remove("is-hidden");
            errorDiv.classList.add("show-message");
            errorDiv.innerHTML = errorText;

            if(successSubmition.classList.contains("show-message")){
                successSubmition.classList.remove("show-message");
                successSubmition.classList.add("is-hidden");
                successSubmition.innerHTML = "";
            }
        }
    }
    
    /***
     * event delegation on the select menu with id title
     * hide or show text field when selecting/deselecting "other" option
     ***/
    jobTitle.addEventListener("change", event => {
        const otherJobRole = document.getElementById("other-title");
        if(event.target.value === "other"){
            otherJobRole.hidden = false;
        } else{
            otherJobRole.hidden = true;
        }
    });

    /***
     * event delegation on the select menu with id design
     * calls showDesignatedColors callback
     ***/
    designMenu.addEventListener("change", event => {
        showDesignatedColors(event);
    });

    name.addEventListener("blur", nameValidator);
    name.addEventListener("input", nameValidator);

    email.addEventListener("blur", emailValidator);
    email.addEventListener("input", emailValidator);

    /***
     * event delegation on the fieldset that holds the checkboxes
     * Calls checkingCheckboxes and pass the event object
     * Calls activitiesValidator to make sure at least one activity is selected
     ***/
    activitiesFieldset.addEventListener("change", event => {
        checkingCheckboxes(event);
        activitiesValidator();
    });
    // activitiesFieldset.addEventListener("mouseleave", event =>{
    //     activitiesValidator(event);
    // });

    /***
     * event delegation on the select menu with id payment
     * Calls showPaymentMethod to display the correct payment section
     ***/
    payment.addEventListener("change", event =>{
        showPaymentMethod(event);
    });
   
    /***
     * event delegation on every credit card field
     * Calls paymentValidator function to make sure every field is filled out correctly
     ***/
    creditCard.addEventListener("blur", event => {
        paymentValidator(event);
    });
    creditCard.addEventListener("input", event => {
        paymentValidator(event);
    });

    zipCode.addEventListener("blur", event => {
        paymentValidator(event);
    });
    zipCode.addEventListener("input", event => {
        paymentValidator(event);
    });

    cvv.addEventListener("blur", event => {
        paymentValidator(event);
    });
    cvv.addEventListener("input", event => {
        paymentValidator(event);
    }); 
    
    /***
     * event delegation on the form element
     * Prevents the default behavior to avoid the page refresh, so it is able to show the successful message
     * To send information to the server it would use an Ajax request instead of the default behavior
     * Calls the checkForm function to make sure everything is filled out correctly
     ***/
    form.addEventListener("submit", event => {
        event.preventDefault();
        checkForm();
    });

    initializer();
})();