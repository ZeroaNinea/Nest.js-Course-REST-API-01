import { Injectable } from '@nestjs/common';
import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';
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

  protected getTtl(): Promise<number> {
    return Promise.resolve(60000);
  }

  protected async throwThrottlingException(): Promise<void> {
    await Promise.resolve(() => {
      throw new ThrottlerException(
        `Too many attempts. Please try again after 1 minute.`,
      );
    });
  }
}
