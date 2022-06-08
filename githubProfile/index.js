const formEl = document.getElementById("form");
const contentEl = document.getElementById("content");
const url = "https://api.github.com/users/";
// const getUser = (name) => {
//   if (!name) return;
//   axios
//     .get(url + name)
//     .then(function (response) {
//       // handle success
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     });
// };
// getUser("safarrr");
const addCard = (user) => {
  console.log(user);
  const cardHtml = `<div class="card">
<div class="wrapper-card">
  <div class="social">
    <a class="link ${
      user.twitter ? "" : "hidden"
    }" target="_blank" rel="noopener noreferrer" href="${
    "https://twitter.com/" + user.twitter
  }"
      ><i class="bi bi-twitter"></i> <span>@${user.twitter}</span></a
    >
    <a class="link ${user.email ? "" : "hidden"}" href=""
      ><i
        class="bi bi-envelope-fill"
      ></i
      ><span>${user.email}</span></a
    >
  </div>
  <div class="card-body">
    <img
      src="${user.avatar}"
      alt="avatar"
    />
    <div class="title">
      <h1>Name</h1>
      <h4 class="${
        user.location ? "" : "hidden"
      }" ><i class="bi bi-geo-alt-fill"></i>${user.location}</h4>
      <p class="${user.bio ? "" : "hidden"}" >${user.bio}
      </p>
    </div>
  </div>
  <div class="repos">
  </div>
</div>
</div>`;
  contentEl.innerHTML = cardHtml;
};
const getRepo = async (name) => {
  const repoEl = document.querySelector(".repos");
  const resp = await fetch(url + name + "/repos");
  const respData = await resp.json();
  respData.forEach((e) => {
    repoEl.innerHTML += `<a href="${e.html_url}" target="_blank" rel="noopener noreferrer">${e.name}</a>`;
  });
};
const getUser = async (name) => {
  if (!name) return;
  const resp = await fetch(url + name);
  const respData = await resp.json();
  addCard({
    name: respData.name,
    location: respData.location,
    bio: respData.bio,
    avatar: respData.avatar_url,
    twitter: respData.twitter_username,
    email: respData.email,
  });
  if (respData.public_repos > 0) {
    getRepo(name);
  }
};
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = getUser(e.target.user.value);
});
getUser('safarrr')