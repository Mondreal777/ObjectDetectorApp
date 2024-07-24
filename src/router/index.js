import Vue from 'vue'
import VueRouter from 'vue-router'

//Object Detector Container
const ObjectDetectorContainer = () => import(/*webpackChunkName: "objectDetector" */ '@/views/main/object-detector/container/object-detector-container.vue');

const rootTitle = 'Image Object Detector App';

Vue.use(VueRouter);

const routes = [
  //ObjectDetector
  {
    path: '/',
    name: 'ObjectDetector',
    component: ObjectDetectorContainer,
    meta: {
      title: `${rootTitle} - ObjectDetector`,
      page: 'ObjectDetector',
      isAuthRequired: null ,
      isGloballyAccessible: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes,
})


export default router
