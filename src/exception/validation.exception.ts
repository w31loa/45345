import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidationException extends HttpException{
    massages;

    constructor(response){
        super(response, HttpStatus.BAD_REQUEST)
        this.massages = response
    }
}