import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Cm from '@/views/cm/Index.vue'
import Narration from '@/views/narration/Index.vue'
import Recording from '@/views/recording/Index.vue'
import Management from '@/views/management/Index.vue'
import VoiceTemplate from '@/views/voice/template/Index.vue'
import VoiceTemplateDetail from '@/views/voice/template/Detail.vue'
import VoiceFree from '@/views/voice/free/Index.vue'
import VoiceFreeSelectTemplate from '@/views/voice/free/SelectTemplate.vue'
import OrderFlow1 from '@/views/order/Flow1.vue'
import OrderFlow2 from '@/views/order/Flow2.vue'
import OrderFlow3 from '@/views/order/Flow3.vue'
import OrderFlow4 from '@/views/order/Flow4.vue'
import OrderFlow5 from '@/views/order/Flow5.vue'
import OrderFlow6 from '@/views/order/Flow6.vue'
import OrderEnd from '@/views/order/End.vue'
import OrderHistory from '@/views/order/history/Index.vue'
import OrderHistoryDetail from '@/views/order/history/Detail.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cm',
    name: 'Cm',
    component: Cm
  },
  {
    path: '/narration',
    name: 'Narration',
    component: Narration
  },
  {
    path: '/recording',
    name: 'Recording',
    component: Recording
  },
  {
    path: '/management',
    name: 'Management',
    component: Management
  },
  {
    path: '/voice/template',
    name: 'VoiceTemplate',
    component: VoiceTemplate
  },
  {
    path: '/voice/template/detail',
    name: 'VoiceTemplateDetail',
    component: VoiceTemplateDetail
  },
  {
    path: '/voice/free',
    name: 'VoiceFree',
    component: VoiceFree
  },
  {
    path: '/voice/free/select_template',
    name: 'VoiceFreeSelectTemplate',
    component: VoiceFreeSelectTemplate
  },
  {
    path: '/order/flow1',
    name: 'OrderFlow1',
    component: OrderFlow1
  },
  {
    path: '/order/flow2',
    name: 'OrderFlow2',
    component: OrderFlow2
  },
  {
    path: '/order/flow3',
    name: 'OrderFlow3',
    component: OrderFlow3
  },
  {
    path: '/order/flow4',
    name: 'OrderFlow4',
    component: OrderFlow4
  },
  {
    path: '/order/flow5',
    name: 'OrderFlow5',
    component: OrderFlow5
  },
  {
    path: '/order/flow6',
    name: 'OrderFlow6',
    component: OrderFlow6
  },
  {
    path: '/order/end',
    name: 'OrderEnd',
    component: OrderEnd
  },
  {
    path: '/order/history',
    name: 'OrderHistory',
    component: OrderHistory
  },
  {
    path: '/order/history/:id',
    name: 'OrderHistoryDetail',
    component: OrderHistoryDetail
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
