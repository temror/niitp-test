export const getApi = async url =>{
    const res = await fetch(`https://jsonplaceholder.typicode.com/${url}`)
    return await res.json()
}