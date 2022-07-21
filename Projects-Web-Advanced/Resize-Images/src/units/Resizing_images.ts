import path from 'path';
import { promises as fsPromises } from 'fs';
import fs from 'fs';
import { NextFunction } from 'express';


const sharp = require('sharp');

//
export const ResizingImages = async (req: {
  query: {
    imgname: string;
    width: number;
    height: number;
  };
}, res: any , next: NextFunction): Promise<void> => {

  try {
    const imgname = req.query.imgname as string;
    const wi = Number(req.query.width);
    const he = Number(req.query.height);
    const input = path.join(process.cwd(), 'imags/', imgname) + '.jpg';
      // console.log(input);
    const outfolder = path.resolve(__dirname, '../', '../', 'imags', 'thum');
      // console.log(outfolder);
    const outputimg = `${path.resolve(__dirname, '../', '../', 'imags', 'thum', imgname)}-${wi}-${he}.jpg`;
      // console.log(outputimg);
    
    // ف حالة عدم وجود الملف قم بانشائه
    if (!fs.existsSync(outfolder)) {
      console.log('creat file thum ...');
      await fsPromises.mkdir(outfolder);
    }
    // مرحلة التحقق تمت بنجاح 
    // Check if requested file is available
    if (! fs.existsSync(input)) {
      const validname = (imgname);
      res.send(`<h1>${validname} is unvalid</h1><h2>Please pass a valid filename in the ' imgname ' query segment. Available filenames are:</h2><ul><li>img1<li>img2<li>img3<li>img4<li>img5</ul>.`);
    }

    // التحقق من ارقام المعلمات 
    if ( wi < 1 || he < 2 ) {
      if ( wi < 1 ) {
        res.send('<h1>parameters (width or height) is unvalid</h1><h2>Please pass a valid width in the \' width \' query segment');
      }
      if ( he < 1 ) {
        res.send('<h1>parameters (width or height) is unvalid</h1><h2>Please pass a valid height in the \' height \' query segment');
      }
    }
    
    // مرحلة التعديل ع الصور  
    console.log('prossing image.. ...');
    await sharp(input).resize(wi, he)
      .toFile(outputimg)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then(() => {} ) ;
    console.log(outputimg);
    next();  

  } catch (error) {
    res.status(500);
    fs.readFile('../Project-Web-Advanced/views/images/500.jpg',(_err, img ) => res.end(img));
  }
};

export default ResizingImages  ;
