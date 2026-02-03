const userUI = document.getElementById('User-Container');
let data;

async function fetchData(){
  const res = await fetch('https://api.github.com/users');
  data = await res.json();
  createUser(data);
}
fetchData();

function createUser(data){
  console.log(data);
  data.forEach(e => (
    userUI.innerHTML +=
    `
      <article id="user-list">
        <section>
          <img alt="User Profile" src=${e.avatar_url}/> 
        </section>
        <section>
          <h2>${e.login}</h2>
          <p>Profile URL: <a href=${e.html_url} target="_blank">Link</a></p>
        </section>
      </article>
    `
  ));
}