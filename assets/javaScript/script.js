// const { start } = require("repl");

// const { stringify } = require("querystring");

var allEmployee  = [];
let start 
let endNum 
var numOfPage
var endvalue 
var A
var Numbe 

// async function fetchData()  {

//     try{

//         let prince = await  fetch( "http://localhost:3000/employees") ;

//         var data = await prince.json();
//         console.log(data)
//         allEmployee = data ;
//         //  displayData(data);
       
//     }catch(error) {
//         console.log(error);
//     }

// }
// dummy-employee-api\public\default-avatar.png
// default-avatar.jpg

var employeeList = document.getElementById("employeeList");

employeeList.addEventListener('change', function(){
    endvalue = parseInt(employeeList.value);
    if (searchEmployee.value !=="" ){
         makebtn(endvalue, searchedArray);
    }
    else{
        makebtn(endvalue, allEmployee)

    }

})

function displayData(data ,start){
    let tmpdata ="";
    let tbody = document.getElementsByTagName("tbody")[0] ;
     for(let i = 0 ; i < data.length ; i++) {
        tmpdata+=`<tr class="table-details" id="tableDetails">`
        tmpdata+= `<td scope="row">#${serialNo(start+1)}</td>`
        tmpdata+= `<td>
        
         ${data[i].salutation} ${" "} ${data[i].firstName}${" "} ${data[i].lastName}</td>`
        tmpdata+= `<td>${data[i].email}</td>`
        tmpdata+= `<td>${data[i].phone}</td>`
        tmpdata+= `<td>${data[i].gender}</td>`
        tmpdata+= `<td>${data[i].dob}</td>`
        tmpdata+= `<td>${data[i].country}</td>`
        tmpdata+= `<td><button class="three-dot-btn"  onclick="btnPop(this.nextElementSibling)">...</button>
        <div class="small-popup" id="smlPopupId">
             <a href="view/?id=${data[i]._id}" target="_blank"  ><i class="fa-regular fa-eye"></i>View Details</a>
             <a href="#" onclick = editPopup("${data[i]._id}") ><i class="fa-solid fa-pen"></i>Edit</a>
             <a href="#" onclick = deletePopup("${data[i]._id}") ><i class="fa-regular fa-trash-can"></i>Delete</a>
        </div>
        </td>`
        tmpdata+= `</tr>`
        start++;
     }
    tbody.innerHTML = tmpdata ;
}

// fetchData() ;
getData();
function getData() {
    
    fetch("http://localhost:5010/api/employees")
    .then(
        (res)=>res.json()
    ).then((response)=> {
        allEmployee = response;
        // displaydata(response);
        endvalue = parseInt(employeeList.value);
        makebtn(endvalue, allEmployee);
        // console.log(tmpData);
    })
}

//    function displaydata(response){

//         var tmpData = "";
//         var k=1;
        
//         let tbody = document.getElementsByTagName("tbody")[0] ;
    
//         response.forEach((user)  =>{
            
//             tmpData+=`<tr class="table-details">`
//             tmpData+= `<td scope="row">#${serialNo(k)}</td>`
//             tmpData+= `<td><img src= "http://localhost:3000/employees/${thisEmployeeId.id}/avatar"> ${user.firstName}</td>`
//             tmpData+= `<td>${user.email}</td>`
//             tmpData+= `<td>${user.phone}</td>`
//             tmpData+= `<td>${user.gender}</td>`
//             tmpData+= `<td>${user.dob}</td>`
//             tmpData+= `<td>${user.country}</td>`
//             tmpData+= `<td><button class="three-dot-btn"  onclick="btnPop(this.nextElementSibling)">...</button>
//             <div class="small-popup" id="smlPopupId">
//                  <a href="./index2.html?id=${user.id}" target="_blank" ><i class="fa-regular fa-eye"></i>View Details</a>
//                  <a href="#" onclick = editPopup("${user.id}")><i class="fa-solid fa-pen"></i>Edit</a>
//                  <a href="#" onclick = deletePopup("${user.id}")><i class="fa-regular fa-trash-can"></i>Delete</a>
//             </div>
//             </td>`
//             tmpData+= `</tr> `
//             k++;
        
            
//         })
        
//         tbody.innerHTML = tmpData ;
//         console.log(response);
// }

function btnPop(btn) {
    btn.classList.toggle("active");
    overlaydives.style.display= "block";
    overlaydives.addEventListener("click", function(){
        console.log("hiii")
        btn.classList.remove("active");
        overlaydives.style.display = 'none';
    })
}

let empFormId = document.getElementById("empFormId");
let overlayId = document.getElementById("overlayId");
let deleteEmpId = document.getElementById("deleteEmpId");
let alertPopupId = document.getElementById("alertPopupId");
let inputImg = document.getElementById("inputImg");
let editedPopup = document.getElementById("editedPopup");
let addEmployBtn = document.getElementById("addEmployBtn");
let addEmployBtns = document.getElementById("addEmployBtns");
let formFile = document.getElementById("formFile");
let editImage = document.getElementById("editImage");
let imgSrc = document.getElementById("imgSrc");
var overlaydives = document.getElementById("overlaydives");

