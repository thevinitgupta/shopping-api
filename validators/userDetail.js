const phoneRegex = /[6789]\d{9}$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userDetailValidation = (userData)=>{
    const {email,phone} = userData;
    let res = {code : 400, email : false,phone : false};
    if(emailRegex.test(email.toLowerCase())) {
        res.email = true;
    }
    if(phoneRegex.test(phone)){
        res.phone = true;
    }
    if(res.email && res.phone) res.code = 200;
    return res;
}

module.exports = userDetailValidation;