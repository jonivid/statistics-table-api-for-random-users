

const mapping = {
    name: { fn: getName, isVisible: true },
    countryOfOrigin: { path: "location.country", isVisible: true },
    src: { path: "picture.large", isVisible: true },
    gender: { path: "gender", isVisible: true }

}

const mappingWithFunction = {
    name: { fn: getName, isVisible: true },
}

function getName(user) {
    return `${user.name.first} ${user.name.last}`
}

async function init() {


    try {
        const response = await getAPI({ url: "https://randomuser.me/api/?results=50" })
        const { results } = response
        console.log(results);
        // draw(response.results)

    } catch (err) {
        console.log(err)
        alert(`message: ${err.statusText} , status: ${err.status}`)
    }








    function getMappedUser(user) {
        const keyValueMappingArray = Object.entries(mapping)
        return keyValueMappingArray.reduce((mappedUser, KEYVALUEPAIR_ARRAY,) => {
            const [key, settingObj] = KEYVALUEPAIR_ARRAY
            const { path } = settingObj
            const isFunction = typeof settingObj["fn"] === 'function'
            return { ...mappedUser, [key]: isFunction ? settingObj["fn"](user) : getValueFromPath(path, user) }
        }, {})
    }



    function getValueFromPath(path, user) {
        if (typeof path !== 'string') return
        const splittedPath = path.split(".")
        const theRequestedValue = splittedPath.reduce((currentUser, partOfPath) => {
            const isValueExist = currentUser[partOfPath]
            return isValueExist ? currentUser[partOfPath] : "Not Availble"
        }, user)
        return theRequestedValue
    }












}














(function () {
    init()
})()