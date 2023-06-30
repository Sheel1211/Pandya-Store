import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getUnapprovedProduct,
  deleteProduct,
  approveProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/RemoveRedEye";
import DeleteIcon from "@material-ui/icons/Delete";
import Done from "@material-ui/icons/Done";
import SideBar from "./Sidebar";
import { APPROVE_PRODUCT_RESET, DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductApproveList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const { error: approveError, isApproved } = useSelector(
    (state) => state.approve
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const approveProductHandler = (id) => {
    dispatch(approveProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (approveError) {
      alert.error(approveError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    if (isApproved) {
      alert.success("Product Approved Successfully");
    //   history.push("/admin/dashboard");
      dispatch({ type: APPROVE_PRODUCT_RESET });
    }

    console.log("before fetch");
    dispatch(getUnapprovedProduct());
    console.log("after fetch");
  }, [dispatch, alert, error, deleteError, history,isApproved,approveError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() =>
                approveProductHandler(params.getValue(params.id, "id"))
              }
            >
              <Done />
            </Button>
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`All Products`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">PRODUCTS TO BE APPROVED</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductApproveList;
