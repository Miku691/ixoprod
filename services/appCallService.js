app.service('ApiService', function($http, $rootScope) {
   
    var config = {
        headers: {
            'Authorization': "Basic bWlrdTEyM0BnbWFpbC5jb206TWlrdQ==",
            'Content-Type': 'application/json'
        }
    }

    this.performPostApiCall = function(apiUrl, data) {
        return $http.post(apiUrl, data); 
    };

    this.performPutApiCall = function(apiUrl, data) {
        return $http.put(apiUrl, data); 
    };

    this.performDeleteApiCall = function(apiUrl) {
        return $http.delete(apiUrl); 
    };

    this.performGetApiCall = (apiUrl) => {
        return $http.get(apiUrl);
    };

    this.performGetApiCallSync = (apiUrl) => {
        return $http.get(apiUrl)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        })
    };
});