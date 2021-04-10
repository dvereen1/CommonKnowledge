//==========Navigation==============//
function showMenu(){
    const navToggle = document.querySelector(".nav-toggle");
    const menu = document.getElementById("nav-menu");
    const menuHeight = menu.scrollHeight;
    const navLinks = document.querySelectorAll(".nav-link");

    /**
     * removes and adds css classes from and to element
     * 
     * @param {HTMLElement} element - the element on which to remove and add css class
     * @param {String} remove - the css class to be removed element
     * @param {String} add - the css class to be added to element
     */
    function classAddRemove(element, remove, add){
        if(element.classList.contains(remove)){
            element.classList.remove(remove);
        }
        element.classList.add(add);
       
    }
    navToggle.addEventListener("click", function(){
        let expanded = menu.getAttribute("aria-expanded") === "true" || false;
        //console.log(menuHeight);
        if(expanded){
            //console.log("close menu");
            classAddRemove(menu, "shower", "hider");
            menu.setAttribute("aria-expanded", !expanded);
        }else{
            //console.log("open menu");
            classAddRemove(menu, "hider", "shower");
            menu.setAttribute("aria-expanded", !expanded);
        }
    });
    navLinks.forEach(function(link){
        link.addEventListener("click", function(){
            let expanded = menu.getAttribute("aria-expanded") === "true" || false;
            classAddRemove(menu, "shower", "hider");
            menu.setAttribute("aria-expanded", !expanded);
        });
    });
}
showMenu();


function toggleClass(elements, className, addOrRemove){
    if(Array.isArray(elements)){
        elements.forEach(function(element){
            if(addOrRemove){
                element.classList.add(className);
            }else if(!addOrRemove){
                element.classList.remove(className);
            }
        });
    }else{
        if(addOrRemove){
            elements.classList.add(className);
        }else if(!addOrRemove){
            elements.classList.remove(className);
        }
    }
}
  /**
     * Generates random number
     * 
     * @param {Number} min - the minimum number
     * @param {Number} max - the maximum number
     * @returns {Number} - the random number
     */
    function genRandNum(min, max){
        let randNum = Math.random() * (max - min) + min;
        return Math.round(randNum);
    }
