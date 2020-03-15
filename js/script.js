define(["validators"], function(validators){
    /******************************************
    Treehouse Techdegree:
    FSJS project 3 - Interactive Form
    ******************************************/

    /*** 
     * IIFE not needed, just for learning purposes
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
            const colorOptions = colorMenu.children;
            const selection = event ? event.target.value : "";
            const midPoint = Math.round(colorOptions.length / 2);

            for(let i = 0, len = colorOptions.length; i < len; i++){
                if(colorOptions[i].hasAttribute("selected")){
                    colorOptions[i].removeAttribute("selected");
                }
                colorOptions[i].hidden = true;

                if(selection === "js puns" && i < midPoint){
                    colorOptions[i].hidden = false;
                } else if(selection === "heart js" && i >= midPoint){
                    colorOptions[i].hidden = false;
                } 
            }

            if(selection === "js puns"){
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
         * `checkForm` function callback
         * Check every input element to see if it can be submitted
         * Calls showHideError function to display the error message if any
         ***/
        function checkForm(){
            const errorDiv = form.lastElementChild.previousElementSibling;
            const successSubmition = errorDiv.previousElementSibling;
            let errorText = ""
                whatToDo = "show",
                validInput = true;
            
            if(!validators.nameValidator()){
                validInput = false;
                errorText += "<p>Name field is invalid, please check the information provided!</p>";
                event.preventDefault();
            } 
            
            if(!validators.emailValidator()){
                validInput = false;
                errorText += "<p>Email field is invalid, please check the information provided!</p>";
                event.preventDefault();
            } 
            
            
            if (!validators.activitiesValidator()){
                validInput = false;
                errorText += "<p>You haven't checked any activity, please check at least one!</p>";
                event.preventDefault();
            } 

            if(payment.selectedIndex === 0 || payment.selectedIndex === 1){
                const creditCardField = validators.paymentValidator(creditCard);
                const zipCodeField = validators.paymentValidator(zipCode);
                const cvvField = validators.paymentValidator(cvv);
                if(!creditCardField || !zipCodeField || !cvvField){
                    validInput = false;
                    errorText += "<p>Please check the credit card information provided!</p>";
                    event.preventDefault();
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

        name.addEventListener("blur", validators.nameValidator);
        name.addEventListener("input", validators.nameValidator);

        email.addEventListener("blur", validators.emailValidator);
        email.addEventListener("input", validators.emailValidator);

        /***
         * event delegation on the fieldset that holds the checkboxes
         * Calls checkingCheckboxes and pass the event object
         * Calls activitiesValidator to make sure at least one activity is selected
         ***/
        activitiesFieldset.addEventListener("change", event => {
            checkingCheckboxes(event);
            validators.activitiesValidator();
        });

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
            validators.paymentValidator(event);
        });
        creditCard.addEventListener("input", event => {
            validators.paymentValidator(event);
        });

        zipCode.addEventListener("blur", event => {
            validators.paymentValidator(event);
        });
        zipCode.addEventListener("input", event => {
            validators.paymentValidator(event);
        });

        cvv.addEventListener("blur", event => {
            validators.paymentValidator(event);
        });
        cvv.addEventListener("input", event => {
            validators.paymentValidator(event);
        }); 
        
        /***
         * event delegation on the form element
         * Calls the checkForm function to make sure everything is filled out correctly
         ***/
        form.addEventListener("submit", checkForm);

        initializer();
    })();
});