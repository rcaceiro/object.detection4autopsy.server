const polka = require('polka');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Yolo = require('@vapi/node-yolo');

const yolo_detector = new Yolo(__dirname + '/darknet_configs', 'cfg/coco.data', 'cfg/yolov3-spp.cfg', 'yolov3-spp.weights');

const video_extensions = ['.3gp', '.3g2', '.asf', '.wma', '.wmv', '.avi', '.divx', '.evo', '.f4v', '.flv', '.mkv', '.mk3d', '.mka', '.mks', '.webm', '.mcf', '.mp4', '.mpg', '.mpeg', '.ts', '.m2p', '.ps', '.m2ts', '.mxf', '.ogg', '.rmvb', '.mov', '.qt', '.vob', '.ifo'];
const image_extensions = ['.jpeg', '.jpe', '.jpg', '.jp2', '.tiff', '.tif', '.bmp', '.png', '.ppm', '.pgm', '.pbm', '.sr', '.ras', 'dib'];

const storage_config = multer.diskStorage({
 destination: __dirname + '/files_to_classify/',
 filename: function(req, file, cb)
 {
  cb(null, file.originalname + '-' + Date.now() + '-' + Math.floor(Math.random() * 1000000000000) + 1 + path.extname(file.originalname));
 }
});

const file_image_receiver = multer({
 storage: storage_config,
 fileFilter: (req, file, cb) =>
 {
  const extension = path.extname(file.originalname);
  for(let image_extension of image_extensions)
  {
   if(extension === image_extension)
   {
    cb(null, true);
    return;
   }
  }
  cb(null, false);
 }
});

const file_video_receiver = multer({
 storage: storage_config,
 fileFilter: (req, file, cb) =>
 {
  const extension = path.extname(file.originalname);
  for(let video_extension of video_extensions)
  {
   if(extension === video_extension)
   {
    cb(null, true);
    return;
   }
  }
  cb(null, false);
 }
});

const app = polka({});

app.get('/ping', (req, res) =>
{
 res.statusCode = 200;
 res.end();
});

const image_receiver = file_image_receiver.single('file');
const video_receiver = file_video_receiver.single('file');

app.post('/process/image', image_receiver, (req, res) =>
{
 if(!req.file)
 {
  res.statusCode = 415;
  res.end();
  return;
 }
 yolo_detector.detectImage(req.file.path, 0.55)
              .then(detections =>
              {
               res.statusCode = 200;
               res.end(JSON.stringify(detections));
              })
              .catch(error =>
              {
               res.statusCode = 400;
               res.end(JSON.stringify(error));
              })
              .finally(() =>
              {
               fs.unlink(req.file.path,(err)=>{
                if(err)
                {
                 console.error(err);
                }
               });
              });
});

app.post('/process/video', video_receiver, (req, res) =>
{
 if(!req.file)
 {
  res.statusCode = 415;
  res.end();
  return;
 }
 yolo_detector.detectVideo(req.file.path, 0.55)
              .then(detections =>
              {
               res.statusCode = 200;
               res.end(JSON.stringify(detections));
              })
              .catch(error =>
              {
               res.statusCode = 400;
               res.end(JSON.stringify(error));
              })
              .finally(() =>
              {
               fs.unlink(req.file.path,(err)=>{
                if(err)
                {
                 console.error(err);
                }
               });
              });
});

app.listen(80, (err) =>
{
 if(err)
 {
  console.error(err);
 }
});

process.on('uncaughtException', (e) =>
{
 console.error(e);
});