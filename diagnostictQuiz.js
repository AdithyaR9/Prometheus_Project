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
    var vis = document.getElementById("visualLink");
    var lin = document.getElementById("linguisticLink");
    var log = document.getElementById("logicalLink");
    var blankAns = document.getElementById("blankAnswers");
    var finishedQ = document.getElementById("finishedQuiz");

    if (selection == 0) {
      vis.style.display = "none";
      lin.style.display = "none";
      log.style.display = "none";
      blankAns.style.display = "none";
      finishedQ.style.display = "none";
    }
    else if(selection == 1) {
      vis.style.display = "block";
    }else if(selection == 2) {
      lin.style.display = "block";
    } else if(selection == 3) {
      log.style.display = "block";
    } else if(selection == 4) {
      finishedQ.style.display = "block"
    } else if(selection == 5) {
      blankAns.style.display = "block"
    }
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let visual = 0;
    let linguistic = 0;
    let logical = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      // if answer is filled
      if(userAnswer === currentQuestion.visualAnswer){
        visual++;
        // answerContainers[questionNumber].style.color = 'orange';
      } else if(userAnswer === currentQuestion.linguisticAnswer){
        linguistic++;
        // answerContainers[questionNumber].style.color = 'lightgreen';
      } else if(userAnswer === currentQuestion.logicAnswer){
        logical++;
        // answerContainers[questionNumber].style.color = 'blue';
      } else{ // if answer is wrong or blank
        answerContainers[questionNumber].style.color = 'red'; // color the answers red
        togglePathLinks(5);
        setTimeout(function() {
        window.location.href = 'diagnosticQuiz.html';
        }, 3000);
      }
    });

      if(visual > linguistic && visual > logical) {
        togglePathLinks(1);
        togglePathLinks(4);
        setTimeout(function() {
          window.location.href = 'VisualPath/U1home.html';
          }, 3000);
      }
      else if(linguistic > visual && linguistic > logical) {
        togglePathLinks(2);
        togglePathLinks(4);
        setTimeout(function() {
          window.location.href = 'LinguisticPath/intro.html';
          }, 3000);
      }
      else if(logical > linguistic && logical > visual) {
        togglePathLinks(3);
        togglePathLinks(4);
        setTimeout(function() {
          window.location.href = 'LogicalPath/intro.html';
          }, 3000);
      }


  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "How would you prefer to learn?",
      answers: {
        a: "Through infographics, diagrams, graphs, etc.",
        b: "Through a lecuture or article",
        c: "Through practical application, experiments, and examples"
      },
      visualAnswer: "a",
      linguisticAnswer: "b",
      logicAnswer: "c"
    },
    {
      question: "If there is a story and you want to experience it, would you…",
      answers: {
        a: "Read or Listen to the book/audiobook",
        b: "Watch the movie",
        c: "a & b (do both)"
      },
      visualAnswer: "b",
      linguisticAnswer: "a",
      logicAnswer: "c"
    },
    {
      question: "Which of these pastimes would you most likely pursue?",
      answers: {
        a: "Experimentation or thinking about abstract ideas",
        b: "Reading or Writing",
        c: "Engage in the Visual arts - drawing, painting",
      },
      visualAnswer: "c",
      linguisticAnswer: "b",
      logicAnswer: "a"
    },
    {
      question: "How would you best memorize a set of directions to a new location?",
      answers: {
        a: "Written set of steps to get to the place",
        b: "A map with the route highlighted",
        c: "Someone reciting the roads and turns to you",
      },
      visualAnswer: "b",
      linguisticAnswer: "c",
      logicAnswer: "a"
    },
    {
      question: "If you had to pick one method (assuming all cover the same information), which would you use to study for a hard exam?",
      answers: {
        a: "Watch a video over the topic",
        b: "Sytematically break down each particular topic and ensure comprehension of each",
        c: "Have someone ask questions and answer them outloud",
      },
      visualAnswer: "a",
      linguisticAnswer: "c",
      logicAnswer: "b"
    },
    {
      question: "How do you best remember things for History exams",
      answers: {
        a: "Through the causes, effects, and relationships, between people, places and events",
        b: "Through mental visualizations of people, places, and events",
        c: "Through important dates, terms, and quotes regarding people, places and events",
      },
      visualAnswer: "b",
      linguisticAnswer: "c",
      logicAnswer: "a"
    },
    {
      question: "Which of these sets of careers are you most likely to pursue?",
      answers: {
        a: "Architech, Product Designer, Artist",
        b: "Lawyer, Journalist, Professor",
        c: "Engineer, Computer Programmer, Financial Advisor/Analyst",
      },
      visualAnswer: "a",
      linguisticAnswer: "b",
      logicAnswer: "c"
    }
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();