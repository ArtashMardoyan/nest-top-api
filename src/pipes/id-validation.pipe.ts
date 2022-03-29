import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { ID_VALIDATION_ERROR } from './ad-validation.constant';

@Injectable()
export class IdValidationPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        if (metadata.type === 'param' && !Types.ObjectId.isValid(value)) {
            throw new BadRequestException(ID_VALIDATION_ERROR);
        }

        return value;
    }
}
