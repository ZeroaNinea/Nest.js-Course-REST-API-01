import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { EventsService } from './events.service';
import { UserRegisteredListener } from './listeners/user-registered.listener';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      global: true,
      wildcard: false,
      maxListeners: 20,
      verboseMemoryLeak: true,
    }),
  ],
  providers: [EventsService, UserRegisteredListener],
  exports: [EventsService],
})
export class EventsModule {}
