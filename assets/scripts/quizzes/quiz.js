var responses = [];
var correctAnswers = quizContent.questions.length;
var quizContainer = $('#quizContent');
var result = $('<div id="result" class="margin-tb-md"></div>'); //$('#result');
var button = $('#nextQuestion');
var currentQuestion;

quizContainer.append(result);

generateAllQuestionsHTML();

currentQuestion = $('#question0');
currentQuestion.fadeIn();

result.text('1/' + quizContent.questions.length);


///////////////
// Functions //
///////////////

function nextQuestionBtnHandler () {
    var selectedChoice = currentQuestion.find('input:checked');
    responses.push(selectedChoice.val());
    currentQuestion.hide();

    if ( responses.length < quizContent.questions.length ) {
        currentQuestion = $('#question' + responses.length);
        currentQuestion.show();
        result.text(responses.length + 1 + '/' + quizContent.questions.length);
        button.attr('disabled', true);
    } else {
        // Remove question counter text
        result.text('');

        // Display each question and color into corresponding colors each answer
        $('.question-container').each(function (i) {
            var elem = $(this);
            var selectedChoice = elem.find('li:eq(' + responses[i] + ')');
            var correctChoice = elem.find('li:eq(' + quizContent.questions[i].correctAnswer + ')');
            correctChoice.css('color', 'green');
            correctChoice.css('font-weight', 'bold');

            if (quizContent.questions[i].correctAnswer != responses[i]) {
                correctAnswers -= 1;
                selectedChoice.css('color', 'red');
                selectedChoice.css('font-weight', 'bold');
            }

            elem.addClass('display-results');
            elem.show();
        });

        // Show the gauge with user score
        var score = correctAnswers / quizContent.questions.length * 100;
        var gauge = Gauge('#result');
        gauge.updateConfiguration();
        gauge.render();
        gauge.updatePrimaryIndicator(score);

        // Show the feedback message under the gauge chart.
        var feedbackMessage = score == 100 ? quizContent.feedbackMessages[score] : quizContent.feedbackMessages['<100'];
        result.append('<div>' + feedbackMessage + '</div>');

        // Hide the button
        button.hide();

        // Add the call to action message
        quizContainer.append(quizContent.callToAction);
    }
}

function generateAllQuestionsHTML () {
    quizContent.questions.forEach(function (question, i) {
        quizContainer.append(generateQuestionHTML(question, i));
    });
}

function generateQuestionHTML (question, questionNr) {
    var questionWrapper = $('<div id="question' + questionNr + '" class="question-container"></div>');
    var answersWrapper = $('<div></div>');
    var answersList = $('<ul></ul>');
    questionWrapper.append(question.body);
    questionWrapper.append(answersWrapper);
    answersWrapper.append(answersList);
    question.answers.forEach(function (answer, i) {
        var li = $('<li class="quiz-list-item"></li>');
        var label = $('<label></label>');
        var choice = $('<input type="radio" class="quiz-choice" name="answer' + questionNr + '" value="' + i + '"/>');

        choice.on('click', function () {
            button.attr('disabled', false);
        });

        li.append(label);
        label.append(choice);
        label.append(answer);
        answersList.append(li);
    });
    return questionWrapper;
}
