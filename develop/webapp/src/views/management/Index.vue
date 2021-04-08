<template>
  <div @click="closeAllDropdownMenu">
    <BasicLayout>
      <template #header>
        <Header>
          <template #title>店内CMの管理</template>
        </Header>
      </template>
      <template #contents>
        <ContentsBase>
          <template #sub-menu>
            <SubMenu>
              <SubMenuItem
                v-for="scene in sceneList"
                :key="scene.cd"
                :isSelected="scene.cd == activeSceneCd"
                @click="fetchCm(scene.cd)"
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
                  @update:modelValue="fetchScene"
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
                  <span class="status" :class="getStatusClass(cm.status)">{{
                    Constants.CM_STATUS.find((v) => v.cd == cm.status).name
                  }}</span>
                </p>
              </template>
              <template #operations>
                <Button
                  class="btn-play"
                  @click="selectCmAndOpenPlayModal(cm)"
                  :isDisabled="disabledPlayingStatus.includes(cm.status)"
                >
                  <img
                    v-show="disabledPlayingStatus.includes(cm.status)"
                    src="@/assets/icon_sound_white.svg"
                  />
                  <img
                    v-show="!disabledPlayingStatus.includes(cm.status)"
                    src="@/assets/icon_sound.svg"
                  />
                  試聴
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
                          isDisabled: disabledEditTitleAndDescriptionStatus.includes(
                            cm.status
                          ),
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
                          title:
                            cm.status === Constants.CM_STATUS_EXTERNAL_COMPLETE
                              ? 'アップロード解除'
                              : uploadSystemtitle,
                          action: () => {
                            cm.status === Constants.CM_STATUS_EXTERNAL_COMPLETE
                              ? selectCmAndOpenUnUploadModal(cm)
                              : upload(cm);
                          },
                          isDisabled:
                            cm.status === Constants.CM_STATUS_EXTERNAL_COMPLETE
                              ? false
                              : disabledSystemUploadStatus.includes(cm.status),
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
      <ModalDialog
        v-if="isUpdatedModalAppear"
        size="small"
        @close="closeUploadedModal"
      >
        <template #contents>
          <MessageDialogContents>
            アップロードが完了しました。
          </MessageDialogContents>
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="closeUploadedModal">閉じる</Button>
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
      <ModalDialog v-if="isUnUploadModalAppear" @close="closeUnUploadModal">
        <template #header>
          <ModalHeader title="確認" @close="closeUnUploadModal" />
        </template>
        <template #contents>
          <MessageDialogContents>
            アップロード解除してよろしいですか？
          </MessageDialogContents>
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="closeUnUploadModal"
              >キャンセル</Button
            >
            <Button type="primary" @click="unUpload">はい</Button>
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalDialog
        v-if="isUnUploadedModalAppear"
        size="small"
        @close="closeUnUploadedModal"
      >
        <template #contents>
          <MessageDialogContents> 解除しました。 </MessageDialogContents>
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="closeUnUploadedModal"
              >閉じる</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <ModalLoading v-if="isLoading" :title="titleModalLoading" />
    <transition>
      <transition>
        <ModalErrorDialog
          v-if="isErrorModalApper"
          @close="closeErrorModal"
          :errorCode="errorCode"
          :errorMessage="errorMessage"
        />
      </transition>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import AudioPlayer from "@/utils/AudioPlayer";
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
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
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
import Constants, { Scene } from "@/utils/Constants";
import { useRouter } from "vue-router";
import SelectBox from "@/components/atoms/SelectBox.vue";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import DropdownMenu from "@/components/molecules/DropdownMenu.vue";
import { UMesseError } from "../../models/UMesseError";
import { audioService, cmService, uploadService } from "@/services";
import { User } from "umesseapi/models";
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
    ModalErrorDialog,
    PlayDialogContents,
    MessageDialogContents,
    FormGroup,
    TextBox,
    TextArea,
    SelectBox,
    ModalLoading,
    DropdownMenu,
  },
  setup() {
    const router = useRouter();
    const audioPlayer = AudioPlayer();
    const { auth, cm } = useGlobalStore();
    const disabledPlayingStatus = [
      Constants.CM_STATUS_DELETE,
      Constants.CM_STATUS_CREATING,
      Constants.CM_STATUS_CONVERT,
      Constants.CM_STATUS_GENERATE,
      Constants.CM_STATUS_ERROR,
      Constants.CM_STATUS_EXTERNAL_ERROR,
    ];
    const disabledEditTitleAndDescriptionStatus = [
      Constants.CM_STATUS_DELETE,
      Constants.CM_STATUS_CONVERT,
      Constants.CM_STATUS_GENERATE,
      Constants.CM_STATUS_ERROR,
      Constants.CM_STATUS_EXTERNAL_UPLOADING,
      Constants.CM_STATUS_EXTERNAL_ERROR,
    ];
    const disabledEditContentsStatus = [
      Constants.CM_STATUS_DELETE,
      Constants.CM_STATUS_CONVERT,
      Constants.CM_STATUS_SHARING,
      Constants.CM_STATUS_GENERATE,
      Constants.CM_STATUS_ERROR,
      Constants.CM_STATUS_EXTERNAL_UPLOADING,
      Constants.CM_STATUS_EXTERNAL_COMPLETE,
      Constants.CM_STATUS_EXTERNAL_ERROR,
    ];
    const disabledSystemUploadStatus = [
      Constants.CM_STATUS_DELETE,
      Constants.CM_STATUS_CREATING,
      Constants.CM_STATUS_CONVERT,
      Constants.CM_STATUS_SHARING,
      Constants.CM_STATUS_GENERATE,
      Constants.CM_STATUS_ERROR,
      Constants.CM_STATUS_EXTERNAL_UPLOADING,
      Constants.CM_STATUS_EXTERNAL_COMPLETE,
      Constants.CM_STATUS_EXTERNAL_ERROR,
    ];
    const disabledDeleteStatus = [
      Constants.CM_STATUS_DELETE,
      Constants.CM_STATUS_CONVERT,
      Constants.CM_STATUS_SHARING,
      Constants.CM_STATUS_GENERATE,
      Constants.CM_STATUS_ERROR,
      Constants.CM_STATUS_EXTERNAL_UPLOADING,
      Constants.CM_STATUS_EXTERNAL_COMPLETE,
      Constants.CM_STATUS_EXTERNAL_ERROR,
    ];
    const authToken = <string>auth.getToken();
    const authUser = <User>auth.getUserInfo();
    const state = reactive({
      activeSceneCd: "",
      sceneList: [] as Scene[],
      cmList: [] as CmItem[],
      cms: [] as CmItem[],
      sort: 4,
      cmSorts: computed(() => Common.getSort()),
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: false,
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
      isLoading: false,
      dropdownCmId: "",
      titleModalLoading: "",
      isErrorModalApper: false,
      errorCode: "",
      errorMessage: "",
      uploadSystemtitle:
        authUser.serviceCd === Constants.SERVICE_CD_UMUSIC
          ? "U MUSICにアップロード"
          : "S'Senceにアップロード",
      isUpdatedModalAppear: false,
      isUnUploadModalAppear: false,
      isUnUploadedModalAppear: false,
    });
    const fetchScene = async () => {
      try {
        openModalLoading("");
        const response = await cmService.fetch(authToken, state.sort);
        state.sceneList = response[0];
        state.cmList = response[1];
        fetchCm(state.sceneList[0].cd);
      } catch (e) {
        openErrorModal(e);
      } finally {
        closeModalLoading();
      }
    };
    const fetchCm = (sceneCd: string) => {
      if (state.activeSceneCd !== sceneCd) {
        state.activeSceneCd = sceneCd;
        state.cms = state.cmList.filter((v) => {
          if (!v.scene) return false;
          return v.scene.sceneCd == sceneCd;
        });
      }
    };
    const selectCm = (cm: CmItem) => {
      state.selectedCm = cm;
    };
    const play = async (cm: CmItem) => {
      if (state.isPlaying) return;
      try {
        state.isDownloading = true;
        const audioBuffer = await audioService.getById(
          cm.id,
          Constants.CATEGORY.CM
        );
        audioPlayer.start(audioBuffer);
      } catch (e) {
        openErrorModal(e);
      } finally {
        state.isDownloading = false;
      }
    };
    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };
    const save = async (cm: CmItem) => {
      await cmService.update(
        authToken,
        cm.id,
        state.title,
        state.description,
        state.scene,
        cm.productionType
      );
      fetchScene();
    };
    const upload = async (cm: CmItem) => {
      try {
        const uploadSystem =
          authUser.serviceCd === Constants.SERVICE_CD_UMUSIC
            ? Constants.UPLOAD_SYSTEM_UMUSIC
            : Constants.UPLOAD_SYSTEM_SSENCE;
        await uploadService.create(authToken, cm.id, uploadSystem);
        openUploadtedModal();
      } catch (e) {
        console.log(e.message);
        openErrorModal(e);
      } finally {
        closeModalLoading();
      }
    };
    const unUpload = async () => {
      try {
        if (!state.selectedCm) return;
        openModalLoading("アップロード解除中");
        const cmId = state.selectedCm.id;
        await uploadService.remove(cmId, authToken);
        openUnUploadedModal();
      } catch (e) {
        console.log(e.message);
        openErrorModal(e);
      } finally {
        closeModalLoading();
        closeUnUploadModal();
      }
    };
    const remove = async (cmId: string) => {
      await cmService.remove(authToken, cmId);
      fetchScene();
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
    const openUploadtedModal = () => {
      state.isUpdatedModalAppear = true;
    };
    const closeUploadedModal = () => {
      state.isUpdatedModalAppear = false;
    };
    const closeUnUploadModal = () => {
      state.isUnUploadModalAppear = false;
    };
    const openUnUploadedModal = () => {
      state.isUnUploadedModalAppear = true;
    };
    const closeUnUploadedModal = () => {
      state.isUnUploadedModalAppear = false;
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
    const selectCmAndOpenUnUploadModal = (cm: CmItem) => {
      closeAllDropdownMenu();
      selectCm(cm);
      state.isUnUploadModalAppear = true;
    };
    const stopAndClosePlayModal = () => {
      stop();
      closePlayModal();
    };
    const saveAndOpenSavedModal = async () => {
      try {
        openModalLoading("音源の合成中");
        if (!state.selectedCm) return;
        await save(state.selectedCm);
        closeModalLoading();
        closeSaveModal();
        openSavedModal();
      } catch (e) {
        console.log(e.message);
        openErrorModal(e);
      } finally {
        closeModalLoading();
      }
    };
    const removeAndOpenRemovedModal = async () => {
      try {
        openModalLoading("音源の削除中");
        await remove(state.selectedCm?.id);
        closeModalLoading();
        closeRemoveModal();
        openRemovedModal();
      } catch (e) {
        closeRemoveModal();
        console.log(e.message);
        openErrorModal(e);
      } finally {
        closeModalLoading();
      }
    };
    const toEditCm = (cmItem: CmItem) => {
      closeAllDropdownMenu();
      console.log(cmItem);
      cm.setCm(cmItem);
      router.push({ name: "Cm" });
    };
    onMounted(async () => {
      fetchScene();
    });
    const openModalLoading = (title: string) => {
      state.titleModalLoading = title;
      state.isLoading = true;
    };
    const closeModalLoading = () => {
      state.isLoading = false;
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
      state.isErrorModalApper = false;
    };
    const openErrorModal = (e: UMesseError) => {
      state.errorCode = e.errorCode;
      state.errorMessage = e.message;
      state.isErrorModalApper = true;
    };
    const getStatusClass = (cd: string) => {
      switch (cd) {
        case Constants.CM_STATUS_DELETE: // CM削除
        case Constants.CM_STATUS_ERROR: // CMエラー
        case Constants.CM_STATUS_EXTERNAL_ERROR: // 外部システムアップロードエラー
          return ["error"];
        case Constants.CM_STATUS_CREATING: // CM作成中
        case Constants.CM_STATUS_CONVERT: // CMエンコード中
        case Constants.CM_STATUS_SHARING: // CM共有中
        case Constants.CM_STATUS_GENERATE: // CM生成中
        case Constants.CM_STATUS_EXTERNAL_UPLOADING: // 外部システムアップロード中
          return ["busy"];
        case Constants.CM_STATUS_COMPLETE: // CM作成完了
        case Constants.CM_STATUS_EXTERNAL_COMPLETE: // 外部システムアップロード完了
          return ["comp"];
      }
    };
    return {
      ...toRefs(state),
      play,
      stop,
      remove,
      fetchCm,
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
      openUploadtedModal,
      closeUploadedModal,
      closeUnUploadModal,
      closeUnUploadedModal,
      selectCmAndOpenPlayModal,
      selectCmAndOpenSaveModal,
      selectCmAndOpenRemoveModal,
      selectCmAndOpenUnUploadModal,
      stopAndClosePlayModal,
      saveAndOpenSavedModal,
      removeAndOpenRemovedModal,
      toEditCm,
      Constants,
      fetchScene,
      disabledPlayingStatus,
      disabledEditTitleAndDescriptionStatus,
      disabledEditContentsStatus,
      disabledSystemUploadStatus,
      disabledDeleteStatus,
      closeAllDropdownMenu,
      toggleDropdown,
      closeErrorModal,
      getStatusClass,
      upload,
      unUpload,
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
