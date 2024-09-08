import request from '@/utils/request'

// Login
export function userLogin(username,password) {
    return request({
        url: '/login',
        method: 'post',
        headers: {
            isToken: false
          },
        data: {'userName':username,'password':password}
    })
} 

// Register
export function userRegister(data) {
    return request({
        url: '/user/register',
        method: 'post',
        headers: {
            isToken :false
        },
        data: data
    })
}

// Logout
export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

// Getting user information
export function getUserInfo() {
    return request ({
        url: '/user/userInfo',
        method: 'get'
    })
}

// Updating user information
export function saveUserInfo(userinfo) {
    return request({
        url: '/user/userInfo',
        method: 'put',
        data: userinfo
    })
}

// Sending user info to check for forgetting password
export function forgotPassword(userInfo) {
    return request({
        url: '/user/password/forgot',
        method: 'post',
        data: userInfo
    })
}

// Verifying the code sent to the email is correct or not
export function verifyCode(verificationCode) {
    return request({
        url: '/user/verifyCode',
        method: 'get',
        params: { verificationCode: verificationCode }
    })
}

// Sending the new set password request to backend
export function resetPassword(resetInfo) {
    return request({
        url: '/user/password/reset',
        method: 'post',
        data: resetInfo
    })
}