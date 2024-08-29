const apiUrl = "http://localhost:8080"

const Api = {
    signUP : {
        url : `${apiUrl}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${apiUrl}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${apiUrl}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${apiUrl}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${apiUrl}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${apiUrl}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${apiUrl}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${apiUrl}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${apiUrl}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${apiUrl}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${apiUrl}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${apiUrl}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${apiUrl}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${apiUrl}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${apiUrl}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${apiUrl}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${apiUrl}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${apiUrl}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${apiUrl}/api/filter-product`,
        method : 'post'
    }
}


export default Api