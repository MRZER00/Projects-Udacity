import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import productsRoutes from './handlers/products';
import userRoutes from './handlers/users';
import orderRoutes from './handlers/orders';

const app: express.Application = express();
const LinkHost = '127.0.0.1:2020';
// const router = express.Router();
const morgan = require('morgan');


// بيظهر نوع الطلب ف الكونسل 
app.use(morgan(':method :url :response-time'));

app.use(bodyParser.json());
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});


///////////////////////////////////////////////
productsRoutes(app)
userRoutes(app)
orderRoutes(app)

// //////////////////////////////////////////////////////
// page not found
// app.use((_req: express.Request, res: express.Response) => {
//   res.status(404);
//   fs.readFile('../Project-Web-Advanced/views/images/404.jpg',
//     (_err: Error, img: string ) => res.end(img));
// });
app.listen(2020, function () {
    console.log(`starting app on: ${LinkHost}`);
});
export default app;