//=============== Create Quiz Section ===================//
    /**
     * Creates the html nodes which hold various questions and answers
     * 
     * @param {Array} quizArr - the array which contains objects that hold the questions and answers generated from the  query.
     */
    function createQuizSection(quizArr){
        const hero = document.querySelector(".hero");
        hero.remove();
        const quizContParent = document.querySelector(".quiz-opt-container");
        const quizCont = document.querySelector(".quiz-opt-content");
        quizContParent.classList.add("quiz-time");
        quizCont.classList.add("quiz-time");
        const category = quizArr[0];
        const amount = parseInt(quizArr[1]);
        const difficulty = quizArr[2];
        //map through each of the questions, returning new html div elements for each question in the quiz array and then within that element map through the answers to generate a html element for each
        quizCont.innerHTML = 
        `
           <h1 class = "quiz-type">${category}<br>${amount} Questions - ${difficulty}</h1>
            <div class = "question-container">
                ${quizArr.map(function(question, index){
                    if(typeof question === "object"){
                        const qNum = index - 2;
                        return `
                            <div class = "question-group">
                                <p class="question">
                                    ${qNum}.) ${question.question}
                                </p>
                                ${question.answers.map(function(answer, index){
                                    const aNum = index + 1;
                                    let abcd;
                                    switch(aNum){
                                        case 1: 
                                            abcd = "a";
                                            break;
                                        case 2: 
                                            abcd = "b";
                                            break;
                                        case 3: 
                                            abcd = "c";
                                            break;
                                        case 4: 
                                            abcd = "d";
                                            break; 
                                    }
                                    return `
                                    <div class = "ans-opt">
                                        <input type = "radio" name = "answer${qNum}" id = "q${qNum}ans${aNum}">
                                        <label for = "q${qNum}ans${aNum}">
                                            ${abcd}. ${answer}
                                        </label>
                                    </div>
                                    `
                                }).join("")}
                            </div>
                        `;
                    }
                }).join("")}
            </div>
            <button class = "quiz-btn">Submit</button>
         
        `;
   //================= Grade the Quiz =================//
        const subBtn = document.querySelector(".quiz-btn");
        subBtn.addEventListener("click", function(){
            //scroll to top of page
            const scrollTimer = setTimeout(function(){
                window.scrollTo(0,0);
                 clearTimeout(scrollTimer);
             }, 100);
            //get all the checked input values
            const userAnswers = document.querySelectorAll(".quiz-opt-container input[type='radio']:checked + label");
            const uAnsArr = Array.from(userAnswers);
            if(userAnswers.length < amount){
                alert(`You have unanswered questions left`);
            }else{
               // const wrongAnswers = [];
                this.remove();
                const questionCont = document.querySelector(".question-container");

                //compare the user's answer and the correct answer, if the answer is incorrect return a new div element that specifies the question, the correct anwer and the user's answer then add each answer div to the question-container element in the DOM
                questionCont.innerHTML = `
                    <h2 class = "score-h2">Good Job!</h2>
                    <h3 class = "score-h3">You missed some.</h3>
                    ${uAnsArr.map(function(answer, index){
                        const trueUserAns = answer.innerText.substr(answer.innerText.indexOf(" ")).trim();
                        const question = quizArr[index + 3].question.trim();
                        const rightAnswer = quizArr[index + 3].rightAnswer.trim();
                        if(trueUserAns !== rightAnswer){
                            return `
                                <div class = "question-group c-answer">
                                    <p class = "correct-question question">Q: ${question}</p>
                                    <div class = "ans-opt">
                                        <p class = "correct-answer">
                                            Correct answer:<br>
                                            ${rightAnswer}
                                        </p>
                                        <p>
                                            Your answer:<br>
                                            ${trueUserAns}
                                        </p>
                                    </div>
                                </div>
                            `;
                        }
                    }).join("")}
                    <button class = "retry-btn">
                        Home
                    </button>
                `;
                //return to home screen
                const homeBtn = document.querySelector(".retry-btn")
                homeBtn.addEventListener("click", function(){
                    window.location.reload();
                });   
            }
        });
    }
//================= Fetch Quiz Questions ================/
    /**
     * Loops through response array
     *  //loop through the results, couple them in an object and push each object in an array
     * @param {*} response - repsonse object from fetch call to opentdb
     * @param {*} qArray 
     * @param {String} location - the url/window location of the page that called this function
     */
    function genQuestAns(response, qArray){
       
        response.results.forEach(function(result){
            const question = decodeURIComponent(result.question);
            const answer = decodeURIComponent(result.correct_answer);
            const answers = [];
            result.incorrect_answers.forEach(function(iAnswer){
                answers.push(decodeURIComponent(iAnswer));
            });
            const randIndex = genRandNum(0, 3);
            answers.splice(randIndex, 0, answer);    
            qArray.push(
                {
                    question: question,
                    rightAnswer: answer,
                    answers: answers
                }
            )
        });
        //display the quiz
        createQuizSection(qArray, location);
    }
