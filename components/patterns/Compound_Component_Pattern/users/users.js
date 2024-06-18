import { Input, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useUserForm } from "./contexts/userFormContext"
import PasswordStrengthMeter from "../../../../app/functions/passwordStrength";
import { Errors } from "../Errors/ErrorsComponents";

export const UserForm = (props) => {
    const { handleSubmit, handleSubmitUpdate,formData, token, setValidationErrors, setErrors, id, selectedRoles } = useUserForm();
    return (
        <form onSubmit={id ? (e) => handleSubmitUpdate (e, formData, token, setValidationErrors, setErrors, id, selectedRoles)
                           : (e) =>handleSubmit(e, formData, token, setValidationErrors, setErrors, id, selectedRoles)} 
            className="flex flex-col w-full sm:items-center">
            <div className=" sm:w-1/2 flex flex-col mb-4  animate-slide-left  bg-neutral-950 rounded-lg  pl-4 pr-4">
                {props.children}
            </div>
        </form>
    )
}

export const UserName = () => {
    const { handleChange, formData, setFormData, errors, setErrors, setValidationErrors } = useUserForm();
    return (
        <div className="mb-5 flex flex-col items-center">
            <Input
                name="nombre"
                type="text"
                label="Name"
                value={formData.nombre || ''}
                labelPlacement="inside"
                placeholder="Name"
                className=" sm:w-1/2  "
                onChange={(e) => handleChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
            />
        </div>
    )
}

export const UserLastName = () => {
    const { handleChange, formData, setFormData, errors, setErrors, setValidationErrors } = useUserForm();
    return (
        <div className="mb-5 flex flex-col items-center">
            <Input
                name="apellido"
                type="text"
                label="Last Name"
                value={formData.apellido || ''}
                labelPlacement="inside"
                placeholder="Last Name"
                className=" sm:w-1/2  "
                onChange={(e) => handleChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
            />
        </div>
    )
}

export const UserSecondLastName = () => {
    const { handleChange, formData, setFormData, errors, setErrors, setValidationErrors } = useUserForm();
    return (
        <div className="mb-5 flex flex-col items-center">
            <Input
                name="apellido2"
                type="text"
                label="Second Last Name"
                value={formData.apellido2 || ''}
                labelPlacement="inside"
                placeholder="Second Last Name"
                className=" sm:w-1/2  "
                onChange={(e) => handleChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
            />
        </div>
    )
}

export const UserEmail = () => {
    const { handleChange, formData, setFormData, errors, setErrors, setValidationErrors } = useUserForm();
    return (
        <div className="mb-5 flex flex-col items-center">
            <Input
                name="email"
                type="email"
                label="Email"
                value={formData.email || ''}
                labelPlacement="inside"
                placeholder="Email"
                className=" sm:w-1/2  "
                onChange={(e) => handleChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
            />
        </div>
    )
}

export const UserPassword = () => {
    const { handleChange, formData, setFormData, errors, setErrors, setValidationErrors, showPassword, tooglePasswordVisibility } = useUserForm();
    return (
        <div className="mb-5 flex flex-col items-center">
            <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="You password"
                label="Password"
                value={formData.password || ''}
                className="sm:w-1/2  "
                onChange={(e) => handleChange(e, setFormData, formData, errors, setErrors, setValidationErrors)}
                endContent={
                    <span
                        className="  text-wite  cursor-pointer mb-1"
                        onClick={tooglePasswordVisibility}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                }
            />
        </div>
    )
}

export const PasswordStrong = () => {
    const { formData } = useUserForm();
    return (
        <div className="mb-5 flex flex-col w-1/2 text-center ml-auto mr-auto">
            <PasswordStrengthMeter password={formData.password} />
            <p className=" mt-1 ml-1 text-white">Strength meter</p>
        </div>
    )
}

export const UserPasswordRepeat = () => {
    const { handleChange, formData, setFormData, errors, setErrors, setValidationErrors, showPassword } = useUserForm();
    return (
        <div className="mb-5 flex flex-col items-center">
            <Input
                name="password2"
                type={showPassword ? "text" : "password"}
                placeholder="You password"
                value={formData.password2 || ''}
                label="Password"
                className="sm:w-1/2  "
                onChange={(e) => handleChange (e, setFormData, formData, errors, setErrors, setValidationErrors) }
            />
        </div>
    )
}

export const SelectUserRoles = () => {
    const { selectedRoles, setSelectedRoles } = useUserForm();
    return (
        <div className="mb-5 flex flex-col items-center">
            <label className="mb-2">
                Select User Roles:
            </label>
            <CheckboxGroup
                orientation="horizontal"
                color="secondary"
                defaultValue={["USER"]}
                value={selectedRoles}
                onChange={(value) => setSelectedRoles(value)}
                name="roles"
            >
                <Checkbox isIndeterminate value="USER" name="rol">USER</Checkbox>
                <Checkbox value="ADMIN" name="rol">ADMIN</Checkbox>
            </CheckboxGroup>
        </div>
    )
}

export const UserFormErrors = () => {
    const { errors, validationErrors } = useUserForm();
    return (
       <Errors errors={errors} validationErrors={validationErrors}/>
    );
};

