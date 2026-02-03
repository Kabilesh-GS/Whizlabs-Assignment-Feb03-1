const userUI = document.getElementById('User-Container');
const searchInput = document.getElementById('inputSearch');
let rootData;
searchInput.value = localStorage.getItem('search');

async function fetchData(){
  try{
      const res = await fetch('https://santhosh1203122.github.io/users_data/users.json');
      rootData = await res.json();
      let firstSet = rootData.slice(0, 20);
      createUser(firstSet);
  }
  catch(err){
      console.log('Error fetching data:', err);
  }
}
fetchData()
  .then(()=>{
    console.log(rootData);
    
    function searchUser(d){
      localStorage.setItem('search', d);
      const filteredData = rootData.filter((e) => (e.login.toLowerCase().includes(d)));
      userUI.innerHTML = '';
      createUser(filteredData);
    }

    function debounce(func, delay){
      let timeoutId;
      return function(...args){
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
        }, delay);
      }
    }

    searchInput.addEventListener('input', debounce((e) => searchUser(e.target.value), 500));
  }
);

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