
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
export const AddButton = ({ title, href }) => {
    return (
        <div className="flex self-end">
            <h3 className="mr-3 mt-2">{title}</h3>
            <Link
                aria-label='Add'
                href={href}>
                <div className="bg-main-purple px-10 py-3 rounded mb-2 hover:bg-hover-purple transition duration-300 ease-in cursor-pointer">
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </Link>
        </div>
    )
}