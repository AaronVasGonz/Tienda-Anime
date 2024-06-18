export const Title = ({ titleOption1, titleOption2, id}) => {
    return (
        <div className="w-full text-2xl text-center font-bold mb-10">
        <h3 className="w-full">{
            id? titleOption1 : titleOption2
            }</h3>
    </div>
    )
}