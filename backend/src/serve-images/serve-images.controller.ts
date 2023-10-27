import { Controller, Get, Param, Res } from '@nestjs/common';
import { ServeImagesService } from './serve-images.service';
import { Response } from 'express';
import path, { dirname } from 'path';

@Controller('serve-images')
export class ServeImagesController {
  constructor(private readonly serveImagesService: ServeImagesService) {}
  @Get(':filename')
  serveImage(@Param('filename') filename: string, @Res() res: Response) {
    console.log(__dirname)
    const assetsPath = path.join(__dirname, '..', '..', 'assets', 'images', filename);
    console.log(__dirname)
    res.sendFile(assetsPath);
  }
}


 