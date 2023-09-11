/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as multer from 'multer';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from "@nestjs/common"


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      //error logs
      transports: [
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '30d'
        }),

        //combined logs
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-combined.log`,
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '30d',
        }),

        // console logs
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        })
      ]
    })
  });

  //swagger module initalization
  const config = new DocumentBuilder()
    .setTitle('Timesheet API Documentation ')
    .setDescription('API Documentation using swagger')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use('/uploads', express.static('uploads'));
  app.use(multer().any())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3001);
}
bootstrap();
