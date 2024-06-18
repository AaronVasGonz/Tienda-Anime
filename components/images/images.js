import Image from "next/image"

export const MainImage = ({width, height, src}) => {
    return(
        <div className='flex flex-col mt-10'>
        <Image
            alt="image"
            loading="lazy"
            width={width}
            height={height}
            src={src}
        />
    </div>
    )
}


const ImageComponent = ({ id, src, alt }) => {
    return (
        <Image
            src={src}
            alt={alt}
            className="animate-slide-up rounded-md"
            width={200}
            height={200}
            loading='lazy'
        />
    );
};

export default ImageComponent;