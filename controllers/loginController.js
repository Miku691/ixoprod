// app.controller("loginController",['$scope', 'FirebaseAppService', '$rootScope',
//     function($scope,FirebaseAppService, $rootScope, $location){
//       $scope.loginModel = {
//         email: '',
//         pwd: ''
//       };
      
//         $scope.login = function(){
//             let firebaseApp = FirebaseAppService.firebaseAppConfig();
//             FirebaseAppService.firebaseAuthSignIn(firebaseApp, $scope.loginModel.email, $scope.loginModel.pwd)
//             .then((userCredential) => {
//                 // $rootScope.logedInUserData = userCredential.user.providerData[0];
//                 //localStorage.setItem('logedInUser', JSON.stringify(userCredential.user.providerData[0]));
//                 let userId = userCredential.user.uid;
//                 $scope.getLogedInUserDetails(userId);
//                 var path = window.location.href.split("#")[0] + "#/" + 'dashboard';
//                 window.open(path, "_self");
//               })
//               .catch((error) => {
//                 console.log('Error code ' + error.code);
//                 console.log('Error desc ' + error.message)
//               });
//         }

//         $scope.getLogedInUserDetails = (userId) => {
//           let endpoint = 'user/' + userId;
//           $rootScope.customizeAndCallAPI(endpoint, 'get', '', 'sqlite', 'async')
//           .then(function(response) {
//               //$rootScope.quizzes = response.data;
//               localStorage.setItem('logedInUser', JSON.stringify(response))
//           })
//           .catch(function(error) {
//               console.error("Error fetching quiz data:", error);
//           });

//           // localStorage.setItem('logedInUser', JSON.stringify(userData.data))
//       }
// }])