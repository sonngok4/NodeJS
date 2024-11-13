const express = require('express');
const fs = require('fs');
const router = express.Router();

// Đọc file user.json
const getUsersData = () => {
  try {
    const data = fs.readFileSync('./user.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users data:', error);
    return [];
  }
};

// Middleware kiểm tra đăng nhập
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Route trang chủ
router.get('/', function (req, res, next) {
  const users = getUsersData();
  res.render('index', {
    title: 'Home',
    users,
    user: req.session.user
  });
});

// Route hiển thị form login
router.get('/login', (req, res) => {
  // Nếu đã đăng nhập, chuyển hướng về trang chủ
  if (req.session && req.session.isAuthenticated) {
    return res.redirect('/');
  }

  // Render form login với thông báo lỗi (nếu có)
  res.render('login', {
    error: req.session.error,
    email: req.session.email
  });
  // Xóa thông báo lỗi sau khi hiển thị
  delete req.session.error;
  delete req.session.email;
});

// Xử lý đăng nhập
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = getUsersData();

  try {
    // Validate input
    if (!username || !password) {
      req.session.error = 'Please enter both email and password';
      req.session.email = username;
      return res.redirect('/login');
    }

    // Tìm user
    const user = users.find(user =>
      (user.username === username || user.email === username) &&
      user.password === password
    );

    if (user) {
      // Lưu thông tin đăng nhập vào session
      req.session.isAuthenticated = true;
      req.session.user = {
        username: user.username,
        email: user.email
      };
      res.redirect('/');
    } else {
      req.session.error = 'Invalid email or password';
      req.session.email = username;
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Login error:', error);
    req.session.error = 'An error occurred during login';
    res.redirect('/login');
  }
});

// Route đăng xuất
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

// Route được bảo vệ (yêu cầu đăng nhập)
router.get('/users', isAuthenticated, (req, res) => {
  const users = getUsersData();
  res.render('users', {
    users,
    user: req.session.user
  });
});

router.get('/error', (req, res) => {
  res.render('error');
});

module.exports = router;