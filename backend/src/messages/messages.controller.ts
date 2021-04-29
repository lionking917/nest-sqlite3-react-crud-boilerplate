import { Controller } from '@nestjs/common';
import { Crud, CrudController } from "@nestjsx/crud";

import { Message } from './message.entity';
import { MessagesService } from './messages.service';

@Crud({
    model: {
      type: Message,
    },
})
@Controller('messages')
export class MessagesController implements CrudController<Message> {
    constructor(public service: MessagesService) {}
}
