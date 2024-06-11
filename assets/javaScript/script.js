
var Employees  = [];
let start 
let endNum 
var numOfPage
var endvalue 
var A
var Numbe 
let totalEmploye

async function fetchData(currentPage) {
    let query = searchEmployee.value;
    const url = `http://localhost:5010/employees?page=${currentPage}&limit=${employeeList.value}&search=${query}`
    
    try {
        const response = await fetch(url)
        if (!response.ok) {
            // const variable = await response.json()
            console.log("variable",response);
            if (response.redirect) {
                setTimeout(() => {
                    window.location.href = variable.redirect;
                }, 1000);
            }
           throw new Error("failed to fetch data")     
        }
        const data = await response.json()
        start = currentPage*employeeList.value
        Employees = data.data
        displayData(Employees ,start)
        numOfPage = data.totalPages
        totalEmploye = data.totalCount
        makebtn(data.totalPages)
        paginationFun(currentPage)
    } catch (error) {
        console.log(error);
    }
    
}

var employeeList = document.getElementById("employeeList");

employeeList.addEventListener('change', function(){
if(totalEmploye<employeeList.value){
    fetchData(0)
}
    fetchData(currentPage)
    

})

function displayData(data ,start){
    let tmpdata =""; 
    let tbody = document.getElementsByTagName("tbody")[0] ;
     for(let i = 0 ; i < data.length ; i++) {
        tmpdata+=`<tr class="table-details" id="tableDetails">`
        tmpdata+= `<td scope="row">#${serialNo(start+1)}</td>`
        tmpdata+= `<td><img src= "/uploads/${data[i].avatar}"/>
        
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
function btnPop(btn) {
    btn.classList.toggle("active");
    overlaydives.style.display= "block";
    overlaydives.addEventListener("click", function(){
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
const CountrySelector = document.getElementById("country");
const State = document.getElementById("state");
const City = document.getElementById("city");
const userDetails = document.getElementById("userDetails");
var pageBtns = document.getElementById("pageBtns");
var totalLength = document.getElementById("totalLength");
const pin = document.getElementById("pinZip")

var searchEmployee = document.getElementById("searchItem");


const  valPassword = document.getElementById("valPassword"),
    valEmail = document.getElementById("valEmail"),
    valNum = document.getElementById("valNum"),
    valBirth = document.getElementById("valBirth"),
    valGender = document.getElementById("valGender")

var succesAlert = document.getElementById("succes-alert"), 
    succesIcon = document.getElementById("succes-icon"),
    succesText = document.getElementById("succes-text")

const formControl = document.querySelectorAll(".form-control"),
    formSelect = document.querySelectorAll(".form-select"),
    formSpan = document.querySelectorAll(".valid")




var profileImg ="";



document.getElementById("logoutBtn").addEventListener("click" ,async  () => {
    try {
        const response = await fetch('/api/employees/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Include cookies in the request
        });

        if (response.ok) {
            // Redirect to the login page or another page
            window.location.href = '/admin/login';
        } else {
            const errorData = await response.json();
            console.error('Logout failed:', errorData);
            alert('Logout failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
})


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
        pin: pin.value
    }


    return newUser
 
}
function gender(){
    RadioBtn.value;
    if(RadioBtn.checked){ var Gender = "Male" }
    else{ Gender = "Female"}
    return Gender
}

function dOfB(date) {
   date = date.split("-").reverse().join("-");
   return date;
}
let newData = [];
function addemploye() {
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
    .then((data)=> {
         uploadImg(data._id)
         newData.id = data.id
    }
)
    }catch(error) {
    console.log(error)
    }
    Employees.unshift(newData)
    empAdded();
    formHide();
    setTimeout(() => {
        // window.location.reload();
        // makebtn(employeeList.value, allEmployee)

        firstPage()
        // lastPage();
    }, 2000);  
    }
}
function formvalidation(){
    let isValid = true

    if (!validation("salutation"))  isValid = false 
    if (!validation("firstName"))  isValid = false      
    if (!validation("secondName"))  isValid = false   
    if (!validation("userName"))  isValid = false   

    if (!validNum())       isValid = false   
    if (!validPassword())  isValid = false   
    if (!validEmail())     isValid = false   
    if (!validDOB())       isValid = false   
    if (!validGender())    isValid = false   

    if (!validation("qualification"))  isValid = false   
    if (!validation("address"))  isValid = false   
    if (!validation("country"))  isValid = false   
    if (!validation("state"))  isValid = false   
    if (!validation("city"))  isValid = false   
    if (!validation("pinZip"))  isValid = false   



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
            imgSrc.src = `/uploads/${thisEmployeeId.avatar}`
          
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

        Employees[findIndexById(Employees, thisEmployeeId)] = addingUser();
        // paginationFun(currentPage)
        // displayData(Employees, start)
        fetchData(currentPage)
        formHide();
        empEdit() 

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
    FirstName.value=""
    SecondName.value=""
    UserName.value=""

    Password.value=""
    Email.value=""
    MobNum.value=""
    DOB.value=""

    Qualification.value=""
    Address.value=""
    State.value=""
    City.value=""
    RadioBtn.checked=false
    RadioBtn2.checked=false

    formControl.forEach(element => { if (element.classList.contains('input-border')) {
                                element.classList.remove('input-border')} }) 

    formSelect.forEach(element=> { element.classList.remove('input-border')})

    formSpan.forEach(element => { element.textContent = ""})

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
                    Employees.splice(findIndexById(Employees, deleteId), 1)
                    empDelete();
                    formHide();
                    fetchData(currentPage)
                    // paginationFun(0, allEmployee)
                }
            }) 
                    
       
    })
 }

 let searchedArray = [];

     
    
    //  displayData(searchedArray, start); 
let currentPage ;


  function makebtn(numOfPage) {
     
        totalLength.textContent = totalEmploye;
        var paginationID = document.getElementById("paginationId");
        let pagenum = [];
        var i
        for( i = 0 ; i<numOfPage ; i++){
          pagenum += ` <button class="sml-btn pageBtn" id="pageBtns" onclick = numClick(${i})> ${i+1} </button>`
        }
        paginationID.innerHTML = pagenum;
        i =0;
  }


function numClick(pnum){
    currentPage = pnum;
    fetchData(currentPage)

}

function paginationFun(currentPage) {  

        var pageBtnss = document.querySelectorAll('.pageBtn');
        pageBtnss.forEach(btn => {
        btn.classList?.remove('btnColor');
        });
       
        pageBtnss[currentPage]?.classList.add("btnColor")

    
}

function firstPage(){
    currentPage = 0;
    fetchData(currentPage);

}

function lastPage(){
    currentPage = numOfPage-1
    fetchData(currentPage)
}
function nextPage(){
       currentPage < numOfPage-1 ? currentPage+=1 : currentPage
       fetchData(currentPage)
}

function previousePage(){
    currentPage > 0 ? currentPage-=1 : currentPage
    fetchData(currentPage)
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
}

function uploadImg(id){ 
    var userImg = new FormData();


     userImg.append("avatar" , profileImg)

     try {
        const res = fetch('http://localhost:5010/api/employees/'+id+'/avatar', {
            method : 'POST',
            body : userImg
         })
     } 
     catch(error){
        console.error(error); 
     }
}

function validation(key){
   let input = document.getElementById(key);
   let inputError = document.getElementById(key+"Error");

    let  keyvalue = firstUpperCase(key);

   if (input.value ==""){
    inputError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>${keyvalue} is required`;
    input.classList.add('input-border')
    return false;
   }
   else{
    inputError.innerHTML = ""
    input.classList.remove('input-border')
    return true
   }

} 
function firstUpperCase(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const numberRegex = /\d+/;
const alphabetRegex = /[a-zA-Z]+/;

function validPassword(){
    if(!Password.value){
        valPassword.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Password is mandatory`;
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

currentPage = 0;
fetchData(currentPage);
