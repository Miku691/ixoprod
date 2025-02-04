app.controller("categoryController", ['$scope', '$rootScope', '$location', 
    function ($scope, $rootScope, $location
    ) {
        const init = () => {
            //variable 
            let postUrlPath = $scope.path = $location.path();
            var category_url = postUrlPath.split("/")[2];
            // var post_url = postUrlPath.split("/")[3];

            //$scope.endpoint = $rootScope.postMetadata.categoryUrl + '/' + $rootScope.postMetadata.postUrl + '.json';
            $scope.endpoint = category_url + '/' + category_url + '.json';
            $rootScope.customizeAndCallAPI($scope.endpoint, 'get', '', 'async')
                .then(function (response) {
                    $rootScope.ixoCategory = response;
                })
                .catch(function (error) {
                    console.error("Error fetching quiz data:", error);
              });;

        
            //set canonical tag
            let url = $location.absUrl();
            $rootScope.setCanonicalTag(url);
        }

        init();
    }
]);