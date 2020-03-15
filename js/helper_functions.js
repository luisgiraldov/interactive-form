define(function(){
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
            errorSpan.innerHTML = data.errorText;
        } 
    }

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
    
    return {
        showHideError: showHideError,
        validateSpecialCharacters: validateSpecialCharacters
    };
});