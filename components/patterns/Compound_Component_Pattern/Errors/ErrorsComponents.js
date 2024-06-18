export const Errors = ({ errors, validationErrors }) => {
    const renderErrors = (errorList) => (
        Object.keys(errorList).map((field) => (
            <div key={field} className='flex flex-col items-center mb-3 w-full'>
                <div className="bg-red-800 p-2 text-center sm:w-1/2 w-full rounded">
                    <p className="text-white text-base">{errorList[field]}</p>
                </div>
            </div>
        ))
    );
    return (
        <>
            {renderErrors(errors)}
            {renderErrors(validationErrors)}
        </>
    );
};
