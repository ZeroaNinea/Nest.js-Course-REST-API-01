import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class LoginThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(
    req: Record<string, { email: string }>,
  ): Promise<string> {
    const email = req.body?.email || 'anonymous';
    return Promise.resolve(`login-${email}`);
  }

  protected getLimit(): Promise<number> {
    return Promise.resolve(5);
  }
}
