let contRes = document.getElementById('contRes')
let res = document.getElementById('res')

const api_url_users = 'https://dmockapi.herokuapp.com/users'
const api_url_posts = 'https://dmockapi.herokuapp.com/posts'

async function getUsers() {
  const response = await fetch(api_url_users);
  const users = await response.json();
  return users;
}

async function getPosts() {
  const response = await fetch(api_url_posts);
  const posts = await response.json();
  return posts;
}

async function search() {
  let email = document.getElementById('searchemail')
  const fieldEmailValue = email.value //atribui o valor do campo caixa de e-mail para constante.
  if (fieldEmailValue.length == 0) {
    alert('Insert a adress e-mail.')
  } else {
    // const users = getUser().then(users => {
    //   const user = users.find(user => user.email === fieldEmailValue)
    // console.log(user)
    // })
    // console.log('nome') exemplo de then
    const users = await getUsers()     //await faz com q o código esperar
    const user = users.find(user => user.email === fieldEmailValue)
    //console.log(user)
    if (user) {
      const posts = await getPosts()
      const postList = posts.filter(post => post.userId === user.id)
      console.log(postList)
      postList.forEach((post,index) => {
        console.log(index)

        email.value = ''
        email.focus()
        
        res.innerHTML = `<p>These are the <strong>${user.name}</strong>'s posts.</p> `
        contRes.innerHTML += `<h3><strong>${post.title}<strong/> </h3>`
        contRes.innerHTML += ` "${post.body}." <br/>`        
        contRes.innerHTML += ` Created in ${post.createdAt.substr(0,10)}`
        contRes.innerHTML += `   with: <strong>${post.like}</strong> likes.`
        
        
        
      });

    } else {
      alert('User not found.')
    }



  }
}