const userUI = document.getElementById('User-Container');
let data;

async function fetchData(){
  const res = await fetch('https://santhosh1203122.github.io/users_data/users.json');
  data = await res.json();
  localStorage.setItem('users', JSON.stringify(data));
  //createUser(data);
}
//fetchData();
data = JSON.parse(localStorage.getItem('users'));
createUser(data);

function searchUser(d){
  setTimeout(() => {
    const search = data.filter((e) => (e.login.toLowerCase().includes(d)));
    userUI.innerHTML = '';
    createUser(search);
  }, 500);
}

function createUser(data){
  console.log(data);
  data.map(e => (
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