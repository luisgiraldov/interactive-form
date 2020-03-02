(function(){
    const jobTitle = document.getElementById("title");
    const designMenu = document.getElementById("design");
    const activitiesFieldset = document.querySelector(".js-activities");
    /***
     * appending first option to the color menu
     * get the job role text field and hide it
     ***/
    // function initializer(){
        const otherJobRole = document.getElementById("other-title");
        const colorMenu = document.getElementById("color");
        const option = document.createElement('OPTION');
        option.textContent = "Please select a T-shirt theme";
        option.selected = true;
        colorMenu.prepend(option);
        otherJobRole.hidden = true;
    // }

    /***
     * Callback function to show designated colors when the design menu is changed
     ***/    
    function showDesignatedColors(selection, colorOptions){
        //Write something to validate the selected attribute
        if(option.hasAttribute("selected")){
            option.removeAttribute("selected");
        }

        for(let i = 0, len = colorOptions.length; i < len; i++){
            if(colorOptions[i].hasAttribute("selected")){
                colorOptions[i].removeAttribute("selected");
            }
            colorOptions[i].hidden = true;
        }

        if(selection === "Select Theme"){
            option.setAttribute("selected", true);
        } else if(selection === "js puns"){
            colorOptions[0].setAttribute("selected", true);
            for(let i = 0; i < 3; i++){
                colorOptions[i].hidden = false;
            }
        } else if(selection === "heart js"){
            const startingColor = Math.round(colorOptions.length / 2);
            colorOptions[startingColor].setAttribute("selected", true);
            for(let i = 3; i < 6; i++){
                colorOptions[i].hidden = false;
            }
        } 
    }//end showDesignatedColors

    function checkingCheckboxes(event){
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        const clicked = event.target;
        const clickedData = clicked.getAttribute("data-day-and-time");
        
        for(let i = 0, len = checkboxes.length; i < len; i++){
            const checkboxData = checkboxes[i].getAttribute("data-day-and-time");
            if(clickedData === checkboxData && clicked !== checkboxes[i]){
                if(clicked.checked){
                    checkboxes[i].disabled = true;
                } else {
                    checkboxes[i].disabled = false;
                       }
            }
        }
    }//end checkingCheckboxes

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
        const colorOptions = document.querySelectorAll("#color option[value]");
        showDesignatedColors(event.target.value, colorOptions);
    });

    activitiesFieldset.addEventListener("change", event => {
        checkingCheckboxes(event);
    });

    // initializer();
})();