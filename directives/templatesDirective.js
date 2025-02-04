app.directive('dashboardContent', function() {
    return {
        restrict: 'E',
        templateUrl: '../resources/templates/dashboard-content.html',
        controller: 'DashboardContentController'
    };
});

app.directive('manageContent', function() {
    return {
        restrict: 'E',
        templateUrl: '../resources/templates/manage-content.html',
        controller: 'ManageContentController'
    };
});

app.directive('navBar', function() {
    return {
        restrict: 'E',
        templateUrl: '../resources/templates/navbar.html',
        // controller: 'ManageContentController'
    };
});

app.directive('footerBar', function() {
    return {
        restrict: 'E',
        templateUrl: '../resources/templates/footer.html',
        // controller: 'ManageContentController'
    };
});

app.directive('scrollTxt', function() {
    return {
        restrict: 'E',
        templateUrl: '../resources/templates/text-scroll.html',
        // controller: 'ManageContentController'
    };
});