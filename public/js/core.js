angular.module('mumandkid', [])
    .config(['$interpolateProvider', function ($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    }])
    .controller('CategoryController', function ($scope, $http,$rootScope) {
        $scope.firstName = "John";

        $scope.categories = [{
            value: '55e06eb1a54794c549c64936',
            label: 'Video Clip Hai'
        }


        ];

        $scope.getAllVideoByCategory = function (categoryID) {

             var requestVideo = {};
            requestVideo.categoryID = categoryID;

            var promise = $http({
                method: 'POST',
                url: '/getAllVideoByCategoryWeb',
                data: requestVideo
            }).success(function (data) {
                $scope.videos = data;
                console.log($scope.videos);
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
            return promise;
        }

        $scope.deteleVideo = function (videoID,index) {
            $scope.loading = true;
            var requestVideo = {};
            requestVideo.videoID = videoID;
            var promise = $http({
                method: 'POST',
                url: '/deleteVideoWeb',
                data: requestVideo
            }).success(function (data) {
                $scope.loading = false;
                $scope.videos.splice(index,1);
                alert("Document has been removed");
            }).error(function (data, status, headers, config) {
                $scope.loading = false;
                alert("Document hasn't been removed");
            });
            return promise;
        }

    })