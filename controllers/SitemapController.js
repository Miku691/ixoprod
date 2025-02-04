app.controller('SitemapController', ['$scope', function($scope) {
    var generateSitemap = function() {
        // List of URLs to include in the sitemap
        var urls = [
            { loc: 'https://www.infoxodia.com/#/', lastmod: '2025-02-01', changefreq: 'monthly', priority: 1.0 },
            { loc: 'https://www.infoxodia.com/#/quiz/odisha-special/utkala-dibasa-quiz', lastmod: '2025-02-01', changefreq: 'monthly', priority: 0.8 },
            // Add more URLs as needed
        ];

        // Generate the sitemap XML content
        var xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        
        urls.forEach(function(url) {
            xmlContent += '    <url>\n';
            xmlContent += '        <loc>' + url.loc + '</loc>\n';
            xmlContent += '        <lastmod>' + url.lastmod + '</lastmod>\n';
            // xmlContent += '        <changefreq>' + url.changefreq + '</changefreq>\n';
            // xmlContent += '        <priority>' + url.priority + '</priority>\n';
            xmlContent += '    </url>\n';
        });

        xmlContent += '</urlset>';

        return xmlContent;
    };

    $scope.sitemap = generateSitemap();
}]);
