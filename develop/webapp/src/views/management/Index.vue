<template>
  <BasicLayout>
    <template #header>
      <Header>
        <template #title>店内アナウンスの管理</template>
      </Header>
    </template>
    <template #contents>
      <ContentsBase>
        <template #sub-menu>
          <SubMenu>
            <SubMenuItem
              v-for="scene in scenes"
              :key="scene.cd"
              :isSelected="scene.cd == activeSceneCd"
              @click="clickScene(scene.cd)"
            >
              {{ scene.name }}
            </SubMenuItem>
          </SubMenu>
        </template>
        <List>
          <template #header>
            <ListHeader>
              <Sort
                v-model="sort"
                @update:modelValue="fetchCm"
                :options="
                  cmSorts.map((cmSort) => {
                    return { title: cmSort.name, value: cmSort.cd };
                  })
                "
              />
            </ListHeader>
          </template>
          <ListItem v-for="cm in cms" :key="cm.cmId">
            <template #title>
              <h2>{{ cm.title }}</h2>
            </template>
            <template #line1>
              <p>{{ cm.description }}</p>
            </template>
            <template #line2>
              <p>
                <span class="duration">{{
                  convertNumberToTime(cm.seconds)
                }}</span>
                <span class="start">{{
                  convertDatestringToDate(cm.timestamp)
                }}</span>
                <span class="end"
                  >ステータス：{{
                    Constants.CM_STATUS.find((v) => v.cd == cm.status).name
                  }}</span
                >
              </p>
            </template>
            <template #operations>
              <Button
                type="rectangle"
                class="btn-play"
                @click="selectCmAndOpenPlayModal(cm)"
              >
                <img src="@/assets/icon_play.svg" />試聴
              </Button>
              <button
                class="btn btn-link dropdown-toggle btn-lg"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg
                  width="2.5em"
                  height="2.5em"
                  viewBox="0 0 16 16"
                  class="bi bi-three-dots"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                  />
                </svg>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  class="dropdown-item"
                  href="#"
                  @click.prevent="selectCmAndOpenSaveModal(cm)"
                  >タイトル/説明 編集</a
                >
                <a class="dropdown-item" href="#" @click="toEditCm(cm)"
                  >コンテンツ編集</a
                >
                <a class="dropdown-item" href="#">U MUSICにアップロード</a>
                <a
                  class="dropdown-item"
                  @click.prevent="selectCmAndOpenRemoveModal(cm)"
                  href="#"
                  >削除</a
                >
              </div>
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
          @play="play(selectedCm)"
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
        <ModalHeader title="タイトルと説明の編集" @close="closeSaveModal" />
      </template>
      <template #contents>
        <FormGroup title="タイトル" :required="true">
          <TextBox v-model="title" />
        </FormGroup>
        <FormGroup title="説明">
          <TextArea v-model="description" />
        </FormGroup>
        <FormGroup title="シーン">
          <SelectBox
            v-model="scene"
            :options="
              Constants.SCENES.map((scene) => {
                return { title: scene.name, value: scene.cd };
              })
            "
          />
        </FormGroup>
      </template>
      <template #footer>
        <ModalFooter>
          <Button type="secondary" @click="closeSaveModal">キャンセル</Button>
          <Button
            type="primary"
            :isDisabled="!title || isUploading"
            @click="saveAndOpenSavedModal"
            >保存する</Button
          >
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
  <transition>
    <ModalDialog
      v-if="isSavedModalAppear"
      size="small"
      @close="closeSavedModal"
    >
      <template #contents>
        <MessageDialogContents> 保存が完了しました。 </MessageDialogContents>
      </template>
      <template #footer>
        <ModalFooter :noBorder="true">
          <Button type="rectangle" @click="closeSavedModal">閉じる</Button>
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
  <transition>
    <ModalDialog v-if="isRemoveModalAppear" @close="closeRemoveModal">
      <template #header>
        <ModalHeader title="確認" @close="closeRemoveModal" />
      </template>
      <template #contents>
        <MessageDialogContents>
          削除してよろしいですか？
        </MessageDialogContents>
      </template>
      <template #footer>
        <ModalFooter>
          <Button type="secondary" @click="closeRemoveModal">キャンセル</Button>
          <Button type="primary" @click="removeAndOpenRemovedModal"
            >はい</Button
          >
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
  <transition>
    <ModalDialog
      v-if="isRemovedModalAppear"
      size="small"
      @close="closeRemovedModal"
    >
      <template #contents>
        <MessageDialogContents> 削除が完了しました。 </MessageDialogContents>
      </template>
      <template #footer>
        <ModalFooter :noBorder="true">
          <Button type="rectangle" @click="closeRemovedModal">閉じる</Button>
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import AudioPlayer from "@/utils/AudioPlayer";
import AudioStore from "@/store/audio";
import * as Common from "@/utils/Common";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import Sort from "@/components/molecules/Sort.vue";
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
import { CmItem } from "umesseapi/models/cm-item";
import { useGlobalStore } from "@/store";
import {
  convertDatestringToDate,
  convertNumberToTime,
} from "@/utils/FormatDate";
import Constants from "@/utils/Constants";
import { useRouter } from "vue-router";
import SelectBox from "@/components/atoms/SelectBox.vue";
import UMesseApi from "@/repository/UMesseApi";
import UMesseService from "@/services/UMesseService";
export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
    Button,
    Sort,
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
    SelectBox,
  },
  setup() {
    const router = useRouter();
    const audioPlayer = AudioPlayer();
    const audioStore = AudioStore();
    const { auth, cm } = useGlobalStore();
    const state = reactive({
      activeSceneCd: "001",
      scenes: computed(() => Common.getManagementScenes()),
      cms: [] as CmItem[],
      sort: 4,
      cmSorts: computed(() => Common.getSort()),
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: computed(() => audioStore.isDownloading),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      selectedCm: null as CmItem | null,
      title: "",
      description: "",
      scene: "",
      isPlayModalAppear: false,
      isSaveModalAppear: false,
      isSavedModalAppear: false,
      isRemoveModalAppear: false,
      isRemovedModalAppear: false,
      isUploading: false,
    });
    const clickScene = (sceneCd: string) => {
      state.activeSceneCd = sceneCd;
      fetchCm();
    };
    const fetchCm = async () => {
      // TODO: auth.getToken()のトークンだとデータが空なので固定値をセットする
      // const xUnisCustomerCd = auth.getToken()!!;
      const xUnisCustomerCd = "123456789";
      // TODO: sceneを指定する必要がある？
      const response = await UMesseApi.cmApi.listUserCm(
        xUnisCustomerCd,
        state.sort
      );
      state.cms = response.data.filter((v) => {
        if (!v.scene) return false;
        return v.scene.sceneCd == state.activeSceneCd;
      });
    };
    const selectCm = (cm: CmItem) => {
      state.selectedCm = cm;
    };
    const play = async (cm: CmItem) => {
      if (state.isPlaying) return;
      const response = await UMesseApi.resourcesApi.getSignedUrl(cm.cmId, "cm");
      console.log(response.data.url);
      await audioStore.download(response.data.url);
      audioPlayer.start(<AudioBuffer>audioStore.audioBuffer);
    };
    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };
    const save = async (cm: CmItem) => {
      const xUnisCustomerCd = "123456789";
      const response = await UMesseService.uploadCmService.update(
        xUnisCustomerCd,
        cm.cmId,
        state.title,
        state.description,
        state.scene,
        cm.productionType
      );
      fetchCm();
    };
    const remove = async (cmId: string) => {
      // TODO: auth.getToken()のトークンだとデータが空なので固定値をセットする
      // const xUnisCustomerCd = auth.getToken()!!;
      const xUnisCustomerCd = "123456789";
      const response = await UMesseService.uploadCmService.remove(
        xUnisCustomerCd,
        cmId
      );
      fetchCm();
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
    const openRemoveModal = () => {
      state.isRemoveModalAppear = true;
    };
    const closeRemoveModal = () => {
      state.isRemoveModalAppear = false;
    };
    const openRemovedModal = () => {
      state.isRemovedModalAppear = true;
    };
    const closeRemovedModal = () => {
      state.isRemovedModalAppear = false;
    };
    const selectCmAndOpenPlayModal = (cm: CmItem) => {
      selectCm(cm);
      openPlayModal();
    };
    const selectCmAndOpenSaveModal = (cm: CmItem) => {
      selectCm(cm);
      state.title = cm.title;
      state.description = cm.description;
      state.scene = cm.scene.sceneCd;
      console.log(state.title);
      openSaveModal();
    };
    const selectCmAndOpenRemoveModal = (cm: CmItem) => {
      selectCm(cm);
      openRemoveModal();
    };
    const stopAndClosePlayModal = () => {
      stop();
      closePlayModal();
    };
    const saveAndOpenSavedModal = async () => {
      try {
        state.isUploading = true;
        if (!state.selectedCm) return;
        await save(state.selectedCm);
        state.isUploading = false;
        closeSaveModal();
        setTimeout(() => {
          openSavedModal();
        }, 500);
      } catch (e) {
        console.log(e.message);
      } finally {
        state.isUploading = false;
      }
    };
    const removeAndOpenRemovedModal = async () => {
      await remove(state.selectedCm?.cmId);
      closeRemoveModal();
      setTimeout(() => {
        openRemovedModal();
      }, 500);
    };
    const toEditCm = (cmItem: CmItem) => {
      console.log(cmItem);
      cm.setCm(cmItem);
      router.push({ name: "Cm" });
    };
    onMounted(async () => {
      fetchCm();
    });
    return {
      ...toRefs(state),
      play,
      stop,
      remove,
      clickScene,
      selectCm,
      convertDatestringToDate,
      convertNumberToTime,
      openPlayModal,
      closePlayModal,
      openSaveModal,
      closeSaveModal,
      openSavedModal,
      closeSavedModal,
      openRemoveModal,
      closeRemoveModal,
      openRemovedModal,
      closeRemovedModal,
      selectCmAndOpenPlayModal,
      selectCmAndOpenSaveModal,
      selectCmAndOpenRemoveModal,
      stopAndClosePlayModal,
      saveAndOpenSavedModal,
      removeAndOpenRemovedModal,
      toEditCm,
      Constants,
      fetchCm,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
.btn:focus {
  box-shadow: none;
}
.dropdown-toggle::after {
  content: none;
}
</style>