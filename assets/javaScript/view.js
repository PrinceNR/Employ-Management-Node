
let url = new URLSearchParams(document.location.search);
let employeeID = url.get("id");

var allEmployee  = [];
let endNum 
var numOfPage
var endvalue 
var A
var Numbe 

let employeeImage = document.getElementById("employeeImage");
let employeeFullName = document.getElementById("employeeFullName");
let employeeEmail = document.getElementById("employeeEmail");
let employeeGender = document.getElementById("employeeGender");
let employeeAge = document.getElementById("employeeAge");
let employeeDob = document.getElementById("employeeDob");
let employeePhone = document.getElementById("employeePhone");
let employeeQualification = document.getElementById("employeeQualification");
let employeeAddress = document.getElementById("employeeAddress");
let employeeUserName = document.getElementById("employeeUserName");


const valSalutation = document.getElementById("valSalutation"),
    valFName = document.getElementById("valFName"),
    valLName = document.getElementById("valLName"),
    valUName = document.getElementById("valUName"),
    valPassword = document.getElementById("valPassword"),
    valEmail = document.getElementById("valEmail"),
    valNum = document.getElementById("valNum"),
    valBirth = document.getElementById("valBirth"),
    valGender = document.getElementById("valGender"),
    valQualification = document.getElementById("valQualification"),
    valAddress = document.getElementById("valAddress"),
    valCountry = document.getElementById("valCountry"),
    valState = document.getElementById("valState"),
    valCity = document.getElementById("valCity")

const succesAlert = document.getElementById("succes-alert"),
      succesIcon = document.getElementById("succes-icon"),
      succesText = document.getElementById("succes-text")

const formControl = document.querySelectorAll(".form-control"),
      formSelect = document.querySelectorAll(".form-select")



const Salutation = document.querySelector("#salutation") ;
const FirstName = document.querySelector("#firstName") ;
const SecondName = document.querySelector("#secondName") ;
const UserName = document.getElementById("userName");
const Password = document.getElementById("password");
const Email = document.getElementById("emailAddress") ;
const MobNum = document.getElementById("mobNum") ;
let DOB = document.getElementById("dOB") ;
const RadioBtn = document.getElementById("flexRadioDefault1");
const RadioBtn2 = document.getElementById("flexRadioDefault2");
const Qualification = document.getElementById("qualification");
const Address = document.getElementById("address");
const CountrySelector = document.getElementById("countrySelector");
const State = document.getElementById("state");
const City = document.getElementById("city");
const userDetails = document.getElementById("userDetails");
const imgSrc = document.getElementById("imgSrc");
const editImage = document.getElementById("editImage"); 
const pinZip = document.getElementById("pinZip")

let empFormId = document.getElementById("empFormId");
let overlayId = document.getElementById("overlayId");
let inputImg = document.getElementById("inputImg");
let addEmployBtns = document.getElementById("addEmployBtns");

let thisEmployeeId; 



fetch("http://localhost:5010/api/employees/"+ employeeID )
   .then((employeedata) => {
    if (!employeedata) {
        const data = employeedata.json
        // return render("index")
        console.log(data)
        employeeFullName.textContent = data.message;
        throw new Error("employee not found")

        
    }
    return employeedata.json();

   })
   .then((employeedatas) =>{
        const Name = ( employeedatas.salutation + " " + employeedatas.firstName + " " + employeedatas.lastName )


        employeeImage.src = `/uploads/${employeedatas.avatar}`
        employeeFullName.textContent = Name;
        employeeEmail.textContent = employeedatas.email;
        employeeGender.textContent = employeedatas.gender;
        employeeAge.textContent = ageCalculate(employeedatas.dob);
        employeeDob.textContent = dateOfBirth(employeedatas.dob);
        employeePhone.textContent = employeedatas.phone;
        employeeQualification.textContent = employeedatas.qualifications;
        employeeAddress.textContent = employeedatas.address;
        employeeUserName.textContent = employeedatas.username;
   })

console.log("script2")
//    (employeedatas.dob);
//    (employeedatas.dob);

