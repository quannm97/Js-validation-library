function provideFeedback(results) {
    for(const sourceInput in results) {
        const element = document.querySelector("#" + sourceInput);
        console.log(results[sourceInput].isTrue);
        if (results[sourceInput].isTrue === false) {
            element.nextElementSibling.textContent = results[sourceInput].errMessages[0]
            element.nextElementSibling.classList.add("is-invalid")
            element.classList.add("is-invalid")
        }
        else{
            element.nextElementSibling.textContent = ''
            element.nextElementSibling.classList.add("is-valid")
            element.nextElementSibling.classList.remove("is-invalid")
            element.classList.add("is-valid")
            element.classList.remove("is-invalid")
        }
    }
}
function Validate(options) {
    const rules = options.rules;
    const results = {};
    
    /**
     * @description 4. setTrue to check value
     */
    function setTrue(sourceInput, isChecked) {
        if(!results[sourceInput]){
            results[sourceInput] = {isTrue: null};
        }
        
        results[sourceInput].isTrue = isChecked
    }
    const methods = {
        /**
         *
         * @param {string} sourceInput
         * @returns {message,isTrue}
         * @type {message} = string
         * @type {isTrue} = boolean
         * @description 3. Create 'results' object to save value.
        */
        required: (sourceInput) => {
            const inputBar = document.querySelector("#" + sourceInput);
            if (!inputBar.value) {
                setTrue(sourceInput, false)
                return sourceInput + " is required"
                    
            } else {
                setTrue(sourceInput, true)
                return null
            }
        },
    };


    /**
     * @description 2.handleSubmit logic
     * 2.1 Take input value
     * 2.2 Create method
     */
    function handleSubmit() {
        for (let sourceInput in rules) {
            const methodsArr = rules[sourceInput];

            for (let validateMethod of methodsArr) {
                const result = methods[validateMethod](sourceInput);
                    results[sourceInput].errMessages = [result]
                    console.log(results);
            }
        }
        provideFeedback(results)
    }
    /**
     * @description 1. Init creator
     */

    function init() {
        const quickForm = document.querySelector(".submit_form");
        quickForm.addEventListener("click", handleSubmit);
    }
    init();
}

const data = {
    rules: {
        name: ["required", "maxmin: 5, 15"],
        email: ["required"],
        password: ["required"],
    },
};

const validateInstance = new Validate(data);
