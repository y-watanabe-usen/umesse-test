<template>
  <div @click="closeAllDropdownMenu">
    <BasicLayout>
      <template #header>
        <Header :clickBack="activeSceneCd ? clickBack : null">
          <template #title>ナレーション選択</template>
        </Header>
      </template>
      <template #contents>
        <ContentsBase>
          <template #sub-menu>
            <SubMenu>
              <SubMenuItem
                v-for="industry in industries"
                :key="industry.cd"
                :isSelected="industry.cd == activeIndustryCd"
                @click="clickIndustry(industry.cd)"
              >
                {{ industry.name }}
              </SubMenuItem>
            </SubMenu>
          </template>
          <template v-if="!activeSceneCd">
            <List>
              <ListItem
                class="scene"
                v-for="scene in scenes"
                :key="scene.cd"
                @click="clickScene(scene.cd)"
              >
                <template #title>
                  <h2>{{ scene.name }}</h2>
                </template>
              </ListItem>
            </List>
          </template>
          <template v-else>
            <List>
              <template #header>
                <ListHeader>
                  <Sort
                    v-model="sort"
                    @update:modelValue="fetchNarration"
                    :options="
                      sortList.map((narrationSort) => {
                        return {
                          title: narrationSort.name,
                          value: narrationSort.cd,
                        };
                      })
                    "
                  />
                </ListHeader>
              </template>
              <ListItem
                v-for="narration in narrations"
                :key="narration.contentsId"
              >
                <template #title>
                  <h2>{{ narration.title }}</h2>
                </template>
                <template #line1>
                  <p>{{ narration.description }}</p>
                </template>
                <template #line2>
                  <p>
                    <span v-if="narration.seconds" class="duration">{{
                      convertNumberToTime(narration.seconds)
                    }}</span>
                    <span v-if="narration.timestamp" class="start">{{
                      convertDatestringToDate(narration.timestamp)
                    }}</span>
                  </p>
                </template>
                <template #operations>
                  <template v-if="activeIndustryCd !== '02'">
                    <Button
                      v-if="narration.manuscript"
                      class="btn-document"
                      @click="selectNarrationAndOpenDocumentModal(narration)"
                    >
                      <img src="@/assets/icon_document.svg" />原稿
                    </Button>
                  </template>
                  <Button
                    class="btn-play"
                    @click="selectNarrationAndOpenPlayModal(narration)"
                  >
                    <img src="@/assets/icon_sound.svg" />試聴
                  </Button>
                  <Button class="btn-select" @click="setNarration(narration)">
                    選択<img src="@/assets/icon_select.svg" />
                  </Button>
                  <template v-if="activeIndustryCd === '02'">
                    <button
                      class="btn-more"
                      type="button"
                      @click.stop="toggleDropdown(narration.id)"
                    >
                      <img src="@/assets/icon_more_black.svg" />
                      <transition>
                        <template v-if="dropdownNarrationId === narration.id">
                          <DropdownMenu
                            v-if="narration.manuscript"
                            :width="240"
                            :targetWidth="80"
                            :targetHeight="30"
                            :offset="-70"
                            direction="down"
                            :params="[
                              {
                                title: 'タイトル/説明 編集',
                                action: () => {
                                  selectNarrationAndOpenSaveModal(narration);
                                },
                              },
                              {
                                title: '原稿',
                                action: () => {
                                  selectNarrationAndOpenDocumentModal(
                                    narration
                                  );
                                },
                              },
                              {
                                title: '削除',
                                action: () => {
                                  selectNarrationAndOpenRemoveModal(narration);
                                },
                                isCaution: true,
                              },
                            ]"
                          />
                          <DropdownMenu
                            v-else
                            :width="240"
                            :targetWidth="80"
                            :targetHeight="30"
                            :offset="-70"
                            direction="down"
                            :params="[
                              {
                                title: 'タイトル/説明 編集',
                                action: () => {
                                  selectNarrationAndOpenSaveModal(narration);
                                },
                              },
                              {
                                title: '削除',
                                action: () => {
                                  selectNarrationAndOpenRemoveModal(narration);
                                },
                                isCaution: true,
                              },
                            ]"
                          />
                        </template>
                      </transition>
                    </button>
                  </template>
                </template>
              </ListItem>
            </List>
          </template>
        </ContentsBase>
      </template>
    </BasicLayout>
    <!-- modal -->
    <transition>
      <ModalDialog v-if="isDocumentModalAppear" @close="closeDocumentModal">
        <template #header>
          <ModalHeader title="原稿" @close="closeDocumentModal" />
        </template>
        <template #contents>
          <TextDialogContents>
            {{ selectedNarration?.manuscript }}
          </TextDialogContents>
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="closeDocumentModal">閉じる</Button>
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalDialog v-if="isPlayModalAppear" @close="stopAndClosePlayModal">
        <template #header>
          <ModalHeader title="試聴" @close="stopAndClosePlayModal" />
        </template>
        <template #contents>
          <NewPlayDialogContents
            :isLoading="isDownloading"
            :isPlaying="isPlaying"
            :currentTime="currentTime"
            :duration="duration"
            :isDownload="isDownload"
            @download="download(selectedNarration)"
            @play="play(selectedNarration)"
            @stop="stop"
            :oninput="oninput"
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
            <TextBox v-model="title" :maxLength="Constants.TITLE_MAX_LENGTH" />
          </FormGroup>
          <FormGroup title="説明">
            <TextArea
              v-model="description"
              :maxLength="Constants.DESCRIPTION_MAX_LENGTH"
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
      <ModalDialog
        v-if="isNarrationRecordingAbsentApper"
        @close="closeNarrationRecordingAbsentModal"
      >
        <template #header>
          <ModalHeader
            title="お知らせ"
            @close="closeNarrationRecordingAbsentModal"
          />
        </template>
        <template #contents>
          <MessageDialogContents>
            録音音源がありません。ホーム画面の「録音して作成」から作成が出来ます。
          </MessageDialogContents>
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="closeNarrationRecordingAbsentModal"
              >閉じる</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalDialog
        v-if="isNarrationTtsAbsentApper"
        @close="closeNarrationTtsAbsentModal"
      >
        <template #header>
          <ModalHeader title="お知らせ" @close="closeNarrationTtsAbsentModal" />
        </template>
        <template #contents>
          <MessageDialogContents>
            合成音声がありません。ホーム画面の「音声合成テンプレートから作成」「音声合成フリー入力から作成」から作成が出来ます。
          </MessageDialogContents>
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="closeNarrationTtsAbsentModal"
              >閉じる</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalErrorDialog
        v-if="isErrorModalApper"
        @close="closeErrorModal"
        :errorCode="errorCode"
        :errorMessage="errorMessage"
      />
    </transition>
    <ModalLoading v-if="isLoading" title="" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive, toRefs } from "vue";
