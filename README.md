# Object Detection for Autopsy
This module is developed in [Java](https://www.oracle.com/technetwork/java/javase/overview/java8-2100321.html), allow to use a state-of-the-art, real-time object detection system called [Yolo](https://pjreddie.com/darknet/yolo/) on open-source forensics software called [Autopsy](https://www.autopsy.com). 

It is sponsored by [Instituto de Telecomunicações](https://www.it.pt) developed by [Rúben Caceiro](https://github.com/rcaceiro) and guided by [Patrício Domingues](https://scholar.google.com/citations?user=LPwSQ2EAAAAJ&hl=en).

### Pre-requirements
* Please get the minimum requirements from [node-yolo](https://github.com/rcaceiro/node-yolo) module 

### Minimum hardware requirements
* Please get the minimum requirements from [node-yolo](https://github.com/rcaceiro/node-yolo) module 

###Installation
```bash
sudo npm install object.detection4autopsy.server -g --unsafe-perm
```

## How To Use
```bash
port=80 od4a
```

**Note 1:** You can change port 80 to another that you want. 

###Endpoints

```html
/ping
```
**Expects:** nothing
<br>**Gives on success:** 200 response code

```html
/process/image
```
**Expects:** a image file*
<br>**Gives on success:** 200 response code with a json string with detections
<br>**Gives on error:** 400 response code with error message

```html
/process/video
```
**Expects:** a image video**
<br>**Gives on success:** 200 response code with a json string with detections
<br>**Gives on error:** 400 response code with error message
s
*Only support image extensions '.jpeg', '.jpe', '.jpg', '.jp2', '.tiff', '.tif', '.bmp', '.png', '.ppm', '.pgm', '.pbm', '.sr', '.ras', 'dib'

**Only support video extensions '.3gp', '.3g2', '.asf', '.wma', '.wmv', '.avi', '.divx', '.evo', '.f4v', '.flv', '.mkv', '.mk3d', '.mka', '.mks', '.webm', '.mcf', '.mp4', '.mpg', '.mpeg', '.ts', '.m2p', '.ps', '.m2ts', '.mxf', '.ogg', '.rmvb', '.mov', '.qt', '.vob', '.ifo'