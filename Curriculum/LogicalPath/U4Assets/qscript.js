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
        window.location.href = 'U5home.html';
        }, 3000);
    } else if((myQuestions.length/2) > numCorrect){ //quiz failed
      togglePathLinks(2);
      setTimeout(function() {
        window.location.href = 'U4Quiz.html';
        }, 3000);
    }
    


  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "What does OOP stand for?",
      answers: {
        a: "Operational Oriented Programming",
        b: "Object Oriented Practice",
        c: "Object Oriented Programming",
        d: "Operational Oriented Practice",
      },
      correctAnswer: "c"
    },
    {
      question: "What are the parts of a Class?",
      answers: {
        a: "Attributes, Constructors, Methods",
        b: "Variables, Functions, Methods",
        c: "Files, Functions, Formats"
      },
      correctAnswer: "a"
    },
    {
      question: "What does the \"public\" access level do?",
      answers: {
        a: "the attribute cannot be modified or viewed outside of the class’s file",
        b: "the attribute can be modified and viewed outside of the class’s file",
        c: "the attribute can only be modified by subclasses or classes in the same package"
      },
      correctAnswer: "b"
    },
    {
      question: "What does the \"protected\" access level do?",
      answers: {
        a: "the attribute cannot be modified or viewed outside of the class’s file",
        b: "the attribute can be modified and viewed outside of the class’s file",
        c: "the attribute can only be modified by subclasses or classes in the same package"
      },
      correctAnswer: "c"
    },
    {
      question: "Which access level is most commonly used within Classes?",
      answers: {
        a: "public",
        b: "private",
        c: "protected"
      },
      correctAnswer: "b"
    },
    {
      question: "\"final\" and \"static\" examples of...",
      answers: {
        a: "modifiers",
        b: "accessors",
        c: "mutators",
        d: "functions"
      },
      correctAnswer: "b"
    },
    {
      question: "Constructors can be overloaded...",
      answers: {
        a: "Always",
        b: "Never",
        c: "Sometimes"
      },
      correctAnswer: "a"
    },
    {
      question: "____ allows public viewing access to private attributes",
      answers: {
        a: "Accessors",
        b: "\"private\"" ,
        c: "\"public\"",
        d: "Mutatators"
      },
      correctAnswer: "a"
    },
    {
      question: "____ allows private attributes to be changed publicly",
      answers: {
        a: "Accessors",
        b: "\"private\"" ,
        c: "\"public\"",
        d: "Mutatators"
      },
      correctAnswer: "d"
    },
    {
      question: "After _____ has been defined new _____ can be created from it",
      answers: {
        a: "a class; functions",
        b: "a object; a class" ,
        c: "a object; instances",
        d: "an instance; objects",
        d: "a class; objects"
      },
      correctAnswer: "e"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();