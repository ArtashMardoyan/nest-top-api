import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
    return { uri: getMongoString(configService), ...getMongoOptions };
};

const getMongoString = (configService: ConfigService): string => {
    // TODO ${configService.get('MONGO_LOGIN')}:${configService.get('MONGO_PASSWORD')}@
    return `mongodb://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/${configService.get(
        'MONGO_DATABASE'
    )}`;
};

const getMongoOptions = (): object => {
    return {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
};
