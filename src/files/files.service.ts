import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
    async createFile(file):Promise<string>{
        console.log(path.resolve(__dirname, '..', 'static'))
        try{
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(filePath)) { // если по пути ничего не существует
                fs.mkdirSync(filePath, {recursive: true}) // создание папки по этому пути
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;

        }catch(e){
            console.log(e)
            throw new HttpException('Ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
