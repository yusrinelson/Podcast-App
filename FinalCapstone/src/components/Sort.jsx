import React from "react";

export default function Sort(item) {
    const [selectOption, setSelectOption] = React.useState("SORT")

    function handleSortChange(event){
        const theSelectedOption = event.target.value
        setSelectOption(theSelectedOption);
        item.onSortChange(theSelectedOption) //let the discover component know about the selected sorting option
    }

    return (
        <div>
            <select onChange={handleSortChange} value={selectOption}>
                <option value="SORT">SORT</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Date (ascending)">Date (ascending)</option>
                <option value="Date (descending)">Date (descending)</option>
            </select>
        </div>
    )
}