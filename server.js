const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config({ path: './config.env' });

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping_hub', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.log('⚠️  MongoDB connection failed. Starting server without database...');
    console.log('📝 To use full features, please install and start MongoDB:');
    console.log('   1. Download MongoDB from https://www.mongodb.com/try/download/community');
    console.log('   2. Install and start MongoDB service');
    console.log('   3. Or use MongoDB Atlas (cloud): Update MONGODB_URI in config.env');
    console.log('');
  }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));

// Demo route for testing without database
app.get('/api/demo/products', (req, res) => {
  const demoProducts = [
    {
      _id: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
      price: 99.99,
      originalPrice: 129.99,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop'
      ],
      stock: 50,
      averageRating: 4.5,
      totalReviews: 128,
      brand: 'AudioTech',
      tags: ['wireless', 'bluetooth', 'noise-cancelling', 'headphones']
    },
    {
      _id: '2',
      name: 'Smart Fitness Watch',
      description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and 7-day battery life.',
      price: 199.99,
      originalPrice: 249.99,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop'
      ],
      stock: 30,
      averageRating: 4.3,
      totalReviews: 89,
      brand: 'FitTech',
      tags: ['smartwatch', 'fitness', 'health', 'tracking']
    },
    {
      _id: '3',
      name: 'Premium Cotton T-Shirt',
      description: 'Comfortable and stylish cotton t-shirt for everyday wear. Made from 100% organic cotton with a modern fit.',
      price: 29.99,
      category: 'Clothing',
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop'
      ],
      stock: 100,
      averageRating: 4.2,
      totalReviews: 256,
      brand: 'StyleWear',
      tags: ['cotton', 'tshirt', 'casual', 'comfortable']
    },
    {
      _id: '4',
      name: 'Wireless Gaming Mouse',
      description: 'High-precision wireless gaming mouse with RGB lighting, programmable buttons, and ultra-fast response time.',
      price: 79.99,
      originalPrice: 99.99,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop'
      ],
      stock: 25,
      averageRating: 4.7,
      totalReviews: 89,
      brand: 'GameTech',
      tags: ['gaming', 'wireless', 'mouse', 'rgb']
    },
    {
      _id: '5',
      name: 'Leather Crossbody Bag',
      description: 'Stylish leather crossbody bag with multiple compartments. Perfect for everyday use and travel.',
      price: 89.99,
      category: 'Clothing',
      images: [
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop'
      ],
      stock: 40,
      averageRating: 4.4,
      totalReviews: 156,
      brand: 'LeatherCraft',
      tags: ['leather', 'bag', 'crossbody', 'fashion']
    },
    {
      _id: '6',
      name: 'Coffee Maker Machine',
      description: 'Automatic coffee maker with programmable timer, thermal carafe, and multiple brewing options.',
      price: 149.99,
      originalPrice: 179.99,
      category: 'Home & Garden',
      images: [
        'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop'
      ],
      stock: 20,
      averageRating: 4.6,
      totalReviews: 203,
      brand: 'BrewMaster',
      tags: ['coffee', 'machine', 'automatic', 'kitchen']
    },
    {
      _id: '7',
      name: 'Nike Air Max Running Shoes',
      description: 'Premium running shoes with advanced cushioning technology and breathable mesh upper. Perfect for marathon training.',
      price: 129.99,
      originalPrice: 159.99,
      category: 'Sports',
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop'
      ],
      stock: 75,
      averageRating: 4.7,
      totalReviews: 342,
      brand: 'Nike',
      tags: ['running', 'shoes', 'sports', 'athletic'],
      isFeatured: true
    },
    {
      _id: '8',
      name: 'Adidas Ultraboost Sneakers',
      description: 'High-performance sneakers with responsive cushioning and energy return technology. Ideal for both running and casual wear.',
      price: 179.99,
      originalPrice: 199.99,
      category: 'Sports',
      images: [
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop'
      ],
      stock: 60,
      averageRating: 4.8,
      totalReviews: 289,
      brand: 'Adidas',
      tags: ['sneakers', 'running', 'comfortable', 'stylish'],
      isFeatured: true
    },
    {
      _id: '9',
      name: 'Converse Chuck Taylor All Star',
      description: 'Classic canvas sneakers with timeless design. Perfect for casual wear and street style.',
      price: 59.99,
      originalPrice: 69.99,
      category: 'Clothing',
      images: [
        'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop'
      ],
      stock: 120,
      averageRating: 4.5,
      totalReviews: 567,
      brand: 'Converse',
      tags: ['canvas', 'sneakers', 'casual', 'classic'],
      isFeatured: true
    },
    {
      _id: '10',
      name: 'Vans Old Skool Skate Shoes',
      description: 'Iconic skate shoes with durable construction and classic side stripe design. Perfect for skating and street wear.',
      price: 64.99,
      originalPrice: 74.99,
      category: 'Sports',
      images: [
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop'
      ],
      stock: 85,
      averageRating: 4.6,
      totalReviews: 234,
      brand: 'Vans',
      tags: ['skate', 'shoes', 'street', 'durable'],
      isFeatured: true
    },
    {
      _id: '11',
      name: 'Apple iPhone 15 Pro',
      description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Experience the future of mobile technology.',
      price: 999.99,
      originalPrice: 1099.99,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
      ],
      stock: 45,
      averageRating: 4.9,
      totalReviews: 892,
      brand: 'Apple',
      tags: ['iphone', 'smartphone', 'mobile', 'camera'],
      isFeatured: true
    },
    {
      _id: '12',
      name: 'Samsung 4K Smart TV',
      description: '55-inch 4K Ultra HD Smart TV with Crystal Display technology and built-in streaming apps.',
      price: 699.99,
      originalPrice: 799.99,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
      ],
      stock: 30,
      averageRating: 4.7,
      totalReviews: 445,
      brand: 'Samsung',
      tags: ['tv', '4k', 'smart', 'entertainment'],
      isFeatured: true
    },
    {
      _id: '13',
      name: 'Denim Jacket',
      description: 'Classic denim jacket with modern fit and comfortable stretch fabric. Perfect for casual and street style.',
      price: 79.99,
      originalPrice: 89.99,
      category: 'Clothing',
      images: [
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506634064465-7dab4e12d812?w=400&h=400&fit=crop'
      ],
      stock: 65,
      averageRating: 4.4,
      totalReviews: 178,
      brand: 'DenimCo',
      tags: ['denim', 'jacket', 'casual', 'street'],
      isFeatured: true
    },
    {
      _id: '14',
      name: 'Wireless Earbuds',
      description: 'True wireless earbuds with active noise cancellation and 24-hour battery life. Perfect for music and calls.',
      price: 149.99,
      originalPrice: 179.99,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop'
      ],
      stock: 80,
      averageRating: 4.6,
      totalReviews: 334,
      brand: 'SoundTech',
      tags: ['earbuds', 'wireless', 'bluetooth', 'noise-cancelling'],
      isFeatured: true
    },
    {
      _id: '15',
      name: 'Yoga Mat',
      description: 'Premium non-slip yoga mat with alignment lines and carrying strap. Perfect for yoga, pilates, and fitness.',
      price: 39.99,
      originalPrice: 49.99,
      category: 'Sports',
      images: [
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'
      ],
      stock: 120,
      averageRating: 4.5,
      totalReviews: 267,
      brand: 'FitLife',
      tags: ['yoga', 'mat', 'fitness', 'exercise'],
      isFeatured: true
    },
    {
      _id: '16',
      name: 'Laptop Stand',
      description: 'Adjustable aluminum laptop stand with ergonomic design and cable management. Improves posture and airflow.',
      price: 49.99,
      originalPrice: 59.99,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop'
      ],
      stock: 95,
      averageRating: 4.3,
      totalReviews: 189,
      brand: 'ErgoTech',
      tags: ['laptop', 'stand', 'ergonomic', 'desk'],
      isFeatured: true
    },
    {
      _id: '17',
      name: 'Sunglasses',
      description: 'Polarized sunglasses with UV protection and lightweight frame design. Perfect for outdoor activities.',
      price: 89.99,
      originalPrice: 109.99,
      category: 'Clothing',
      images: [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop'
      ],
      stock: 70,
      averageRating: 4.4,
      totalReviews: 156,
      brand: 'SunStyle',
      tags: ['sunglasses', 'polarized', 'uv-protection', 'outdoor'],
      isFeatured: true
    },
    {
      _id: '18',
      name: 'Blender',
      description: 'High-speed blender with multiple settings and large capacity jar. Perfect for smoothies, soups, and food processing.',
      price: 89.99,
      originalPrice: 119.99,
      category: 'Home & Garden',
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
      ],
      stock: 55,
      averageRating: 4.6,
      totalReviews: 223,
      brand: 'KitchenPro',
      tags: ['blender', 'kitchen', 'smoothie', 'food-processing'],
      isFeatured: true
    },
    {
      _id: '19',
      name: 'Backpack',
      description: 'Durable hiking backpack with multiple compartments and water-resistant material. Perfect for outdoor adventures.',
      price: 129.99,
      originalPrice: 149.99,
      category: 'Sports',
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400&h=400&fit=crop'
      ],
      stock: 40,
      averageRating: 4.7,
      totalReviews: 198,
      brand: 'AdventureGear',
      tags: ['backpack', 'hiking', 'outdoor', 'travel'],
      isFeatured: true
    },
    {
      _id: '20',
      name: 'Smart Speaker',
      description: 'Voice-controlled smart speaker with premium sound quality and home automation features.',
      price: 199.99,
      originalPrice: 249.99,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1589003077984-894e1322b9f3?w=400&h=400&fit=crop'
      ],
      stock: 35,
      averageRating: 4.8,
      totalReviews: 445,
      brand: 'SmartAudio',
      tags: ['speaker', 'smart', 'voice-control', 'home-automation'],
      isFeatured: true
    }
  ];
  res.json({ products: demoProducts, total: demoProducts.length });
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 