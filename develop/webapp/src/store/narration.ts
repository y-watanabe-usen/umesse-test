import { reactive } from 'vue';
import * as UMesseApi from "umesseapi";
import { IndustryItem, NarrationItem, NarrationListItem, NarrationSceneListItem } from 'umesseapi/models';

type Industry = {
  id: number;
  name: string;
}

type Scene = {
  id: number;
  name: string;
}

type Narration = {
  id: number;
  name: string;
  detail?: string;
  manuscript?: string;
  url?: string;
  second?: number;
}

export default function narrationStore() {
  const api = new UMesseApi.ResourcesApi()

  const state = reactive({
    narrationLists: undefined as NarrationListItem | undefined,
    narrationSneneLists: undefined as NarrationSceneListItem | undefined,

    industries: [] as Industry[],
    scenes: [] as Scene[],
    narrations: [] as Narration[],
  });

  return {
    get industries() {
      return state.industries;
    },
    get scenes() {
      return state.scenes;
    },
    get narrations() {
      return state.narrations;
    },

    findIndustry(industryId: number) {
      if (!state.narrationLists) {
        return
      }
      const industry: IndustryItem = state.narrationLists.find(({ id }) => id === industryId)
      state.scenes = industry.scenes
    },


    async fetchNarrationLists() {
      try {
        const response = await api.narrationGet()
        state.narrationLists = response.data
        state.industries = []
        state.scenes = []
        state.narrationLists.forEach((value: IndustryItem) => {
          state.industries.push({
            id: value.id,
            name: value.name,
          })
        })
        state.scenes = state.narrationLists[0].scenes
        console.log(state.scenes)
      } catch (e) {
        console.log(e)
      }
    },

    async fetchNarrationSceneLists(sceneId: number) {
      try {
        const response = await api.narrationSceneIdGet(sceneId)
        state.narrationSneneLists = response.data
        state.narrations = <Narration[]>state.narrationSneneLists
      } catch (e) {
        console.log(e)
      }
    }
  };
}

export type NarrationStore = ReturnType<typeof narrationStore>;