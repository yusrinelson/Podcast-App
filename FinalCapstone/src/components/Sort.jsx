import React from "react";
import PropTypes from "prop-types"


export default function Sort({onSearch, onSortChange}) {
    const [selectOption, setSelectOption] = React.useState("SORT")

    function handleSortChange(event){
        const theSelectedOption = event.target.value
        setSelectOption(theSelectedOption);
        onSortChange(theSelectedOption) //let the discover component know about the selected sorting option
    }


    const [search, setSearch] = React.useState('');
  
    function handleChange(event) {
      setSearch(event.target.value);
      onSearch(event.target.value)
    }
  
    // function handleSearch() {
    //   onSearch(search); // Pass the search query value to the parent component
    // }

    return (
        <div className="sort-shows">
            <select onChange={handleSortChange} value={selectOption}>
                <option value="SORT">SORT</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Date (ascending)">Date (ascending)</option>
                <option value="Date (descending)">Date (descending)</option>
            </select>

            <div className="search-shows">
             <input type="search" placeholder="SEARCH SHOWS" value={search} onChange={handleChange} />
      </div>

     
        </div>
    )
}

Sort.propTypes ={
    onSearch: PropTypes.func,
    onSortChange: PropTypes.func,
}