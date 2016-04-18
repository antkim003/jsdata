'use strict'; 

app.config(function($stateProvider) {
	$stateProvider.state('post', {
		url: '/post/:postId',
		templateUrl: 'js/post/post.html',
		controller: 'PostCtrl',
		resolve: {
			users: function(User) {
				return User.findAll(); // caching all the users onto local storage
			}
		}
		/*
				add a resolve block that retrieves all the users
				so that the author field of the posts will be automatically 
				populated
		*/
	})
});

// add necessary dependencies 
app.controller('PostCtrl', function($scope, $stateParams, Post, User) {
	$scope.editFormClicked = false;
	/* 1. FIND POST
		use state params to retrieve the post id and attach post object to scope 
		on controller load 
	*/
	Post.find($stateParams.postId)
		.then(function(post) {
			$scope.post = post;
			$scope.author = User.get(post.author);
		});

	/*
		2. EDIT POST 
		create a function that edits the post, adds an alert that the post has been 
		successfully edited, and displays the edited post.  

	*/
	$scope.editForm = function() {
		$scope.editFormClicked = true;
	}
	$scope.savePost = function() {
		var postObj = {
			idAttribute: $stateParams.postId,
			title: $scope.post.title,
			name: $scope.author.username,
			body: $scope.post.body		
		};		
		console.log("heres the editform's postObj ", postObj);

		Post.update($stateParams.postId, postObj)
			.then(function(updatedPost) {
				debugger;
			});
		// Post.find($stateParams.postId)	
		// 	.then(function(post) {
		// 		return Post.update(post._id, {title: 'hello'})
		// 	})
		// 	.then(function() {
		// 		console.log('i dont understand');
		// 	});
			
	}
	


})