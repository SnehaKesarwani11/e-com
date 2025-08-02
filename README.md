# Shopping Hub - E-commerce Website

A fully functional e-commerce website built with Node.js, Express.js, MongoDB, and modern frontend technologies. Shopping Hub provides a complete online shopping experience with user authentication, product management, shopping cart, payment integration, and admin panel.

## 🚀 Features

### Frontend Features
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **Modern Interface**: Clean, intuitive design with smooth animations
- **Product Catalog**: Dynamic product listing with filtering and search
- **Shopping Cart**: Persistent cart with quantity management
- **User Authentication**: Secure login/register with JWT
- **Wishlist**: Save favorite products for later
- **Order Management**: Track order status and history
- **Payment Integration**: Razorpay payment gateway
- **Search & Filter**: Advanced product search and filtering
- **Product Reviews**: Customer ratings and reviews system

### Backend Features
- **RESTful API**: Complete API for all e-commerce operations
- **User Management**: Authentication, authorization, and profile management
- **Product Management**: CRUD operations for products with variants
- **Order Processing**: Complete order lifecycle management
- **Payment Processing**: Secure payment integration
- **Admin Panel**: Comprehensive admin dashboard
- **Database**: MongoDB with Mongoose ODM
- **Security**: JWT authentication, input validation, rate limiting

### Admin Features
- **Dashboard**: Analytics and statistics
- **Product Management**: Add, edit, delete products
- **Order Management**: Process and track orders
- **User Management**: Manage customer accounts
- **Inventory Management**: Stock tracking and alerts
- **Analytics**: Sales reports and insights

## 🛠️ Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: Object Data Modeling
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Razorpay**: Payment gateway
- **Multer**: File upload handling
- **Express Validator**: Input validation
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Vanilla JavaScript with modern features
- **Font Awesome**: Icons
- **Google Fonts**: Typography

### Development Tools
- **Git**: Version control
- **Nodemon**: Development server
- **Dotenv**: Environment variables

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd shopping-hub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/shopping_hub
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
NODE_ENV=development
```

### 4. Database Setup
Make sure MongoDB is running on your system. The application will automatically create the database and collections.

### 5. Start the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
shopping-hub/
├── models/                 # Database models
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/                 # API routes
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
│   ├── users.js
│   └── admin.js
├── middleware/             # Custom middleware
│   └── auth.js
├── public/                 # Frontend files
│   ├── css/
│   │   ├── style.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── app.js
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── checkout.js
│   │   ├── profile.js
│   │   └── utils.js
│   └── index.html
├── server.js              # Main server file
├── package.json
├── config.env
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products/:id/reviews` - Add product review
- `POST /api/products/:id/wishlist` - Add to wishlist

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/cancel` - Cancel order
- `POST /api/orders/verify-payment` - Verify payment

### Users
- `GET /api/users/wishlist` - Get user wishlist
- `POST /api/users/wishlist/:productId` - Toggle wishlist
- `GET /api/users/dashboard` - Get user dashboard
- `PUT /api/users/avatar` - Update avatar
- `GET /api/users/stats` - Get user statistics

### Admin
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/users` - Get all users
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/analytics` - Get analytics
- `POST /api/admin/bulk-actions` - Bulk operations

## 🎨 Frontend Features

### Pages
1. **Homepage**: Hero banner, featured products, categories
2. **Products**: Product listing with filters and search
3. **Product Detail**: Detailed product view with images and reviews
4. **Cart**: Shopping cart with quantity management
5. **Checkout**: Order placement with payment
6. **Authentication**: Login and registration forms
7. **Profile**: User profile and settings
8. **Orders**: Order history and tracking
9. **Wishlist**: Saved products

### Components
- **Navigation**: Responsive navigation with search
- **Product Cards**: Product display with actions
- **Cart Sidebar**: Sliding cart panel
- **Forms**: Validated input forms
- **Modals**: Image viewer and order details
- **Toast Notifications**: User feedback messages

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Input Validation**: Express-validator for data validation
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **Environment Variables**: Secure configuration management

## 💳 Payment Integration

The application integrates with Razorpay for payment processing:

1. **Setup**: Configure Razorpay keys in environment variables
2. **Order Creation**: Create orders with payment intent
3. **Payment Processing**: Handle payment through Razorpay
4. **Verification**: Verify payment signatures
5. **Order Completion**: Update order status after payment

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Mobile-first design with touch-friendly interface

### Breakpoints
- **Large**: 1200px and up
- **Medium**: 768px to 1199px
- **Small**: 768px and down
- **Extra Small**: 480px and down

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment

1. **Environment Setup**
   ```bash
   NODE_ENV=production
   ```

2. **Database**: Use MongoDB Atlas or self-hosted MongoDB

3. **Payment Gateway**: Configure production Razorpay keys

4. **Deploy to Platform**:
   - **Heroku**: Connect GitHub repository
   - **Vercel**: Deploy with Vercel CLI
   - **AWS**: Use Elastic Beanstalk or EC2
   - **DigitalOcean**: Deploy on App Platform

### Environment Variables for Production
```env
PORT=3000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
RAZORPAY_KEY_ID=your_production_razorpay_key
RAZORPAY_KEY_SECRET=your_production_razorpay_secret
NODE_ENV=production
```

## 🧪 Testing

### Manual Testing
1. **User Registration/Login**: Test authentication flow
2. **Product Browsing**: Test search and filtering
3. **Shopping Cart**: Test cart functionality
4. **Checkout**: Test order placement
5. **Payment**: Test payment integration
6. **Admin Panel**: Test admin features

### API Testing
Use tools like Postman or Thunder Client to test API endpoints.

## 🔧 Customization

### Adding New Features
1. **Backend**: Add routes in `routes/` directory
2. **Frontend**: Add JavaScript modules in `public/js/`
3. **Styling**: Modify CSS files in `public/css/`

### Database Schema
- **Users**: User accounts and profiles
- **Products**: Product catalog with variants
- **Orders**: Order management and tracking

### Payment Gateway
The application can be easily modified to support other payment gateways like Stripe, PayPal, etc.

## 📊 Performance Optimization

- **Image Optimization**: Compress and optimize product images
- **Database Indexing**: Add indexes for frequently queried fields
- **Caching**: Implement Redis for session and data caching
- **CDN**: Use CDN for static assets
- **Compression**: Enable gzip compression

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in environment variables

2. **Payment Integration Issues**
   - Verify Razorpay keys
   - Check webhook configurations

3. **CORS Errors**
   - Configure CORS settings in server.js
   - Check frontend URL configuration

4. **JWT Token Issues**
   - Verify JWT_SECRET in environment variables
   - Check token expiration settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🎯 Roadmap

### Future Features
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Social media integration
- [ ] Mobile app development
- [ ] Advanced search with Elasticsearch
- [ ] Real-time chat support
- [ ] Loyalty program
- [ ] Advanced inventory management
- [ ] Multi-vendor support

---

**Shopping Hub** - Your Ultimate Shopping Destination! 🛍️ 