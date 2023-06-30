import React from "react";
import "./sidebar.css";
import logo from "../../images/logo-whitebg.jpg";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import DashboardIcon from "@material-ui/icons/Dashboard";


const SellerSidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/seller/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <span>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/seller/products">
              <TreeItem nodeId="2" label="My Products" icon={<PostAddIcon />} />
            </Link>

            <Link to="/seller/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </span>
      
    </div>
  );
};

export default SellerSidebar;
