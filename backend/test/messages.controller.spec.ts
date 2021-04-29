import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CrudRequest } from '@nestjsx/crud';
import { AppModule } from '../src/app.module';
import { MessagesService } from '../src/messages/messages.service';
import { MessagesController } from '../src/messages/messages.controller';

describe('MessagesController', () => {
  let app: INestApplication;
  // const messagesService = { getMany: () => ['test1', 'test2'] };
  let messagesService: MessagesService;
  let messagesController: MessagesController;
  const req: CrudRequest = { 
    parsed: {
      fields: null,
      paramsFilter: [],
      authPersist: null,
      search: null,
      filter: [],
      or: [],
      join: [],
      sort: [],
      limit: null,
      offset: null,
      page: null,
      cache: null,
      includeDeleted: null,
    }, 
    options: {
      query: {
        filter: null
      },
      params: null,
      routes: {
        createOneBase: {
          returnShallow: true
        },
        updateOneBase: {
          returnShallow: true
        },
        deleteOneBase: {
          returnDeleted: true
        }
      }
    } 
  };
  const createDto = {
    'subject': 'createSubject',
    'detail': 'createDetail',
    'timestamp': new Date().getTime()
  };
  const updateDto = {
    'subject': 'updateSubject',
    'detail': 'updateDetail',
    'timestamp': new Date().getTime(),
    'read': true
  };

  let createdId = -1;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    })
      // .overrideProvider(MessagesService)
      // .useValue(messagesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    messagesService = moduleRef.get<MessagesService>(MessagesService);
    messagesController = moduleRef.get<MessagesController>(MessagesController);
  });

  describe('/messages (GET)', () => {
    it('should return an array of messages', async () => {
      const response = await messagesController.service.find()
      expect(response).toBeInstanceOf(Array);
      expect(response.length).toBeGreaterThanOrEqual(0);
      if (response.length) {
        expect(response[0]['read']).not.toBeUndefined();
        expect(response[0]).toHaveProperty('subject');
        expect(response[0]['timestamp']).toBeLessThanOrEqual(new Date().getTime());
      }
    });
  });

  describe('/messages (POST)', () => {
    it('should return newly created message', async () => {
      const response = await messagesController.service.createOne(
        req,
        createDto
      );
      createdId = response.id;
      expect(response).toBeInstanceOf(Object);
      expect(response.subject).toEqual('createSubject');
      expect(response.detail).toEqual('createDetail');
      expect(response.read).toBeFalsy();
    });
  });

  describe('/messages/:id (GET)', () => {
    it('should return message with id', async () => {
      const response = await messagesController.service.findOne(createdId);
      expect(response).toBeInstanceOf(Object);
      expect(response.subject).toEqual('createSubject');
      expect(response.detail).toEqual('createDetail');
      expect(response.read).toBeFalsy();
    });
  });

  describe('/messages/:id(-1) (GET)', () => {
    it('should return undefined', async () => {
      const response = await messagesController.service.findOne(-1);
      expect(response).toBeUndefined();
    });
  });

  describe('/messages (PUT)', () => {
    it('should return updated message', async () => {
      const response = await messagesController.service.updateOne(
        req,
        updateDto
      );
      expect(response).toBeInstanceOf(Object);
      expect(response.subject).toEqual('updateSubject');
      expect(response.detail).toEqual('updateDetail');
      expect(response.read).toBeTruthy();
    });
  });

  describe('/messages/:id (DELETE)', () => {
    it('should delete created(updated) above message and return 1', async () => {
      const rq = req;
      rq.options.query.filter = {
        field: 'id',
        operator: 'eq',
        value: createdId
      }
      const response = await messagesController.service.deleteOne(
        rq
      );
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
