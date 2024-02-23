export const productValidator = (prod: { title: string, description: string, imageURL: string, price: string, colors?: string[]  }) => {
    const errorObj: { title: string, description: string, imageURL: string, price: string, colors: string} = {
        title: "",
        description: "",
        price: "",
        imageURL: "",
        colors: ""
    }

    const validURL = /^(ftp|http|https):\/\/[^ "]+$/.test(prod.imageURL)

    if (!prod.title.trim() || prod.title.length < 10 || prod.title.length > 80) {
        errorObj.title = "Product title must be between 10 and 80 characters"
    }
    if (!prod.description.trim() || prod.description.length < 10 || prod.description.length > 80) {
        errorObj.description = "Product description must be between 10 and 80 characters"
    }
    if (!prod.imageURL.trim() || !validURL) {
        errorObj.imageURL = "please enter a valid image URL"
    }

    if (prod.colors?.length === 0) {
        errorObj.colors = "please choose a color for your product"
    }

    if (!prod.price.trim() || isNaN(Number(prod.price))) {
        errorObj.price = "please enter a valid price"
    } else if ((Number(prod.price) <= 0)) {
        errorObj.price = "please enter a valid price - must be greater than zero"
    }

    return errorObj
}