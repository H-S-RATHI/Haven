import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import config from '../config';
import twilioService from './twilio.service';

// In-memory storage for OTPs (in production, use a database like Redis)
const otpStore: Record<string, { otp: string; expiresAt: number }> = {};

class AuthService {
  private twilioService: typeof twilioService;
  private static instance: AuthService;

  private constructor() {
    this.twilioService = twilioService;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private generateJwt(userId: string, phoneNumber: string): string {
    if (!config.jwt.secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    // Use type casting to ensure type compatibility
    const payload: string | object | Buffer = { userId, phoneNumber };
    const secret: jwt.Secret = config.jwt.secret as jwt.Secret;
    
    return jwt.sign(
      payload,
      secret,
      { expiresIn: '1h' } as jwt.SignOptions
    );
  }

  public async sendOtp(phoneNumber: string): Promise<{ success: boolean; message: string }> {
    try {
      const otp = this.generateOtp();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiry
      
      // Store OTP with expiration
      otpStore[phoneNumber] = {
        otp,
        expiresAt
      };

      // Send OTP via Twilio
      const otpSent = await this.twilioService.sendOtp(phoneNumber, otp);
      
      if (!otpSent) {
        return { success: false, message: 'Failed to send OTP' };
      }

      return { 
        success: true, 
        message: 'OTP sent successfully' 
      };
    } catch (error) {
      console.error('Error in sendOtp:', error);
      return { 
        success: false, 
        message: 'An error occurred while sending OTP' 
      };
    }
  }

  public verifyOtp(phoneNumber: string, otp: string): { 
    success: boolean; 
    message: string; 
    token?: string;
    user?: any;
  } {
    try {
      const storedOtp = otpStore[phoneNumber];
      
      // Check if OTP exists and is not expired
      if (!storedOtp || storedOtp.expiresAt < Date.now()) {
        return { 
          success: false, 
          message: 'Invalid or expired OTP' 
        };
      }

      // Verify OTP
      if (storedOtp.otp !== otp) {
        return { 
          success: false, 
          message: 'Invalid OTP' 
        };
      }

      // Clear the OTP after successful verification
      delete otpStore[phoneNumber];

      // In a real app, you would fetch user from database
      const user = {
        id: `user_${uuidv4()}`,
        phoneNumber,
        // Add other user details as needed
      };

      // Generate JWT token
      const token = this.generateJwt(user.id, user.phoneNumber);

      return {
        success: true,
        message: 'OTP verified successfully',
        token,
        user,
      };
    } catch (error) {
      console.error('Error in verifyOtp:', error);
      return { 
        success: false, 
        message: 'An error occurred while verifying OTP' 
      };
    }
  }
}

export default AuthService.getInstance();
