const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');

const router = express.Router();

// Get user wishlist
router.get('/wishlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('wishlist', 'name price images description averageRating totalReviews');

    res.json({ wishlist: user.wishlist });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add/remove from wishlist
router.post('/wishlist/:productId', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(req.user._id);
    const isInWishlist = user.wishlist.includes(product._id);

    if (isInWishlist) {
      user.wishlist = user.wishlist.filter(id => id.toString() !== product._id.toString());
    } else {
      user.wishlist.push(product._id);
    }

    await user.save();

    res.json({
      message: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      inWishlist: !isInWishlist
    });
  } catch (error) {
    console.error('Wishlist toggle error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('wishlist', 'name price images');

    // Get recent orders (you'll need to import Order model)
    const Order = require('../models/Order');
    const recentOrders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name images')
      .sort('-createdAt')
      .limit(5);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar
      },
      wishlist: user.wishlist,
      recentOrders
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user avatar
router.put('/avatar', auth, async (req, res) => {
  try {
    const { avatar } = req.body;
    
    if (!avatar) {
      return res.status(400).json({ message: 'Avatar URL is required' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Avatar updated successfully',
      user
    });
  } catch (error) {
    console.error('Update avatar error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const Order = require('../models/Order');
    
    const totalOrders = await Order.countDocuments({ user: req.user._id });
    const completedOrders = await Order.countDocuments({ 
      user: req.user._id, 
      orderStatus: 'Delivered' 
    });
    const wishlistCount = req.user.wishlist.length;

    // Calculate total spent
    const orders = await Order.find({ 
      user: req.user._id, 
      paymentStatus: 'Completed' 
    });
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

    res.json({
      totalOrders,
      completedOrders,
      wishlistCount,
      totalSpent
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 