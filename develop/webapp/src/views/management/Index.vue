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
              <select class="form-control w-25">
                <option v-for="sort in sorts" :key="sort">
                  {{ sort }}
                </option>
              </select>
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
                  convertDatestringToDate(cm.startDate)
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
    <ModalDialog v-if="isPlayModalAppear" @close="closePlayModal">
      <template #header>
        <ModalHeader title="試聴" @close="closePlayModal" />
      </template>
      <template #contents>
        <div class="row">
          <div class="col-4">
            <template v-if="isDownloading">
              <button class="btn btn-play btn-light" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Loading...</span>
              </button>
            </template>
            <template v-else>
              <template v-if="!isPlaying">
                <button
                  type="button"
                  class="btn btn-light shadow btn-play"
                  @click="play(selectedCm)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-play-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                    />
                  </svg>
                  再生
                </button>
              </template>
              <template v-else>
                <button
                  type="button"
                  class="btn btn-light shadow btn-play"
                  @click="stop"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-stop-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"
                    />
                  </svg>
                  停止
                </button>
              </template>
            </template>
          </div>
          <div class="col-8">
            <div class="row">
              <div class="col text-left" style="font-size: 17px">
                {{ playbackTimeHms }}
              </div>
              <div class="col text-right" style="font-size: 17px">
                {{ durationHms }}
              </div>
            </div>
            <meter
              min="0"
              :max="duration"
              class="w-100"
              :value="playbackTime"
            ></meter>
          </div>
        </div>
        <div class="row pt-5">
          <div class="col-4">
            タブレット音量<br />
            <small>タブレットのスピーカーから音が出ます。</small>
          </div>
          <div class="col-8">
            <div class="row">
              <div class="col text-left">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-volume-down-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.717 3.55A.5.5 0 0 1 9 4v8a.5.5 0 0 1-.812.39L5.825 10.5H3.5A.5.5 0 0 1 3 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
                  />
                  <path
                    d="M10.707 11.182A4.486 4.486 0 0 0 12.025 8a4.486 4.486 0 0 0-1.318-3.182L10 5.525A3.489 3.489 0 0 1 11.025 8c0 .966-.392 1.841-1.025 2.475l.707.707z"
                  />
                </svg>
              </div>
              <div class="col text-center">volume 32</div>
              <div class="col text-right">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-volume-up-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
                  />
                  <path
                    d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
                  />
                  <path
                    d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
                  />
                </svg>
              </div>
            </div>
            <meter min="0" max="15" class="w-100" value="1"></meter>
          </div>
        </div>
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
          <TextBox v-model:value="title" />
        </FormGroup>
        <FormGroup title="説明">
          <TextArea v-model:value="description" />
        </FormGroup>
      </template>
      <template #footer>
        <ModalFooter>
          <Button type="secondary" @click="closeSaveModal">キャンセル</Button>
          <Button
            type="primary"
            :isDisabled="!title"
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
        <p class="message">保存が完了しました。</p>
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
        <p class="message">削除してよろしいですか？</p>
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
        <p class="message">削除が完了しました。</p>
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
import SubMenu from "@/components/organisms/SubMenu.vue";
import SubMenuItem from "@/components/molecules/SubMenuItem.vue";
import List from "@/components/organisms/List.vue";
import ListHeader from "@/components/molecules/ListHeader.vue";
import ListItem from "@/components/molecules/ListItem.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import FormGroup from "@/components/molecules/FormGroup.vue";
import TextBox from "@/components/atoms/TextBox.vue";
import TextArea from "@/components/atoms/TextArea.vue";
import * as UMesseApi from "umesseapi";
import { useUploadCmService } from "@/services/uploadCmService";
import { config } from "@/utils/UMesseApiConfiguration";
import { CmItem } from "umesseapi/models/cm-item";
import { useGlobalStore } from "@/store";
import {
  convertDatestringToDate,
  convertNumberToTime,
} from "@/utils/FormatDate";
import Constants from "@/utils/Constants";
import { useRouter } from "vue-router";

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
    FormGroup,
    TextBox,
    TextArea,
  },
  setup() {
    const router = useRouter();
    const audioPlayer = AudioPlayer();
    const audioStore = AudioStore();
    const cmApi = new UMesseApi.CmApi(config);
    const uploadCmService = useUploadCmService(cmApi);
    const resourcesapi = new UMesseApi.ResourcesApi(config);
    const { auth, cm } = useGlobalStore();

    const state = reactive({
      activeSceneCd: "001",
      scenes: computed(() => Common.getManagementScenes()),
      sorts: ["名前順", "作成日順", "更新日順"],
      cms: [] as CmItem[],
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: computed(() => audioStore.isDownloading),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      playbackTimeHms: computed(() =>
        convertNumberToTime(audioPlayer.getPlaybackTime())
      ),
      duration: computed(() => audioPlayer.getDuration()),
      durationHms: computed(() =>
        convertNumberToTime(audioPlayer.getDuration())
      ),
      selectedCm: null as CmItem | null,
      title: "",
      description: "",
      isPlayModalAppear: false,
      isSaveModalAppear: false,
      isSavedModalAppear: false,
      isRemoveModalAppear: false,
      isRemovedModalAppear: false,
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
      const response = await cmApi.listUserCm(xUnisCustomerCd);
      state.cms = response.data.filter((v) => {
        if (!v.scene) return false;
        return v.scene.sceneCd == state.activeSceneCd;
      });
      console.log(JSON.stringify(response.data[4]))
    };

    const selectCm = (cm: CmItem) => {
      state.selectedCm = cm;
    };

    const play = async (cm: CmItem) => {
      if (state.isPlaying) return;
      const response = await resourcesapi.getSignedUrl(cm.cmId, "cm");
      console.log(response.data.url);
      await audioStore.download(response.data.url);
      audioPlayer.start(<AudioBuffer>audioStore.audioBuffer);
    };

    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };

    const save = async (cm: CmItem) => {
      const xUnisCustomerCd = "123456789";
      const response = await uploadCmService.update(
        xUnisCustomerCd,
        cm.cmId,
        state.title,
        state.description,
        cm.scene.sceneCd,
        cm.productionType
      );
      fetchCm();
    };
    const remove = async (cmId: string) => {
      // TODO: auth.getToken()のトークンだとデータが空なので固定値をセットする
      // const xUnisCustomerCd = auth.getToken()!!;
      const xUnisCustomerCd = "123456789";
      const response = await uploadCmService.remove(xUnisCustomerCd, cmId);
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
      if (!state.selectedCm) return;
      await save(state.selectedCm);
      closeSaveModal();
      setTimeout(() => {
        openSavedModal();
      }, 500);
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
      cm.setCm(cmItem)
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
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;

.message {
  font-size: 20px;
  font-weight: $font_weight_bold;
  text-align: center;
}

.btn:focus {
  box-shadow: none;
}
.dropdown-toggle::after {
  content: none;
}
</style>
