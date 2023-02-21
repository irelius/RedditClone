const searchPeoplesFunction = (props) => {
    const searchTermLower = props["searchParam"].toLowerCase()

    let searchPeoplesArray = Object.values(props["allUsers"][1]).filter(el => {
        if (el["username"].toLowerCase().includes(searchTermLower)) return el
    })

    console.log('booba', searchPeoplesArray)
    return searchPeoplesArray
}

export default searchPeoplesFunction
