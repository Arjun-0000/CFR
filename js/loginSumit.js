
const form = document.getElementById('loginFromHead');
const loginPart = document.getElementById('login-part');



const LoginForm = document.getElementById('login-page');
const LoginAppr = document.getElementById('login-approval');

function fSubmitAjax(event) {
    event.preventDefault();
    /* Function to call for ajax */
    fAjaxStart();
}

form.addEventListener('submit', fSubmitAjax);

function fAjaxStart(callback) {

    let emailForm = form.querySelector('input[name="email"]').value 
    let pswdForm = document.getElementById('pswd').value;

    let xHR = new XMLHttpRequest;
    console.log("unsent status after obj create: ", xHR.status + " " + xHR.readyState );
    /* status checking */

	xHR.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			// let myObj = JSON.parse(this.responseText);
			// alert("json file is ready to use");
            //alert(this.responseText);
            if (this.responseText != '') {
                //alert(this.responseText);
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

        console.log("done", xHR.readyState);
        console.log(xHR.response + " - " + xHR.responseType + " - " + xHR.responseText);

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
	//xHR.open('POST','./login/registration.php',true);
    xHR.open('GET','./login/register.php?email=' + emailForm + '&pswd=' + pswdForm, true);
    console.log("open", xHR.readyState + " - " + "stattus after open line : ", xHR.status);

    xHR.onprogress = function () {
        console.log('LOADING', xHR.readyState); // readyState will be 3
    };

    //xHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xHR.send("email=" + emailForm + "&pswd=" + pswdForm);
    xHR.send();

}