let tableDetails = document.getElementById("tableDetails");
let thisEmployeeId

function serialNo(num){
    if (num<=9){
        return "0"+num;
    }
    else 
    return num;
 }

function formIdPopup(){
    inputImg.style.display = "block";    
    empFormId.style.display = "block";
    overlayId.style.display = "block";
    addEmployBtns.style.display = "none";
    addEmployBtn.style.display = "block";
    popupHeading.textContent = "Add Employee";
    editedPopup.style.display = "none"
    // addEmployBtn.textContent = "Add Employee";
}

function formHide() {
    empFormId.style.display = "none";
    overlayId.style.display = "none";
    alertPopupId.style.display = "none";
    refresh();
}

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
var pageBtns = document.getElementById("pageBtns");
var totalLength = document.getElementById("totalLength");
const pin = document.getElementById("pinZip")

var searchEmployee = document.getElementById("searchItem");

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

var succesAlert = document.getElementById("succes-alert"),
    succesIcon = document.getElementById("succes-icon"),
    succesText = document.getElementById("succes-text")

const formControl = document.querySelectorAll(".form-control"),
    formSelect = document.querySelectorAll(".form-select")




var profileImg ="";




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
        city :City.value,
        pin: pin.value,
        image :profileImg
    }

    console.log(newUser);

    return newUser
 
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
let newData = [];
function addemploye() {
   console.log(formvalidation())
 if (formvalidation()==true){
    
    try{
        newData = addingUser()
    fetch('http://localhost:5010/api/employees/',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
               },
        body:JSON.stringify(newData),             
    })
    .then((data)=>{
        return data.json();
    })
    // .then((data)=> {
    //      uploadImg(data.id)
    //      newData.id = data.id
    // }
// )
    }catch(error) {
    console.log(error)
    }
    allEmployee.push(newData)
    empAdded();
    formHide();
    setTimeout(() => {
        // window.location.reload();
        makebtn(employeeList.value, allEmployee)
        
        lastPage();
    }, 2000);  
    }
}
function formvalidation(){
    let isValid = true
    // if(!(!valSalutations() && !validFName() && (!validNum()) && (!validLName()) && (!validUName()) && (!validPassword()) && (!validEmail())
    //  && (!validDOB()) && (!validGender()) && (!validQualification()) && (!validAddress())&& (!validCountry()) && (!validState()) && (!validCity()))){
    //     return false
    // }
    if (!valSalutations()) { isValid = false }
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

function editPopup(editId) {
      formIdPopup();
      inputImg.style.display = "none";
      editedPopup.style.display = "flex";
      popupHeading.textContent = "Edit Employee";
      addEmployBtn.style.display = "none";
      addEmployBtns.style.display = "block";
      thisEmployeeId = editId;
      


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
            pin.value = thisEmployeeId.pin
            // imgSrc.src = `http://localhost:5010/employees/${thisEmployeeId.id}/avatar`
          
            thisEmployeeId.gender==="Male"?document.getElementById("flexRadioDefault1").checked=true :document.getElementById("flexRadioDefault2").checked=true
        })
    
    addEmployBtns.addEventListener("click",update)

    function update() {
        if(formvalidation()==true){
        uploadImg(thisEmployeeId); 
        
        fetch("http://localhost:5010/api/employees/"+thisEmployeeId,{
            method:"PUT",
        headers:{
            "Content-Type":"application/json"
               },
        body:JSON.stringify(addingUser()),
        
        
        })

        allEmployee[findIndexById(allEmployee, thisEmployeeId)] = addingUser();
        paginationFun(0, allEmployee)
        formHide();
        empEdit() 
        // setTimeout(() => {
            // window.location.reload();
            
            // lastPage();
        // }, 2000);  
        // location.reload() 
    }
    }
}
function findIndexById(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return i; // Return the index if the id matches
        }
    }     // Return -1 if the id is not found in the array
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

