import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Narration from '@/views/Narration.vue'
import RecordingStart from '@/views/RecordingStart.vue'
import RecordedMaterial from '@/views/RecordedMaterial.vue'
import CreatedCm from '@/views/CreatedCm.vue'
import OrderVoiceBgm from '@/views/OrderVoiceBgm.vue'
import CreateCommercial from '@/views/CreateCommercial.vue'
import NewOrder from '@/views/NewOrder.vue'
import OrderInStoreAnnouncement1 from '@/views/OrderInStoreAnnouncement1.vue'
import OrderInStoreAnnouncement2 from '@/views/OrderInStoreAnnouncement2.vue'
import OrderInStoreAnnouncement3 from '@/views/OrderInStoreAnnouncement3.vue'
import OrderInStoreAnnouncement4 from '@/views/OrderInStoreAnnouncement4.vue'
import OrderInStoreAnnouncement5 from '@/views/OrderInStoreAnnouncement5.vue'
import OrderInStoreAnnouncement6 from '@/views/OrderInStoreAnnouncement6.vue'
import OrderCompleted from '@/views/OrderCompleted.vue'
import SelectTemplate from '@/views/SelectTemplate.vue'
import CreateNarrationTextInput from '@/views/CreateNarrationTextInput.vue'
import ApiConnectTest2 from '@/views/ApiConnectTest2.vue'

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
    path: '/createcommercial',
    name: 'CreateCommercial',
    component: CreateCommercial
  },
  {
    path: '/new-order',
    name: 'NewOrder',
    component: NewOrder
  },
  {
    path: '/orderinstoreannouncement1',
    name: 'OrderInStoreAnnouncement1',
    component: OrderInStoreAnnouncement1
  },
  {
    path: '/orderinstoreannouncement2',
    name: 'OrderInStoreAnnouncement2',
    component: OrderInStoreAnnouncement2
  },
  {
    path: '/orderinstoreannouncement3',
    name: 'OrderInStoreAnnouncement3',
    component: OrderInStoreAnnouncement3
  },
  {
    path: '/orderinstoreannouncement4',
    name: 'OrderInStoreAnnouncement4',
    component: OrderInStoreAnnouncement4
  },
  {
    path: '/orderinstoreannouncement5',
    name: 'OrderInStoreAnnouncement5',
    component: OrderInStoreAnnouncement5
  },
  {
    path: '/orderinstoreannouncement6',
    name: 'OrderInStoreAnnouncement6',
    component: OrderInStoreAnnouncement6
  },
  {
    path: '/ordercompleted',
    name: 'OrderCompleted',
    component: OrderCompleted
  },
  {
    path: '/selecttemplate',
    name: 'SelectTemplate',
    component: SelectTemplate
  },
  {
    path: '/createnarrationtextinput',
    name: 'CreateNarrationTextInput',
    component: CreateNarrationTextInput
  },

  // TODO: 実際には使わないので後で消す
  {
    path: '/apiconnecttest2',
    name: 'ApiConnectTest2',
    component: ApiConnectTest2
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
