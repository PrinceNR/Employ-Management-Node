
let container = document.getElementById('container')

toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)

const username = document.getElementById("sign-up-Username")
const email = document.getElementById("sign-up-email")
const password = document.getElementById("sign-up-password")
const passwordRe = document.getElementById("sign-up-passwordRe")
const signBtn = document.getElementById("signBtn")


const logEmailId = document.getElementById("logEmailId");
const logPassword = document.getElementById("logPassword");
const loginEmailSpan = document.getElementById("logEmailIdSpan")
const logPasswordSpan = document.getElementById("logPasswordSpan")


signBtn.addEventListener("click" ,() => {
if(validateForm()){
	let signinDatas = {
		userName : username.value,
		email : email.value,
		password : password.value
	}
	console.log(signinDatas);
	
		// console.log(signinData());
	
	try{
		fetch ("http://localhost:5010/api/admin/signup",{
			method : "POST",
			headers :{
				"Content-type" : "application/json"
			},
			body:JSON.stringify(signinDatas)
		})
		.then(response => response.json())
		.then(data => console.log(data)

	)
		.catch(error => console.log("error" ,error))
		
	}
	catch(error){
		console.log();("Error :" ,error)
	}
	
}
	
})

const spanUsername = document.getElementById("usernameSpan")
const emailSpan = document.getElementById("emailSpan")
const passwordSpan = document.getElementById("passwordSpan")
const rePasswordSpan = document.getElementById("rePasswordSpan")

const signinBtn = document.getElementById("signInBtn")

signinBtn.addEventListener("click", ()=> {
	if(validationSignin()){
		let loginDatas ={
			email : logEmailId.value,
			password : logPassword.value
		}
		try{
			fetch ("http://localhost:5010/api/admin/login",{
				method : "POST",
				headers :{
					"Content-type" : "application/json"
				},
				body:JSON.stringify(loginDatas)
			})
			.then(response => response.json())
			.then(data => console.log(data)
	
		)
			.catch(error => console.log("error" ,error))
			
		}
		catch(error){
			console.log();("Error :" ,error)
		}

	}

})

function validationSignin(){
	return validateEmailLogin() && validatePasswordLogin()
}

function validateEmailLogin(){
	if (!logEmailId.value){
		loginEmailSpan.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Email is mandatory`
		return false
	 }
	 else if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(logEmailId.value) ){
		loginEmailSpan.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Enter a valid email`
		 return false
	 }
	
	 loginEmailSpan.innerHTML = ""
	 return true
	
}
function validatePasswordLogin(){
	if(!logPassword.value){
		logPasswordSpan.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Password is mandatory`
		return false
	}
	else if(logPassword.value.length <= 5 ){
		logPasswordSpan.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Password must have 6 letters`
		return false

	}
	logPasswordSpan.innerHTML = ""
	return true
}

function  validateForm() {
	return validateUsername() && validateEmail() && validatePassword() && passwordCheck()  

}
         function validateUsername() {
			if (!username.value) {
				spanUsername.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>UserName is mandatory`	
				return false
			 }
			 spanUsername.innerHTML = ""
			 return true
		 }
		 
		 function validateEmail() {
			if (!email.value){
				emailSpan.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Email is mandatory`
				return false
			 }
			 else if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.value) ){
				emailSpan.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Enter a valid email`
				 return false
			 }
		    
			 emailSpan.innerHTML = ""
			 return true
		 }
		 const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
		 const numberRegex = /\d+/;
		 const alphabetRegex = /[a-zA-Z]+/;
		 function validatePassword(){
			if(!password.value){
				passwordSpan.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Password is mandatory`
				return false
			}
			else if(password.value.length <= 5 ){
				passwordSpan.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Password must have 6 letters`
				return false

			}
			// else if(!specialCharRegex.test(password.value) || !numberRegex.test(password.value) || !alphabetRegex.test(password.value)){
			// 	passwordSpan.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Include Special Charactors, Numbers, Alphabets in Password `;
			// 	return false;
			// }
			passwordSpan.innerHTML = ""
			return true
		
		 }
		 function passwordCheck(){
			console.log("its cheked");
			if(!(password.value === passwordRe.value)){
				
				rePasswordSpan.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>password do not match from the above column`;
				return false
			}
			rePasswordSpan.innerHTML = "";
			return true;
		}

