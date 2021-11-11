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
        window.location.href = 'U2home.html';
        }, 3000);
    } else if((myQuestions.length/2) > numCorrect){ //quiz failed
      togglePathLinks(2);
      setTimeout(function() {
        window.location.href = 'U1Quiz.html';
        }, 3000);
    }
    


  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "What is programming?",
      answers: {
        a: "The act of wrting a program",
        b: "The act of programming",
        c: "The act of creating a diet plan"
      },
      correctAnswer: "a"
    },
    {
      question: "What language will be used in the course and why?",
      answers: {
        a: "Java; low level language",
        b: "C#; low level language",
        c: "Java; high level language",
        d: "C#; high level language"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the application in which you make programs?",
      answers: {
        a: "Integrated Development Environment",
        b: "Interesting Doing Environment",
        c: "Incremental Recreational Entity",
        d: "None of the Above"
      },
      correctAnswer: "a"
    }
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();