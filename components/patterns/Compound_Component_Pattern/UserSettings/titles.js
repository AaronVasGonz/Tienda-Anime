
import Image from 'next/image'
export const MainTitle = ({ title }) => {
    return (
        <h1 className=" flex  items-center animate-slide-down justify-center text-3xl  font-bold text-center ">
            {title}
            <span>
                <Image src="/settings2.png" loading='lazy' width={50} height={50} className="animate-bounce-once " alt="" />
            </span>
        </h1>
    )
}

export const SubTitle = () => {
    return (
        <h2 className="text-2xl mt-4 mb-3  animate-slide-down text-center">This is the Setting page where you can update your information.</h2>
    )
}