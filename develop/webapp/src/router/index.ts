import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Cm from '@/views/cm/Index.vue';
import CmChime from '@/views/cm/Chime.vue';
import CmBgm from '@/views/cm/Bgm.vue';
import Narration from '@/views/cm/Narration.vue';
import Recording from '@/views/recording/Index.vue';
import Management from '@/views/management/Index.vue';
import VoiceTemplate from '@/views/voice/template/Index.vue';
import VoiceTemplateDetail from '@/views/voice/template/Detail.vue';
import VoiceFree from '@/views/voice/free/Index.vue';
import VoiceFreeSelectTemplate from '@/views/voice/free/SelectTemplate.vue';
import Setting from '@/views/setting/Index.vue';

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
    path: '/cm/chime/:div',
    name: 'CmChime',
    component: CmChime
  },
  {
    path: '/cm/bgm',
    name: 'CmBgm',
    component: CmBgm
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
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
