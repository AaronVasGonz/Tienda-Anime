function validatePassword(password){
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/
    return regex.test(password);
}

export default validatePassword;