(function(){

    var app = angular.module('myQuiz',[]);
    
    app.controller('QuizController',['$scope','$http','$sce',function($scope,$http,$sce){
    
        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered = 0;
        $scope.percentage = 0;
        
        $http.get('quiz_data.json').then(function(quizData){
            $scope.myQuestions = quizData.data;
            $scope.totalQuestions = $scope.myQuestions.length;
        });
        
        $scope.selectAnswer = function(qIndex, aIndex){
            var questionState = $scope.myQuestions[qIndex].questionState;
            
            if( questionState != 'answered' ){
                $scope.myQuestions[qIndex].selectedAnswer = aIndex;
                var correctAnswer = $scope.myQuestions[qIndex].correct;
                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;
                
                if ( aIndex === correctAnswer ){
                    $scope.myQuestions[qIndex].correctness = 'correct';
                    $scope.score += 1;
                }else {
                    $scope.myQuestions[qIndex].correctness = 'incorrect';
                }
                $scope.myQuestions[qIndex].questionState = 'answered';
            }
            $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(2);
        }
        
        $scope.isSelected = function(qIndex,aIndex){
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        }
        $scope.isCorrect = function(qIndex,aIndex){
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        }
        
        $scope.selectContinue = function(){
            return $scope.activeQuestion += 1;
        }
    
    }]);

})();