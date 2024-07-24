# AI Object Detection App
This project is a simple web application built with Vue.js that allows users to upload an image and detect objects within it using a pre-trained machine learning model. The application leverages TensorFlow.js and the COCO-SSD model to identify and label objects in the uploaded image. Key features include:

- Image Upload: Users can upload an image file from their device.
- Object Detection: The app uses the COCO-SSD model to detect objects in the uploaded image.
- Bounding Boxes: Detected objects are highlighted with bounding boxes and labels overlaid on the image.
- Progress Indicator: A progress bar is displayed while the image is being processed to enhance user experience.
- Results Display: A list of detected objects with their class names and confidence scores is shown below the image.

The project demonstrates the integration of Vue.js with TensorFlow.js for real-time object detection, making it an excellent example of combining modern web development techniques with machine learning capabilities.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
