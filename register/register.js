var array = []
  if(localStorage.getItem('users') == null)
  {
    localStorage.setItem("users",JSON.stringify(array));
  }
function register()
{
    event.preventDefault();
    var username = getValueById("username")
    var password = getValueById("password")
    var emailId = getValueById("emailId")
    var user = {
        userId:getUniqueId(),
        username:username,
        password:password,
        emailId:emailId,
        connections:[],
        pendingRequests:[]
    } 
        var users = JSON.parse(localStorage.getItem('users'));
        console.log(typeof users);
        users.push(user);
        console.log(users);
        localStorage.setItem('users',JSON.stringify(users));
        document.getElementById("regForm").reset();
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


 