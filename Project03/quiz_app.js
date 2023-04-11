const appState = {
    current_view: "#intro_view",
    current_question: -1,
    current_model: {}
};

const encouragingMessage = [
    `<div class="container"><img class="center" width="500px" height="500px" src="https://thumbs.dreamstime.com/b/hand-drawn-lettering-word-brilliant-motivational-quote-hand-drawn-lettering-word-brilliant-167630836.jpg"></div>`,
    `<div class="container"><img class="center" width="500px" height="500px" src="https://thumbs.dreamstime.com/b/word-amazing-comic-cloud-explosion-background-illustration-216308972.jpg"></div>`,
    `<div class="container"><img class="center" width="500px" height="500px" src="https://media.istockphoto.com/id/1280293279/vector/great-job-word-isolated-with-stars-hand-calligraphy-lettering-as-logo-icon-tag-label.jpg?s=612x612&w=0&k=20&c=YceXShflBjne1q5bYA9b6wi-_CqXhq9TOv1JwddlFWI="></div>`
];

var choiceSelected = "";

document.addEventListener("DOMContentLoaded", () => {
    appState.current_view = "#intro_view";
    update_view();

    document.querySelector("#widget_view").onclick = (e) => {
        handle_widget_event(e);
        return false;
    }
})

function update_view() {
    let template_source = document.querySelector(appState.current_view).innerHTML;
    var template = Handlebars.compile(template_source);
    var html_widget_element = template(appState.current_model);
    document.querySelector("#widget_view").innerHTML = html_widget_element;
}

function handle_widget_event(e) {
    //console.log(e);
    switch(e.target.id) {
        case "java_quiz": {
            if(document.querySelector("#user_name").value == "") {
                alert("Please enter your name before selecting a quiz.");
            }
            else {
                get_new_java_question();
            }
            break;
        }

        case "javascript_quiz": {
            if(document.querySelector("#user_name").value == "") {
                alert("Please enter your name before selecting a quiz.");
            }
            break;
        }

        case "choice_1":
        case "choice_2":
        case "choice_3":
        case "choice_4": {
            select_choice(`#${e.target.id}`);
            break;
        }
    }

    if(e.target.dataset.action == "answer") {
        check_answer(e.target.dataset.answer);
    }
    else if(e.target.dataset.action == "submit") {
        switch(appState.current_view) {
            case "#multiple_choice": {
                if(choiceSelected != "") {
                    check_answer(choiceSelected);
                }
                else {
                    alert("Please choose an option before submitting.");
                }
                break;
            }

            case "#text_input_one": {
                let answer = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
                if(answer != "") {
                    check_answer(answer);
                }
                else {
                    alert("Please enter an answer before submitting.");
                }
                break;
            }

            case "#text_input_multiple": {
                let answerOne = document.querySelector(`#${appState.current_model.answerFieldOneId}`).value;
                let answerTwo = document.querySelector(`#${appState.current_model.answerFieldTwoId}`).value;
                
                if(answerOne == "" || answerTwo == "") {
                    alert("Please fill in both fields before submitting.");
                }
                else if(answerOne == answerTwo) {
                    alert("Please submit two different answers in the text boxes.");
                }
                else {
                    check_answers(answerOne, answerTwo);
                }
            }

        }
    }
}

async function get_new_java_question() {
    appState.current_question += 1;
    try{
        let question = await fetch("https://my-json-server.typicode.com/averylagredelle/CUS-1172/java_questions");
        questionObj = await question.json();
    } catch(err) {
        console.log(err);
    }

    if(appState.current_question < questionObj.length) {
        appState.current_model = questionObj[appState.current_question];
        appState.current_view = "#" + questionObj[appState.current_question].questionType;
        update_view();
    }
}

function check_answer(answer) {
    if(answer == appState.current_model.correctAnswer) {
        show_correct_view();
        setTimeout(get_new_java_question, 1000);
    }
    else {
        show_incorrect_view();
    }
}

function check_answers(answerOne, answerTwo) {
    let answerOneCorrect = false;
    let answerTwoCorrect = false;
    let correctAnswers = appState.current_model.correctAnswer;

    for(let i = 0; i < correctAnswers.length; i++) {
        if(correctAnswers[i] == answerOne) {
            answerOneCorrect = true;
        }
        if(correctAnswers[i] == answerTwo) {
            answerTwoCorrect = true;
        }
    }

    if(answerOneCorrect && answerTwoCorrect) {
        show_correct_view();
        setTimeout(get_new_java_question, 1000);
    }
    else {
        show_incorrect_view();
    }
}

function show_correct_view() {
    document.querySelector("#widget_view").innerHTML = encouragingMessage[Math.floor(Math.random() * encouragingMessage.length)];
}

function show_incorrect_view() {}

function select_choice(choice_id) {
    choice = document.querySelector(choice_id);
    choiceSelected = choice.value;
    let new_html = `<input name="${choice.name}" type="radio" value='${choice.value}' id="${choice.id}" checked>`;
    choice.outerHTML = new_html;
}