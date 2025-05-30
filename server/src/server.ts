import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';

// Load environment variables
dotenv.config();

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// In-memory storage for OTPs (in production, use a database like Redis)
const otpStore: Record<string, string> = {};

// Generate a random 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via SMS
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with phone number (in production, use a database with expiration)
    otpStore[phoneNumber] = otp;
    
    // In production, you would uncomment this to send real SMS
    // await twilioClient.messages.create({
    //   body: `Your OTP for login is: ${otp}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phoneNumber
    // });

    // For development, log the OTP to console
    console.log(`OTP for ${phoneNumber}: ${otp}`);
    
    res.status(200).json({ 
      success: true, 
      message: 'OTP sent successfully' 
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send OTP' 
    });
  }
});

// Verify OTP
app.post('/api/auth/verify-otp', (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    
    if (!phoneNumber || !otp) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number and OTP are required' 
      });
    }
    
    // In production, verify against stored OTP in database with expiration check
    const storedOtp = otpStore[phoneNumber];
    
    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid or expired OTP' 
      });
    }
    
    // Clear the OTP after successful verification
    delete otpStore[phoneNumber];
    
    // In production, generate a JWT token here
    const user = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      phoneNumber,
      // Add other user details as needed
    };
    
    res.status(200).json({ 
      success: true, 
      message: 'OTP verified successfully',
      user,
      // In production, include a JWT token
      // token: generateJWT(user)
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to verify OTP' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
