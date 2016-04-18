'use strict';

app.config(function($stateProvider) {

	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: 'js/signup/signup.html',
		controller: 'SignupCtrl'
	})
})

// add necessary dependencies here
app.controller('SignupCtrl', function($scope, $state, User) {

  $scope.sendSignup = function(formObj) {
    User.create(formObj)
      .then(function(user) {
        // direct out of here to route to specific user 
        $state.go('create', {userId: user._id});
      });
  }
  /*
  TODOS: 
  1 - create the signup object for ng-modelling
  2 - create a `sendSignup` function that
      a) persists the user data 
      b) changes the state to  'create' while sending along important user data
      (HINT: $stateParams)

  */

})