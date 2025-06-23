
const validator = require("validator"); 


const validate = () => {

    const mandatoryField = ['firstName','lastName','email'];

    const isAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));

    if(!isAllowed)
        throw new Error("field missing");

    if(!validator.isEmail(data.emailId))
        throw new Error("Invalid Email");

    if(!validator.isStrongPassword(data.password))
        throw new Error("Weak Password");

}

module.exports = validate;