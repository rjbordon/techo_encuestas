/**
 * Created by martin on 06/06/15.
 */





app.controller("mapa", ['$scope', '$http', '$modal', function ($scope, $http, $modal) {

    $scope.family = [];
    $scope.markers = [];
    $scope.map = null;


    google.maps.event.addDomListener(window, 'load', initialize);

    function initialize() {

        var myLatlng = new google.maps.LatLng(-25.363882, 131.044922);
        var mapOptions = {
            zoom: 4,
            center: myLatlng
        };
        $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // Imagenes
        var images = [
            {
                url: 'images/pinYellow.png',
                // This marker is 20 pixels wide by 32 pixels tall.
                size: new google.maps.Size(22, 40),
                //size: new google.maps.Size(20, 32),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(0, 32)
            },
            {
                url: 'images/pinGreen.png',
                // This marker is 20 pixels wide by 32 pixels tall.
                size: new google.maps.Size(40, 50),
                //size: new google.maps.Size(20, 32),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(0, 32)
            },
            {
                url: 'images/pinRed.png',
                // This marker is 20 pixels wide by 32 pixels tall.
                size: new google.maps.Size(40, 50),
                //size: new google.maps.Size(20, 32),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(0, 32)
            },
            {
                url: 'images/pinGrey.png',
                // This marker is 20 pixels wide by 32 pixels tall.
                size: new google.maps.Size(40, 50),
                //size: new google.maps.Size(20, 32),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(0, 32)
            },
            {
                url: 'images/pinBlue.png',
                // This marker is 20 pixels wide by 32 pixels tall.
                size: new google.maps.Size(40, 50),
                //size: new google.maps.Size(20, 32),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(0, 32)
            }
        ];

        var shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly'
        };

        $http({
            method: 'GET',
            url: '/api/family'
        }).success(function (data) {
            $scope.family = data;
            console.log(data);
            // Agrego el marker


            $scope.family.forEach(function (fam) {

                fam.marker = new google.maps.Marker({
                    position: new google.maps.LatLng(fam.lat, fam.lng),
                    map: $scope.map,
                    icon: images[fam.status],
                    shape: shape,
                    title: fam.bossLastName,
                    zIndex: 1,
                    draggable: true,
                    animation: google.maps.Animation.DROP
                });
            });
            $scope.center();

        }).error(function (data) {
            console.log('noando' + err);
        });
    }

    $scope.center = function () {
        var latlngbounds = new google.maps.LatLngBounds();

        $scope.family.forEach(function (fam) {
            latlngbounds.extend(fam.marker.position);
        });


        $scope.map.setCenter(latlngbounds.getCenter());
        $scope.map.fitBounds(latlngbounds);
    }

  /*$scope.openCreateFamilyPopup = function() {
    alert('holas');
  };*/

  $scope.openCreateFamilyPopup = function (size) {

    var modalInstance = $modal.open({
      //animation: $scope.animationsEnabled,
      templateUrl: 'templates/formFamilia.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      console.info('Modal dismissed at: ' + new Date());
    });
  };
}]);


app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  /*$scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };*/

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
