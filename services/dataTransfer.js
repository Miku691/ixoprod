app.service('DataTransferService', function () {
    const STORAGE_KEY = 'sharedData';
    let sharedData = localStorage.getItem(STORAGE_KEY) || '';

    this.getRecentPostData = function() {
        return sharedData;
    };

    this.setRecentPostData = function(data) {
        sharedData = data;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sharedData));
    };
});
