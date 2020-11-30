import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Narration from '@/views/Narration.vue'
import RecordingStart from '@/views/RecordingStart.vue'
import RecordedMaterial from '@/views/RecordedMaterial.vue'
import CreatedCm from '@/views/CreatedCm.vue'
import OrderVoiceBgm from '@/views/OrderVoiceBgm.vue'
import CreateCommercial from '@/views/CreateCommercial.vue'
import NewOrder from '@/views/NewOrder.vue'
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
