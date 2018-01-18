
            $(document).ready(function() {

              // when startBtn is clicked, the game will begin
              $('#startBtn').on('click', function(){
                game.loadQuestion();
              });
              //restart button is clicked.. the game will restart
              $('restartBtn').on('click', function(){
                game.reset();
              })
              // Color questions
                        var questions = [{
                                question: '../images/colors/black-moon.png',
                                answer: 'black'
                            },
                            {
                                question: '../images/colors/blue-circle.png',
                                answer: 'blue'
                            },
                            {
                                queston: '../images/colors/brown-teardrop.png',
                                answer: 'brown'
                            },
                            {
                                question: '../images/colors/green-heart.png',
                                answer: 'green'
                            },
                            {
                                question: '../images/colors/orange-hexagon.png',
                                answer: 'orange'
                            },
                            {
                                question: '../images/colors/pink-diamond.png',
                                answer: 'pink'
                            },
                            {
                                question: '../images/colors/purple-star.png',
                                answer: 'purple'
                            },
                            {
                                question: '../images/colors/red-square.png',
                                answer: 'red'
                            },
                            {
                                question: '../images/colors/yellow-triangle.png',
                                answer: 'yellow'
                            }
                        ];

                        // animation
                        function animate(element, animation) {
                        $(element).addClass('animated ' + animation);
                        //this will remove the animation class after it comes onto the screen
                        //so a new animation class can be added
                        var wait = setTimeout(function(){
                          $(element).removeClass('animated' +animation);
                        }, 1000);
                        };

                        //variables for game
                        var game = {
                          questions: questions,
                          currentQuestion:0,
                          counter:30,
                          correct:0,
                          incorrect:0,
                          //counter
                          countdown:function(){
                            game.counter--;
                          $('#counter').html(game.counter);
                          if(game.counter<=0){
                            game.timeUp();
                          }
                        },
                        loadQuestion: function(){
                          timer = setInterval(game.countdown, 1000);
                          $('#counter').html('Time: ' +game.counter);
                          $('#canvas').html('<img id="image" src= +"question[game.currentQuestion].question"+/>');
                          animate('#canvas', 'rollIn');
                          return false;
                        },
                        nextQuestion: function(){
                          game.counter = 30;
                          $('#counter').html('Time: ' +game.counter);
                          game.currentQuestion++;
                          game.loadQuestion();
                        },
                        timeUp: function(){
                        clearInterval(timer);
                        animate('#canvas', 'rollIn');
                        return false;
                        $('#message').html('Out of time');
                        $('#correctedAnswer').html('This color is ' +questions[game.currentQuestion].answer+ ' .');
                        if(game.currentQuestion==questions.length-1){
                          setTimeout(game.results, 3*1000);
                        } else{
                          setTimeout(game.nextQuestion,3*1000);
                        }
                        },
                        results: function(){
                        clearInterval(timer);
                        $('#finalMessage').html('All Done!');
                        $('#correctAnswers').html('Correct: ' +game.correct);
                        $('#incorrectAnswers').html('Incorrect: ' +game.incorrect);
                                                },
                        //use textbox to asnwer questions..need work!!!
                        answerInput: function(){
                        clearInterval(timer);
                        if ($('#color-input').data()==questions[game.currentQuestion].answer){
                        game.answeredCorrectly();
                        } else{
                        game.answeredIncorrectly();
                        }
                        },
                        answeredCorrectly: function(){
                        clearInterval(timer);
                        game.correct++;
                        animate('#canvas', 'rollOut');
                        return false;
                        $('#message').html('Good Job!')
                        $('#correctedAnswer').html('This color is ' +questions[game.currentQuestion].answer+ ' .');
                        if(game.currentQuestion==questions.length-1){
                          setTimeout(game.results, 3*1000);
                        } else{
                          setTimeout(game.nextQuestion,3*1000);
                        }
                        },
                        answeredIncorrectly: function(){
                        clearInterval(timer);
                        game.incorrect++;
                        animate('#canvas', 'wobble');
                        return false;
                        $('#message').html("That/'s incorrect. Nice try!'")
                        $('#correctedAnswer').html('This color is ' +questions[game.currentQuestion].answer+ ' .');
                        if(game.currentQuestion==questions.length-1){
                          setTimeout(game.results, 3*1000);
                        } else{
                          setTimeout(game.nextQuestion,3*1000);
                        }
                        },
                        reset: function(){
                        game.currentQuestion = 0;
                        game.counter = 0;
                        game.correct = 0;
                        game.incorrect = 0;
                        game.unanswered = 0;
                        game.loadQuestion();
                        }
                        }

                        });
