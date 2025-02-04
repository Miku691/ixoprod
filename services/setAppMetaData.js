app.service('MetaDataService', ['$rootScope', function($rootScope) {
    this.setMetaData = function(title, description) {
        // $rootScope.pageTitle = title;
        // $rootScope.pageDescription = description;

        // Update the document title
        document.title = title;

        // Update the meta description
        var metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }
    };

    this.setCanonical = function(url) {
        let link = document.querySelector('link[rel="canonical"]');
        if (link) {
            link.setAttribute('href', url);
        } else {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            link.setAttribute('href', url);
            document.head.appendChild(link);
        }
    };

}]);
