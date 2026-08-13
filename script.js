const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search");
const profile = document.querySelector("#profile");
const repository = document.querySelector("#repos");
const loading = document.querySelector(".loading");
const errorEle = document.querySelector(".error");

searchBtn.addEventListener("click", function () {
  profile.innerHTML = "";
  repository.innerHTML = "";
  if (searchInput.value.trim() == "") {
    alert("please enter user name");
    return;
  }
  getUser();
});

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

async function getUser() {
  const name = searchInput.value;
  const url = `https://api.github.com/users/${name}`;
  try {
    loading.style.display = "block";
    errorEle.textContent = "";
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found");
      }

      if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Try again later.");
      }
      throw new Error("User not found with this name");
    }
    const data = await response.json();


    getUserProfile(data);
    if (data.repos_url) {
     await getRepos(data);
    }
  } catch (error) {
    errorEle.textContent = error.message;
  } finally {
    loading.style.display = "none";
  }
}

function getUserProfile(data) {
  profile.innerHTML = `
<div class="img-profile">
<img class="user-img" src=${data.avatar_url} >
<div class="profile-details">
<p>${data.name || ""}</p>
<div class="view-profile">

<a href=${data.html_url}>view profile
<i class="fa-solid fa-arrow-up-right-from-square icon"></i>
</a>
</div>

<p>${data.login || ""}</p>
<p>${data.company || "NO company "}</p>
<p>${data.bio || "No Bio Added "}</p>
<p><i class="fa-solid fa-location-dot"></i> ${data.location || "N/A"}</p>
<p>joined: ${new Date(data.created_at).toLocaleDateString() || "N/A"}</p>
</div>
</div>

<div class="profile-repo-card">
<div class="profile-repository">
<p><i class="fa-solid fa-user-group icon"></i> ${data.public_repos || "N/A"}</p>
<P>Repositories</p>

</div>
<div class="profile-followers">
<p><i class="fa-solid fa-user-group icon"></i> ${data.followers || "N/A"}</p>
<P>followers</p>
</div>

<div class="profile-following">
<p><i class="fa-solid fa-user-group icon"></i> ${data.following || "N/A"}</p>
<P>following</p>
</div>
<div class="profile-gists">
<p><i class="fa-regular fa-star icon-star"></i> ${data.public_gists || "N/A"}</p>
<P>Gists</p>
</div>
</div>

`;
}

const getRepos = async (data) => {
  let repos = await fetch(data.repos_url);
  if(!repos.ok){
    throw new Error("Could not load repositories ")
  }
  repos = await repos.json();
  repos.forEach((item) => {
    repository.innerHTML += `
     <div class='repo-card'>

     <p>${item.full_name || ""}</p>
     <p>${item.description || "No Description"}</p>
     <p>${item.language || ""}</p>
     <p>${item.private ? "private" : "public"}</p>
     <P>${
       item.created_at
         ? `created at: ${new Date(item.created_at).toLocaleDateString()}`
         : ""
     }</p>
     <P>${
       item.updated_at
         ? `last updated at: ${new Date(item.updated_at).toLocaleDateString()}`
         : ""
     }</p>
<a href=${item.html_url}>view repository</a>
</div>

     `;
  });
};
