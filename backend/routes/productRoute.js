const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  getSellersProducts,
  getUnApprovedProducts,
  approveProduct,
  deleteSellerProduct,
  updateSellerProduct
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/getUnapprovedProducts")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUnApprovedProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin","seller"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/admin/approve/product/:id").get(isAuthenticatedUser, authorizeRoles("admin"), approveProduct); 
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);


router.route("/seller/products").get(isAuthenticatedUser,authorizeRoles("admin","seller"),getSellersProducts);

router.route("/seller/product/:id").delete(isAuthenticatedUser,authorizeRoles("admin","seller"),deleteSellerProduct).put(isAuthenticatedUser,authorizeRoles("admin","seller"),updateSellerProduct);
module.exports = router;
