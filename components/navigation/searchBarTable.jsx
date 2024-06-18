import { Input } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const SearchBarTable = ({ searcher, setSearch }) => {
    return (
        <div className='w-full mb-2 mt-5'>
            <Input
                onChange={(e) => searcher(e, setSearch)}
                startContent={
                    <FontAwesomeIcon icon={faSearch} />
                }
            />
        </div>
    )
};