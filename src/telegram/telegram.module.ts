import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { ITelegramModuleAsyncOptions } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';
import { TelegramService } from './telegram.service';

@Global()
@Module({})
export class TelegramModule {
    static forRootAsync(options: ITelegramModuleAsyncOptions): DynamicModule {
        const asyncOptions = this.createAsyncOptionsProvider(options);

        return {
            module: TelegramModule,
            imports: options.imports,
            exports: [TelegramService],
            providers: [TelegramService, asyncOptions]
        };
    }

    private static createAsyncOptionsProvider(options: ITelegramModuleAsyncOptions): Provider {
        return {
            provide: TELEGRAM_MODULE_OPTIONS,
            useFactory: async (...args: any[]) => options.useFactory(...args),
            inject: options.inject || []
        };
    }
}
