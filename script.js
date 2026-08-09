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

profile.innerHTML=`
<img class="user-img" src=${data.avatar_url} >
<div class="profile-details">
<div class="view-profile">
<p>${data.name||""}</p>
<a href=${data.html_url}>view profile</a>
</div>

<p>${data.login||""}</p>
<p>${data.company||""}</p>
<p>${data.bio||""}</p>
<p><i class="fa-solid fa-location-dot"></i> ${data.location||"N/A"}</p>
<p>joined: ${new Date(data.created_at).toLocaleDateString()||"N/A"}</p>
</div>
<div class="profile-follower">
<div class="profile-repository">
<p><i class="fa-solid fa-user-group"></i> ${data.public_repos||"N/A"}|</p>
<P>Repositories</p>

</div>
<div class="profile-followers">
<p><i class="fa-solid fa-user-group"></i> ${data.followers||"N/A"}|</p>
<P>followers</p>
</div>

</div>
<div class="profile-following">
<p><i class="fa-solid fa-user-group"></i> ${data.following||"N/A"}</p>
<P>following</p>
</div>
<div class="profile-gists">
<p><i class="fa-regular fa-star"></i> ${data.public_gists||"N/A"}</p>
<P>Gists</p>
</div>
<a href=${data.html_url}>view profile</a>
</div>
`

} catch (error) {
   errorEle.textContent=error.message
}



    
}
const getProfile=(data)=>{
    

}