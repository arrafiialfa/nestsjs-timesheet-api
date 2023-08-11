/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })

  app.use('/uploads', express.static('uploads'));
  app.use(multer({ storage }).any())

  await app.listen(3000);
}
bootstrap();
