
import Link from "next/link"
import { useUserFormSettings } from "../UserSettings/contexts/userSettingsContext";
export const ChangeMyPassword = () => {
        const {id} = useUserFormSettings();
    return (
        <div className='flex flex-col animate-slide-left'>
            <h2 className='text-2xl  font-bold text-center mb-6'>I want to change my <span className='text-main-purple font-bold capitalize -md'>password</span></h2>
            <div className="mb-5 flex flex-col  bg-neutral-950  justify-center items-center  rounded-lg  px-6 py-1  ">
                <p className="mt-2 text-center text-lg mb-2">If you want to change your password, click here</p>
                <Link href={`/settings/passwordChanger?id=${id}`} className=" mt-2 mb-4 border-1 bg-neutral-850 border-blue-500  ring-0  rounded-lg  px-6 py-1 items-center transition-transform duration-300 transform-gpu hover:scale-105 inline-block cursor-pointer text-center ">Change my Password</Link>
            </div>
        </div>
    )
}