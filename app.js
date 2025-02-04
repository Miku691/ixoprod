let app = angular.module("ixoUI", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $rootScope) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController',
            meta: {
                title: 'infoXodia | Odiasha\'s culture, tradition, arts, gk and quiz',
                description: 'InfoXOdia - An Odisha website to explore Odisha\'s culture, tradition, art, language and educating people with odia general knowledge and quiz',
                url: 'https://www.infoxodia.com/#/'
            }
        }).
        when('/quiz', {
            templateUrl: 'views/quiz/ixoquiz.html',
            controller: 'ixoquizController'
        }).
        when('/contact', {
            templateUrl: 'views/pages/contact-us.html',
            controller: 'contactUsController',
            meta: {
                title: 'infoXodia - Contact us page',
                description: 'Let check infoxodia\'s contact us page for any support or connecting with us. write your feedback and submit the form',
                url: 'https://www.infoxodia.com/#/contact'
            }
        }).
        when('/about', {
            templateUrl: 'views/pages/about-us.html',
            controller: 'aboutUsController',
            meta: {
                title: 'infoXodia - About us page',
                description: 'Do you know who are we? Please visit About us page for detailed information about infoxodia.',
                url: 'https://www.infoxodia.com/#/about'
            }
        }).
        when('/quiz/:categoryId', {
            templateUrl: function(params) {
                return 'views/quiz/category/' + params.categoryId + '.html';
            },
            controller: 'categoryController'
        }).
        when('/quiz/:categoryId/:postId', {
            templateUrl: function(params) {
                return 'views/quiz/posts/' + params.categoryId + '/' + params.postId + '.html';
            },
            controller: 'postController'
        }).
        when('/page-not-found', {
            templateUrl: 'views/pages/page-not-found.html',
            // controller: 'postController'
            meta: {
                title: 'infoXodia - Page Not Found',
                description: 'This is 404 page not found webpage for infoxodia website',
                url: 'https://www.infoxodia.com/#/page-not-found'
            }
        }).
        when('/ixo-faq', {
            templateUrl: 'views/pages/ixo-faq.html',
            // controller: 'postController'
            meta: {
                title: 'infoXodia - Frequently asked question page',
                description: 'This is frequently asked questions (faq) page of infoxodia',
                url: 'https://www.infoxodia.com/#/ixo-faq'
            }
        }).
        when('/sitemap.xml', {
            templateUrl: 'views/sitemap.html',
            controller: 'SitemapController'
        }).
        when('/robots.txt', {
            templateUrl: 'robots.txt',
            // controller: 'SitemapController'
        }).
        otherwise({
            redirectTo: 'page-not-found'
        });
        
    
    $locationProvider.hashPrefix('');
    // $locationProvider.html5Mode(true);
}
]);

app.run(['$rootScope', '$anchorScroll', '$route', '$timeout', function($rootScope, $anchorScroll, $route, $timeout) {
    $rootScope.$on('$routeChangeSuccess', function() {
        $anchorScroll();

        $timeout(function() {
            if ($route.current && $route.current.meta) {
                $rootScope.pageTitle = $route.current.meta.title;
                $rootScope.pageDescription = $route.current.meta.description;

                // Update the document title
                document.title = $route.current.meta.title;

                // Update the meta description
                var metaDescription = document.querySelector('meta[name="description"]');
                if (metaDescription) {
                    metaDescription.setAttribute('content', $route.current.meta.description);
                }
            }
        });

        $timeout(function() {
            if ($route.current && $route.current.meta){
                let url = $route.current.meta.url;
                $rootScope.setCanonicalTag(url);
            }
        });
    });
}]);



app.controller('appController', ($scope, $rootScope, ApiService, MetaDataService, $location) => {

    $scope.init = function () {

        //define service call details
        $scope.baseUrlFirebaseService = '../resources/quiz-content/';
        //$scope.checkUserLogedState();
        $rootScope.siteUrls = {
            "homePage": "https://www.infoxodia.com/#/",
            "quizPage": "https://www.infoxodia.com/#/quiz"
        };
        localStorage.setItem('ixoSiteUrl', JSON.stringify($rootScope.siteUrls));
        $rootScope.homePageUrl = $rootScope.siteUrls.homePage;

    }

    $rootScope.customizeAndCallAPI = (endpoint, type, data, callingType) => {
        $scope.serviceApi = $scope.baseUrlFirebaseService + endpoint;

        if(type === 'post'){
            ApiService.performPostApiCall($scope.serviceApi, data)
            .then(function (response) {
                console.log("Dialog saved:", response);
            })
            .catch(function (error) {
                console.error("Error saving dialog:", error);
            });
        }

        else if(type === 'get'){
            if(callingType == 'async')
                return ApiService.performGetApiCallSync($scope.serviceApi);
            else if(callingType === 'sync')
                return ApiService.performGetApiCall($scope.serviceApi);
        }

        else if(type === 'put'){
            ApiService.performPutApiCall($scope.serviceApi, data)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });
        }

        else if(type === 'delete'){
            ApiService.performDeleteApiCall($scope.serviceApi)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }

    $rootScope.setMetaDataDetails = (title, desc) => {
        MetaDataService.setMetaData(title, desc);
    }

    $rootScope.setCanonicalTag = (url) => {
        MetaDataService.setCanonical(url);
    }

    // $scope.checkUserLogedState = async () => {
    //     const user = await FirebaseAppService.checkUserLoginState();
    //     if (user) {
    //         $rootScope.userLogedIn = true;
    //         var path = window.location.href.split("#")[0] + "#/" + '';
    //         window.open(path, "_self");
    //     }
    //     else {
    //         var path = window.location.href.split("#")[0] + "#/" + 'login';
    //         window.open(path, "_self");
    //     }
    // }

    $scope.init();
})