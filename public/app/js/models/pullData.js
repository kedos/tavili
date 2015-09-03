var IDs = ko.observableArray([]);
var postsArr= ko.observableArray([]);
var userID = ko.observable(0);
var numPosts=ko.observable(0);
var country=ko.observable(' ');
var userAddress=ko.observable(' ');
function printAll(){
    console.log("User ID: "+userID());
    console.log("User latest country post: "+country());
    console.log("User Friends' IDs: "+IDs());
    console.log("User home address: "+userAddress());
}
function iteratePosts(){
    //console.log("Iterating");
    var i=0;
    var cand=0;
    for (i=numPosts()-1;i>=0;i--){
    //for (i=0;i<numPosts();i++){
    var st='/'+postsArr()[i].id.toString();
    FB.api(st,'GET',{"fields":"place"},function(response) {
            //var loc =response.get('place');
            //console.log(loc);
            if ('place' in response) {
                country(response.place.location.country);
                //console.log("Showing country "+country());
                //console.log(response.id);
            }
        }

    );
    if (country()!=' '){break;}
    }
}
function getUserAddress(){
    var loc;
    FB.api('/me/','GET',{"fields":"location"},function(response) {
      loc=response.location.name;
      //console.log(response.location.name);
      userAddress(loc);
      getPosts();
    });
}
function getNumPosts(){
    var len;
    FB.api('/me','GET',{"fields":"posts"},function(response) {
        len=response.posts.data.length;
        //console.log("Placing len");
        //console.log(len);
        numPosts(len);
    });
}
function getUserData(){
    var tmpID;
    FB.api('/me','GET',{"fields":"id"},function(response) {
        userID(response.id);
        getFriendsIDs();
    });
}
function getFriends() {
    getFriendsIDs();
    //console.log("Printing final result");
    console.log(IDs());
}
userAddress.subscribe(function(value) {
    console.log("User address updated to ");
    console.log(value);
    //TODO send to server
});
country.subscribe(function(value) {
    console.log("Country updated to ");
    console.log(value);
    //TODO send to server
});
postsArr.subscribe(function(value) {
    console.log("Posts list updated to ");
    console.log(value);
    //TODO send to server
});
IDs.subscribe(function(value) {
    console.log("Friends ID list updated to ");
    console.log(value);
    //TODO send to server
});
userID.subscribe(function(value) {
    console.log("User ID updated to ");
    console.log(value);
    //TODO send to server
});
numPosts.subscribe(function(value) {
    console.log("Number of posts updated to ");
    console.log(value);
    //TODO send to server
});

function getPosts(){
    var tmpArr=[];
    var i;
    FB.api('/me','GET',{"fields":"posts"},function(response) {
    var len=response.posts.data.length;
    for (i=0;i<response.posts.data.length;i++){
        tmpArr.push(response.posts.data[i]);
    }
    postsArr(tmpArr);
    numPosts(len);
    iteratePosts();
    });
}
function getFriendsIDs() {
    var tmpIDs = [];
    var i;
    FB.api('/me','GET',{"fields":"friends"},
        function(response) {
            for (i = 0; i < response.friends.data.length; i++) {
                tmpIDs.push(response.friends.data[i].id);
            }
            //console.log("Printing temp result");
            //console.log(tmpIDs);
            IDs(tmpIDs);
            getUserAddress();
        }
    );
}