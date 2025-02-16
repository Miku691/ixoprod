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

    this.setOgMetaTags = function(tags){
        Object.keys(tags).forEach(function(property) {
            var element = document.querySelector('meta[property="' + property + '"]');
            if (element) {
                element.setAttribute('content', tags[property]);
            } else {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                element.setAttribute('content', tags[property]);
                document.head.appendChild(element);
            }
        });
    };

    this.setSchemaData = function(schema){
        // Identify the schema type to remove
        // var schemaType = schema["@type"];

        // Remove existing schema scripts with matching @type - Now removing all existing
        var existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
        existingScripts.forEach(function(script) {
            // var scriptContent = JSON.parse(script.textContent);
            // if (scriptContent["@type"] === schemaType) {
            //     script.parentNode.removeChild(script);
            // }
            //remove the existing schemas.
            script.parentNode.removeChild(script);
        });

        // Create new schema script
        var script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    };

}]);
