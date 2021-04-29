import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesService extends TypeOrmCrudService<Message>{
    constructor(@InjectRepository(Message) repo) {
        super(repo);
    }
}
