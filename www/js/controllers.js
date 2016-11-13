angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})
.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  console.log('ChatsCtrl')
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  console.log('ChatDetailCtrl')

  $scope.chat = Chats.get($stateParams.chatId);

})

.controller('AccountCtrl', function($scope,$ionicPlatform,$cordovaBarcodeScanner,$cordovaDevice,$cordovaCamera) {

  $scope.settings = {
    enableFriends: true
  };
  //$scope.deviceInfo='';
  //
  $scope.sannerurl='';
  $scope.scanBarcode = function() {
    $ionicPlatform.ready(function() {
      var options = {
        quality: 50,
      };
      $cordovaBarcodeScanner
      .scan(options)
      .then(function(barcodeData) {
        // Success! Barcode data is here 扫描数据：barcodeData.text
        $scope.sannerurl=barcodeData.text;
      }, function(error) {
        // An error occurred
      });


    // NOTE: encoding not functioning yet
    //  $cordovaBarcodeScanner
    //  .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
    //  .then(function(success) {
    //    // Success!
    //  }, function(error) {
    //    // An error occurred
    //  });

  });
  };
  //$scope.test = function() {
  //  console.log('test');
  //};
  $scope.device = {info:"error"};

  $scope.viewdevice = function() {

    $ionicPlatform.ready(function() {

      var device = $cordovaDevice.getDevice();
      var cordova = $cordovaDevice.getCordova();
      var model = $cordovaDevice.getModel();
      var platform = $cordovaDevice.getPlatform();
      var uuid = $cordovaDevice.getUUID();
      var version = $cordovaDevice.getVersion();

      $scope.device.info =
        "cordova版本：" + cordova + "\n" +
        "设备版本：" + model + "\n" +
        "运行平台：" + platform + "\n" +
        "唯一标识符：" + uuid + "\n" +
        "版本：" + version + "\n" ;

    });
  };

  $scope.opencamera=function(){
    $ionicPlatform.ready(function() {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        // error
      });
    });
  }
})

.controller('HomeCtrl', function($scope,$ionicPlatform,$cordovaBarcodeScanner) {
	$scope.sannerurl='';
  $scope.scanBarcode = function() {
	    $ionicPlatform.ready(function() {
	      var options = {
	        quality: 50,
	      };
	      $cordovaBarcodeScanner
	      .scan(options)
	      .then(function(barcodeData) {
	        // Success! Barcode data is here 扫描数据：barcodeData.text
	        $scope.sannerurl=barcodeData.text;
	      }, function(error) {
	        // An error occurred
	      });
	  });
  };

});

