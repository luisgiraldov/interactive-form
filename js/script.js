(function(){
    const jobTitle = document.getElementById("title");
    const designMenu = document.getElementById("design");
    const colorMenu = document.getElementById("color");
    const activitiesFieldset = document.querySelector(".js-activities");
    const payment = document.getElementById("payment");
    const name = document.getElementById("name");
    const email = document.getElementById("mail");
    let totalCost = 0;
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
        // if(selection && selectPaymentOption.value === "select method"){
        //     payment.removeChild(selectPaymentOption);
        // }

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

    function addValidInputClass(element){
        if(element.classList.contains("invalidInput")){
            element.classList.remove("invalidInput");
        }
        element.classList.add("validInput");
    }

    function addInvalidInputClass(element){
        if(element.classList.contains("validInput")){
            element.classList.remove("validInput");
        }
        element.classList.add("invalidInput");
    }

    /***
     * Callback function to handle name input
     ***/ 
    function nameValidator(){
        const nameValue = name.value;
        const errorSpan = name.nextElementSibling;
        if(nameValue.length > 0){
            // name.style.borderColor = "green";
            // name.style.backgroundColor = "azure";
            // name.style.marginBottom = "";

            addValidInputClass(name);
            showHideError({
                element: errorSpan,
                whatToDo: "hide",
                errorText: ""
            });
            return true;
        } else {
            addInvalidInputClass(name);
            showHideError({
                element: errorSpan,
                whatToDo: "show",
                errorText: "The name field must have a name on it!"
            });
            
            // name.style.borderColor = "red";
            // name.style.backgroundColor = "#fdd";
            // name.style.marginBottom = "0";
            return false;
        }
    }

    /***
     * Callback function to handle email input
     ***/
    function emailValidator(){
        const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
        const emailValue = email.value;
        const errorSpan = email.nextElementSibling;
        if(emailValue === ""){
            showHideError({
                element: errorSpan,
                whatToDo: "show",
                errorText: "The email field must have a value!"
            });
            addInvalidInputClass(email);
        } else if(!emailRegex.test(emailValue)){
            showHideError({
                element: errorSpan,
                whatToDo: "show",
                errorText: "The email must be a valid email address!"
            });
            addInvalidInputClass(email);
        } else {
            showHideError({
                element: errorSpan,
                whatToDo: "hide",
                errorText: ""
            });
            addValidInputClass(email);
        }

    }

    /***
     * showError function to handle input errors
     * @object -data holds the values of element, whatToDo, and errorText
     ***/ 
    function showHideError(data){
        const errorSpan = data.element;
        if(data.whatToDo === "show"){
            errorSpan.classList.remove("is-hidden");
            errorSpan.classList.add("show-error");
            errorSpan.textContent = data.errorText;
        } else if(data.whatToDo === "hide"){
            errorSpan.classList.remove("show-error");
            errorSpan.classList.add("is-hidden");
            errorSpan.textContent = data.errorText;
        }
        
    }

    /***
     * addingMultipleEventsListener function to add event listeners
     * @array events
     * @object data holds the element and callback
     ***/ 
    function addingMultipleEventsListener(data){
        data.events.forEach( event => {
            data.element.addEventListener(event, data.callback);
        });
    }
    
    /***
     * event delegation on the select menu with id title
     * hide or show text field when selecting/deselecting "other" option
     ***/
    jobTitle.addEventListener("change", event => {
        // const titleOptions = document.querySelectorAll("#title option[value]");
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

    activitiesFieldset.addEventListener("change", event => {
        checkingCheckboxes(event);
    });

    payment.addEventListener("change", event =>{
        showPaymentMethod(event);
    });

    email.addEventListener("input", emailValidator);
    addingMultipleEventsListener({
                                  events:["blur",
                                         "input"],
                                  element: name,
                                  callback: nameValidator  
                                  });
    initializer();
})();