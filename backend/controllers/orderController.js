const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  // console.log("Hello");

  await sendEmail({
    email: req.user.email,
    subject: "Thank you for your order! -- Pandya Store",
    message: `Thank you for choosing our company for your recent purchase. We are delighted to inform you that your order has been successfully placed and is being processed. Here are the details of your order:

    Order Number: ${order._id}
    Product: ${order.orderItems}
    
    Total Amount: ₹ ${order.totalPrice}
    
    We are working diligently to ensure that your order is processed and shipped as soon as possible. You can expect to receive a shipping confirmation email with tracking details once your order has been dispatched.
    
    If you have any questions or require further assistance, please don't hesitate to reach out to our customer support team at sheelpandya417@gmail.com. We're here to help!
    
    Once again, thank you for choosing our company. We greatly appreciate your business and look forward to serving you again in the future.
    
    Best regards,
    Pandya Store`,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (order.orderStatus === "Processing") {
    await sendEmail({
      email: req.user.email,
      subject: `Your Order ${order.orderStatus} today! -- Pandya Store`,
      message: `Thank you for choosing our company for your recent purchase. We are delighted to inform you that your order has been successfully placed and is being processed. Here are the details of your order:
      
    Order Number: ${order._id}
    Product: ${order.orderItems}
    
    Total Amount: ₹ ${order.totalPrice}
    
    We are working diligently to ensure that your order is processed and shipped as soon as possible. You can expect to receive a shipping confirmation email with tracking details once your order has been dispatched.
    
    If you have any questions or require further assistance, please don't hesitate to reach out to our customer support team at sheelpandya417@gmail.com. We're here to help!
    
    Once again, thank you for choosing our company. We greatly appreciate your business and look forward to serving you again in the future.
    
    Best regards,
    Pandya Store`,
    });
  } else {
    await sendEmail({
      email: req.user.email,
      subject: `Your Order ${order.orderStatus} today! -- Pandya Store`,
      message: `Thank you for choosing our company for your recent purchase. We are delighted to inform you that your order has been successfully placed and is being processed. Here are the details of your order:
    
  Order Number: ${order._id}
  Product: ${order.orderItems}
  
  Total Amount: ₹ ${order.totalPrice}
  
  If you have any questions or require further assistance, please don't hesitate to reach out to our customer support team at sheelpandya417@gmail.com. We're here to help!
  
  Once again, thank you for choosing our company. We greatly appreciate your business and look forward to serving you again in the future.
  
  Best regards,
  Pandya Store`,
    });
  }

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
}); 

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

//Get Orders for specific seller
exports.getSellerOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find();
    const sellerProducts = await Product.find({ user: req.user._id });

    const finalOrders = [];
    await orders.map((o) => {
      for (let j = 0; j < o.orderItems.length; j++) {
        for (let i = 0; i < sellerProducts.length; i++) {
          // console.log(sellerProducts[i]._id.toString() + "  " + o.orderItems[j].product.toString())
          if (
            sellerProducts[i]._id.toString() ===
            o.orderItems[j].product.toString()
          ) {
            const items = JSON.stringify(o.orderItems[j]);

            const status = { status: o.orderStatus };
            const s =
              items.substring(0, items.length - 1) +
              "," +
              JSON.stringify(status).substring(1);
            finalOrders.push(JSON.parse(s));
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      finalOrders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});
