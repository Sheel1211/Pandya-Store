import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
  SELLER_PRODUCT_REQUEST,
  SELLER_PRODUCT_SUCCESS,
  SELLER_PRODUCT_FAIL,
  UNAPPROVED_PRODUCT_REQUEST,
  UNAPPROVED_PRODUCT_SUCCESS,
  UNAPPROVED_PRODUCT_FAIL,
  APPROVE_PRODUCT_REQUEST,
  APPROVE_PRODUCT_SUCCESS,
  APPROVE_PRODUCT_FAIL,
  DELETE_SELLER_PRODUCT_REQUEST,
  DELETE_SELLER_PRODUCT_FAIL,
  DELETE_SELLER_PRODUCT_SUCCESS,
  UPDATE_SELLER_PRODUCT_REQUEST,
  UPDATE_SELLER_PRODUCT_SUCCESS,
  UPDATE_SELLER_PRODUCT_FAIL,
} from "../constants/productConstants";

// Get All Products
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link,{mode:'cors',
      credentials:'include',
      withCredentials:true});

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("http://localhost:4000/api/v1/admin/products",{mode:'cors',
    credentials:'include',
    withCredentials:true});

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get Products Created By Seller
export const getSellerProducts = ()=>async(dispatch)=>{
  try {
    dispatch({ type: SELLER_PRODUCT_REQUEST });

    const { data } = await axios.get("http://localhost:4000/api/v1/seller/products",{mode:'cors',
    credentials:'include',
    withCredentials:true});

    dispatch({
      type: SELLER_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: SELLER_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}

//Get Unapproved Products
export const getUnapprovedProduct = () => async (dispatch) => {
  try {
    dispatch({ type: UNAPPROVED_PRODUCT_REQUEST });

    const { data } = await axios.get("http://localhost:4000/api/v1/admin/getUnapprovedProducts",{mode:'cors',
    credentials:'include',
    withCredentials:true});

    dispatch({
      type: UNAPPROVED_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: UNAPPROVED_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      mode:'cors',
      credentials:'include',
      withCredentials:true
    };

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      mode:'cors',
      credentials:'include',
      withCredentials:true
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/product/${id}`,{mode:'cors',
    credentials:'include',
    withCredentials:true});

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`,{mode:'cors',
    credentials:'include',
    withCredentials:true});

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      mode:'cors',
      credentials:'include',
      withCredentials:true
    };

    const { data } = await axios.put(`http://localhost:4000/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`http://localhost:4000/api/v1/reviews?id=${id}`,{mode:'cors',
    credentials:'include',
    withCredentials:true});

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/reviews?id=${reviewId}&productId=${productId}`,{mode:'cors',
      credentials:'include',
      withCredentials:true}
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const approveProduct=(id)=>async(dispatch)=>{
  try {
    dispatch({ type: APPROVE_PRODUCT_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/v1/admin/approve/product/${id}`,{mode:'cors',
      credentials:'include',
      withCredentials:true}
    );

    dispatch({
      type: APPROVE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: APPROVE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const deleteSellerProduct = (id)=>async(dispatch)=>{
  try{
    dispatch({type:DELETE_SELLER_PRODUCT_REQUEST});

    const {data}=await axios.delete(`http://localhost:4000/api/v1/seller/product/${id}`,{mode:'cors',
    credentials:'include',
    withCredentials:true});

    dispatch({
      type:DELETE_SELLER_PRODUCT_SUCCESS,
      payload:data.success,
    });
  }
  catch (error) {
    dispatch({
      type: DELETE_SELLER_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateSellerProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SELLER_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      mode:'cors',
      credentials:'include',
      withCredentials:true
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/v1/seller/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_SELLER_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SELLER_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};