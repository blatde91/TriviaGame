var initialPage,
	triviaHTML,
	timeLeft = 30,
	questions = ["question 1", "question 2", "question 3", "question 4", "question 5"],
	answers = [["1a","1b","1c","1d"], ["2a","2b","2c","2d"],["3a","3b","3c","3d"],["4a","4b","4c","4d"],["5a","5b","5c","5d"]],
	correctAnswers = ["A.1a","B.2b","C.3c","D.4d"],
	gameProgress = 0,
	correctCount = 0,
	incorrectCount = 0,
	unansweredCount = 0,
	timer,
	userGuess;

function triviaGameHTML() {
	triviaHTML = "<div id='triviaContainer'><div id='timeDisplay'><h3>Time Remaining: <span id='timeRemaining'>" + timeLeft +"</span></h3></div><div id=currentQuestion><h3>"
		+ questions[gameProgress] + "</h3></div><div class='answers'><h2 class='answerOpt'>A."
		+ answers[gameProgress][0] + "</h2></div><div class='answers'><h2 class='answerOpt'>B."
		+ answers[gameProgress][1] + "</h2></div><div class='answers'><h2 class='answerOpt'>C." 
		+ answers[gameProgress][2] + "</h2></div><div class='answers'><h2 class='answerOpt'>D." 
		+ answers[gameProgress][3] + "</h2></div>";
	$("#main").html(triviaHTML);
}

function checkWin() {
	correctCount++;
	console.log(correctCount);
	triviaHTML = "<div id='triviaContainer'><div id='timeDisplay'><h3>Time Remaining: <span id='timeRemaining'>" + timeLeft +"</span></h3></div><div id=rightAnswer><h2>Correct!</h2></div>";
	$("#main").html(triviaHTML);
	setTimeout(gameState, 5000);
}

function timeoutLoss() {
	unansweredCount++;
	triviaHTML = "<div id='triviaContainer'><div id='timeDisplay'><h3>Time Remaining: <span id='timeRemaining'>" + timeLeft + "</span></h3></div><h3>Out of Time</h3><div id=rightAnswer><h2>The Correct Answer was: " + correctAnswers[gameProgress] + "</h2></div>";
	$("#main").html(triviaHTML);
	setTimeout(gameState, 5000);
}

function checkLoss() {
	incorrectCount++;
	triviaHTML = "<div id='triviaContainer'><div id='timeDisplay'><h3>Time Remaining: <span id='timeRemaining'>" 
		+ timeLeft + "</span></h3></div><h3>WRONG!</h3><div id=rightAnswer><h2>The Correct Answer was: " 
		+ correctAnswers[gameProgress] + "</h2></div>";
	$("#main").html(triviaHTML);
	setTimeout(gameState, 5000);
}

function timerFunc(){
	timer = setInterval(countdown, 1000)
	function countdown(){
		if (timeLeft === 0) {
			clearInterval(timer);
			timeoutLoss();
		}
		if (timeLeft > 0) {
			timeLeft--;

		}
		$("#timeRemaining").html(timeLeft);
	}
}

function gameOver(){
	triviaHTML= "<div id='triviaContainer'><div id='timeDisplay'><h3>Time Remaining: <span id='timeRemaining'>"
		+ timeLeft + "</span></h3></div><h3>Results!</h3><div id=resultsDisplay><h2>Correct Answers: <span>"
		+ correctCount + "</span></h2><h2>Wrong Answers: <span>" 
		+ incorrectCount +"</span></h2><h2>Time Outs: <span>" 
		+ unansweredCount +"</span></h2></div><h2 id='restart'>Start Over?</h2>"
	$("#main").html(triviaHTML);
}

function gameState() {
	if (gameProgress < 4) {
		gameProgress++;
		triviaGameHTML();
		timeLeft = 30;
		timerFunc();
	}
	else {
		gameOver();
	}

}

function gameReset() {
	gameProgress = 0,
	correctCount = 0,
	incorrectCount = 0,
	unansweredCount = 0,
	timeRemaining = 30;
	triviaGameHTML();
	timerFunc();
}

$(document).ready(function(){

	function initialGameState() {
		initialPage = "<div id='startingContainer'><button id='startButton'>START!</button></div>"
		$("#main").html(initialPage);
	}

	initialGameState();

	$("#startButton").on("click", function(event) {
		event.preventDefault();
		triviaGameHTML();
		timerFunc();

	})

	$("#main").on("click", ".answerOpt", function(event) {
		console.log("clicked")
		userGuess = $(this).text();
		if (userGuess === correctAnswers[gameProgress]) {
			console.log("hi");
			clearInterval(timer);
			checkWin();
		}
		else {
			clearInterval(timer);
			checkLoss();
		}
	})

	$("#main").on("click", "#restart", function(event) {
		gameReset();
	})
})

