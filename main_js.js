
/**
 * LOGIN UTILS
 * */

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  window.fbAsyncInit = function() {
      FB.init({
        appId      : '419843501540998',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.4' // use version 2.4
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.

      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });

  };


  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

//once we are logged in, use this function to get the home page of the site!
function loginWithID(response) {
      FB.api('/me?fields=id', function (response) {
          console.log("response is" + response.id);
          window.location.href = 'home.html?id=' + response.id;
      });
  };

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
      /**if (response.status==='connected'){
        FB.logout(function(response) {
          // user is now logged out
          console.log("User logged out");
        });
      }*/

    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      //window.location.href = 'Home.html';
      loginWithID(response);
      //testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

//////////////////////////////////////////////////////////////////////////////////////

// Class to represent a row in the wishlist
function WishListItem(item_data) {
    var self = this;
    self.product = item_data.product;
    self.location = item_data.location;
  console.log("sucessfully created item: " + item_data.product + " " + item_data.location);
}

// Overall viewmodel for this screen, along with initial state
function WishListViewModel(source) {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.WishListDataArray = [
        { item_name: "item1", location: 'Israel'},
        { item_name: "item2", location: 'USA'},
        { item_name: "item3", location: 'France'},
        { item_name: "iphone4", location: 'UK' }
    ];
    // Editable data
    self.wish_list_items = ko.observableArray([
        new WishListItem({item_name: "item3", location: 'France'}),
        new WishListItem({item_name: "item2", location: 'USA'})
    ]);

  /**
   *     self.WishListArray = somehow generate the array with source
   *
   *     self.wish_list_items = []
   *     for (var i = 0; i < WishListArray.length; i++) {
   *        wish_list_items.push(new WishListItem(WishListArray[i]));
   *     }
   *

  // display all values

      console.log(arr[i]);
  }
   *
   */
}

ko.applyBindings(new WishListViewModel());