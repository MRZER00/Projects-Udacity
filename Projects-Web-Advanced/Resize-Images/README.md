## Image processing API
its a fast server capable of storing, creating thumbnails, and saving them after modification is required on the client side.
API reference
Change the size of any jpg image from the local server:
- img1.jpg
- img2.jpg
- img3.jpg
- img4.jpg
- img5.jpg.

By specifying the desired image name, width, and height as parameters in the URL.
To create an image with an adjustable width and height:
  GET /api/Resize-Images/?imgname=img4&width={numper}&height={numper}

- The processed image has the same name + width and height added as parameters.
The server responds with the current image instead of processing it again.

### To run at the local level
- Project cloning
  `` git clone https://gitlab.com/ ``

- Go to the project directory

    - cd Resize-Images

- install dependencies
  - npm install
- Start the development server
  - npm run dev
### 
Run: 
 `` npm run test''
  to run the tests installed in ``src/tests/indexSpec'
The test is done using Jasmine

### Run Developer Server
- Run "npm startup"
- The project includes nodemon so any change made to the file and saved will restart the server

### Build the project
Run ``npm run build'
- Set the image you want to resize under "imags" (the file must be in .jpg format)
- Start the application with `` node build /. "
- You will get the resized image in the browser, and you can also see it under "imags / thum"
