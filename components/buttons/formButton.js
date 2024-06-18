export const SubmitButton = ({ button_title_1, button_title_2, id }) => {
    return (
        <div className='mb-10 mt-6'>
            <button type="submit" className={`${ id? 'update-button' : 'login-button'}`}>
                {id ? button_title_1 : button_title_2}
            </button>
        </div>
    )
}
