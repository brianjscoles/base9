angular.module('radar')
.controller('MenuController', [
	'$scope',
	'$ionicSideMenuDelegate',
	'$ionicNavBarDelegate',
	'$timeout',
	'$ionicModal',
	'MapFactory', 
	'MarkerFactory', 
	'HttpHandler', 
	'$scope', 
	function($scope, $ionicSideMenuDelegate, $ionicNavBarDelegate, $timeout, $ionicModal, Map, Marker, Http) {


	$scope.showSearch = false;

// FILTER MENU
	$scope.toggleFilter = false;
	$scope.partyCheck = true;
	$scope.concertCheck = true;
	$scope.happyHourCheck = true;
	$scope.startTime = Date.now()

// This is an ugly hack -- Figure out real angular/ionic ready function
	$timeout(function() {
		$ionicNavBarDelegate.handle = 'navBar';
		$ionicNavBarDelegate.title('Ephemeral');
	}, 150);

	// $scope.test = function() {
	// 	console.log("seearchtext")
	// }
	$scope.loggedIn = false;

/* MODALS */

	$scope.test = "HELLO"

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  }

	$scope.toggleRight = function() {
	  $ionicSideMenuDelegate.toggleRight();
	};
	
	$scope.login = function() {
			$ionicModal.fromTemplateUrl('../templates/login.html', {
		    scope: $scope,
		  }).then(function(modal) {
		    $scope.modal = modal;
				$scope.toggleRight();
				$scope.openModal();
		  });
	}

	$scope.register = function() {
		$ionicModal.fromTemplateUrl('../templates/register.html', {
	    scope: $scope,
	  }).then(function(modal) {
	    $scope.modal = modal;
			$scope.toggleRight();
			$scope.openModal();
	  });
	};

	$scope.newSearch = function() {
		$scope.search = ''
		$scope.showSearch = !$scope.showSearch;
	};

	/* NEW EVENT MODAL */

	$scope.getCurrentAddress = function() {
		console.log("getting address")
		$scope.coords = Map.findCurrentLocation() // Promisify
		//.then()
		//DUMMY INFO BELOW
		$scope.coords = {lat: 37.792979, lng: -122.421242}
		var address = Map.getAddressForCoords($scope.coords.lat, $scope.coords.lng) // Promisify
		//.then()
		$scope.streetAddress1 = address.streetAddress;
		$scope.city = address.city;
		$scope.state = address.state;
		$scope.zipCode = address.zipCode;
	}

	$scope.postNewEvent = function() {
		// TODO: Check for authentication. If authenticated, proceed. Else "Please Login or register to post events"
		$scope.coords = {lat: undefined, lng: undefined};
		$ionicModal.fromTemplateUrl('../templates/newEventModal.html', {
	    scope: $scope,
	  }).then(function(modal) {
	    $scope.modal = modal;
			$scope.toggleRight();
			$scope.openModal();
	  });
	};

	$scope.saveNewEvent = function(title, info, streetAddress1, streetAddress2, city, state, zipCode, startDateTime, endDateTime, category) {
		// TODO: Get userId from Auth, pass it into http call below
		var userId = 1
		// DUMMY INFO BELOW
		Map.getCoordsForAddress((streetAddress1+'+'+streetAddress2+'+'+city+'+'+state+'+'+zipCode).split(' ').join('+'))
		Http.saveNewEvent(title, info, streetAddress1, streetAddress2, city, state, zipCode, startDateTime, endDateTime, category, userId, $scope.coords);
	}

	$scope.startDateTime = new Date();
	$scope.endDateTime

}])

// angular.module('radar').controller('ModalCtrl', function ($scope, $modalInstance) {

//   $scope.ok = function () {
//     $modalInstance.close();
//   };

//   $scope.cancel = function () {
//     $modalInstance.dismiss('cancel');
//   };

// });