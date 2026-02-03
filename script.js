const userUI = document.getElementById('User-Container');
let data;
const searchInput = document.getElementById('inputSearch');
searchInput.value = localStorage.getItem('search');

async function fetchData(){
  const res = await fetch('https://santhosh1203122.github.io/users_data/users.json');
  data = await res.json();
  localStorage.setItem('users', JSON.stringify(data));
}
data = JSON.parse(localStorage.getItem('users'));
const firstTwenty = data.slice(0, 20);
createUser(firstTwenty);

function searchUser(d){
  localStorage.setItem('search', d);
  setTimeout(() => {
    if(d.length === 0){
      userUI.innerHTML = '';
      createUser(firstTwenty);
      return;
    }
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
      <article class="user-Box">
        <section>
          <img alt="User Profile" src=${e.avatar_url}/> 
        </section>
        <section>
          <h2>${e.login}</h2>
          <p><a href=${e.html_url} target="_blank">Link</a></p>
        </section>
      </article>
    `
  ));
}