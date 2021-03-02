import config from "@/config.js"
import { stringifyQuery, showToast, goPage } from "@/utils/utils.js"
import store from "@/store/index"

export default class Http {
    static post(path,hasToken = true) {
        let postApi = data => Http.httpRequst({
            url: Http.pathStringify(path),
            data: data,
            method: "POST"
        },hasToken).then(res => checkResult(res))
        return postApi
    }
    static get(path,hasToken = true) {
        let getApi = data => Http.httpRequst({
            url: Http.pathStringify(path + "?" + stringifyQuery(data)),
            method: "GET"
        },hasToken).then(res => checkResult(res))
        return getApi
    }

    static httpRequst(options,hasToken) {
        let resolve, reject;
        let requstPromise = new Promise((res, rej) => {
            resolve = res
            reject = rej
        })

        let reqSuccess = (res) => {
            console.log(res)
			if (res.data.code == 401) {
			    showToast("登录失效，请重新登录")
			    store.commit("updeteLoginState", false)
			    goPage("/pages/login/login", "redirectTo")
				return;
			}
			
            resolve(res)
        }

        let reqFail = (err) => {
            let msg = err.errMsg;

            if (err.code == 401) {
                showToast("登录失效，请重新登录")
                store.commit("updeteLoginState", false)
                goPage("/pages/login/login", "redirectTo")
            }
            if (msg && msg.includes("max connected")) {
                option._retryCount = (option._retryCount || 0) + 1;
                option._retryCount > 4 ?
                    reject(err) :
                    setTimeout(_ => wx.request(option), 300);
                return;
            }

            if (msg && msg.includes("request:fail")) {
                let e = new Error("请求失败, 请检查网络")
                e.innerError = err;
                showToast("请求失败, 请检查网络")
                err = e;
            }

            if (msg && msg.includes("fail to connect")) {
                let e = new Error("连接失败, 稍后再试")
                e.innerError = err;
                err = e;
            }
            reject(err)
        }

        let reqComplete = (info) => {
            logRequestResult(options, info);
        }

        options.success = reqSuccess
        options.fail = reqFail
        options.complete = reqComplete

        let defaultHeader = {
            'content-type': 'application/json',
			'token': ''
        }
		
		if(hasToken){
			defaultHeader.token = store.getters.getToken
		} else {
			
		}
		// console.log(store.getters.getToken)
		// console.log(defaultHeader)

        options.header = {...defaultHeader, ...options.header }
        uni.request(options)

        return requstPromise;
    }

    static pathStringify(path) {
        if (path.startsWith("http://") || path.startsWith("https://")) return path
        return config.apiHost + '/api' + path
    }

}

function checkResult(result) {
    if (!result.data) throw (result)
    let message = result.data.message || ""
    let code = result.data.code
    if (code == 200) return result.data
    showToast(message)
    let err = Object.create(new Error(message))
    err.type = "apiResponseStatusError";
    throw err;
}

function logRequestResult(option, result) {
    let splitArr = option.url.split("?")
    let apiUrl = splitArr[0].split("/api")[1]
    let datas = splitArr[splitArr.length - 1]
    console.log("apiUrl=>", apiUrl, "| datas=>", datas)
}