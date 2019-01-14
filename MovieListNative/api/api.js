import key from './key'

export function searchMovies(param){
    const moviesUrl = `http://www.omdbapi.com/?s=${param}&type=movie&apikey=${key}`

    return fetch(moviesUrl)
        .then(response => response.json())
        .then(movies => movies.Search.map(movie => ({
            movie
        })))
        .catch(error => console.log('problem with fetch', error))
}

export function getMovieDetail(id){
    const movieDetailUrl = `http://www.omdbapi.com/?i=${id}&plot=full&apikey=${key}`

    return fetch(movieDetailUrl)
        .then(response => response.json())
        .then(movies => movies)
        .catch(error => console.log('problem with fetch', error))
    

}

export function login(email){
    const logInUrl = `http://localhost:3000/users?email=${email}`

    return fetch(logInUrl)
        .then(response => response.json())
        .then(user => user)
        .catch(error => console.log('user validation issues', error))

}

export function createUser(userData){
    const signUpUrl = `http://localhost:3000/users`

    return fetch(signUpUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password
        })

    })
        .then(response => response.json())
        .then(user => user)
        .catch(error => console.log('user validation issues', error))

}