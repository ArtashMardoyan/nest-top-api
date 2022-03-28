import * as request from 'supertest';
import { Types, disconnect } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { REVIEW_NOT_FOUND_ERROR } from '../src/review/review.constants';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { AppModule } from '../src/app.module';

const productId = new Types.ObjectId().toHexString();

const loginDto: AuthDto = { login: 'test-2@mailinator.com', password: 'test' };
const createReviewDto: CreateReviewDto = {
    name: 'Name',
    title: 'Title',
    description: 'Description',
    rating: 5,
    productId
};

describe('ReviewController (e2e)', () => {
    let app: INestApplication;
    let createdReviewId: string;
    let accessToken: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const { body } = await request(app.getHttpServer()).post('/auth/login').send(loginDto);
        accessToken = `Bearer ${body.accessToken}`;
    });

    it('Review Create (SUCCESS)', done => {
        request(app.getHttpServer())
            .post('/review/create')
            .send(createReviewDto)
            .expect(HttpStatus.CREATED)
            .then(({ body }: request.Response) => {
                createdReviewId = body._id;
                expect(createdReviewId).toBeDefined();
                done();
            });
    });

    it('Review Create (FAIL)', done => {
        request(app.getHttpServer())
            .post('/review/create')
            .send({ ...createReviewDto, rating: 6 })
            .expect(HttpStatus.BAD_REQUEST)
            .then(() => done());
    });

    it('Find Review By Product (SUCCESS)', done => {
        request(app.getHttpServer())
            .get(`/review/byProduct/${productId}`)
            .expect(HttpStatus.OK)
            .then(({ body }: request.Response) => {
                expect(body.length).toBe(1);
                done();
            });
    });

    it('Find Review By Product (FAIL)', done => {
        request(app.getHttpServer())
            .get(`/review/byProduct/${new Types.ObjectId().toHexString()}`)
            .expect(HttpStatus.OK)
            .then(({ body }: request.Response) => {
                expect(body.length).toBe(0);
                done();
            });
    });

    it('Review Delete (SUCCESS)', done => {
        request(app.getHttpServer())
            .delete(`/review/${createdReviewId}`)
            .set('Authorization', accessToken)
            .expect(HttpStatus.ACCEPTED)
            .then(() => done());
    });

    it('Review Delete (FAIL)', done => {
        request(app.getHttpServer())
            .delete(`/review/${new Types.ObjectId().toHexString()}`)
            .set('Authorization', accessToken)
            .expect(HttpStatus.NOT_FOUND, {
                statusCode: HttpStatus.NOT_FOUND,
                message: REVIEW_NOT_FOUND_ERROR
            })
            .then(() => done());
    });

    afterAll(() => {
        disconnect();
    });
});
