<template lang="pug">
body
  .container
    h1 Object Detection
    input(type="file", @change="onFileChange", accept="image/*")
    .progress-bar(v-if="loading")
      .progress
    .image-container(v-if="imageUrl")
      img(:src="imageUrl", ref="image", @load="detectObjects")
      canvas(ref="canvas")
    ul.object-list(v-if="objects.length")
      li(v-for="object in objects", :key="object.class") {{ object.class }} - {{ (object.score * 100).toFixed(2) }}%
</template>

<script>
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

export default {
  data() {
    return {
      imageUrl: null,
      objects: [],
      loading: false
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
      this.objects = []; // Clear previous detections
    },
    async detectObjects() {
      this.loading = true;
      const model = await cocoSsd.load();
      const img = this.$refs.image;
      const predictions = await model.detect(img);
      this.objects = predictions;
      this.drawBoxes(predictions);
      this.loading = false;
    },
    drawBoxes(predictions) {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      const img = this.$refs.image;

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);

      predictions.forEach(prediction => {
        context.beginPath();
        context.rect(...prediction.bbox);
        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.fillStyle = 'red';
        context.stroke();
        context.fillText(
          `${prediction.class} ${(prediction.score * 100).toFixed(2)}%`,
          prediction.bbox[0],
          prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10
        );
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}

input[type="file"] {
  display: block;
  margin: 20px auto;
}

.image-container {
  position: relative;
  display: inline-block;
  margin-top: 20px;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.progress-bar {
  width: 100%;
  background-color: #f3f3f3;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
  position: relative;
  height: 25px;
}

.progress {
  width: 100%;
  height: 100%;
  background-color: #4caf50;
  border-radius: 5px;
  animation: progress 2s infinite;
}

@keyframes progress {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

.object-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
  text-align: left;
}

.object-list li {
  font-size: 1.2em;
  color: #555;
  background: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 5px;
  border-radius: 5px;
}
</style>