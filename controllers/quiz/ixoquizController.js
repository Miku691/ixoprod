app.controller("ixoquizController", ['$scope', '$rootScope', '$location', 'DataTransferService', '$timeout',
    function ($scope, $rootScope, $location, DataTransferService, $timeout
    ) {
        const init = () => {

            //get quiz app path
            $rootScope.quizAppPath = $location.absUrl();
            //fetch recent posts.....
            $scope.endpoint = "customised/recent-post.json"
            $rootScope.customizeAndCallAPI($scope.endpoint, 'get', '', 'async')
            .then(function(response) {
                $scope.ixoRecentPosts = response;
                DataTransferService.setRecentPostData($scope.ixoRecentPosts);
            })
            .catch(function(error) {
                console.error("Error fetching quiz data:", error);
            });
            $scope.getPopularCategories();

            // $scope.getHeadings();
            let title = 'ixoQuiz | infoXodia GK and QUIZ';
            let desc = 'Let deep-dive into amazing general knowledge and quiz content of odisha culture, tradition, festival, art and more'
            $rootScope.setMetaDataDetails(title, desc);

            //set canonical tag
            let url = $location.absUrl();
            $rootScope.setCanonicalTag(url);

            //title, type, siteUrl, image, desc
            let imageUrl = 'https://res.cloudinary.com/ddlvbiaan/image/upload/t_infoxodia-logo/c_fill,h_430,w_640/v1738482659/odisha-infoxodia-category-infoxodia.webp';
            $rootScope.setOgMetaDetails($rootScope.prepareOgTags(title, 'website', url, imageUrl, desc));

            //web page schema setup
            let schemaData = {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "ixoQuiz | infoXodia GK and QUIZ",
                "url": "http://127.0.0.1:5500/#/quiz",
                "description": "Let deep-dive into amazing general knowledge and quiz content of odisha culture, tradition, festival, art and more"
            }
            $rootScope.setSchemaDataDetails(schemaData);

        }

        $scope.ixoMsg = "This is ixoquiz";
        $scope.openScrollTitlePost = () => {
            alert('click working');
        }

        $scope.getPopularCategories = () => {
            $scope.endpoint = "customised/popular-categories.json"
            $rootScope.customizeAndCallAPI($scope.endpoint, 'get', '', 'async')
            .then(function(response) {
                $scope.ixoPopularCategories = response;
                // DataTransferService.setRecentPostData($scope.ixoRecentPosts);
            })
            .catch(function(error) {
                console.error("Error fetching quiz data:", error);
            });
        }

        $scope.openPost = (quizIndex) => {
            $scope.endpoint = $scope.ixoRecentPosts[quizIndex].subCategoryUrl + '/' + $scope.ixoRecentPosts[quizIndex].postUrl + '.json';
            $rootScope.customizeAndCallAPI($scope.endpoint, 'get', '', 'async')
            .then(function(response) {
                //$rootScope.quizzes = response.data;
                $rootScope.postMetadata = $scope.ixoRecentPosts[quizIndex];
                localStorage.setItem('postMetadata', JSON.stringify($rootScope.postMetadata));
                
                $rootScope.quizes = response;
            })
            .catch(function(error) {
                console.error("Error fetching quiz data:", error);
            });;

            $location.path('/quiz/' + $scope.ixoRecentPosts[quizIndex].subCategoryUrl + '/' + $scope.ixoRecentPosts[quizIndex].postUrl);

            // $rootScope.getHeadings();
        }

        $scope.openCategory = (quizIndex) => {
            // window.open(url, '_blank');
            $location.path('/quiz/' + $scope.ixoRecentPosts[quizIndex].subCategoryUrl);
        }


        init();
    }
]);