/**
     * Generates the numeric representation of the quiz category.
     *  Crafts query string given the category, amount of questions and difficulty.
     * Fetches session token if it does not already exist and calls fetcher function to fetch the quiz questions.
     * 
     ** @param {String} amount - the amount of questions to retrieve
     * @param {String} category - the quiz subject matter
     * @param {String} difficulty - the difficulty of the questions
     * @param {Boolean} calledSelf - optional parameter - true if if this functions calls its self..null otherwise
     * @param {String} location - the url of the page that calls this function
     * may also add the option to choose true or false or multiple choice later. 
     * for now default option is multiple choice.
     */ 
    function getQuestions(category, difficulty, amount, location = null){
        let catId;
        //console.log("should be getting questions");
        //const token = genRandNum(16);
        switch(category){
            case "Literature":
                catId = 10;
                break;
            case "Geography":
                catId = 22;
                break;
            case "Movies":
                catId = 11;
                break;
            case "Music":
                catId = 12;
                break;
            case "Sports":
                catId = 21;
                break;
            case "Animals":
                catId = 27;
                break;
        }
        (difficulty === "Intermediate") ? difficulty = "Medium" : difficulty;
        (difficulty === "Challenging") ? difficulty = "Hard" : difficulty;

        const questionObj = [category, amount, difficulty];

        /*  
            need to fetch session token if token does not exist and use that token in the request for the question.
            must store session token client side. 
            need to make a method to check the response code because the token will expire after a time. If the token is expired another token will need to be retrieved.

            need to check response code and if its 3 or 4,
            need to reset token with
            https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE

            so this means another batch of fetch where we return the new  token then do some thens

            perhaps two seperate fetch chains. the very first chain includes the request for token and the initial questions
              example of the token response 
                    {response_code: 0, response_message: "Token Generated Successfully!", token: "2b07758a1f086f47b11b2916c43dfc5b5d3bbf9ea3585770a45b694d8b95b3fb"}
            the second only fetches the questions..

            API response codes

            Code 0: Success Returned results successfully.
            Code 1: No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
            Code 2: Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)
            Code 3: Token Not Found Session Token does not exist.
            Code 4: Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary

        */
        //retrieve object that may hold token
        //const tokenExists = retrieveToken();
        //check if quiz token exists
       



        const tokenQuery = "https://opentdb.com/api_token.php?command=request";
        //sessionStorage.clear();
        queryString = `https://opentdb.com/api.php?amount=${amount}&category=${catId}&difficulty=${difficulty.toLowerCase()}&type=multiple&encode=url3986`;
        if(!sessionStorage.getItem("quizToken")){
        //session token does not exist so fetch one
            //console.log("session token does not exist");
            fetch(tokenQuery).then(function(response){
                return response.json();
            }).then(function(response){
                //console.log("This is the token..make this persist somehow, ", response);
                //store the object containing token client session storage
                sessionStorage.setItem("quizToken", JSON.stringify(response));
                //fetch the questions with the token attached to the query string
                return fetch(queryString+=`&token=${response.token}`);
            }).then(function(response){
                return response.json();
            }).then(function(response){
                //console.log("should see quiz questions: ", response);
                genQuestAns(response,questionObj,location);
            }).catch(function(error){
                //console.log(error);
                alert("There has been an error with the quiz request.\nTry again later.");
            });
        }else{
            //session token exists, pull it from session storage and append it to query string
            ("Quiz token exists");
            const tokenObj = JSON.parse(sessionStorage.getItem("quizToken"));
            ("this is the token: ", tokenObj);
            fetch(`https://opentdb.com/api.php?amount=${amount}&category=${catId}&difficulty=${difficulty.toLowerCase()}&type=multiple&encode=url3986&token=${tokenObj.token}`)
            .then(function(response){
                (response);
                return response.json();
            }).then(function(response){
                ("the response: ",response);
                //handle repsonse error codes
                switch(response.response_code){
                    case 3:
                        ("token does not exit need new token");
                        return;
                    case 4:
                        ("reset token. Getting new token...");
                        const resetTokenQuery = `https://opentdb.com/api_token.php?command=reset&token=${tokenObj.token}`;

                       fetch(resetTokenQuery).then(function(response){
                            (response);
                            return response.json();
                        }).then(function(response){
                           // (repsonse);
                            //re-store the session token
                            sessionStorage.setItem("quizToken", JSON.stringify(response));
                            //call this function again
                            getQuestions(category, difficulty, amount, location);
                        }).catch(function(error){
                            (error);
                            alert("There has been an error with the quiz request.\nTry again later.");
                        });
                        return;
                }
                //generate objects that hold each question and its set of answers and push it on the questionObj
                genQuestAns(response, questionObj, location);
            }).catch(function(error){
                (error);
                alert("There has been an error with the quiz request.\nTry again later.");
            });
            
        }
       
    }


