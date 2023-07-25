import React from "react";

export default function SortLogic({data, selectOption}){
    const [sortData, setSortData] = React.useState([])

    React.useEffect(() => {
        let sortedShows = [...data]
        if (selectOption === "A-Z"){
            sortedShows.sort((first,last) => first.title.localeCompare(last.title))
        }else if(selectOption === "Z-A"){
            sortedShows.sort((first,last) => last.title.localeCompare(first.title))
        }else if(selectOption === "Date (ascending)"){
            sortedShows.sort((first,last) => new Date(last.updated) - new Date(first.updated))
        }else if(selectOption === "Date (descending)"){
            sortedShows.sort((first,last) => new Date(first.updated) - new Date(last.updated))
        }
        setSortData(sortedShows)
    },[data, selectOption])
    return sortData
}