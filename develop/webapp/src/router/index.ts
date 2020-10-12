import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Narration from '../views/Narration.vue'
import RecordingStart from '../views/RecordingStart.vue'
import RecordedMaterial from '../views/RecordedMaterial.vue'
import CreatedCm from '../views/CreatedCm.vue'
import OrderVoiceBgm from '../views/OrderVoiceBgm.vue'
import CreateCommercial from '../views/CreateCommercial.vue'
import NewOrder from '../views/NewOrder.vue'
import ApiConnectTest from '../views/ApiConnectTest.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/narration',
    name: 'Narration',
    component: Narration
  },
  {
    path: '/recordingStart',
    name: 'RecordingStart',
    component: RecordingStart
  },
  {
    path: '/recordedmaterial',
    name: 'RecordedMaterial',
    component: RecordedMaterial
  },
  {
    path: '/createdcm',
    name: 'CreatedCm',
    component: CreatedCm
  },
  {
    path: '/ordervoicebgm',
    name: 'OrderVoiceBgm',
    component: OrderVoiceBgm
  },
  {
    path: '/ordervoicebgm',
    name: 'OrderVoiceBgm',
    component: OrderVoiceBgm
  },
  {
    path: '/new-order',
    name: 'NewOrder',
    component: NewOrder
  },
  // TODO: 実際には使わないので後で消す
  {
    path: '/apiconnecttest',
    name: 'ApiConnectTest',
    component: ApiConnectTest
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
