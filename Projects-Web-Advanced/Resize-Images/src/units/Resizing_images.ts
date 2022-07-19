import path from 'path';
const sharp = require('sharp');
import { promises as fsPromises } from 'fs';
import fs from 'fs';


//
const ResizingImages= async(req: { 
  query: { 
    imgname: string; 
    width: number; 
    height: number; 
  }; }, _res: any, next: any):Promise<void>=>{
      
    const imgname = req.query.imgname as string;
    const wi = Number(req.query.width);
    const he = Number(req.query.height);
    const input = path.join(process.cwd(),'imags/', imgname)+ '.jpg';
    // console.log(input);
    const outfolder = path.resolve(__dirname,'../', '../', 'imags', 'thum');
    // console.log(outfolder);
    const outputimg = `${path.resolve(__dirname,'../', '../', 'imags', 'thum', imgname)}-${wi}-${he}.jpg`;
    // console.log(outputimg);

    // ف حالة عدم وجود الملف قم بانشائه
    if (!fs.existsSync(outfolder)) {
      console.log("creat file thum ...")
      await fsPromises.mkdir(outfolder);
    }
    // مرحلة التحقق تمت بنجاح 

    // مرحلة التعديل ع الصور
    console.log("prossing image.. ...")
    await sharp(input).resize(wi, he)
      .toFile(outputimg)
      .then(() => {});
    console.log(outputimg);
  next();
}
export default ResizingImages;

