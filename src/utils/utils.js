export function padStart(data) {
    return data < 10 ? `0${data}` : data;
}
export function dateTime(timestamp) {
    return formatDate(timestamp);
}
export function date(timestamp) {
    return formatDate(timestamp, "Year");
}
export function dateTimeNoHours(timestamp) {
    return formatDate(timestamp, "Hours");
}
export function formatDate(timestamp, type) {
    let T = timestamp;
    if (!T) return "";
    let time = new Date(T);
    let Year = time.getFullYear();
    let Months = padStart(time.getMonth() + 1);
    let Day = padStart(time.getDate());
    let Hours = padStart(time.getHours());
    let Minutes = padStart(time.getMinutes());
    let Seconds = padStart(time.getSeconds());
    // 年月日
    if (type == "Year") return `${Year}-${Months}-${Day}`;
    // 时分秒
    if (type == "Hours") return `${Hours}:${Minutes}:${Seconds}`;
    // 2020-01-20 16:15:00
    return `${Year}-${Months}-${Day}  ${Hours}:${Minutes}:${Seconds}`;
}
export const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
/** 价格格式化 */
export const formatPrice = price => {
    return price ? Number(price).toFixed(2) : "0.00"
}
/** 号码中间隐藏 */
export const formatPhone = phone => {
    if (!phone) return "--";
    return String(phone).replace(/(^\d{3})(\d{4})(\d{4}$)/, "$1****$2");
}
/** 延时 */
export const delay = (timespan = 0) => {
    return new Promise(resolve => setTimeout(resolve, timespan));
}
/** 正则 */
export const regex = {
    /** 钱 */
    price: /(?!^0*(\.0{1,2})?$)^\d{1,13}(\.\d{1,2})?$/,
    /** 字母 */
    english: /[a-zA-Z]/g,
    /** 中文 */
    chinese: /[\u4E00-\u9FA5\uF900-\uFA2D]/g,
    /** 用户名 */
    name: /^[a-z\u4e00-\u9fa5]+S*$/i,
    /** 密码验证 */
    pwd: /^[0-9a-zA-Z]+$/,
    /** 支付宝正则 */
    alipay: /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/,
    /** 邮箱验证 */
    email: /^([\u4e00-\u9fa5aA-Za-z0-9]+[_|/_|/.\-&]*)+@([\u4e00-\u9fa5aa-zA-Z0-9]+[_|/_|/./-]?)*[\u4e00-\u9fa5aa-zA-Z0-9]+\.[\u4e00-\u9fa5aa-zA-Z]{2,3}$/,
    /** 匹配不是数字 */
    noNumber: /[^0-9]/g,
    /** 匹配电话号码 */
    phoneNum: /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57]|19[89]|166)[0-9]{8}$/,
    /** 匹配邮政编码 */
    zipCode: /^[1-9][0-9]{5}$/,
    /** 数字验证 */
    number: /^-?[0-9]*\.?[0-9]+$/,
    /** 搜索关键词 */
    searchKey: /^[\u4e00-\u9fa5A-Za-z0-9]/,
    /** 身份证 */
    id: /^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X))?$/,
    /** 链接，这里用简单的正则校验即可，复杂的正则不仅不容易包含边界情况，而且容易影响性能，也不好维护，收益不高 */
    link: /^https?:\/\//
};
/** 微信气泡弹框 */
export const showToast = title => {
    uni.showToast({
        icon: "none",
        title: title,
        duration: 2000
    });
}

/** 字符串参数拼接 */
export const stringifyQuery = parmas => {
    let parmasStr = []
    if (!parmas) return ""
    for (let i in parmas) {
        parmasStr.push(`${i}=${parmas[i]}`)
    }
    return parmasStr.join("&")
}

/**
 * 
 * @param {*页面路径} path 
 * @param {*跳转携带参数} parmas 
 * @param {*跳转方法  默认->navigateTo} goFunStr 
 * redirectTo、navigateBack、reLaunch、switchTab、navigateTo
 */
export const goPage = (path, goFunStr = "navigateTo", parmas) => {
    let cont;
    if (goFunStr == "navigateBack") {
        cont = { delta: 1 }
    } else {
        cont = { url: path + "?" + stringifyQuery(parmas) }
    }
    uni[goFunStr](cont)
}