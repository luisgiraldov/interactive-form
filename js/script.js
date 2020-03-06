(function(){
    const jobTitle = document.getElementById("title");
    const designMenu = document.getElementById("design");
    const colorMenu = document.getElementById("color");
    const activitiesFieldset = document.querySelector(".js-activities");
    const payment = document.getElementById("payment");
    const name = document.getElementById("name");
    const email = document.getElementById("mail");
    const creditCard = document.getElementById("cc-num");
    const zipCode = document.getElementById("zip");
    const cvv = document.getElementById("cvv");
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
     * appending first option to the color menu
     * get the job role text field and hide it
     ***/
    function initializer(){
        const otherJobRole = document.getElementById("other-title");
        const option = document.createElement('OPTION');
        option.textContent = "Please select a T-shirt theme";
        option.selected = true;
        colorMenu.prepend(option);
        const label = document.createElement("LABEL");
        label.textContent = 0;
        label.hidden = true;
        activitiesFieldset.appendChild(label);
        otherJobRole.hidden = true;
        showDesignatedColors();
        showPaymentMethod();
    }

    /***
     * Callback function to show designated colors when the design menu is changed
     ***/    
    function showDesignatedColors(event){
        const colorOptions = colorMenu.children;
        const selection = event ? event.target.value : "Select Theme";
        const midPoint = Math.round(colorOptions.length / 2);

        for(let i = 0, len = colorOptions.length; i < len; i++){
            if(colorOptions[i].hasAttribute("selected")){
                colorOptions[i].removeAttribute("selected");
            }
            colorOptions[i].hidden = true;

            if(selection === "js puns" && i < midPoint && i > 0){
                colorOptions[i].hidden = false;
            } else if(selection === "heart js" && i >= midPoint){
                colorOptions[i].hidden = false;
            } 
        }

        if(selection === "Select Theme"){
            colorOptions[0].setAttribute("selected", true);
        } else if(selection === "js puns"){
            colorOptions[1].setAttribute("selected", true);
        } else if(selection === "heart js"){
            colorOptions[midPoint].setAttribute("selected", true);
        } 
    }//end showDesignatedColors

    /***
     * Callback function to handle checkboxes
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
           label.textContent = `Total: ${totalCost}`;
        } else {
           totalCost -= cost;
           label.textContent = `Total: ${totalCost}`;
        }
    }//end checkingCheckboxes

    /***
     * Callback function to handle payment section
     ***/ 
    function showPaymentMethod(event){
        const selection = event ? event.target.value : "";
        // const paymentOptions = payment.children;
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
     * Callback function to handle name input
     ***/ 
    function nameValidator(){
        let nameValue = name.value, 
            whatToDo = "", 
            errorText = "";
        nameValue = nameValue.trim();
        const errorSpan = name.nextElementSibling;
        const validInput = validateSpecialCharacters(nameValue);

        if(nameValue.length > 0 && validInput){
            whatToDo = "hide";
        } else if(!validInput){
            whatToDo = "show";
            errorText = "The input cannot contain any special character, such as <!@?...";
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
     * Callback function to handle email input
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
     * Callback function to handle activities checkboxes
     ***/
    function activitiesValidator(event){
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
     * Callback function to handle payment
     ***/
    function paymentValidator(event){
        let input = event.target.value;
        input = input.replace(/\s*/g, "");
        const target = event.target;
        target.value = input;
        const validInput = /^\d*$/.test(input);
        const errorSpan = target.nextElementSibling;
        let whatToDo = "show",
            errorText = "";
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
            }
            showHideError({
                element: target,
                errorElement: errorSpan,
                whatToDo: whatToDo,
                errorText: errorText
            });
        } /** If the target was fired by the zip code field, check if its value is 5 digits long */
        else if(target === zipCode){
            if(input.length < 5 || input.length > 5){
                errorText = "You must enter a valid zip code number!";
            } else {
                whatToDo = "hide";
            }
            showHideError({
                element: target,
                errorElement: errorSpan,
                whatToDo: whatToDo,
                errorText: errorText
            });
        } /** If the target was fired by the cvv field, check if its value is 3 digits long */
        else if(target === cvv){
            if(input.length < 3 || input.length > 3){
                errorText = "You must enter a valid cvv number!";
            } else {
                whatToDo = "hide";
            }
            showHideError({
                element: target,
                errorElement: errorSpan,
                whatToDo: whatToDo,
                errorText: errorText
            });
        }
    } //end paymentValidator

    /***
     * showError function to handle input errors
     * @object -data holds the values of element, whatToDo, and errorText
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
            errorSpan.classList.add("show-error");
            errorSpan.textContent = data.errorText;
        } else if(data.whatToDo === "hide"){
            if(data.element){
                const element = data.element;
                if(element.classList.contains("invalidInput")){
                    element.classList.remove("invalidInput");
                }
                element.classList.add("validInput");
            }

            errorSpan.classList.remove("show-error");
            errorSpan.classList.add("is-hidden");
            errorSpan.textContent = data.errorText;
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

    activitiesFieldset.addEventListener("change", event => {
        checkingCheckboxes(event);
        activitiesValidator();
    });
    activitiesFieldset.addEventListener("blur", activitiesValidator);
    activitiesFieldset.addEventListener("mouseleave", event =>{
        activitiesValidator(event);
    });

    payment.addEventListener("change", event =>{
        showPaymentMethod(event);
    });
   
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
    initializer();
})();