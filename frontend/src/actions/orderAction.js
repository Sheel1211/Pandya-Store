import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
  SELLER_ORDERS_REQUEST,
  SELLER_ORDERS_SUCCESS,
  SELLER_ORDERS_FAIL,
} from "../constants/orderConstants";

import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      withCredentials: true,
    };
    const { data } = await axios.post(
      "https://pandya-store.onrender.com/api/v1/order/new",
      order,
      config
    );

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get("https://pandya-store.onrender.com/api/v1/orders/me", {
      mode: "cors",
      credentials: "include",
      withCredentials: true,
    });

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(
      "https://pandya-store.onrender.com/api/v1/admin/orders",
      { mode: "cors", credentials: "include", withCredentials: true }
    );

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Orders (Seller)
export const getSellerAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: SELLER_ORDERS_REQUEST });

    const { data } = await axios.get(
      "https://pandya-store.onrender.com/api/v1/seller/orders",
      { mode: "cors", credentials: "include", withCredentials: true }
    );

    console.log(data.finalOrders);

    dispatch({ type: SELLER_ORDERS_SUCCESS, payload: data.finalOrders });
  } catch (error) {
    dispatch({
      type: SELLER_ORDERS_FAIL,
      payload: error.response,
    });
  }
};



// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      withCredentials: true,
    };
    const { data } = await axios.put(
      `https://pandya-store.onrender.com/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(
      `https://pandya-store.onrender.com/api/v1/admin/order/${id}`,
      { mode: "cors", credentials: "include", withCredentials: true }
    );

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(
      `https://pandya-store.onrender.com/api/v1/order/${id}`,
      { mode: "cors", credentials: "include", withCredentials: true }
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
