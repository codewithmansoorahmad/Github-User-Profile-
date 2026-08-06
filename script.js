const searchBtn=document.querySelector("#search-btn")
const searchInput=document.querySelector("#search")
const profile=document.querySelector("#profile")
const loading=document.querySelector(".loading")
const errorEle=document.querySelector(".error")
let isBool=false;
searchBtn.addEventListener("click",function(){
    if(searchInput.value==""){
        alert("please give a user name to search")
        return
    }
    getUser()

})



async function getUser() {
    const name=searchInput.value
const url=`https://api.github.com/users/${name}`
try {
    if(!isBool){
        loading.style.display="block"
    }
    errorEle.textContent=""
   const response=await fetch(url)
const data=await response.json()
isBool=true

if(isBool){
        loading.style.display="none"
        isBool=false
}
if(!response.ok){
    throw new Error("User not found with this name")
}
console.log(data) 

profile.innerHTML=`
<img class="profile-img" src=${data.avatar_url} >

`
} catch (error) {
   errorEle.textContent=error.message
}



    
}
const getProfile=(data)=>{
    

}