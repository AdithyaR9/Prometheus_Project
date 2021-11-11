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
        window.location.href = 'U4home.html';
        }, 3000);
    } else if((myQuestions.length/2) > numCorrect){ //quiz failed
      togglePathLinks(2);
      setTimeout(function() {
        window.location.href = 'U3Quiz.html';
        }, 3000);
    }
    


  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Which of these is not a primitive data type?",
      answers: {
        a: "String",
        b: "int",
        c: "boolean"
      },
      correctAnswer: "a"
    },
    {
      question: "Which of these is an appropriate variable name?",
      answers: {
        a: "variable1",
        b: "counterforthefourthtypeofcakechoice",
        c: "numCorrect",
        d: "Numcorrect"
      },
      correctAnswer: "c"
    },
    {
      question: "What does the expression 8 % 3 equal?",
      answers: {
        a: "0",
        b: "2",
        c: "2.66",
        d: "3"
      },
      correctAnswer: "b"
    },
    {
      question: "What does x--, when x = 5, equal?",
      answers: {
        a: "4",
        b: "3",
        c: "not a valid operation"
      },
      correctAnswer: "a"
    },
    {
      question: "What is the statement, \"My name is--\" + nameVariable + \". What is you name?\", called?",
      answers: {
        a: "Coordination",
        b: "Concatenation",
        c: "Condensation",
        d: "Collectivization"
      },
      correctAnswer: "b"
    },
    {
      question: "Which of these is the correct format for a method?",
      answers: {
        a: "public returnType static methodName() { }",
        b: "public static returnType methodName() { }",
        c: "public static returnType methodName { }",
        d: "public returnType methodName() { }",
        e: "both e & c are acceptable formats",
        f: "none of these are the correct format"
      },
      correctAnswer: "e"
    }
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();