function deletePopup(deleteId) {
    alertPopupId.style.display = "flex";
    overlayId.style.display = "block";
 
    deleteEmpId.addEventListener("click",function(){
            
        fetch("http://localhost:5010/api/employees/"+deleteId ,{
                method:"DELETE",
            })
            // .then((res) => res.json())
            .then((res) => {
                if(res.ok) {
                    allEmployee.splice(findIndexById(allEmployee, deleteId), 1)
                    empDelete();
                    formHide();
                    paginationFun(0, allEmployee)
                }
            })
           
            // setTimeout(() => {
                // window.location.reload();
            // }, 2000);           
       
    })
 }

 let searchedArray = [];

 const searchEmp = () =>{
    // var searchEmployee , filter ;
    var filteer = searchEmployee.value.toLowerCase();
    
     start = 0;
     if(filteer!==""){
        searchedArray = []
     for(let i=0;i<allEmployee.length;i++){
        
        let firstname = allEmployee[i].firstName.toLowerCase();
        let email = allEmployee[i].email.toLowerCase();
        let lastname = allEmployee[i].lastName.toLowerCase();
        let phone = allEmployee[i].phone.toString();

        if(firstname.indexOf(filteer) > -1 || email.indexOf(filteer) > -1 || lastname.indexOf(filteer) > -1 || phone.indexOf(filteer) > -1 ){
              searchedArray.push(allEmployee[i]);
        }       
     }
     console.log(searchedArray.length)
     makebtn(employeeList.value, searchedArray)
    
    //  displayData(searchedArray, start); 
    }
    else{
        makebtn(employeeList.value , allEmployee)
    }
    
  }

  function makebtn(aNum, allEmploy) {
        totalLength.textContent = allEmploy.length;
        console.log(allEmploy.length)
        numOfPage = Math.ceil(allEmploy.length/aNum)
        console.log(numOfPage);
        var paginationID = document.getElementById("paginationId");
        let pagenum = "";
        var i
        for( i = 0 ; i<numOfPage ; i++){
          pagenum += ` <button class="sml-btn pageBtn" id="pageBtns" onclick = numClick(${i})> ${i+1} </button>`
        }
        paginationID.innerHTML = pagenum;
        i =0;
        paginationFun(i, allEmploy)
        // for (var i = 0; i < pagenum.length; i++) {
        //     pagenum[i].addEventListener('click', function() {
        //         this.style.backgroundColor = 'blue';
        //     });
        // }
  }
//   let Numbe

function numClick(pnum){
        if (searchEmployee.value !=="" ){
            paginationFun(pnum, searchedArray)  
       }
       else{
           paginationFun(pnum, allEmployee)  
       }
}

function paginationFun(numb, allEmploye) {  
        console.log(numb);
        Numbe = numb
        let numOfDatas = [];
        var k = parseInt(employeeList.value);
        const l = allEmploye.length;
        var pageBtnss = document.querySelectorAll('.pageBtn');
        pageBtnss.forEach(btn => {
        btn.classList?.remove('btnColor');
        });
       


    // Add color to the clicked button
    // butto.classList.add("btnColor");
        
        for (var A = numb*k ; A < (numb*k)+k && A < l; A++){
            numOfDatas.push(allEmploye[A])       
        }   
    displayData(numOfDatas, numb*k);
    console.log(numb)
     pageBtnss[numb].classList.add("btnColor")
}


function firstPage(){
    const N = 0;
    if (searchEmployee.value !=="" ){
        paginationFun(N, searchedArray)  
   }
   else{
       paginationFun(N, allEmployee)  
   }
}


function lastPage(){
    if (searchEmployee.value !=="" ){
        paginationFun(numOfPage-1, searchedArray)  
   }
   else{
       paginationFun(numOfPage-1, allEmployee)  

   }
    // paginationFun(numOfPage-1, endvalue)
}


function nextPage(){
       Numbe < numOfPage-1 ? Numbe+=1 : Numbe
   console.log("num" + Numbe)
    if (searchEmployee.value !=="" ){
        paginationFun(Numbe, searchedArray)  
   }
   else{
       paginationFun(Numbe, allEmployee)  
   }
    // paginationFun(Numbe, endvalue)
}

function previousePage(){
    Numbe > 0 ? Numbe-=1 : Numbe
    if (searchEmployee.value !=="" ){
        paginationFun(Numbe, searchedArray)  
   }
   else{
       paginationFun(Numbe, allEmployee)  
   }
    // paginationFun(Numbe, endvalue)
}


editImage.onchange = function(){
     profileImg = editImage.files[0];     
     if(profileImg){
        imgSrc.src = URL.createObjectURL(profileImg)
     }
}


formFile.onchange = function(){
    profileImg = formFile.files[0];
    if(profileImg !== ""){
        editedPopup.style.display = 'flex'
        inputImg.style.display = 'none'
        imgSrc.src = URL.createObjectURL(profileImg)
    }
    console.log(profileImg);   
}



function uploadImg(id){ 
    var userImg = new FormData();


     userImg.append("avatar" , profileImg)

     try {
        const res = fetch('http://localhost:5010/employees/'
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

function empAdded(){
    succesIcon.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    succesText.textContent = "Employee Added succesfully"
    succesAlert.classList.add('added')
    succesAlert.classList.add('show')
    setTimeout (()=> {
        succesAlert.classList.remove('show')},1800)

}
function empEdit(){
    succesIcon.innerHTML = `<i class="fa-solid fa-user-pen"> </i>`;
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


// var fname ="arjun";
// var f = "j";

// console.log(fname.indexOf(f));
