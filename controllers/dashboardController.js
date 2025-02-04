app.controller("dashboardController", ['$scope', '$rootScope', '$location',
    function ($scope, $location, $rootScope,) {
        const init = () => {
            
        }


        $scope.dashboardMsg = "This is dashboard";
        $scope.openApp = (category) => {
            // $location.path('/' + category);
        }

        $scope.doSearch = () => {
            alert('Search Implementation is coming soon...');
        }

        

        init();
        
    }
]);

