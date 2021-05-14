var questionsAndAnswers = [{
    question: "Что из перечисленного не является языком программирования?",
    answer1: "HTML",
    answer2: "Java",
    answer3: "Python",
    answer4: "DevOps",
    rightAnswers: "1,4"
}, {
    question: "Какие из перечисленных видов тестирования могут быть автоматизированы?",
    answer1: "UI тестирование",
    answer2: "Юзабилити тестирование",
    answer3: "Тестирование совместимости",
    answer4: "Unit тестирование",
    rightAnswers: "1,3,4"
}, {
    question: "Выберите типы алгоритмов, которых не существует",
    answer1: "Алгоритм с ветвлением",
    answer2: "Циклический безусловный",
    answer3: "Циклический с параметром",
    answer4: "Алгоритм с углублением",
    rightAnswers: "2,4"
}, {
    question: "Какая(какие) из перечисленных конструкций используется(используются) для ветвления?",
    answer1: "switch case",
    answer2: "if else",
    answer3: "do while",
    answer4: "for",
    rightAnswers: "1,2"
}, {
    question: "Какого(каких) методов тестирования не существует?",
    answer1: "Метод белого ящика",
    answer2: 'Метод "игры в ящик"',
    answer3: 'Метод "кротовой норы"',
    answer4: "Метод серого ящика",
    rightAnswers: "2,3"
}];

function createQuestion() {
    var question = prompt("Введите текст вопроса:", "");
    if (question === "" || question == null) {
        return alert("Вы не ввели текст вопроса. Попробуйте добавить вопрос заново.")
    } else {
        var answers = ollAnswers();
        if (answers === undefined) {
            return
        }
        var rightAnswers = isValidAnswers();
        if (rightAnswers === undefined) {
            return
        }
        var userInput = {
            question: question,
            answer1: answers[0],
            answer2: answers[1],
            answer3: answers[2],
            answer4: answers[3],
            rightAnswers: rightAnswers
        };
        questionsAndAnswers.push(userInput);
    }
}

function ollAnswers() {
    var numbers = [1, 2, 3, 4];
    var answersList = [];
    for (var value of numbers) {
        var answer = prompt(`Введите текст ${value} варианта ответа:`, "");
        if (answer === "" || answer === null) {
            alert(`Вы не ввели текст ${value} варианта ответа. Попробуйте добавить вопрос заново.`);
            return
        } else {
            answersList.push(answer);
        }
    }
    return answersList
}

function validNumbAndSymbol(answer) {
    var testAnswer = answer.split(',');
    var validSymbols = ["1", "2", "3", "4"];
    for (var i of testAnswer){
        if (!(validSymbols.includes(i))) {
            return false
        }
    }
    var sortAnswers = answer.split(',');
    var unique = new Set(sortAnswers);
    return sortAnswers.length === unique.size
}

function isValidAnswers() {
    var trueAnswers = prompt("Введите номера правильных ответов через запятую. Нумерация начинается с 1:", "");
    if (trueAnswers === "" || trueAnswers === null) {
        alert("Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново.");
    } else if (!validNumbAndSymbol(trueAnswers)) {
        alert("Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Попробуйте добавить вопрос заново.");
    } else {
        return trueAnswers
    }
}

function createLabel(questionName) {
    var label = document.createElement("label");
    label.textContent = questionName;
    return label
}

function createCheckbox() {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    return checkbox
}

function createButton() {
    var button = document.createElement("button");
    var text = document.createTextNode("Отправить");
    button.appendChild(text);
    button.id = "sendButton";
    return button
}

function createStrongQuestion(questionCounter, question) {
    var strongQuestion = document.createElement("b");
    var text = document.createTextNode(questionCounter + question);
    strongQuestion.appendChild(text);
    return strongQuestion
}

function openTest() {
    document.getElementById("createQuestion").disabled = true;
    document.getElementById("openTest").disabled = true;
    var counter = 1;
    for (var variantOfQuestion of questionsAndAnswers) {
        var div = document.createElement("div");
        var strongQuestion = createStrongQuestion(`${counter}. `, variantOfQuestion.question);
        var checkbox1 = createCheckbox();
        var answer1 = createLabel(variantOfQuestion.answer1);
        var checkbox2 = createCheckbox();
        var answer2 = createLabel(variantOfQuestion.answer2);
        var checkbox3 = createCheckbox();
        var answer3 = createLabel(variantOfQuestion.answer3);
        var checkbox4 = createCheckbox();
        var answer4 = createLabel(variantOfQuestion.answer4);
        var br1 = document.createElement("br");
        var br2 = document.createElement("br");
        var br3 = document.createElement("br");
        var br4 = document.createElement("br");
        var br5 = document.createElement("br");
        var br6 = document.createElement("br");
        div.append(br1);
        div.append(strongQuestion);
        div.append(br2);
        div.append(checkbox1, answer1);
        div.append(br3);
        div.append(checkbox2, answer2);
        div.append(br4);
        div.append(checkbox3, answer3);
        div.append(br5);
        div.append(checkbox4, answer4);
        div.append(br6);
        document.body.append(div);
        counter += 1;
    }
    var sendButton = createButton();
    var br7 = document.createElement("br");
    document.body.append(br7, sendButton);
    document.getElementById("sendButton").onclick = submitTest;
}

function errorsSearcher(rightAnswers, selected) {
    //the function checks lists for equality
    for (var i = 0; i < rightAnswers.length; i++) {
        if (rightAnswers[i] !== selected[i]) {
            return false
        }
    }
    return true
}

function submitTest() {
    var divs = document.body.getElementsByTagName("div");
    var errors = [];
    var counterOfAnswers = 0;
    for (var i = 0; i < divs.length; i++) {
        var isFirstCheckboxChecked = divs[i].children[3].checked;
        var isSecondCheckboxChecked = divs[i].children[6].checked;
        var isThirdCheckboxChecked = divs[i].children[9].checked;
        var isForthCheckboxChecked = divs[i].children[12].checked;
        var selected = [];
        if (isFirstCheckboxChecked) {
            selected.push('1');
        }
        if (isSecondCheckboxChecked) {
            selected.push('2');
        }
        if (isThirdCheckboxChecked) {
            selected.push('3');
        }
        if (isForthCheckboxChecked) {
            selected.push('4');
        }
        if (selected.length > 0) {
            counterOfAnswers += 1;
        }
        var rightAnswers = questionsAndAnswers[i].rightAnswers.split(",");
        rightAnswers.sort();
        if (rightAnswers.length !== selected.length) {
            errors.push(i + 1);
        } else {
            var SearcherOfErrors = errorsSearcher(rightAnswers, selected)
            if (SearcherOfErrors === false) {
                errors.push(i + 1);
            }
        }
    }
    return testResult(counterOfAnswers, errors)
}

function testResult(answers, errors) {
    var result;
    var quantityOfQuestions = questionsAndAnswers.length;
    if (answers < quantityOfQuestions) {
        result = "Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения.";
    } else if (answers === quantityOfQuestions && errors.length === 0) {
        result = `Ваш результат ${quantityOfQuestions} из ${quantityOfQuestions}. Вы молодец!`;
    } else if (answers === quantityOfQuestions && errors) {
        var message = ["Вы неправильно ответили на вопросы:\n"];
        for (var i of errors) {
            message.push(`${i}. ${questionsAndAnswers[i - 1].question}`);
        }
        message.push(`\nВаш результат ${quantityOfQuestions - errors.length} из ${quantityOfQuestions}.`);
        result = message.join("\n");
    }

    return alert(result)
}