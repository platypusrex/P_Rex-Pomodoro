(function(clockApp){
    clockApp.controller('ClockCtrl', ['$scope', '$interval', function($scope, $interval){
        $scope.sessionTime = 25;
        $scope.breakTime = 1;
        $scope.count = $scope.sessionTime * 60000;
        $scope.sessionName = "Session";
        var interval = null;
        var sessionNumber = 1;
        var mp3 = "http://k003.kiwi6.com/hotlink/g84xuk5fbc/computer-magic.mp3";
        var audio = new Audio(mp3);

        $scope.addTime = function(num){
            if(num === 1){
                $scope.sessionTime += 1;
                $scope.count = $scope.sessionTime * 60000;
            }else {
                $scope.breakTime += 1;
            }
        };

        $scope.subtractTime = function(num){
            if(num === 1){
                if($scope.sessionTime > 1){
                    $scope.sessionTime -= 1;
                    $scope.count = $scope.sessionTime * 60000;
                }
            }else {
                if($scope.breakTime > 1){
                    $scope.breakTime -= 1;
                }
            }
        };

        $scope.showTime = function(){

            var seconds = parseInt(($scope.count / 1000) % 60);
            var minutes = parseInt(($scope.count/(1000 * 60)) % 60);
            var hours = parseInt(($scope.count/(1000 * 60 * 60)) % 24);

            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;

            if(!hours){
                return minutes + ":" + seconds;
            }else {
                return hours + ":" + minutes + ":" + seconds;
            }
        };

        var sessionOrBreak = function(){
            if(sessionNumber % 2 !== 0){
                $scope.count = $scope.sessionTime * 60000;
                $scope.sessionName = 'Session';
            }else {
                $scope.count = $scope.breakTime * 60000;
                $scope.sessionName = 'Break';
            }
        };

        var colorPercentage = function(){
            if($scope.count === (currentTime - percentage)){
                height += 1;
                $scope.spanHeight = height + "%";
                currentTime = $scope.count;
            }
        };

        $scope.startTimer = function(){
            if(interval === null){
                interval = $interval(function(){
                    if($scope.count > 0){
                        $scope.count -= 1000;
                    }
                    if($scope.count === 0){
                        audio.play();
                        sessionNumber += 1;
                        sessionOrBreak();
                    }
                }, 1000);
            }else {
                stopTimer();
            }
        };

        var stopTimer = function(){
            $interval.cancel(interval);
            interval = null;
        };

    }]);
}(angular.module('PomodoroClockApp')));