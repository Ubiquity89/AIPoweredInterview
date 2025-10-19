const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
    try {
        console.log('\n--- Auth Middleware ---');
        console.log('Request URL:', req.originalUrl);
        console.log('Request Headers:', {
            'content-type': req.headers['content-type'],
            'authorization': req.headers.authorization ? '***token present***' : 'No auth header',
            'content-length': req.headers['content-length']
        });

        // Get the authorization header (case-insensitive check)
        const authHeader = req.headers.authorization || req.headers.Authorization;
        
        if (!authHeader) {
            console.log('❌ No authorization header found');
            return res.status(401).json({ 
                success: false,
                message: "Not authorized, no token provided" 
            });
        }

        // Check if the token starts with 'Bearer ' (case-insensitive)
        if (typeof authHeader !== 'string' || !authHeader.match(/^bearer\s+/i)) {
            console.log('❌ Invalid token format - missing Bearer prefix');
            return res.status(401).json({ 
                success: false,
                message: "Not authorized, invalid token format. Use 'Bearer <token>'" 
            });
        }

        const token = authHeader.split(' ')[1];  // Extract token
        
        if (!token) {
            console.log('❌ No token found after Bearer');
            return res.status(401).json({ 
                success: false,
                message: "Not authorized, no token provided after Bearer" 
            });
        }

        try {
            console.log('🔑 Verifying token...');
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            
            if (!decoded.id) {
                console.log('❌ Token missing user ID');
                return res.status(401).json({ 
                    success: false,
                    message: "Not authorized, invalid token" 
                });
            }

            console.log('🔍 Looking up user with ID:', decoded.id);
            const user = await User.findById(decoded.id).select("-password");
            
            if (!user) {
                console.log('❌ User not found for token');
                return res.status(401).json({ 
                    success: false,
                    message: "User not found" 
                });
            }
            
            console.log('✅ User authenticated:', user.email);
            req.user = user;
            next();
            
        } catch (error) {
            console.error('❌ Token verification failed:', error.message);
            
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    success: false,
                    message: "Token expired"
                });
            }
            
            return res.status(401).json({ 
                success: false,
                message: "Not authorized, token verification failed",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
        
    } catch (error) {
        console.error('🔥 Auth middleware error:', error);
        res.status(500).json({ 
            success: false,
            message: "Server error during authentication",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { protect };