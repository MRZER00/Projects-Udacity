import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../index';
import  { resizeimage } from '../units/Resizing_images';


const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the (api/Resize-Images) endpoint and returns a 500 error', async () => {
      const response = await request.get('/api/Resize-Images');
      expect(response.status).toBe(500);
    }
  );
});

describe('Test parmeteres to image processing function.', () => {
  it('sending parmeteres to the function to test it.', async () => {
    const imgname = path.join(process.cwd(), 'imags/', 'img4') + '.jpg';
    expect(resizeimage(imgname, 1200, 600, 'test.jpg' )).toBeDefined();
  });
});


describe('Test image processing with send request to server', () => {
  const imgname = 'img4';
  const wi = '1200';
  const he = '600';
  const outputimg = `${path.resolve(__dirname, '../', '../', 'imags', 'thum', imgname)}-${wi}-${he}.jpg`;

  it('Check if requested file is available output-image ', async () => {
    expect(fs.existsSync(outputimg)).toBeTrue();
  });

  it('returns a proper error message when the name is not found', async () => {
    const response = await request.get(
      `/api/Resize-Images?imgname=testname&width=${wi}&height=${he}`
    );
    expect(response.text).toBe(
      '<h1>testname is unvalid</h1><h2>Please pass a valid filename in the \' imgname \' query segment. Available filenames are:</h2><ul><li>img1<li>img2<li>img3<li>img4<li>img5</ul>.'
    );
  });

  it('returns a proper error message when the width = 0', async () => {
    const response = await request.get(
      `/api/Resize-Images?imgname=${imgname}&width=0&height=${he}`
    );
    expect(response.text).toBe(
      '<h1>parameters (width or height) is unvalid</h1><h2>Please pass a valid width in the \' width \' query segment'
    );
  });

  it('returns a proper error message when the height = 0', async () => {
    const response = await request.get(
      `/api/Resize-Images?imgname=${imgname}&width=${wi}&height=0`
    );
    expect(response.text).toBe(
      '<h1>parameters (width or height) is unvalid</h1><h2>Please pass a valid height in the \' height \'  query segment'
    );
  });
});