function ageCalculate(DOB) {
   // let curentDate = Date();
   // let Age = curentDate - DOB ;
   console.log(DOB);
   let birthDate = DOB.split("-");
   let dateofbirth = [];

   for(let i= 0 ; i<3 ; i++){
      dateofbirth.push(parseInt(birthDate[i]));
   }

   const today = new Date();
   var curentYear = today.getFullYear();
   
   let age = curentYear - dateofbirth[2];

   console.log(today.getDate());
   console.log(dateofbirth[1]);
   let Month =today.getMonth()

   if (Month+1 < dateofbirth[1] || Month+1 === dateofbirth[1] && today.getDate() < dateofbirth[0]){
      age--;
   }
   return age;
}

function dateOfBirth(date) {
   return date;
}  



let deleteEmpId = document.getElementById("deleteEmpId");
let alertPopupId = document.getElementById("alertPopupId");
const editDetailsBtn = document.getElementById("editDetailsBtn");
let addEmployBtn = document.getElementById("addEmployBtn");
let editedPopup = document.getElementById("editedPopup");

let htmlEmployees = document.getElementById("htmlEmployees");
 htmlEmployees.addEventListener("click", function() {
   window.location.href = "index.html";
 });


// editDetailsBtn.addEventListener("click", editPopup(employeeID));


// editDetailsBtn.onclick = editPopup(employeeID);


function deletePopup2() {
   alertPopupId.style.display = "flex";
   overlayId.style.display = "block";

   deleteEmpId.addEventListener("click",function(){
           fetch("http://localhost:5010/api/employees/"+employeeID ,{
               method:"DELETE",
           })
        //    .then((res) => res.json())
           .then((ress) => { 
        if(ress.ok){
           formHide();
           empDelete();
           setTimeout(() => {
            return render("index")
           }, 2000); 
        }
        else {
            alert("Delete request failed")
            formHide();
        }
  
    })


    
        // // setTimeout(() => {
        //     window.close();
        // }, 4000); 
      
   })
}

 function formIdPopup(){
   empFormId.style.display = "block";
   overlayId.style.display = "block";
   addEmployBtns.style.display = "block";
   addEmployBtn.style.display = "block";
   // popupHeading.textContent = "Add Employee";
   // addEmployBtn.textContent = "Add Employee";
}
function editPopup2() {
   
   //  formIdPopup();
//    inputImg.style.display = "none";
   editedPopup.style.display = "flex";
   popupHeading.textContent = "Edit Employee";
   empFormId.style.display = "block";
   overlayId.style.display = "block";
   // addEmployBtn.style.display = "none";
   addEmployBtns.style.display = "block";
   thisEmployeeId = employeeID;


   fetch("http://localhost:5010/api/employees/"+thisEmployeeId)
 .then((data)=>{
     return data.json()
 })
     .then((thisEmployeeId) =>{
         Salutation.value=thisEmployeeId.salutation
         FirstName.value=thisEmployeeId.firstName
         SecondName.value=thisEmployeeId.lastName
         UserName.value=thisEmployeeId.username
         Password.value=thisEmployeeId.password
         Email.value=thisEmployeeId.email
         MobNum.value=thisEmployeeId.phone
         DOB.value=dOfB(thisEmployeeId.dob)
         Qualification.value=thisEmployeeId.qualifications
         Address.value=thisEmployeeId.address
         CountrySelector.value=thisEmployeeId.country
         State.value=thisEmployeeId.state
         City.value=thisEmployeeId.city  
         pinZip.value = thisEmployeeId.pin
         imgSrc.src = `/uploads/${thisEmployeeId.avatar}`      
        
         thisEmployeeId.gender==="Male"?RadioBtn.checked=true :RadioBtn2.checked=true
     })
 
 addEmployBtns.addEventListener("click",update)

 function update() {
   if(formvalidation()){
    uploadImg(thisEmployeeId)
     fetch("http://localhost:5010/api/employees/"+thisEmployeeId,{
         method:"PUT",
     headers:{
         "Content-Type":"application/json"
            },
     body:JSON.stringify(addingUser()),

     })
     empEdit(); 
     formHide();
     setTimeout(() => {
      window.location.reload();
     }, 2000); 
 } }
}

