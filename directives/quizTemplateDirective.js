app.directive('quizLeftSidebar', function() {
    return {
        restrict: 'E',
        templateUrl: '../resources/templates/quiz/left-sidebar.html'
    };
});

app.directive('quizRightSidebar', function() {
    return {
        restrict: 'E',
        templateUrl: '../resources/templates/quiz/right-sidebar.html'
    };
});