import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { User } from '../auth/entities/user.entity';
import { UserRegisteredEvent } from './interfaces/user-registered-event.interface';

@Injectable()
export class EventsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emitUserRegistered(user: User): void {
    const UserRegisteredEventData: UserRegisteredEvent = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      timeStamp: new Date(),
    };

    this.eventEmitter.emit('user.registered', UserRegisteredEventData);
  }
}
