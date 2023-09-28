import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exception/validation.exception";



@Injectable()
export class ValidationPipe implements PipeTransform<any>{
    async transform(value:any, metadata: ArgumentMetadata):Promise<any>{
        const obj = plainToClass(metadata.metatype,value) //преобразовывает значение в нужный для нас класс
        const errors = await validate(obj)

        if(errors.length){
            let messages = errors.map(err=>{
                return `${err.property} - ${Object.values(err.constraints).join(', ')}` //превращаем массив ошибок в удовную строку
            })
            throw new ValidationException(messages)
        }
    }
}