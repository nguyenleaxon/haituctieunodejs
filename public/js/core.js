angular.module('mumandkid', [])
    .config(['$interpolateProvider', function ($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    }])
    .controller('CategoryController', function ($scope, $http, $rootScope) {
        $scope.firstName = "John";

        $scope.categories = [{
            value: '55e06eb1a54794c549c64936',
            label: 'English songs'
        }, {
            value: '55e7af263b48c9e5983a94ca',
            label: 'Advertising songs'
        }, {
            value: '55e7b3603b48c9e5983a94cd',
            label: 'Vietnamese songs'
        }, {
            value: '55e7b7793b48c9e5983a94d0',
            label: 'Stories'
        }, {
            value: '55e7bbf43b48c9e5983a94d3',
            label: 'Game'
        }, {
            value: '55e7e90869436d7e2e4f7ad3',
            label: 'Food for kids'
        }, {
            value: '55e7e96d69436d7e2e4f7ad5',
            label: 'Sicks'
        }, {
            value: '55ec660144a662ddf8a05973',
            label: 'Cartoon'
        },{
            value: '55e7e90869436d7e2e4f7ad3',
            label: 'Music for mum'
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

        $scope.deteleVideo = function (videoID) {
            $scope.loading = true;
            var requestVideo = {};
            requestVideo.videoID = videoID;
            var promise = $http({
                method: 'POST',
                url: '/deleteVideoWeb',
                data: requestVideo
            }).success(function (data) {
                $scope.loading = true;
                alert("Document has been removed");
            }).error(function (data, status, headers, config) {
                $scope.loading = true;
                alert("Document hasn't been removed");
            });
            return promise;
        }

    })