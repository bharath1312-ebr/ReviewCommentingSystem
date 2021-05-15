var currentUser = localStorage.getItem("currentUser");

    var allUsers = JSON.parse(localStorage.getItem("users"));
    var targetUser;

    allUsers.forEach(user => {
       if (user.emailId == currentUser){
          targetUser = user;

          return;
       }
    })
     console.log('targetuser',targetUser);
    var userListItems = "";
    allUsers.forEach(user => {
       if (user.emailId != currentUser){
          console.log("emailId",user.emailId);
          if(!targetUser.connections.includes(user.emailId)){
       userListItems = userListItems + "<li>"+ user.username +"&nbsp:&nbsp;&nbsp;"+ "<button id='connect' onclick='connect("+user.userId+")'>Connect</button>"+ "<br><br>" +"</li>";
       }
      }
    })

   var pendingListItems = "";

   allUsers.forEach(user =>{
      if(user.emailId == currentUser){
         console.log("inside");
         console.log("pendingrqst",user.pendingRequests);
                  user.pendingRequests.forEach(request =>{
                     console.log("hi");
                     console.log("request",request);
                     console.log('user',user);
                     localStorage.setItem("currentPendingRequest", request);
                     pendingListItems = pendingListItems + "<li>"+ request + "&nbsp;&nbsp;" +"<button onclick='accept()'>Accept</button>"+"&nbsp;&nbsp;"+"<button onclick='decline("+user.emailId+")'>Decline</button>"+"<br><br>" +"</li>";
                  })
      }
   })
   var connectionListItems ="";

   allUsers.forEach(user =>{
      if(user.emailId == currentUser){
         console.log("inside");
                  user.connections.forEach(connection =>{
                     connectionListItems = connectionListItems + "<li>"+ connection + "&nbsp;&nbsp;" +"<button>Send Message</button>"+"&nbsp;&nbsp;"+"<br><br>" +"</li>";
                  })
      }
   })
   document.getElementById("connections").innerHTML=connectionListItems;



   document.getElementById("pendingReqs").innerHTML = pendingListItems;


     function accept(){
      event.preventDefault();

        var pendingRequestEmail = localStorage.getItem('currentPendingRequest');
      

        var allUsers = JSON.parse(localStorage.getItem("users"));
        allUsers.forEach(function(user) {
            if(user.emailId == currentUser){
               user.pendingRequests.forEach(function(request,i){
                  if(request == pendingRequestEmail){
                     user.connections.push(pendingRequestEmail);
                     user.pendingRequests.splice(i,1);

                    allUsers.forEach(function(u){
                       if(u.emailId == pendingRequestEmail){
                          u.connections.push(currentUser);
                          return;
                       }
                    })

                     localStorage.setItem('users',JSON.stringify(allUsers));
                     showPosts();
                     return;
                  }
               })
            }
        })
     }
    function decline(){
       alert("decline called")
    }



    function connect(userId){
      event.preventDefault();
      console.log('userId',userId);
      document.getElementById('connect').innerHTML = 'Request Sent';
      var allUsers = JSON.parse(localStorage.getItem('users'));

   
      allUsers.forEach( user => {
         if (user.userId == userId ){
            console.log('user',user);
            user.pendingRequests.push(currentUser);
            console.log('user',user);
         }
         localStorage.setItem("users",JSON.stringify(allUsers));
      })

    }
    document.getElementById('allUsers').innerHTML=userListItems;

    if(currentUser == null){
        window.location.href = "../login/login.html";
     }
   document.getElementById("welmsg").innerHTML = "Welcome "+ currentUser;

   function logout(){
       localStorage.removeItem("currentUser");
       window.location.href = "../login/login.html";
   } 

   document.getElementById("savebtn").style.display='none'
     if(localStorage.getItem("posts") == null){
        localStorage.setItem("posts",JSON.stringify([]));
     }

   function getUniqueId(){
      if(localStorage.getItem("currentId")== null){
         localStorage.setItem("currentId",1);
      }
      var currentId = parseInt(localStorage.getItem("currentId"));
      currentId++
      localStorage.setItem("currentId",currentId);
      return currentId;
   }
   function getTimeStamp(){
      var date = new Date();
      var d = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
      var t = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      return d + "\t\t "+ t;
   }
   showPosts();
   function post(){
      event.preventDefault();

      var post = getValueById("tarea");

      var userPost ={
         post:post,
         postId:getUniqueId(),
         timestamp:getTimeStamp(),
         postedBy:currentUser,
         username:getUsernameByEmail(currentUser)
      }
      console.log(userPost);
     var allPosts = JSON.parse(localStorage.getItem('posts'));
      allPosts.push(userPost);
     localStorage.setItem("posts",JSON.stringify(allPosts));
     showPosts();
   }
   function showPosts(){
      var listofposts = document.getElementById("listofposts");
      var listitems = ""

      var posts = JSON.parse(localStorage.getItem("posts"));
      console.log("posts",posts)

      for(var i =0;i<posts.length;i++){
         if (currentUser == posts[i].postedBy){

            listitems = listitems + "<li>"+"<b>"+posts[i].username+"</b>"+ ":" +"&nbsp;&nbsp;&nbsp;&nbsp;" +posts[i].post+ "&nbsp;&nbsp;&nbsp;&nbsp;"+ posts[i].timestamp+"&nbsp;&nbsp;&nbsp;&nbsp"+"<button onclick='deletePost("+posts[i].postId+")'>Delete</button>"+"&nbsp;&nbsp;&nbsp"+ "<button onclick='editPost("+posts[i].postId+")'>Edit</button>" +"</li>"+"<br>";
         }
      }
      listofposts.innerHTML = listitems;
      console.log(listitems); 
   }
   function editPost(postId){
         event.preventDefault();
         console.log('postId',postId)
         document.getElementById('postbtn').style.display='none'
         document.getElementById('savebtn').style.display='inline'

        var posts = JSON.parse(localStorage.getItem("posts"));

        posts.forEach(
           function(p){
              if(p.postId == postId){
                 document.getElementById('tarea').value= p.post;
                 document.getElementById('savebtn').setAttribute("onclick","updatePost("+postId+")");
                  return;
               }
           }
        )
   }
   function updatePost(postId){ 
      event.preventDefault();
      console.log("post id",postId);

      var posts = JSON.parse(localStorage.getItem("posts"));

      posts.forEach(
         function(p){
            if(p.postId == postId){
              var newValue= document.getElementById('tarea').value;
              p.post = newValue;
              localStorage.setItem('posts',JSON.stringify(posts));
              showPosts();
              document.getElementById('postbtn').style.display='inline';
              document.getElementById('savebtn').style.display='none';
              document.getElementById("tarea").value= "";
               return;
             }
         }
      )
       

   }
   function getUsernameByEmail(emailId){
    var users =JSON.parse(localStorage.getItem('users'));
    for(i=0;i<users.length;i++){
       if(emailId == users[i].emailId){
          return users[i].username
       }
    }  
   }
   function deletePost(postId){
    event.preventDefault();
    console.log("postId",postId)
    var posts = JSON.parse(localStorage.getItem('posts'));
    for(i=0;i<posts.length;i++){
       if(postId == posts[i].postId){
           posts.splice(i,1);

       }
    }
    localStorage.setItem('posts',JSON.stringify(posts));
    showPosts();

   }