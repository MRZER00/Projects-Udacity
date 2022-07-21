import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../index';


const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the (api/Resize-Images) endpoint and returns a 500 error', async () => {
      const response = await request.get('/api/Resize-Images');
      expect(response.status).toBe(500);
    }
  );
});



describe('Test image processing', () => {
  const imgname = 'img4';
  const wi = '1200';
  const he = '600';
  const outputimg = `${path.resolve(__dirname, '../', '../', 'imags', 'thum', imgname)}-${wi}-${he}.jpg`;


  it('resizes an image when proper parameters are set in the url', async () => {
    await request.get(
      `/api/Resize-Images?imgname=${imgname}&width=${wi}&height=${he}`
    );
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
      '<h1>parameters (width or height) is unvalid</h1><h2>Please pass a valid height in the \' height \' query segment'
    );
  });
});
