import http from "./axios"


const fetchTags = () => http.get("/tags")

const fetchUserTags = () => http.get("/tags/user/")


export {
    fetchTags,
    fetchUserTags
}
