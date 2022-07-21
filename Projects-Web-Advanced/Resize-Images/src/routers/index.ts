import Router  from 'express';
import ResizingImages from '../units/Resizing_images';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const route = Router();

// route.use('/api', route);
route.use('/Resize-Images', ResizingImages, async (req: {
    query: {
      imgname?: string;
      width?: number;
      height?: number;
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, res: any ): Promise<void> => {
    // res.send('<h1>api/img : welcome</h1><h1>EX:</h1><h2>http://localhost:2020/?imgname=(images name)&width=(numper)&height=(numper)<br>http://localhost:2020/?imgname=img4&width=1200&height=500></h2><h3>list images name is found:</h3><ul><li>img1<li>img2<li>img3<li>img4<li>img5</ul> ')
   
    try {
        const imgname = req.query.imgname as string;
        const wi = Number(req.query.width);
        const he = Number(req.query.height);
        
        const outputimg = `${path.resolve(__dirname, '../', '../', 'imags', 'thum', imgname)}-${wi}-${he}.jpg`;
    
        // Check if requested file is available
        if (! fs.existsSync(outputimg)) {
            const orgImage = (imgname);
            res.send(`Please pass a valid filename in the 'filename' query segment. Available filenames are: ${orgImage}.`);

        }
        
        await fs.readFile(outputimg, (_error:Error, img:string)=>{
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(img);
        });
    } catch (error) {
        res.send(error);
    }
});

export default route;
