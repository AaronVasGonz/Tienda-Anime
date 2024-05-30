

export const  handleServerErrors = (responseData, setValidationErrors, setErrors )=>{
    if (responseData.errors) {
        const serverErrors = {};
        responseData.errors.forEach(error => {
            serverErrors[error.param] = error.msg;
        })
        console.log(serverErrors);
    }

    if(responseData.error){
        const serverErrors = {};
        serverErrors[responseData.error] = responseData.error;
        console.log(serverErrors);
        setValidationErrors(serverErrors);
    }
};