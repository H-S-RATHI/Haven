import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  private authService: typeof AuthService;

  constructor() {
    this.authService = AuthService;
  }

  public sendOtp = async (req: Request, res: Response) => {
    try {
      const { phoneNumber } = req.body;
      
      if (!phoneNumber) {
        return res.status(400).json({ 
          success: false, 
          error: 'Phone number is required' 
        });
      }

      const result = await this.authService.sendOtp(phoneNumber);
      
      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      console.error('Error in sendOtp controller:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Internal server error' 
      });
    }
  };

  public verifyOtp = async (req: Request, res: Response) => {
    try {
      const { phoneNumber, otp } = req.body;
      
      if (!phoneNumber || !otp) {
        return res.status(400).json({ 
          success: false, 
          error: 'Phone number and OTP are required' 
        });
      }

      const result = await this.authService.verifyOtp(phoneNumber, otp);
      
      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      console.error('Error in verifyOtp controller:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Internal server error' 
      });
    }
  };
}

export default new AuthController();
