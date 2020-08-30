import ajax from './ajax'

// 1. 定义基础路径
// API接口
//const BASE_URL = ' https://www.easy-mock.com/mock/5f3ff29c4f4b0f4387f90cdd/api/' // 官网建立的数据库接口，非常容易崩
const BASE_URL = 'http://api.7-orange.cn:7300/mock/5def6a2d448e330a1116366e/api/' // 阿里云建立的数据库接口1

/*****Home 模块*******/
export const getHomeData = () => ajax(BASE_URL + 'homeApi');

/***** 购物车页面 猜你喜欢*********/
export const getGuessYouLike = () => ajax(BASE_URL + 'cart/youlike');

/***** 登录界面接口 *********/
// 1.获取手机验证码(GET)
// Easy Mock 模拟发送验证码 
export const getPhoneCaptcha = (phoneNumber) => ajax(BASE_URL + 'send_code', {
    phoneNumber
});

// 2.手机验证码登录(POST)
// Easy Mock 模拟用户登录
export const phoneCaptchaLogin = (phone, captcha) => ajax(BASE_URL + 'login_code', {
    phone,
    captcha
}, 'POST');

// 3.账号密码登录(POST)
export const pwdLogin = (userName, pwd, captcha) => ajax(BASE_URL + 'login_pwd', {
    userName,
    pwd,
    captcha
}, 'POST');
