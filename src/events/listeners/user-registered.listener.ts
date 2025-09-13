import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import type { UserRegisteredEvent } from '../interfaces/user-registered-event.interface';

@Injectable()
export class UserRegisteredListener {
  private readonly logger = new Logger(UserRegisteredListener.name);

  @OnEvent('user.registered')
  handleUserRegisteredEvent(event: UserRegisteredEvent): void {
    const { user, timeStamp } = event;

    this.logger.log(
      `Welcome, ${user.email}! Your Account created at ${timeStamp.toISOString()}`,
    );
  }
}
