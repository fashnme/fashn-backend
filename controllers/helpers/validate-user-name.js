const validateUserName = (userNameToValidate) => {

    let userName = userNameToValidate.toLowerCase();
    let acceptedRegex = /^[a-z][a-zA-Z0-9_.]{5,14}/;

    if (userName.length > 15 || userName.length < 6) {
        return 'username can be 6-10 characters long';
    }
    if (!acceptedRegex.test(userName)) {
        return "a-z 0-9 ._ allowed in username";
    }
    else {
        return true;
    }
};


module.exports = { validateUserName }