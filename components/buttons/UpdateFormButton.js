export const UpdateFormButton = ({title}) => {
    return(
    <div className="flex flex-col mt-6 sm:w-1/2 w-full justify-center  mb-10">
    <button className="update-button text-2xl hover:bg-blue-600 rounded-lg  px-6 py-2 items-center transition-transform duration-300 transform-gpu hover:scale-105 inline-block cursor-pointer">{title}</button>
  </div>
  )
}