<template>
  <div @click="closeAllDropdownMenu">
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
            <ListItem v-for="cm in cms" :key="cm.id">
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
                <Button class="btn-play" @click="selectCmAndOpenPlayModal(cm)">
                  <img src="@/assets/icon_sound.svg" />試聴
                </Button>
                <button
                  class="btn-more"
                  type="button"
                  @click.stop="toggleDropdown(cm.id)"
                >
                  <img src="@/assets/icon_more_black.svg" />
                  <transition>
                    <DropdownMenu
                      v-if="dropdownCmId === cm.id"
                      :width="240"
                      :targetWidth="80"
                      :targetHeight="30"
                      :offset="-70"
                      direction="down"
                      :params="[
                        {
                          title: 'タイトル/説明 編集',
                          action: () => {
                            selectCmAndOpenSaveModal(cm);
                          },
                        },
                        {
                          title: 'コンテンツ編集',
                          action: () => {
                            toEditCm(cm);
                          },
                          isDisabled: disabledEditContentsStatus.includes(
                            cm.status
                          ),
                        },
                        {
                          title: 'U MUSICにアップロード',
                          action: () => {},
                        },
                        {
                          title: '削除',
                          action: () => {
                            selectCmAndOpenRemoveModal(cm);
                          },
                          isDisabled: disabledDeleteStatus.includes(cm.status),
                          isCaution: true,
                        },
                      ]"
                    />
                  </transition>
                </button>
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
          <ModalFooter>
            <Button type="secondary" @click="stopAndClosePlayModal"
              >終了</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalDialog
        v-if="isSaveModalAppear"
        size="large"
        @close="closeSaveModal"
      >
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
          <MessageDialogContents> 保存が完了しました。 </MessageDialogContents>
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="closeSavedModal">閉じる</Button>
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
            <Button type="secondary" @click="closeRemoveModal"
              >キャンセル</Button
            >
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
          <ModalFooter>
            <Button type="secondary" @click="closeRemovedModal">閉じる</Button>
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalUploading v-if="isModalUploading" :title="titleModalUploading">
      </ModalUploading>
    </transition>
    <transition>
      <transition>
        <ModalError
          v-if="isError"
          @close="closeErrorModal"
          title="エラー"
          :errorCode="errorCode"
          :errorMessage="errorMessage"
        ></ModalError>
      </transition>
    </transition>
  </div>
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
import ModalError from "@/components/organisms/ModalError.vue";
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
import UMesseService from "@/services/UMesseService";
import ModalUploading from "@/components/organisms/ModalUploading.vue";
import DropdownMenu from "@/components/molecules/DropdownMenu.vue";
import { UMesseError } from "../../models/UMesseError";
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
    ModalError,
    PlayDialogContents,
    MessageDialogContents,
    FormGroup,
    TextBox,
    TextArea,
    SelectBox,
    ModalUploading,
    DropdownMenu,
  },
  setup() {
    const router = useRouter();
    const audioPlayer = AudioPlayer();
    const audioStore = AudioStore();
    const { auth, cm } = useGlobalStore();
    const disabledEditContentsStatus = ["11", "12"];
    const disabledDeleteStatus = ["00", "11"];
    const authToken = <string>auth.getToken();
    const scenes = Common.getManagementScenes();
    const state = reactive({
      activeSceneCd: "001",
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
      isModalUploading: false,
      dropdownCmId: "",
      titleModalUploading: "",
      isError: false,
      errorCode: "",
      errorMessage: "",
    });
    const clickScene = (sceneCd: string) => {
      state.activeSceneCd = sceneCd;
      fetchCm();
    };
    const fetchCm = async () => {
      try {
        const response = await UMesseService.uploadCmService.fetchCm(
          authToken,
          state.activeSceneCd,
          state.sort
        );
        state.cms = response;
      } catch (e) {
        setError(e);
      }
    };
    const selectCm = (cm: CmItem) => {
      state.selectedCm = cm;
    };
    const play = async (cm: CmItem) => {
      if (state.isPlaying) return;
      const audioBuffer = await UMesseService.resourcesService.getAudioBufferByContentsId(
        cm.id,
        Constants.CATEGORY.CM
      );
      audioPlayer.start(audioBuffer);
    };
    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };
    const save = async (cm: CmItem) => {
      await UMesseService.uploadCmService.update(
        authToken,
        cm.id,
        state.title,
        state.description,
        state.scene,
        cm.productionType
      );
      fetchCm();
    };
    const remove = async (cmId: string) => {
      await UMesseService.uploadCmService.remove(authToken, cmId);
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
      closeAllDropdownMenu();
      selectCm(cm);
      state.title = cm.title;
      state.description = cm.description;
      state.scene = cm.scene.sceneCd;
      console.log(state.title);
      openSaveModal();
    };
    const selectCmAndOpenRemoveModal = (cm: CmItem) => {
      closeAllDropdownMenu();
      selectCm(cm);
      openRemoveModal();
    };
    const stopAndClosePlayModal = () => {
      stop();
      closePlayModal();
    };
    const saveAndOpenSavedModal = async () => {
      try {
        state.titleModalUploading = "音源の合成中";
        openModalUploading();
        if (!state.selectedCm) return;
        await save(state.selectedCm);
        closeModalUploading();
        closeSaveModal();
        openSavedModal();
      } catch (e) {
        console.log(e.message);
        setError(e);
      } finally {
        closeModalUploading();
      }
    };
    const removeAndOpenRemovedModal = async () => {
      try {
        state.titleModalUploading = "音源の削除中";
        openModalUploading();
        await remove(state.selectedCm?.id);
        closeModalUploading();
        closeRemoveModal();
        openRemovedModal();
      } catch (e) {
        closeRemoveModal();
        console.log(e.message);
        setError(e);
      } finally {
        closeModalUploading();
      }
    };
    const toEditCm = (cmItem: CmItem) => {
      closeAllDropdownMenu();
      console.log(cmItem);
      cm.setCm(cmItem);
      router.push({ name: "Cm" });
    };
    onMounted(async () => {
      fetchCm();
    });
    const openModalUploading = () => {
      state.isModalUploading = true;
    };
    const closeModalUploading = () => {
      state.isModalUploading = false;
    };
    const closeAllDropdownMenu = () => {
      state.dropdownCmId = "";
    };
    const toggleDropdown = (cmId: string) => {
      if (state.dropdownCmId === cmId) {
        closeAllDropdownMenu();
      } else {
        closeAllDropdownMenu();
        state.dropdownCmId = cmId;
      }
    };
    const closeErrorModal = () => {
      state.isError = false;
    };
    const setError = (e: UMesseError) => {
      state.errorCode = e.errorCode;
      state.errorMessage = e.message;
      state.isError = true;
    };
    return {
      ...toRefs(state),
      scenes,
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
      disabledEditContentsStatus,
      disabledDeleteStatus,
      closeAllDropdownMenu,
      toggleDropdown,
      closeErrorModal,
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
