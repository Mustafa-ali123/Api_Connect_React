import axios from 'axios'

let apiHandling = axios.create({
        baseURL: 'http://localhost:5000/api'
    })

const Get = (endPoint) => {
    return apiHandling.get(endPoint)
}
const GetByPage = (endPoint,page) => {
    return apiHandling.get(`${endPoint}?page=${page}`)
}
const GetById = (endPoint, id) => {
    return apiHandling.get(`${endPoint}/${id}`)
}
let Put = (endPoint, id, body) => {
    return apiHandling.put(`${endPoint}/${id}`, body);    
  };
const Post = (endPoint, body) => {
    return apiHandling.post(`${endPoint}`, body)
}

const Delete = (endPoint, id) => {
    return apiHandling.delete(`${endPoint}/${id}`)
}

export { Get,GetByPage, Put, Post, GetById, Delete }
