const { default: Api } = require("../common")

const fetchCategoryWiseProduct = async(category)=>{
    const response = await fetch(Api.categoryWiseProduct.url,{
        method : Api.categoryWiseProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })

    const dataResponse = await response.json()

    return dataResponse
}

export default fetchCategoryWiseProduct