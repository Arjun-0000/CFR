const form = document.getElementById('loginFromHead');
const loginPart = document.getElementById('login-part');

const LoginForm = document.getElementById('login-page');
const LoginAppr = document.getElementById('login-approval');

function fSubmitAjax(event) {
    event.preventDefault();
    /*  */
    fAjaxStart();
}

/* adding onclick event */
form.addEventListener('submit', fSubmitAjax);


function fAjaxStart(callback) {

    let emailForm = form.querySelector('input[name="email"]').value 
    let pswdForm = document.getElementById('pswd').value;

    /* Object create */
    let xHR = new XMLHttpRequest;

	xHR.onreadystatechange = function(){
        
        switch (this.readyState) {
            /* when object create, then 0 state */
            case 0:
                console.log("the request is not intialized");
                break;
            case 1:
                console.log("Open start");
                break;
            case 2:
                console.log("");
                break;
            case 3:
                console.log("rxHR.onprogress");
                break;
            case 4:
                console.log("xHR.DONE");
                break;
        }

		if(this.readyState == 4 && this.status == 200){
            if (this.responseText != '') {
                LoginForm.style.display = "none";
                LoginAppr.style.display = "block";
            } else {
                LoginForm.style.display = "block";
                LoginAppr.style.display = "none";
            }
		}
	}
    xHR.onload = function() {
        //const loginPart = document.getElementById('login-part');
        //loginPart.innerHTML = this.responseText;
        if (this.responseText != '') {
            //alert(this.responseText);
            LoginForm.style.display = "none";
            LoginAppr.style.display = "block";
            document.getElementById('showNameAfterLogin').innerHTML = this.responseText;
        } else {
            LoginForm.style.display = "block";
            LoginAppr.style.display = "none";
        }
    }
	
    xHR.open('GET','./login/register.php?email=' + emailForm + '&pswd=' + pswdForm, true);
    xHR.send();

    //xHR.open('POST','./login/registration.php',true);
    //xHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xHR.send("email=" + emailForm + "&pswd=" + pswdForm);
    

}