function  addingUser() {
    
   var DOB = document.getElementById("dOB").value
   

   let newUser = {
       salutation :Salutation.value,
       firstName :FirstName.value,
       lastName :SecondName.value,
       username :UserName.value,
       password :Password.value,
       email : Email.value,
       phone : MobNum.value,
       dob : dOfB(DOB),
       gender : gender(RadioBtn),
       qualifications :Qualification.value,
       address : Address.value,
       country : CountrySelector.value,
       state : State.value,
       city :City.value
   }

   console.log(newUser);

   return newUser

   
}

let profileImg

editImage.onchange = function(){
    profileImg = editImage.files[0];     
    if(profileImg){
       imgSrc.src = URL.createObjectURL(profileImg)
    }
}

function gender(){
   RadioBtn.value;
   if(RadioBtn.checked){ var Gender = "Male" }
   else{ Gender = "Female"}

   return Gender
}

function dOfB(date) {
   console.log(date);
   date = date.split("-").reverse().join("-");
   console.log(date);
   return date;
}
function formHide() {
   empFormId.style.display = "none";
   overlayId.style.display = "none";
   alertPopupId.style.display = "none";
   refresh();
}
function refresh(){


   Salutation.value=""
   valSalutation.textContent = ""
   FirstName.value=""
   valFName.textContent=""
   SecondName.value=""
   valLName.textContent=""
   UserName.value=""
   valUName.textContent=""
   Password.value=""
   valPassword.textContent=""
   Email.value=""
   valEmail.textContent=""
   MobNum.value=""
   valNum.textContent=""
   DOB.value=""
   valBirth.textContent=""
   Qualification.value=""
   valGender.textContent=""
   valQualification.textContent=''
   Address.value=""
   valAddress.textContent=""
   CountrySelector.value=""
   valCountry.textContent=""
   State.value=""
   valState.textContent=""
   City.value=""
   valCity.textContent=""
   RadioBtn.checked=false
   RadioBtn2.checked=false

   formControl.forEach(element => { if (element.classList.contains('input-border')) {
                               element.classList.remove('input-border')} }) 

   formSelect.forEach(element=> { element.classList.remove('input-border')})


}



function valSalutations(){
   if(Salutation.value == ""){
         valSalutation.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Salutaion is mandatory`;
         Salutation.classList.add('input-border')
         return false;
   }
   valSalutation.innerHTML = ""
   Salutation.classList.remove('input-border')
   return true
}

function validFName(){
 if(!FirstName.value){
     valFName.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>First name is mandatory`;
     FirstName.classList.add('input-border')
     return false;
 }
 valFName.innerHTML = ""
 FirstName.classList.remove('input-border')
 return true
}
function validLName(){
 if(!SecondName.value){
     valLName.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Last name is mandatory`;
     SecondName.classList.add('input-border')
     return false;
 }
 valLName.innerHTML = ""
 SecondName.classList.remove('input-border')
 return true
}
function validUName(){
 if(!UserName.value){
     valUName.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>User name is mandatory`;
     UserName.classList.add('input-border')
     return false;
 }
 valUName.innerHTML = ""
 UserName.classList.remove('input-border')
 return true
}
const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const numberRegex = /\d+/;
const alphabetRegex = /[a-zA-Z]+/;

function validPassword(){
 if(!Password.value){
     valPassword.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Password name is mandatory`;
     Password.classList.add('input-border')
     return false;
 }
 else if(Password.value.length < 6){
     valPassword.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Enter Atleast 6 Charactors in Password `;
     Password.classList.add('input-border')
     return false;
 }
 else if(!specialCharRegex.test(Password.value) || !numberRegex.test(Password.value) || !alphabetRegex.test(Password.value)){
     valPassword.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Include Special Charactors, Numbers, Alphabets in Password `;
     Password.classList.add('input-border')
     return false;
 }
 valPassword.innerHTML = ""
 Password.classList.remove('input-border')
 return true
}
function validEmail(){
 if(!Email.value){
     valEmail.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Email is mandatory`;
     Email.classList.add('input-border')
     return false;
 }
 else if(!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(Email.value)) {
     valEmail.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Enter a valid Email `;
     Email.classList.add('input-border')
     return false;
 }
 valEmail.innerHTML = ""
 Email.classList.remove('input-border')
 return true
}
function validNum(){
 if(!MobNum.value){
     valNum.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Phone Number is mandatory`;
     MobNum.classList.add('input-border')
     return false;
 }
 else if (MobNum.value.length !== 10){
     valNum.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Enter a valid Phone Number `;
     MobNum.classList.add('input-border')
     return false;
 }
 valNum.innerHTML = ""
 MobNum.classList.remove('input-border')
 return true
}

function validDOB(){
 const regex1 = /^\d{4}-\d{2}-\d{2}$/;
 if(!DOB.value){
     valBirth.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Date of Birth is mandatory`;
     DOB.classList.add('input-border')
     return false;
 }
 else if (!regex1.test(DOB.value)){
     valBirth.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Enter a valid date of Birth `;
     DOB.classList.add('input-border')
     return false;
 }
 valBirth.innerHTML = ""
 DOB.classList.remove('input-border')
 return true
}

function validGender(){
 if(!RadioBtn.checked && !RadioBtn2.checked){
     valGender.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Gender required `;
     return false;
 }
 valGender.innerHTML = ""
 return true
}

