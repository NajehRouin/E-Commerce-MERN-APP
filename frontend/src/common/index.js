const apiUrl = "http://localhost:8080";

const Api = {
  //api users
  signUP: {
    url: `${apiUrl}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${apiUrl}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${apiUrl}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${apiUrl}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${apiUrl}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${apiUrl}/api/update-user`,
    method: "post",
  },

  userByMonth: {
    url: `${apiUrl}/api/userByMonth`,
    method: "get",
  },

  updateCurrentUser: {
    url: `${apiUrl}/api/updateProfilUser`,
    method: "post",
  },
  resetPassword: {
    url: `${apiUrl}/api/resetPassword`,
    method: "post",
  },


  updatePassword: {
    url: `${apiUrl}/api/updatePassword`,
    method: "post",
  },

//api category
allCategory: {
  url: `${apiUrl}/api/all-category`,
  method: "get",
},


category: {
  url: `${apiUrl}/api/category`,
  method: "get",
},


createCategroy: {
  url: `${apiUrl}/api/create-category`,
  method: "post",
},

updateCategory: {
  url: `${apiUrl}/api/update-category`,
  method: "post",
},


  //api products
  uploadProduct: {
    url: `${apiUrl}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${apiUrl}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${apiUrl}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${apiUrl}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${apiUrl}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${apiUrl}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${apiUrl}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${apiUrl}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${apiUrl}/api/view-card-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${apiUrl}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${apiUrl}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${apiUrl}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${apiUrl}/api/filter-product`,
    method: "post",
  },

  //Api Order

  createOrder: {
    url: `${apiUrl}/api/order`,
    method: "post",
  },
  OrderUser: {
    url: `${apiUrl}/api/order-user`,
    method: "get",
  },
  allOrder: {
    url: `${apiUrl}/api/all-order`,
    method: "get",
  },
  updateStateOrder: {
    url: `${apiUrl}/api/state-order`,
    method: "post",
  },

  getOrderById: {
    url: `${apiUrl}/api/order-ById`,
    method: "post",
  },

  ordersByMonth: {
    url: `${apiUrl}/api/ordersByMonth`,
    method: "get",
  },
  ordersByCurrentMonth: {
    url: `${apiUrl}/api/ordersByCurrentMonth`,
    method: "get",
  },

  orderReceivedMonthCurrent: {
    url: `${apiUrl}/api/orderReceivedMonthCurrent`,
    method: "get",
  },
  orderReceived: {
    url: `${apiUrl}/api/orderReceived`,
    method: "get",
  },


  orderReturnMonthCurrent: {
    url: `${apiUrl}/api/orderReturnMonthCurrent`,
    method: "get",
  },


  orderReturn: {
    url: `${apiUrl}/api/orderReturn`,
    method: "get",
  },
  

  productReceivedMonthCurrent: {
    url: `${apiUrl}/api/productReceivedMonthCurrent`,
    method: "get",
  },

  productReceived: {
    url: `${apiUrl}/api/productReceived`,
    method: "get",
  },


  productReturn: {
    url: `${apiUrl}/api/productReturn`,
    method: "get",
  },

  productReturnMonthCurrent: {
    url: `${apiUrl}/api/productReturnMonthCurrent`,
    method: "get",
  },
  
  
  calculateTotalByMont: {
    url: `${apiUrl}/api/calculateTotal`,
    method: "get",
  },

  calculateProfits: {
    url: `${apiUrl}/api/calculateProfits`,
    method: "get",
  },
  

  
};

export default Api;
