const appState = {
    current_view: "#intro_view",
    current_question: -1,
    current_model: {}
}

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
    if(e.target.id == "java_quiz") {
        if(document.querySelector("#user_name").value == "") {
            alert("Please enter your name before selecting a quiz.");
        }
        else {
            get_new_java_question();
        }
    }
    else if(e.target.id == "javascript_quiz") {
        if(document.querySelector("#user_name").value == "") {
            alert("Please enter your name before selecting a quiz.");
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
    appState.current_model = questionObj[appState.current_question];
    appState.current_view = "#" + questionObj[appState.current_question].questionType;
    update_view();
}