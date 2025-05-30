import twilio from 'twilio';
import config from '../config';

class TwilioService {
  private client: any;
  private static instance: TwilioService;

  private constructor() {
    this.client = twilio(
      config.twilio.accountSid,
      config.twilio.authToken
    );
  }

  public static getInstance(): TwilioService {
    if (!TwilioService.instance) {
      TwilioService.instance = new TwilioService();
    }
    return TwilioService.instance;
  }

  public async sendOtp(phoneNumber: string, otp: string): Promise<boolean> {
    try {
      // Log OTP in development for testing
      if (process.env.NODE_ENV !== 'production') {
        console.log(`OTP for ${phoneNumber}: ${otp}`);
      }

      // Send SMS in both development and production
      await this.client.messages.create({
        body: `Your OTP for login your app is: ${otp}`,
        from: config.twilio.phoneNumber,
        to: phoneNumber,
      });
      
      return true;
    } catch (error) {
      console.error('Error sending OTP via Twilio:', error);
      return false;
    }
  }
}

export default TwilioService.getInstance();
