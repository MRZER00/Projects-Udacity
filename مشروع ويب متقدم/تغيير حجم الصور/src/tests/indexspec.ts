import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import express from 'express';

const app = express();
const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the (api/Resize-Images) endpoint', async (done) => {
      const response = await request.get('/api/Resize-Images');
      expect(response.status).toBe(500);
      done();
  }
)});

describe('Test image processing', () => {
  const imgname = 'img4';
  const wi = '1200';
  const he = '600';
  const outputimg = `${path.resolve(__dirname,'../', '../', 'imags', 'thum', imgname)}-${wi}-${he}.jpg`;


  it('resizes an image when proper parameters are set in the url', async () => {
    await request.get(
      `/api/Resize-Images?imgname=${imgname}&width=${wi}&height=${he}`
    );
    expect(fs.existsSync(outputimg)).toBeTrue();
  });
});
