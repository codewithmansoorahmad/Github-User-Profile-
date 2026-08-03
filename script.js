const searchBtn=document.querySelector("#search-btn")
const searchInput=document.querySelector("#search")
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
   const response=await fetch(url)
   if(!response.ok){
    throw new Error("wrong baba")


   }
const data=await response.json()
console.log(data) 
} catch (error) {
    console.log("wrong")
    console.log(error.message)
    
}



    
}