/**
 * Adds event listeners to the buttons within the final check view.
 * Hides final check view and displays the amount view if the back button is clicked. Launches quiz with given parameters if the launch button is clicked.
 * @param {String} category - the category selected
 * @param {String} difficulty - the difficulty selected
 * @param {String} amount - the amount of question selected
 * @param {NodeList} lists - node list of the different views 
 * @param {HTMLElement} bg - the html element that spans the height and width of the container and darkens the background
 *
 */

function prepareFinalCheck(category, difficulty, amount, bg, lists){
  
    ("in the preparefinal check function..these are the categories: ", category, difficulty, amount);
   
    
}


const options = document.querySelectorAll(".quiz-opt");
let queryParams = {};
let category, difficulty, amount;

function handleOptions(bg, lists, items, category){
    let hOCategory = category, difficulty, amount;
    //bg.classList.toggle("show-option-list");
    //lists[0].classList.toggle("show-option-list");
    
    ("this is the amount");
}
//listen to click events on the quiz caterogies
const quizCategories = document.querySelectorAll(".quiz-opt");
quizCategories.forEach(function(cat){
    cat.addEventListener("click", function(){
        category = this.innerText.trim();
        //now open options menu
       // handleOptions(optionBg, optionLists, optionItems, category);
       toggleClass([optionBg, optionLists[0]], "show-option-list", true);
    });
});

//listen for click events on the quiz difficulty and amount options
const optionBg = document.querySelector(".option-bg");
const optionLists = document.querySelectorAll(".option-bg .option");
const optionItems = document.querySelectorAll(".option-item");
const selectedCat = document.querySelector(".selected-category");
const selectedDiff = document.querySelector(".selected-difficulty");
const selectedAm = document.querySelector(".selected-amount");
optionItems.forEach(function(item){
    item.addEventListener("click", function(){
        //("something's been clicked")
        switch(this.dataset.option){
            case "difficulty":
                difficulty = this.innerText.trim();
                ("this difficulty was selected: ", difficulty);
                //hide difficulty options and display amount options
                optionLists[0].classList.remove("show-option-list");
                optionLists[1].classList.add("show-option-list");
                break;
            case "amount":
                amount = this.innerText.trim();
                ("this amount was selected: ", amount);
                //hide amount options and display final check
                optionLists[1].classList.remove("show-option-list");
                optionLists[2].classList.add("show-option-list");
                ("these are the query parameters: ",category, difficulty, amount);
                //prepareFinalCheck(category, difficulty, amount,optionBg,optionLists); 
                selectedCat.innerText = category;
                selectedDiff.innerText = difficulty;
                selectedAm.innerText = amount;      
                break;
            case "difficulty-db":
                ("back to main screen");
                //go back to the main screen
                toggleClass([optionBg, optionLists[0]], "show-option-list", false);
                break;
            case "amount-db":
                ("back to difficulty");
                //go back to difficulty options
                optionLists[1].classList.remove("show-option-list");
                optionLists[0].classList.add("show-option-list");
                break;
        }
    });
});

//listen for click events on the launch quiz or go back button in the finalcheck container/view

const quizBtn = document.querySelector(".take-quiz-btn");
const backbtn = document.querySelector(".go-back-btn");
[quizBtn, backbtn].forEach(function(btn){
    btn.addEventListener("click", function(){
        ("this button was clicked", this);
        if(this.classList.contains("go-back-btn")){
            //go back to amount options
         optionLists[2].classList.remove("show-option-list");
         optionLists[1].classList.add("show-option-list");
        }else if(this.classList.contains("take-quiz-btn")){
            ("launch quiz with these parameters: ", category, difficulty, amount);
            //generate quiz questions, hide the final check view, and grab current window location
            
            //console.log("this is the current page: ");
            toggleClass([optionLists[2], optionBg], "show-option-list", false);
            //console.log("these are the categories before generations questionss: ", category, difficulty, amount);
            getQuestions(category, difficulty, amount);
        }
    });
});
