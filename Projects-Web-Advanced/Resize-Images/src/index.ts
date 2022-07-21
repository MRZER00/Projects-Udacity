import express from 'express';
import route from './routers/index';
const app = express();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = express.Router();

app.set('view engine', 'ejs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const morgan = require('morgan');

// بيظهر نوع الطلب ف الكونسل 
app.use(morgan(':method :url :response-time'));


app.use('/api', route);
app.get('/', (_req: express.Request, res: express.Response): void => {
  res.render('index');
});


// page not found
app.use((_req: express.Request, res: express.Response) => {
  res.status(404);
  fs.readFile('../Project-Web-Advanced/views/images/404.jpg',
    (_err: Error, img: string ) => res.end(img));
});

// server run in localhost:port
app.listen(2020, () => {
  console.log('server started at localhost:2020}');
});

export default app;
