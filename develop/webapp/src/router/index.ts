import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Narration from '@/views/Narration.vue'
import RecordingStart from '@/views/RecordingStart.vue'
import CreatedCm from '@/views/CreatedCm.vue'
import OrderInStoreAnnouncement1 from '@/views/OrderInStoreAnnouncement1.vue'
import OrderInStoreAnnouncement2 from '@/views/OrderInStoreAnnouncement2.vue'
import OrderInStoreAnnouncement3 from '@/views/OrderInStoreAnnouncement3.vue'
import OrderInStoreAnnouncement4 from '@/views/OrderInStoreAnnouncement4.vue'
import OrderInStoreAnnouncement5 from '@/views/OrderInStoreAnnouncement5.vue'
import OrderInStoreAnnouncement6 from '@/views/OrderInStoreAnnouncement6.vue'
import OrderCompleted from '@/views/OrderCompleted.vue'
import SelectTemplate from '@/views/SelectTemplate.vue'
import CreateNarrationTextInput from '@/views/CreateNarrationTextInput.vue'

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
    path: '/createdcm',
    name: 'CreatedCm',
    component: CreatedCm
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
