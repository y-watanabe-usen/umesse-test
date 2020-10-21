import { reactive } from 'vue';
import * as UMesseApi from "umesseapi";
import { NarrationListItem, NarrationSceneListItem } from 'umesseapi/models';

export default function narrationStore() {
  const api = new UMesseApi.ResourcesApi()

  const state = reactive({
    narrationLists: null as NarrationListItem | null,
    narrations: null as NarrationSceneListItem | null
  });

  return {
    get narrationLists() {
      return state.narrationLists;
    },

    get narrations() {
      return state.narrations;
    },

    async fetchNarrationLists() {
      try {
        const response = await api.narrationGet()
        state.narrationLists = response.data
      } catch (e) {
        console.log(e)
      }
    },

    async fetchNarrations(sceneId: number) {
      try {
        const response = await api.narrationSceneIdGet(sceneId)
        state.narrations = response.data
      } catch (e) {
        console.log(e)
      }
    }
  };
}

export type NarrationStore = ReturnType<typeof narrationStore>;