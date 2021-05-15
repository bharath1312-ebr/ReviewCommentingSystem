function login()
{
    event.preventDefault(); 
    var emailId = getValueById('emailId');
    var password = getValueById('password'); 
    var isUserFound = false;

    var usersArray = JSON.parse(localStorage.getItem('users'));
     for(var i=0; i<usersArray.length; i++){

          var currentUser = usersArray[i];
        if(currentUser.emailId == emailId){
                     isUserFound = true;
          
            if(currentUser.password == password){

             localStorage.setItem('currentUser',currentUser.emailId); 
              window.location.href="../dashboard/dashboard.html";
            }
             else
            {
                alert("incorrect password ")
            }
        }
     }
              if(isUserFound == false){
               alert("user not found "); 
    }

}