import useNewAudioPlayer from "@/utils/newAudioPlayer";
import * as common from "@/utils/common";
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
import NewPlayDialogContents from "@/components/molecules/NewPlayDialogContents.vue";
import TextDialogContents from "@/components/molecules/TextDialogContents.vue";
import DropdownMenu from "@/components/molecules/DropdownMenu.vue";
import { NarrationItem } from "umesseapi/models";
import { useGlobalStore } from "@/store";
import router from "@/router";
import {
  convertNumberToTime,
  convertDatestringToDate,
} from "@/utils/formatDate";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import {
  audioService,
  resourcesService,
  recordingService,
  ttsService,
} from "@/services";
import analytics from "@/utils/firebaseAnalytics";
import FormGroup from "@/components/molecules/FormGroup.vue";
import TextBox from "@/components/atoms/TextBox.vue";
import TextArea from "@/components/atoms/TextArea.vue";
import MessageDialogContents from "@/components/molecules/MessageDialogContents.vue";
import Constants, { Scene } from "@/utils/constants";
import useModalController from "@/mixins/modalController";
import useLoadingModalController from "@/mixins/loadingModalController";
import useErrorModalController from "@/mixins/errorModalController";
import { useCmStore } from "@/store/cm";
import { resourcesRepository } from "@/repository/api";

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
    ModalLoading,
    NewPlayDialogContents,
    TextDialogContents,
    DropdownMenu,
    FormGroup,
    TextBox,
    TextArea,
    MessageDialogContents,
  },
  setup() {
    const audioPlayer = useNewAudioPlayer();
    const { auth } = useGlobalStore();
    const cm = useCmStore();
    const authToken = <string>auth.getToken();
    const sortList = common.getSort();
    const industries = common.getNarrationIndustries();
    const {
      isApper: isPlayModalAppear,
      open: openPlayModal,
      close: closePlayModal,
    } = useModalController();
    const {
      isApper: isDocumentModalAppear,
      open: openDocumentModal,
      close: closeDocumentModal,
    } = useModalController();
    const {
      isApper: isSaveModalAppear,
      open: openSaveModal,
      close: closeSaveModal,
    } = useModalController();
    const {
      isApper: isSavedModalAppear,
      open: openSavedModal,
      close: closeSavedModal,
    } = useModalController();
    const {
      isApper: isRemoveModalAppear,
      open: openRemoveModal,
      close: closeRemoveModal,
    } = useModalController();
    const {
      isApper: isRemovedModalAppear,
      open: openRemovedModal,
      close: closeRemovedModal,
    } = useModalController();
    const {
      isApper: isLoading,
      loadingMessage,
      open: openLoadingModal,
      close: closeLoadingModal,
    } = useLoadingModalController();
    const {
      isApper: isErrorModalApper,
      errorCode,
      errorMessage,
      open: openErrorModal,
      close: closeErrorModal,
    } = useErrorModalController();
    const {
      isApper: isNarrationRecordingAbsentApper,
      open: openNarrationRecordingAbsentModal,
      close: closeNarrationRecordingAbsentModal,
    } = useModalController();
    const {
      isApper: isNarrationTtsAbsentApper,
      open: openNarrationTtsAbsentModal,
      close: closeNarrationTtsAbsentModal,
    } = useModalController();

    const state = reactive({
      sort: 1,
      activeIndustryCd: "02",
      activeSceneCd: null as string | null,
      narrations: [] as NarrationItem[],
      scenes: [] as Scene[],
      selectedNarration: null as NarrationItem | null,
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: false,
      currentTime: computed(() => audioPlayer.getCurrentTime()),
      duration: computed(() => audioPlayer.getDuration()),
      dropdownNarrationId: "",
      title: "",
      description: "",
      isDownload: false,
      isVisibleDownload: false,
    });

    const setNarration = (narration: NarrationItem) => {
      cm.setNarration(narration);
      analytics.selectNarration(narration.id);
      router.push({ name: "Cm" });
    };

    const selectNarration = (narration: NarrationItem) => {
      state.selectedNarration = narration;
    };

    const clickIndustry = (industryCd: string) => {
      if (
        state.activeIndustryCd !== industryCd ||
        (state.activeIndustryCd === industryCd && state.narrations)
      ) {
        analytics.selectIndustry(industryCd, Constants.SCREEN.NARRATION);
        state.activeIndustryCd = industryCd;
        state.activeSceneCd = null;
        fetchScene();
      }
    };

    const clickScene = (sceneCd: string) => {
      analytics.selectScene(sceneCd, Constants.SCREEN.NARRATION);
      state.activeSceneCd = sceneCd;
      state.isVisibleDownload = common.isVisibleDownload();
      if (
        state.isVisibleDownload &&
        (state.activeSceneCd === "901" || state.activeSceneCd === "902")
      ) {
        state.isDownload = true;
      } else {
        state.isDownload = false;
      }
      fetchNarration();
    };

    const clickBack = () => {
      state.activeSceneCd = null;
      state.narrations = [];
    };

    const fetchScene = () => {
      state.scenes = common.getIndustryScenes(state.activeIndustryCd);
      state.narrations = [];
    };

    const fetchNarration = async () => {
      if (!state.activeSceneCd) return;
      try {
        openLoadingModal();
        const response = await resourcesService.fetchNarration(
          authToken,
          state.activeIndustryCd,
          state.activeSceneCd,
          state.sort
        );
        state.narrations = response;
        if (!state.narrations.length && state.activeSceneCd === "901") {
          openNarrationRecordingAbsentModal();
        } else if (!state.narrations.length && state.activeSceneCd === "902") {
          openNarrationTtsAbsentModal();
        }
      } catch (e) {
        openErrorModal(e);
      } finally {
        closeLoadingModal();
      }
    };

    const play = async (narration: NarrationItem) => {
      try {
        state.isDownloading = true;
        // const audioBuffer = await audioService.getById(
        //   narration.id,
        //   narration.category
        // );
        const response = await resourcesRepository.getSignedUrl(
          narration.id,
          narration.category
        );
        const url = response.data.url ?? "";
        analytics.pressButtonPlayTrial(
          narration.id,
          Constants.CATEGORY.NARRATION,
          Constants.SCREEN.NARRATION
        );
        await audioPlayer.start(url);
      } catch (e) {
        openErrorModal(e);
      } finally {
        state.isDownloading = false;
      }
    };

    const download = async (narration: NarrationItem) => {
      try {
        const downloAdudioUrl = await audioService.downloadById(
          narration.id,
          narration.category
        );
        const fileLink = document.createElement("a");
        fileLink.href = downloAdudioUrl;
        fileLink.click();
      } catch (e) {
        openErrorModal(e);
      }
    };

    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };

    const selectNarrationAndOpenDocumentModal = (narration: NarrationItem) => {
      selectNarration(narration);
      closeAllDropdownMenu();
      analytics.pressButtonManuscript(narration.id, Constants.SCREEN.NARRATION);
      openDocumentModal();
    };
    const selectNarrationAndOpenPlayModal = (narration: NarrationItem) => {
      selectNarration(narration);
      openPlayModal();
    };
    const stopAndClosePlayModal = () => {
      stop();
      closePlayModal();
    };

    const closeAllDropdownMenu = () => {
      state.dropdownNarrationId = "";
    };

    const toggleDropdown = (narrationId: string) => {
      if (state.dropdownNarrationId === narrationId) {
        closeAllDropdownMenu();
      } else {
        closeAllDropdownMenu();
        state.dropdownNarrationId = narrationId;
      }
    };

    onMounted(async () => {
      analytics.screenView(Constants.SCREEN.NARRATION);
      fetchScene();
    });

    const selectNarrationAndOpenSaveModal = (narration: NarrationItem) => {
      closeAllDropdownMenu();
      selectNarration(narration);
      state.title = narration.title;
      state.description = narration.description;
      analytics.pressButtonEditTitleAndDescription(
        narration.id,
        Constants.SCREEN.NARRATION
      );
      openSaveModal();
    };
    const saveAndOpenSavedModal = async () => {
      try {
        if (!state.selectedNarration) return;
        openLoadingModal();
        await save(state.selectedNarration);
        closeLoadingModal();
        analytics.pressButtonSaveEdit(
          state.selectedNarration.id,
          Constants.SCREEN.NARRATION
        );
        closeSaveModal();
        openSavedModal();
      } catch (e) {
        console.log(e.message);
        openErrorModal(e);
      } finally {
        closeLoadingModal();
      }
    };
    const save = async (narration: NarrationItem) => {
      narration.category === Constants.CATEGORY.RECORDING
        ? await recordingService.update(
            authToken,
            narration.id,
            state.title,
            state.description
          )
        : await ttsService.update(
            authToken,
            narration.id,
            state.title,
            state.description
          );
      fetchNarration();
    };
    const selectNarrationAndOpenRemoveModal = (narration: NarrationItem) => {
      closeAllDropdownMenu();
      selectNarration(narration);
      openRemoveModal();
    };
    const removeAndOpenRemovedModal = async () => {
      analytics.pressButtonRemove(
        state.selectedNarration?.id,
        Constants.CATEGORY.NARRATION,
        Constants.SCREEN.NARRATION
      );
      try {
        openLoadingModal();
        await remove(
          state.selectedNarration?.id,
          state.selectedNarration?.category
        );
        closeLoadingModal();
        closeRemoveModal();
        openRemovedModal();
      } catch (e) {
        closeRemoveModal();
        console.log(e.message);
        openErrorModal(e);
      } finally {
        closeLoadingModal();
      }
    };
    const remove = async (narrationId: string, narrationCategory: string) => {
      narrationCategory === Constants.CATEGORY.RECORDING
        ? await recordingService.remove(authToken, narrationId)
        : await ttsService.remove(authToken, narrationId);
      fetchNarration();
    };

    const oninput = (e: any) => {
      console.log("oninput", e.target.value);
      audioPlayer.changeCurrentTime(e.target.value);
    };

    return {
      ...toRefs(state),
      sortList,
      industries,
      play,
      stop,
      setNarration,
      selectNarration,
      clickIndustry,
      clickScene,
      convertDatestringToDate,
      convertNumberToTime,
      selectNarrationAndOpenDocumentModal,
      selectNarrationAndOpenPlayModal,
      stopAndClosePlayModal,
      fetchNarration,
      clickBack,
      closeAllDropdownMenu,
      toggleDropdown,
      selectNarrationAndOpenSaveModal,
      saveAndOpenSavedModal,
      selectNarrationAndOpenRemoveModal,
      removeAndOpenRemovedModal,
      oninput,
      isPlayModalAppear,
      openPlayModal,
      closePlayModal,
      isDocumentModalAppear,
      openDocumentModal,
      closeDocumentModal,
      isSaveModalAppear,
      openSaveModal,
      closeSaveModal,
      isSavedModalAppear,
      openSavedModal,
      closeSavedModal,
      isRemoveModalAppear,
      openRemoveModal,
      closeRemoveModal,
      isRemovedModalAppear,
      openRemovedModal,
      closeRemovedModal,
      isLoading,
      loadingMessage,
      openLoadingModal,
      closeLoadingModal,
      isErrorModalApper,
      errorCode,
      errorMessage,
      openErrorModal,
      closeErrorModal,
      isNarrationRecordingAbsentApper,
      openNarrationRecordingAbsentModal,
      closeNarrationRecordingAbsentModal,
      isNarrationTtsAbsentApper,
      openNarrationTtsAbsentModal,
      closeNarrationTtsAbsentModal,
      Constants,
      download,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
