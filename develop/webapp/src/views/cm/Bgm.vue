<template>
  <BasicLayout>
    <template #header>
      <Header>
        <template #title>BGM</template>
      </Header>
    </template>
    <template #contents>
      <ContentsBase>
        <template #sub-menu>
          <SubMenu>
            <SubMenuItem
              v-for="bgmIndustry in bgmIndustries"
              :key="bgmIndustry.cd"
              :isSelected="bgmIndustry.cd == activeBgmIndustryCd"
              @click="clickBgmIndustry(bgmIndustry.cd)"
            >
              {{ bgmIndustry.name }}
            </SubMenuItem>
          </SubMenu>
        </template>
        <List>
          <template #header>
            <ListHeader>
              <select class="form-control w-25" v-model="sort" @change="sortBgm">
                <option v-for="bgmSort in bgmSorts" :key="bgmSort.cd" :value="bgmSort.cd">
                  {{ bgmSort.name }}
                </option>
              </select>
            </ListHeader>
          </template>
          <ListItem v-for="bgm in bgms" :key="bgm.id">
            <template #title>
              <h2>{{ bgm.title }}</h2>
            </template>
            <template #line1>
              <p>{{ bgm.description }}</p>
            </template>
            <template #operations>
              <Button
                type="rectangle"
                class="btn-play"
                @click="selectBgmAndOpenPlayModal(bgm)"
              >
                <img src="@/assets/icon_play.svg" />試聴
              </Button>
              <Button
                type="rectangle"
                class="btn-select"
                @click="setBgm(bgm)"
              >
                選択<img src="@/assets/icon_select.svg" />
              </Button>
            </template>
          </ListItem>
        </List>
      </ContentsBase>
    </template>
  </BasicLayout>
  <!-- modal -->
  <transition>
    <ModalDialog v-if="isPlayModalAppear" @close="stopAndClosePlayModal">
      <template #header>
        <ModalHeader title="試聴" @close="stopAndClosePlayModal" />
      </template>
      <template #contents>
        <PlayDialogContents
          :isLoading="isDownloading"
          :isPlaying="isPlaying"
          :playbackTime="playbackTime"
          :duration="duration"
          @play="play(selectedBgm)"
          @stop="stop"
        />
      </template>
      <template #footer>
        <ModalFooter :noBorder="true">
          <Button type="rectangle" @click="stopAndClosePlayModal">終了</Button>
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
  <transition>
    <ModalDialog v-if="isSaveModalAppear" size="large" @close="closeSaveModal">
      <template #header>
        <ModalHeader title="保存しますか？" @close="closeSaveModal" />
      </template>
      <template #contents>
        <FormGroup title="タイトル" :required="true">
          <TextBox />
        </FormGroup>
        <FormGroup title="説明">
          <TextArea />
        </FormGroup>
      </template>
      <template #footer>
        <ModalFooter>
          <Button type="secondary" @click="closeSaveModal">キャンセル</Button>
          <Button type="primary" @click="closeSaveModal">保存する</Button>
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
  <transition>
    <ModalDialog v-if="isSavedModalAppear" @close="closeSavedModal">
      <template #contents>
        <MessageDialogContents>
          保存が完了しました。
        </MessageDialogContents>
      </template>
      <template #footer>
        <ModalFooter :noBorder="true">
          <Button type="rectangle" @click="closeSavedModal">閉じる</Button>
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import AudioPlayer from "@/utils/AudioPlayer";
import AudioStore from "@/store/audio";
import * as UMesseApi from "umesseapi";
import { BgmItem } from "umesseapi/models";
import { useGlobalStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import * as Common from "@/utils/Common";
import { config } from "@/utils/UMesseApiConfiguration";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import SubMenu from "@/components/organisms/SubMenu.vue";
import SubMenuItem from "@/components/molecules/SubMenuItem.vue";
import List from "@/components/organisms/List.vue";
import ListHeader from "@/components/molecules/ListHeader.vue";
import ListItem from "@/components/molecules/ListItem.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import PlayDialogContents from "@/components/molecules/PlayDialogContents.vue";
import MessageDialogContents from "@/components/molecules/MessageDialogContents.vue";
import FormGroup from "@/components/molecules/FormGroup.vue";
import TextBox from "@/components/atoms/TextBox.vue";
import TextArea from "@/components/atoms/TextArea.vue";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
    Button,
    SubMenu,
    SubMenuItem,
    List,
    ListHeader,
    ListItem,
    ModalDialog,
    ModalHeader,
    ModalFooter,
    PlayDialogContents,
    MessageDialogContents,
    FormGroup,
    TextBox,
    TextArea,
  },
  setup() {
    const router = useRouter();
    const audioStore = AudioStore();
    const audioPlayer = AudioPlayer();
    const api = new UMesseApi.ResourcesApi(config);
    const { cm, base } = useGlobalStore();

    const state = reactive({
      activeBgmIndustryCd: "01",
      sort: 1,
      bgmSorts: computed(() => Common.getSort()),
      bgms: [] as BgmItem[],
      bgmIndustries: computed(() => Common.getBgmIndustries()),
      selectedBgm: null as BgmItem | null,
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: computed(() => audioStore.isDownloading),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      isPlayModalAppear: false,
      isSaveModalAppear: false,
      isSavedModalAppear: false,
    });

    const setBgm = (bgm: BgmItem) => {
      cm.setBgm(bgm);
      router.push({ name: "Cm" });
    };

    const selectBgm = (bgm: BgmItem) => {
      state.selectedBgm = bgm;
    };

    const clickBgmIndustry = (bgmIndustryCd: string) => {
      state.activeBgmIndustryCd = bgmIndustryCd;
      fetchBgm();
    };

    const fetchBgm = async () => {
      const response = await api.listBgm(state.activeBgmIndustryCd);
      state.bgms = response.data;
    };

    const sortBgm = async () => {
      const response = await api.listBgm(state.activeBgmIndustryCd, state.sort);
      state.bgms = response.data;
    };

    const play = async (bgm: BgmItem) => {
      const audioBuffer = await getAudioBuffer(bgm.contentsId, bgm.category);
      audioPlayer.start(audioBuffer);
    };

    const getAudioBuffer = async (contentsId: string, category: string) => {
      const cacheKey = `${category}/${contentsId}`;
      if (base.cache.has(cacheKey)) {
        return <AudioBuffer>base.cache.get(cacheKey);
      }
      const response = await api.getSignedUrl(contentsId, category);
      await audioStore.download(response.data.url);
      base.cache.set(cacheKey, <AudioBuffer>audioStore.audioBuffer);
      return <AudioBuffer>audioStore.audioBuffer;
    };

    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };

    const openPlayModal = () => {
      state.isPlayModalAppear = true;
    };
    const closePlayModal = () => {
      state.isPlayModalAppear = false;
    };

    const openSaveModal = () => {
      state.isSaveModalAppear = true;
    };
    const closeSaveModal = () => {
      state.isSaveModalAppear = false;
    };

    const openSavedModal = () => {
      state.isSavedModalAppear = true;
    };
    const closeSavedModal = () => {
      state.isSavedModalAppear = false;
    };

    const selectBgmAndOpenPlayModal = (chime: BgmItem) => {
      selectBgm(chime);
      openPlayModal();
    };
    const stopAndClosePlayModal = () => {
      stop();
      closePlayModal();
    };

    onMounted(async () => {
      fetchBgm();
    });

    return {
      ...toRefs(state),
      setBgm,
      selectBgm,
      clickBgmIndustry,
      play,
      stop,
      openPlayModal,
      closePlayModal,
      openSaveModal,
      closeSaveModal,
      openSavedModal,
      closeSavedModal,
      selectBgmAndOpenPlayModal,
      stopAndClosePlayModal,
      sortBgm,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
