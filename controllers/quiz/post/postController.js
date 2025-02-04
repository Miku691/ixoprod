app.controller("postController", ['$scope', '$rootScope', '$timeout', '$location', 'DataTransferService',
    function ($scope, $rootScope, $timeout, $location, DataTransferService
    ) {
        const init = () => {
            //variable 
            $scope.headings = [];
            $scope.isAnsCorrect = false;
            $scope.rightSideRecentPosts = DataTransferService.getRecentPostData();
            $rootScope.postMetadata = JSON.parse(localStorage.getItem('postMetadata'));
            let postUrlPath = $scope.path = $location.path();
            
            let current_post_url = postUrlPath.split("/")[3];

            if($rootScope.postMetadata == null || $rootScope.postMetadata == undefined || !(current_post_url === $rootScope.postMetadata.postUrl)){
                var category_url = postUrlPath.split("/")[2];
                var post_url = postUrlPath.split("/")[3];
            }else{
                var category_url = $rootScope.postMetadata.subCategoryUrl;
                var post_url = $rootScope.postMetadata.postUrl;
            }

            //$scope.endpoint = $rootScope.postMetadata.categoryUrl + '/' + $rootScope.postMetadata.postUrl + '.json';
            $scope.endpoint = category_url + '/' + post_url + '.json';
            $rootScope.customizeAndCallAPI($scope.endpoint, 'get', '', 'async')
                .then(function (response) {
                    // $rootScope.quizes = response.postContent;
                    // $rootScope.postMetadata = response.postMetadata;
                    $rootScope.postQuiz = response;
                    $rootScope.quizes = $rootScope.postQuiz.quizzes;
                    $rootScope.setMetaDataDetails($rootScope.postQuiz.title, $rootScope.postQuiz.description);
                    $rootScope.getHeadings();
                })
                .catch(function (error) {
                    console.error("Error fetching quiz data:", error);
                });

                //fetch recent posts.....
            $scope.endpoint = "customised/recent-post.json"
            $rootScope.customizeAndCallAPI($scope.endpoint, 'get', '', 'async')
            .then(function(response) {
                $scope.ixoRecentPostsSidebar = response;
                DataTransferService.setRecentPostData($scope.ixoRecentPosts);
            })
            .catch(function(error) {
                console.error("Error fetching quiz data:", error);
            });

            //set canonical tag
            let url = $location.absUrl();
            $rootScope.setCanonicalTag(url);
        }

        $scope.ixoMsg = "This is ixoquiz";
        $scope.openScrollTitlePost = () => {
            alert('click working');
        }


        // Function to extract all headings from the content
        $rootScope.getHeadings = function () {
            // Wait for the content to load completely
            $timeout(function () {
                var content = document.getElementById('content');
                var headingElements = content.querySelectorAll('h1, h2, h3, h4, h5, h6');

                // Iterate over all headings and store their ID and text
                $scope.headings = Array.from(headingElements).map(function (heading) {
                    return {
                        id: heading.id,
                        text: heading.textContent
                    };
                });
            }, 0);
        };

        $scope.scrollToHeading = (id) => {
            var element = $('#' + id);
            if (element.length) { $('html, body').animate({ scrollTop: element.offset().top }, 500); }
        }

        // Wait for the DOM to be fully loaded- fixed side divs
        document.addEventListener("DOMContentLoaded", function () {
            var middleDiv = document.querySelector('.col-lg-6');
            var rightDiv = document.querySelector('.col-lg-3.side-div');

            window.addEventListener('scroll', function () {
                var middleDivBottom = middleDiv.getBoundingClientRect().bottom;

                if (middleDivBottom <= window.innerHeight) {
                    rightDiv.classList.add('fixed-scroll');
                } else {
                    rightDiv.classList.remove('fixed-scroll');
                }
            });
        });



        //layout shift
        $scope.isColumnLayout = false;
        var maxContentLength = 20; // Set a threshold for content length

        // Function to check content length and adjust layout
        $scope.adjustLayout = function () {
            var shouldUseColumnLayout = false;

            // $rootScope.quizes.quiz.quizOptions.forEach(function(option) {
            //     if (option.text.length > maxContentLength) {
            //         shouldUseColumnLayout = true;
            //     }
            // });

            $rootScope.quizes.forEach(function (quiz) {
                Object.values(quiz.quiz.quizOptions).forEach(function (option) {
                    if (option.length > maxContentLength) {
                        shouldUseColumnLayout = true;
                    }
                });
            });

            $scope.isColumnLayout = shouldUseColumnLayout;
        };

        // Call the function to adjust layout after the DOM is ready
        // $timeout($scope.adjustLayout);

        $scope.selectedOptions = [];
        $scope.quizResults = [];

        $scope.checkAnswer = function (quizItem, optionIndex, quizIndex) {
            let correctOption = parseInt(quizItem.correctAns);

            if(correctOption == optionIndex){
                $scope.isAnsCorrect = true;
            }else{
                $scope.isAnsCorrect = false;
            }
            
        };



        init();
    }
]);