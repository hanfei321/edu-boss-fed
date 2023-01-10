import request from "@/utils/request";
import qs from 'qs'
import Login from "@/store/Login";
interface UserLogin {
  phone: string,
  password: string

}
export function loginRequest(account: UserLogin) {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(account)
  })

}
export function getInfoRequest() {
  return request({
    method: 'GET',
    url: '/front/user/getInfo',
    // headers: {
    //   Authorization: Login.state.userLoginData.access_token
    // }
  })
}