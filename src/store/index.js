import Vue from "vue"
import vuex, { Store } from "vuex"
import { loginApi } from "@/service/api"

Vue.use(vuex)

let instState = (() => {
    let state
    try {
        state = JSON.parse(window.localStorage.getItem("state"))
    } catch {
        state = {}
    }
    window.addEventListener("beforeunload", updateSessionStorage, false);
    return state
})()

export function updateSessionStorage() {
    window.localStorage.setItem("state", JSON.stringify(store.state));
}
let state = {
    token: "",
    uid: "",
    isLogin: false,
    /** 扭蛋机跳转IDS */
    ids: [],
    ...instState
}

let store = new Store({
    state,
    getters: {
        getToken: state => state.token
    },
    mutations: {
        setDeviceIds(stete, ids) {
            stete.ids = ids
        },
        setLoginData(state, data) {
            state.token = data.token
            state.uid = data.uid
        },
        updeteLoginState(state, data) {
            state.isLogin = data
        }
    },
    actions: {
        async login(context, pamars) {
            let data = await loginApi.login(pamars)
            context.commit("setLoginData", data)
            context.commit("updeteLoginState", true)
            updateSessionStorage(context.state)
        },
    },
    modules: {}
})
export default store