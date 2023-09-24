import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder , SwaggerModule } from "@nestjs/swagger"


async function start() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder() //конфигурация свагера
        .setTitle("Тест свагера")
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('Alex')
        .build()
    const document = SwaggerModule.createDocument(app,config) // создание документа
    SwaggerModule.setup('/api/docs', app , document) // размещение документа
    await app.listen(PORT , ()=> console.log(`sever started at ${PORT}`, process.env.POSTGRES_PASSWORD))
}

start()