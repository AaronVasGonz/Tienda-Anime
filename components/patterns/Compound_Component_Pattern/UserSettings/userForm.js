export const UserForm = ({ children, handleSubmit, ...props }) => {
    return (
        <form onSubmit={handleSubmit} className=" animate-slide-left  flex flex-col items-center bg-neutral-950 rounded-lg text-xl px-8  mb-5 ">
            {children}
        </form>

    )
}