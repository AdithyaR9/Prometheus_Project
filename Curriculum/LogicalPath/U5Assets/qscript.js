(function(){
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    togglePathLinks(0);

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];
        let letter;
        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function togglePathLinks(selection) {

    var finishedQ = document.getElementById("finishedQuiz");
    var failedQuiz = document.getElementById("failedQuiz");
    var linksRedirect = document.getElementById("linksRedirect");

    if (selection == 0) {  // at startup and during quiz
      finishedQ.style.display = "none";
      linksRedirect.style.display = "none";
      failedQuiz.style.display = "none";
    }
    else if(selection == 1) { //if quiz passed
      finishedQ.style.display = "block";
      linksRedirect.style.display = "block";
    }else if(selection == 2) { //if quiz failed
      failedQuiz.style.display = "block";
      linksRedirect.style.display = "block";
    }
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    // resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

    if((myQuestions.length/2) <= numCorrect){ //quiz passed
      togglePathLinks(1);
      setTimeout(function() {
        //Redirect
        window.location.href = 'U6home.html';
        }, 3000);
    } else if((myQuestions.length/2) > numCorrect){ //quiz failed
      togglePathLinks(2);
      setTimeout(function() {
        window.location.href = 'U5Quiz.html';
        }, 3000);
    }
    


  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "10 >= 10",
      answers: {
        a: "True",
        b: "False"
      },
      correctAnswer: "a"
    },
    {
      question: "17 != (9+5-6)*2+1",
      answers: {
        a: "True",
        b: "False"
      },
      correctAnswer: "b"
    },
    {
      question: "\"boolean comp = (\"Billy\").equals(\"Turtle\")\"; What does boolean equal?",
      answers: {
        a: "True",
        b: "False"
      },
      correctAnswer: "b"
    },
    {
      question: "When does short circuiting occur?",
      answers: {
        a: "The process of not evalating the left operand as the right one already indicated the vlaue of the Conjuction",
        b: "When the result of a conjunction is not known after evaluating the left operand, so the right operand is skipped",
        c: "The process of not evalating the right operand as the left one already indicated the vlaue of the Conjuction",
        d: "When the result of a conjunction is known after evaluating the right operand, so the left operand is skipped"
      },
      correctAnswer: "c"
    },
    {
      question: "What does the term \"condition\" refer to?",
      answers: {
        a: "boolean expression",
        b: "conjunction operation",
        c: "reptition statement",
        d: "selection statement"
      },
      correctAnswer: "a"
    },
    {
      question: "Which repitions statement is designed to be reun at least once if not more?",
      answers: {
        a: "For Each",
        b: "While",
        c: "For",
        d: "Do While"
      },
      correctAnswer: "d"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();