function validQualification(){
 if(!Qualification.value){
     valQualification.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Enter qualification`;
     Qualification.classList.add('input-border')
     return false;
 }
 valQualification.innerHTML = ""
 Qualification.classList.remove('input-border')
 return true
}

function validAddress(){
 if(!Address.value){
     valAddress.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Enter address`;
     Address.classList.add('input-border')
     return false;
 }
 valAddress.innerHTML = ""
 Address.classList.remove('input-border')
 return true
}
function validCountry(){
 if(CountrySelector.value ==""){
     valCountry.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Enter Country`;
     CountrySelector.classList.add('input-border')
     return false;
 }
 valCountry.innerHTML = ""
 CountrySelector.classList.remove('input-border')
 return true
}
function validState(){
 if(State.value ==""){
     valState.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Enter Country`;
     State.classList.add('input-border')
     return false;
 }
 valState.innerHTML = ""
 State.classList.remove('input-border')
 return true
}
function validCity(){
 if(!City.value){
     valCity.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Enter address`; 
     City.classList.add('input-border')
     return false;
 }
 valCity.innerHTML = ""
 City.classList.remove('input-border')
 return true
}


function empEdit(){
 succesIcon.innerHTML = `<i class="fa-solid fa-user-pen"></i>`;
 succesText.textContent = "Employee edited Successfully"
 succesAlert.classList.add('show')
 succesAlert.classList.add('edited')
 setTimeout (()=> {
 succesAlert.classList.remove('show')},1800)
}

function empDelete(){
 succesIcon.innerHTML = `<i class="fa-solid fa-trash"></i>`;
 succesText.textContent = "Employee Deleted Successfully"

 succesAlert.classList.add('show') 
 succesAlert.classList.add('deleted')
 
 setTimeout (()=> {
 succesAlert.classList.remove('show')},1800)
}
function formvalidation(){
    let isValid = true
    // if(!(!valSalutations() && !validFName() && (!validNum()) && (!validLName()) && (!validUName()) && (!validPassword()) && (!validEmail())
    //  && (!validDOB()) && (!validGender()) && (!validQualification()) && (!validAddress())&& (!validCountry()) && (!validState()) && (!validCity()))){
    //     return false
    // }
    if (!valSalutations()) { isValid = false  }
    if (!validFName()) { isValid = false   }
    if (!validNum()) { isValid = false   }
    if (!validLName()) { isValid = false   }
    if (!validUName()) { isValid = false   }
    if (!validPassword()) { isValid = false   }
    if (!validEmail()) { isValid = false   }
    if (!validDOB()) { isValid = false   }
    if (!validGender()) { isValid = false   }
    if (!validQualification()) { isValid = false   }
    if (!validState()) { isValid = false   }
    if (!validCountry()) { isValid = false   }
    if (!validCity()) { isValid = false   }
    if (!validAddress()) { isValid = false   }


    return isValid;
}

function uploadImg(id){
    var userImg = new FormData();


     userImg.append("avatar" , profileImg)

     try {
        const res = fetch('http://localhost:5010/api/employees/'
         + id + '/avatar', {
            method : 'POST',
            body : userImg
         })
         console.log(res);
     }
     catch(error){
        console.error(error);
     }
}