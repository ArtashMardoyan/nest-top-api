import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { AuthDto } from '../src/auth/dto/auth.dto';
import { AppModule } from '../src/app.module';

const loginDto: AuthDto = { login: 'test-2@mailinator.com', password: 'test' };

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let accessToken: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Login (SUCCESS)', done => {
        request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(HttpStatus.OK)
            .then(({ body }: request.Response) => {
                expect(body.accessToken).toBeDefined();
                done();
            });
    });

    it('RLogin (FAIL)', done => {
        request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, password: 'test2' })
            .expect(HttpStatus.UNAUTHORIZED)
            .then(() => done());
    });

    afterAll(() => {
        disconnect();
    });
});
