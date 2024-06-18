
import {  faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
export const sortResults = (data, sortConfig) => {
    return data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });
}

export const searcher = (e, setSearch) => {
    setSearch(e.target.value);
};
export const requestSort = (key, sortConfig, setSortConfig) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
    }
    setSortConfig({ key, direction });
    console.log(direction);
};

export const getSortIcon = (key, sortConfig) => {
    if (key === 'actions') return null;  // Evita mostrar icono en la columna Actions
    if (sortConfig.key === key) {
        return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
    }
    return faSort;
}

