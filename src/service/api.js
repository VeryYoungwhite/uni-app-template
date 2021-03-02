import http from "./http"
const post = http.post
const get = http.get

export const loginApi = {
    login: post("/user/login"),
    register: post("/user/register"),
    resetPwd: post("/user/rest_password"),
}