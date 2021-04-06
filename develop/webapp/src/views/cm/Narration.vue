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
                    <span
                      v-if="narration.seconds"
                      class="duration"
                      >{{
                        convertNumberToTime(narration.seconds)
                      }}</span
                    >
                    <span
                      v-if="narration.timestamp"
                      class="start"
                      >放送開始日{{
                        convertDatestringToDateJp(narration.timestamp)
                      }}</span
                    >
                    <span
                      v-if="narration.timestamp"
                      class="end"
                      >有効期限{{
                        convertDatestringToDateJp(narration.timestamp)
                      }}</span
                    >
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
                                title: '原稿',
                                action: () => {
                                  selectNarrationAndOpenDocumentModal(narration)
                                },
                              },
                              {
                                title: 'タイトル/説明 編集',
                                action: () => {},
                              },
                              {
                                title: '削除',
                                action: () => {},
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
          <PlayDialogContents
            :isLoading="isDownloading"
            :isPlaying="isPlaying"
            :playbackTime="playbackTime"
            :duration="duration"
            @play="play(selectedNarration)"
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
import TextDialogContents from "@/components/molecules/TextDialogContents.vue";
import DropdownMenu from "@/components/molecules/DropdownMenu.vue";
import { NarrationItem } from "umesseapi/models";
import { useGlobalStore } from "@/store";
import router from "@/router";
import {
  convertDatestringToDateJp,
  convertNumberToTime,
} from "@/utils/FormatDate";
import { Scene } from "@/utils/Constants";
import { UMesseError } from "../../models/UMesseError";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import { audioService, resourcesService, recordingService, ttsService } from "@/services";
import analytics from "@/utils/firebaseAnalytics";
import FormGroup from "@/components/molecules/FormGroup.vue";
import TextBox from "@/components/atoms/TextBox.vue";
import TextArea from "@/components/atoms/TextArea.vue";
import MessageDialogContents from "@/components/molecules/MessageDialogContents.vue";

import Constants from "@/utils/Constants";

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
    PlayDialogContents,
    TextDialogContents,
    DropdownMenu,
    FormGroup,
    TextBox,
    TextArea,
    MessageDialogContents,
  },
  setup() {
    const audioPlayer = AudioPlayer();
    const { auth, cm } = useGlobalStore();
    const authToken = <string>auth.getToken();
    const sortList = Common.getSort();
    const industries = Common.getNarrationIndustries();
    const state = reactive({
      sort: 1,
      activeIndustryCd: "02",
      activeSceneCd: null as string | null,
      narrations: [] as NarrationItem[],
      scenes: [] as Scene[],
      selectedNarration: null as NarrationItem | null,
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: false,
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      isDocumentModalAppear: false,
      isPlayModalAppear: false,
      isErrorModalApper: false,
      errorCode: "",
      errorMessage: "",
      isLoading: false,
      dropdownNarrationId: "",
      title: "",
      description: "",
      isSaveModalAppear: false,
      isSavedModalAppear: false,
      isRemoveModalAppear: false,
      isRemovedModalAppear: false,
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
        state.activeIndustryCd = industryCd;
        state.activeSceneCd = null;
        fetchScene();
      }
    };

    const clickScene = (sceneCd: string) => {
      state.activeSceneCd = sceneCd;
      fetchNarration();
    };

    const clickBack = () => {
      state.activeSceneCd = null;
      state.narrations = [];
    };

    const fetchScene = () => {
      state.scenes = Common.getIndustryScenes(state.activeIndustryCd);
      state.narrations = [];
    };

    const fetchNarration = async () => {
      if (!state.activeSceneCd) return;
      try {
        state.isLoading = true;
        const response = await resourcesService.fetchNarration(
          authToken,
          state.activeIndustryCd,
          state.activeSceneCd,
          state.sort
        );
        state.narrations = response;
      } catch (e) {
        openErrorModal(e);
      } finally {
        state.isLoading = false;
      }
    };

    const play = async (narration: NarrationItem) => {
      try {
        state.isDownloading = true;
        const audioBuffer = await audioService.getById(
          narration.id,
          narration.category
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

    const openDocumentModal = () => {
      state.isDocumentModalAppear = true;
    };
    const closeDocumentModal = () => {
      state.isDocumentModalAppear = false;
    };

    const openPlayModal = () => {
      state.isPlayModalAppear = true;
    };
    const closePlayModal = () => {
      state.isPlayModalAppear = false;
    };

    const selectNarrationAndOpenDocumentModal = (narration: NarrationItem) => {
      selectNarration(narration);
      closeAllDropdownMenu();
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

    const closeErrorModal = () => {
      state.isErrorModalApper = false;
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
      fetchScene();
    });

    const openErrorModal = (e: UMesseError) => {
      state.errorCode = e.errorCode;
      state.errorMessage = e.message;
      state.isErrorModalApper = true;
    };
    const closeModalLoading = () => {
      state.isLoading = false;
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
    const selectNarrationAndOpenSaveModal = (narration: NarrationItem) => {
      closeAllDropdownMenu();
      selectNarration(narration);
      state.title = narration.title;
      state.description = narration.description;
      openSaveModal();
    };
    const saveAndOpenSavedModal = async () => {
      try {
        if (!state.selectedNarration) return;
        await save(state.selectedNarration);
        closeSaveModal();
        openSavedModal();
      } catch (e) {
        console.log(e.message);
        openErrorModal(e);
      } finally {
        state.isDownloading = false;
      }
    };
    const save = async (narration: NarrationItem) => {
      narration.category === Constants.CATEGORY.RECORDING ? await recordingService.update(authToken, narration.id, state.title, state.description) : await ttsService.update(authToken, narration.id, state.title, state.description);
      fetchNarration();
    };
    const selectNarrationAndOpenRemoveModal = (narration: NarrationItem) => {
      closeAllDropdownMenu();
      selectNarration(narration);
      openRemoveModal();
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
    const removeAndOpenRemovedModal = async () => {
      try {
        await remove(state.selectedNarration?.id, state.selectedNarration?.category);
        closeModalLoading();
        closeRemoveModal();
        openRemovedModal();
      } catch (e) {
        closeRemoveModal();
        console.log(e.message);
        openErrorModal(e);
      } finally {
        state.isDownloading = false;
      }
    };
    const remove = async (narrationId: string, narrationCategory: string) => {
      narrationCategory === Constants.CATEGORY.RECORDING ? await recordingService.remove(authToken, narrationId) : await ttsService.remove(authToken, narrationId);
      fetchNarration();
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
      convertDatestringToDateJp,
      convertNumberToTime,
      openDocumentModal,
      closeDocumentModal,
      openPlayModal,
      closePlayModal,
      selectNarrationAndOpenDocumentModal,
      selectNarrationAndOpenPlayModal,
      stopAndClosePlayModal,
      closeErrorModal,
      fetchNarration,
      clickBack,
      closeAllDropdownMenu,
      toggleDropdown,
      selectNarrationAndOpenSaveModal,
      openSaveModal,
      closeSaveModal,
      closeSavedModal,
      saveAndOpenSavedModal,
      selectNarrationAndOpenRemoveModal,
      closeRemoveModal,
      closeRemovedModal,
      removeAndOpenRemovedModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
