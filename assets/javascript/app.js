var initialPage,
	triviaHTML,
	timeLeft = 30,
	questions = ["what year did the original blade runner release?", "who directed blade runner?", "What story is blade runner based on?", "which cut of the movie is considered canon?", "What year does blade runner take place?"],
	answers = [["1982","1983","1980","1986"], ["steven spielberg","ridley scott","quentin tarantino","michael bay"],["i, robot","ubik","do androids dream of electric sheep?","dune"],["Theatrical Version","Director's Cut","Final cut","none of the above"],["2017","2019","2049","2325"]],
	correctAnswers = ["a.1982","b.ridley scott","c.do androids dream of electric sheep?","c.Final cut","b.2019"],
	gameProgress = 0,
	correctCount = 0,
	incorrectCount = 0,
	unansweredCount = 0,
	gifs = ["assets/images/harrisonford.gif", "assets/images/answerthequestion.gif", "assets/images/smoking.gif","assets/images/interrogation.gif", "assets/images/unicorn.gif"],
	timer,
	userGuess;

function triviaGameHTML() {
	triviaHTML = "<div id='triviaContainer'><div id='timeDisplay'><p>Time remaining: <span id='timeRemaining'>" + timeLeft +"</span></p><br></div><div id=currentQuestion><p>"
		+ questions[gameProgress] + "</p><br></div><div class='answers'><p class='answerOpt'>a."
		+ answers[gameProgress][0] + "</p><br></div><div class='answers'><p class='answerOpt'>b."
		+ answers[gameProgress][1] + "</p><br></div><div class='answers'><p class='answerOpt'>c." 
		+ answers[gameProgress][2] + "</p><br></div><div class='answers'><p class='answerOpt'>d." 
		+ answers[gameProgress][3] + "</p><br></div>";
	$("#main").html(triviaHTML);
}

function checkWin() {
	correctCount++;
	triviaHTML = "<div id='triviaContainer'><div id='timeDisplay'><p>Time remaining: <span id='timeRemaining'>"
		+ timeLeft +"</span></p></div><br><div id=rightAnswer><p>Correct!</p></div><br><div class='gifContainer'><img id='gif' src=" + gifs[gameProgress] +"></div>";
	$("#main").html(triviaHTML);
	setTimeout(gameState, 5000);
}

function timeoutLoss() {
	unansweredCount++;
	triviaHTML = "<div id='triviaContainer'><div id='timeDisplay'><p>Time remaining: <span id='timeRemaining'>" 
		+ timeLeft + "</span></p></div><br><p>Out of Time</p><br><div id=rightAnswer><p>The Correct Answer was: " + correctAnswers[gameProgress] + "</p></div><br><div class='gifContainer'><img id='gif' src=" + gifs[gameProgress] +"></div>";
	$("#main").html(triviaHTML);
	setTimeout(gameState, 5000);
}

function checkLoss() {
	incorrectCount++;
	triviaHTML = "<div id='triviaContainer'><div id='timeDisplay'><p>Time remaining: <span id='timeRemaining'>" 
		+ timeLeft + "</span></p></div><br><p>WrONG!</p><br><div id=rightAnswer><p>The Correct Answer was: " 
		+ correctAnswers[gameProgress] + "</p></div><br><div class='gifContainer'><img id='gif' src=" + gifs[gameProgress] +"></div>";
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
	triviaHTML= "<div id='triviaContainer'><div id='timeDisplay'><p>Time remaining: <span id='timeRemaining'>"
		+ timeLeft + "</span></p></div><br><p>results!</p><br><div id=resultsDisplay><p>Correct Answers: <span>"
		+ correctCount + "</span></p><br><p>Wrong Answers: <span>" 
		+ incorrectCount +"</span></p><br><p>Time Outs: <span>" 
		+ unansweredCount +"</span></p></div><br><p id='restart'>Start Over?</p>"
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
		initialPage = "<div id='startingContainer'><div class='imgContainer'><img id='dragonball' src='assets/images/bladerunnerposter.jpg'>" 
		+ "</div><div id='startgameContainer'><h1 id='startButton'>start!</h1></div></div>"
		$("#main").html(initialPage);
	}

	initialGameState();

	$("#main").on("click", "#startButton", function(event) {
		event.preventDefault();
		triviaGameHTML();
		timerFunc();

	})

	$("#main").on("click", ".answerOpt", function(event) {
		userGuess = $(this).text();
		if (userGuess === correctAnswers[gameProgress]) {
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

