

const mapping = {
    name: { fn: getName, isVisible: true },
    countryOfOrigin: { path: "location.country", isVisible: true },
    gender: { path: "gender", isVisible: true },
    src: { path: "picture.large", isVisible: true }

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
        draw(results)

    } catch (err) {
        console.log(err)
        alert(`message: ${err.statusText} , status: ${err.status}`)
    }

    function draw(arrOfObjects) {
        const mappedUsers = arrOfObjects.map((user) => {
            return getMappedUser(user)
        })

        $("#males").text(_getMaleCount(mappedUsers))
        $("#females").text(_getFemaleCount(mappedUsers))
        const mappedCountries = _getCountriesCount(mappedUsers);
        // const tableCountry = mappedCountries.map(country => getCountry(country))
        // $("#countries").append(...tableCountry)

        const cards = mappedUsers.map(item => getCard(item))
        $("#container-data").append(...cards)

    }


    // function getCountry(country) {
    //     const tr = $("<tr></tr>");
    //     const countryName = $("<td></td>").text(country[0])
    //     const coutryQnt = $("<td></td>").text(country[1])
    //     tr.append(countryName, coutryQnt)
    //     return tr

    // }



    function getCard(user) {


        const div = $("<DIV></DIV>").addClass("cardDiv")
        const name = $("<h1></h1>").text(user.name)
        const country = $("<h3></h3>").text(user.countryOfOrigin)
        const gender = $("<h3></h3>").text(user.gender)
        const img = $("<img></img>").attr("src", user.src)
        div.addClass("card", "col-lg-2")
        div.append(name, country, gender, img)
        return div
    }

    function _getFemaleCount(arrayOfUsers) {
        const females = arrayOfUsers.reduce((acc, user) => {
            if (user.gender === "female") {
                acc++
            }
            return acc
        }, 0)
        return females

    }
    function _getMaleCount(arrayOfUsers) {
        const males = arrayOfUsers.reduce((acc, user) => {
            if (user.gender === "male") {
                acc++
            }
            return acc
        }, 0)
        return males

    }

    function _getCountriesCount(arrayOfUsers) {
        let countries = []
        arrayOfUsers.map(acc => {
            countries[acc.countryOfOrigin] = (countries[acc.countryOfOrigin] || 0) + 1

        })

        return countries

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