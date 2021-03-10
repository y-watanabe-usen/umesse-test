<template>
  <div @click="onClickSomewhere">
    <BasicLayout>
      <template #header>
        <Header>
          <template #title>
            <div class="header-info">
              <Button
                :isDisabled="narrations.length === 0"
                @click="createAndOpenPlayModal"
              >
                <img
                  v-show="narrations.length === 0"
                  src="@/assets/icon_play_white.svg"
                />
                <img
                  v-show="narrations.length !== 0"
                  src="@/assets/icon_play.svg"
                />
                試聴する
              </Button>
              <p>約2分15秒</p>
            </div>
          </template>
          <template #buttons>
            <Button
              :isDisabled="!(status >= UPLOAD_CM_STATE.CREATED)"
              @click="openSaveModal"
              >確定</Button
            >
          </template>
        </Header>
      </template>
      <template #contents>
        <CmLayout>
          <template #left>
            <CmItem
              v-if="openChime"
              title="Openチャイム"
              size="fixed"
              :contentTitle="openChime.title"
              :duration="`${convertNumberToTime(openChime.seconds)}`"
              :volume="openChime.volume"
              @togglePlay="playOpenChime"
              @toggleSlider="toggleOpenChimeSlider"
            >
              <template #volume>
                <transition>
                  <VolumeSlider
                    v-show="isOpenChimeSliderAppear"
                    v-model="openChime.volume"
                    :width="400"
                    :targetWidth="76"
                    :targetHeight="30"
                    direction="down"
                  />
                </transition>
              </template>
              <template #operations>
                <button
                  class="btn-more"
                  type="button"
                  @click.stop="toggleOpenChimeDropdown"
                >
                  <img src="@/assets/icon_more.svg" />
                  <transition>
                    <DropdownMenu
                      v-if="isOpenChimeDropdownAppear"
                      :width="200"
                      :targetWidth="30"
                      :targetHeight="30"
                      direction="down"
                      :params="[
                        {
                          title: '変更',
                          action: () => {
                            $router.push({
                              name: 'CmChime',
                              params: { div: 'open' },
                            });
                          },
                        },
                        {
                          title: '削除',
                          action: () => {
                            clearOpenChime();
                          },
                          isCaution: true,
                        },
                      ]"
                    />
                  </transition>
                </button>
              </template>
            </CmItem>
            <CmItem
              v-else
              title="Openチャイム"
              :isEmpty="true"
              size="fixed"
              @add="$router.push({ name: 'CmChime', params: { div: 'open' } })"
            />
          </template>
          <template #top>
            <CmItem
              v-for="(narration, index) in narrations"
              :key="narration.contentsId"
              :title="
                'ナレーション ' +
                `${index + 1}` +
                '/' +
                `${MAX_NARRATION_COUNT}`
              "
              size="flexible"
              :contentTitle="`${narration.title}`"
              :duration="`${convertNumberToTime(narration.seconds)}`"
              :volume="narration.volume"
              @togglePlay="playNarration(index)"
              @toggleSlider="toggleNarrationSlider(index)"
            >
              <template #volume>
                <transition>
                  <VolumeSlider
                    v-show="isNarrationSliderAppear[index]"
                    v-model="narration.volume"
                    :width="400"
                    :targetWidth="76"
                    :targetHeight="30"
                    direction="down"
                  />
                </transition>
              </template>
              <template #operations>
                <button
                  class="btn-more"
                  type="button"
                  @click.stop="toggleNarrationDropdown(index)"
                >
                  <img src="@/assets/icon_more.svg" />
                  <transition>
                    <DropdownMenu
                      v-if="isNarrationDropdownAppear[index]"
                      :width="320"
                      :targetWidth="30"
                      :targetHeight="30"
                      direction="down"
                      :params="[
                        {
                          title: '自分で録音して音声と入れ替える',
                          action: () => {
                            changeRecording(index);
                          },
                        },
                        {
                          title: '他のナレーションと入れ替える',
                          action: () => {
                            changeNarration(index);
                          },
                        },
                        {
                          title: '合成音声(テンプレートから)入れ替える',
                          action: () => {
                            changeVoiceTemplate(index);
                          },
                        },
                        {
                          title: '合成音声(フリー入力から)入れ替える',
                          action: () => {
                            changeVoiceFree(index);
                          },
                        },
                        {
                          title: '削除',
                          action: () => {
                            clearNarration(index);
                          },
                          isCaution: true,
                        },
                      ]"
                    />
                  </transition>
                </button>
              </template>
            </CmItem>
            <template v-if="narrations.length < MAX_NARRATION_COUNT">
              <CmItem
                :title="
                  'ナレーション ' +
                  `${narrations.length + 1}` +
                  '/' +
                  `${MAX_NARRATION_COUNT}`
                "
                :isEmpty="true"
                size="flexible"
                @click.stop="toggleNarrationDropdown(index)"
              />
              <transition>
                    <DropdownMenu
                      v-if="isNarrationDropdownAppear[index]"
                      :width="320"
                      :targetWidth="1420"
                      :targetHeight="300"
                      direction="down"
                      :params="[
                        {
                          title: '自分で録音して音声と入れ替える',
                          action: () => {
                            changeRecording(index);
                          },
                        },
                        {
                          title: '他のナレーションと入れ替える',
                          action: () => {
                            changeNarration(index);
                          },
                        },
                        {
                          title: '合成音声(テンプレートから)入れ替える',
                          action: () => {
                            changeVoiceTemplate(index);
                          },
                        },
                        {
                          title: '合成音声(フリー入力から)入れ替える',
                          action: () => {
                            changeVoiceFree(index);
                          },
                        },
                      ]"
                    />
                  </transition>
            </template>
          </template>
          <template #bottom>
            <CmItem
              v-if="bgm"
              title="BGM"
              size="flexible"
              :contentTitle="bgm.title"
              :duration="`${convertNumberToTime(bgm.seconds)}`"
              :volume="bgm.volume"
              @togglePlay="playBgm"
              @toggleSlider="toggleBgmSlider"
            >
              <template #volume>
                <transition>
                  <VolumeSlider
                    v-show="isBgmSliderAppear"
                    v-model="bgm.volume"
                    :width="400"
                    :targetWidth="76"
                    :targetHeight="30"
                    direction="up"
                  />
                </transition>
              </template>
              <template #operations>
                <button
                  class="btn-more"
                  type="button"
                  @click.stop="toggleBgmDropdown"
                >
                  <img src="@/assets/icon_more.svg" />
                  <transition>
                    <DropdownMenu
                      v-if="isBgmDropdownAppear"
                      :width="200"
                      :targetWidth="30"
                      :targetHeight="30"
                      direction="up"
                      :params="[
                        {
                          title: '変更',
                          action: () => {
                            $router.push({ name: 'CmBgm' });
                          },
                        },
                        {
                          title: '削除',
                          action: () => {
                            clearBgm();
                          },
                          isCaution: true,
                        },
                      ]"
                    />
                  </transition>
                </button>
              </template>
            </CmItem>
            <CmItem
              v-else
              title="BGM"
              :isEmpty="true"
              size="flexible"
              @add="$router.push({ name: 'CmBgm' })"
            />
          </template>
          <template #right>
            <CmItem
              v-if="endChime"
              title="Endチャイム"
              size="fixed"
              :contentTitle="endChime.title"
              :duration="`${convertNumberToTime(endChime.seconds)}`"
              :volume="endChime.volume"
              @togglePlay="playEndChime"
              @toggleSlider="toggleEndChimeSlider"
            >
              <template #volume>
                <transition>
                  <VolumeSlider
                    v-show="isEndChimeSliderAppear"
                    v-model="endChime.volume"
                    :width="400"
                    :targetWidth="76"
                    :targetHeight="30"
                    :offset="-189"
                    direction="down"
                  />
                </transition>
              </template>
              <template #operations>
                <button
                  class="btn-more"
                  type="button"
                  @click.stop="toggleEndChimeDropdown"
                >
                  <img src="@/assets/icon_more.svg" />
                  <transition>
                    <DropdownMenu
                      v-if="isEndChimeDropdownAppear"
                      :width="200"
                      :targetWidth="30"
                      :targetHeight="30"
                      :offset="-54"
                      direction="down"
                      :params="[
                        {
                          title: '変更',
                          action: () => {
                            $router.push({
                              name: 'CmChime',
                              params: { div: 'end' },
                            });
                          },
                        },
                        {
                          title: '削除',
                          action: () => {
                            clearEndChime();
                          },
                          isCaution: true,
                        },
                      ]"
                    />
                  </transition>
                </button>
              </template>
            </CmItem>
            <CmItem
              v-else
              title="Endチャイム"
              :isEmpty="true"
              size="fixed"
              @add="$router.push({ name: 'CmChime', params: { div: 'end' } })"
            />
          </template>
        </CmLayout>
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
            :isLoading="isDownloading || isCreating"
            :isPlaying="isPlaying"
            :playbackTime="playbackTime"
            :duration="duration"
            @play="play(selectedBgm)"
            @stop="stop"
          />
        </template>
        <template #footer>
          <ModalFooter :noBorder="true">
            <Button type="rectangle" @click="stopAndClosePlayModal"
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
          <ModalHeader title="保存しますか？" @close="closeSaveModal" />
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
          <FormGroup
            title="アップロード先"
            description="あとで、管理画面からアップロード先を変更することが出来ます。"
          >
            <SelectBox
              v-model="uploadSystem"
              :options="
                Constants.UPLOAD_SYSTEMS.map((uploadSystem) => {
                  return { title: uploadSystem.name, value: uploadSystem.cd };
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
              :isDisabled="!title || isUpdating"
              @click="updateAndOpenSavedModal"
              >保存する</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalDialog v-if="isSavedModalAppear" @close="closeSavedModal">
        <template #contents>
          <MessageDialogContents>
            作成が完了いたしました。
          </MessageDialogContents>
        </template>
        <template #footer>
          <ModalFooter :noBorder="true">
            <Button type="secondary" @click="closeSavedModal"
              >編集の続きをする</Button
            >
            <Button type="primary" @click="toHome">終了する</Button>
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalUploading v-if="isModalUploading" title="音源の合成中">
      </ModalUploading>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from "vue";
import AudioPlayer from "@/utils/AudioPlayer";
import AudioStore from "@/store/audio";
import { useGlobalStore } from "@/store";
import * as FormatDate from "@/utils/FormatDate";
import Constants from "@/utils/Constants";
import { UPLOAD_CM_STATE } from "@/services/uploadCmService";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import PlayDialogContents from "@/components/molecules/PlayDialogContents.vue";
import MessageDialogContents from "@/components/molecules/MessageDialogContents.vue";
import FormGroup from "@/components/molecules/FormGroup.vue";
import TextBox from "@/components/atoms/TextBox.vue";
import TextArea from "@/components/atoms/TextArea.vue";
import SelectBox from "@/components/atoms/SelectBox.vue";
import CmLayout from "@/components/templates/CmLayout.vue";
import CmItem from "@/components/molecules/CmItem.vue";
import DropdownMenu from "@/components/molecules/DropdownMenu.vue";
import VolumeSlider from "@/components/molecules/VolumeSlider.vue";
import { MAX_NARRATION_COUNT } from "@/store/cm";
import router from "@/router";
import { ChimeItem } from "umesseapi/models";
import UMesseService from "@/services/UMesseService";
import ModalUploading from "@/components/organisms/ModalUploading.vue";

export default defineComponent({
  components: {
    BasicLayout,
    Header,
    Button,
    ModalDialog,
    ModalHeader,
    ModalFooter,
    PlayDialogContents,
    MessageDialogContents,
    FormGroup,
    TextBox,
    TextArea,
    SelectBox,
    CmLayout,
    CmItem,
    DropdownMenu,
    VolumeSlider,
    ModalUploading,
  },
  setup() {
    const audioStore = AudioStore();
    const audioPlayer = AudioPlayer();
    const { auth, cm } = useGlobalStore();
    const authToken = <string>auth.getToken();
    const state = reactive({
      openChime: computed(() => cm.openChime),
      narrations: computed(() => cm.narrations),
      bgm: computed(() => cm.bgm),
      endChime: computed(() => cm.endChime),
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: computed(() => audioStore.isDownloading),
      isCreating: computed(() => cm.status() == UPLOAD_CM_STATE.CREATING),
      isUpdating: computed(() => cm.status() == UPLOAD_CM_STATE.UPDATING),
      status: computed(() => cm.status()),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      title: "",
      description: "",
      scene: "001",
      uploadSystem: "01",
      isPlayModalAppear: false,
      isSaveModalAppear: false,
      isSavedModalAppear: false,
      isModalUploading: false,
      isNarrationDropdownAppear: [false, false, false, false],
      isOpenChimeDropdownAppear: false,
      isEndChimeDropdownAppear: false,
      isBgmDropdownAppear: false,
      isNarrationSliderAppear: [false, false, false, false],
      isOpenChimeSliderAppear: false,
      isEndChimeSliderAppear: false,
      isBgmSliderAppear: false,
    });

    const playOpenChime = async () => {
      const chime = cm.openChime;
      if (!chime) return;
      playChime(chime);
    };

    const playEndChime = async () => {
      const chime = cm.endChime;
      if (!chime) return;
      playChime(chime);
    };

    const playChime = async (chime: ChimeItem) => {
      stop();
      const audioBuffer = await UMesseService.resourcesService.getAudioBufferByContentsId(
        chime.id,
        chime.category
      );
      audioPlayer.start(audioBuffer);
    };

    const playNarration = async (index: number) => {
      const narration = cm.narration(index);
      if (!narration) return;
      stop();
      const audioBuffer = await UMesseService.resourcesService.getAudioBufferByContentsId(
        narration.id,
        narration.category
      );
      audioPlayer.start(audioBuffer);
    };
    const playBgm = async () => {
      const bgm = cm.bgm;
      if (!bgm) return;
      stop();
      const audioBuffer = await UMesseService.resourcesService.getAudioBufferByContentsId(
        bgm.id,
        bgm.category
      );
      audioPlayer.start(audioBuffer);
    };

    const clearNarration = (index: number) => {
      cm.clearNarration(index);
    };
    const clearOpenChime = () => {
      cm.clearOpenChime();
    };
    const clearEndChime = () => {
      cm.clearEndChime();
    };
    const clearBgm = () => {
      cm.clearBgm();
    };
    const create = async () => {
      try {
        cm.create(authToken);
      } catch (e) {
        console.log(e);
      }
    };
    const update = async () => {
      try {
        cm.update(
          authToken,
          state.title,
          state.description,
          state.scene,
          state.uploadSystem
        );
      } catch (e) {
        console.log(e);
      }
    };

    const play = async () => {
      if (!cm.url) return;
      const audioBuffer = await UMesseService.resourcesService.getAudioBufferByUrl(
        cm.url
      );
      audioPlayer.start(audioBuffer);
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

    const createAndOpenPlayModal = () => {
      create();
      openPlayModal();
    };
    const stopAndClosePlayModal = () => {
      stop();
      closePlayModal();
    };
    const updateAndOpenSavedModal = async () => {
      try {
        openModalUploading();
        await update();
        closeModalUploading();
        closeSaveModal();
        openSavedModal();
        // setTimeout(() => {
        //   openSavedModal();
        // }, 5000);
      } catch (e) {
        console.log(e.message);
      } finally {
        closeModalUploading();
      }
    };
    const convertNumberToTime = (second: number) =>
      FormatDate.convertNumberToTime(second);

    const addRecording = () => {
      cm.unSelectNarrationIndex();
      router.push({ name: "Recording" });
    };
    const addNarration = () => {
      cm.unSelectNarrationIndex();
      router.push({ name: "Narration" });
    };
    const addVoiceTemplate = () => {
      cm.unSelectNarrationIndex();
      router.push({ name: "VoiceTemplate" });
    };
    const addVoiceFree = () => {
      cm.unSelectNarrationIndex();
      router.push({ name: "VoiceFree" });
    };
    const changeRecording = (index: number) => {
      cm.selectNarrationIndex(index);
      router.push({ name: "Recording" });
    };
    const changeNarration = (index: number) => {
      cm.selectNarrationIndex(index);
      router.push({ name: "Narration" });
    };
    const changeVoiceTemplate = (index: number) => {
      cm.selectNarrationIndex(index);
      router.push({ name: "VoiceTemplate" });
    };
    const changeVoiceFree = (index: number) => {
      cm.selectNarrationIndex(index);
      router.push({ name: "VoiceFree" });
    };
    const toHome = () => {
      cm.clearAll();
      router.push({ name: "Home" });
    };
    const openModalUploading = () => {
      state.isModalUploading = true;
    };
    const closeModalUploading = () => {
      state.isModalUploading = false;
    };
    const closeAllDropdownMenu = () => {
      state.isNarrationDropdownAppear = [false, false, false, false];
      state.isOpenChimeDropdownAppear = false;
      state.isEndChimeDropdownAppear = false;
      state.isBgmDropdownAppear = false;
    };
    const toggleNarrationDropdown = (index: number) => {
      closeAllSlider();
      if (state.isNarrationDropdownAppear[index]) {
        closeAllDropdownMenu();
      } else {
        closeAllDropdownMenu();
        state.isNarrationDropdownAppear[index] = true;
      }
    };
    const toggleOpenChimeDropdown = () => {
      closeAllSlider();
      if (state.isOpenChimeDropdownAppear) {
        closeAllDropdownMenu();
      } else {
        closeAllDropdownMenu();
        state.isOpenChimeDropdownAppear = true;
      }
    };
    const toggleEndChimeDropdown = () => {
      closeAllSlider();
      if (state.isEndChimeDropdownAppear) {
        closeAllDropdownMenu();
      } else {
        closeAllDropdownMenu();
        state.isEndChimeDropdownAppear = true;
      }
    };
    const toggleBgmDropdown = () => {
      closeAllSlider();
      if (state.isBgmDropdownAppear) {
        closeAllDropdownMenu();
      } else {
        closeAllDropdownMenu();
        state.isBgmDropdownAppear = true;
      }
    };
    const closeAllSlider = () => {
      state.isNarrationSliderAppear = [false, false, false, false];
      state.isOpenChimeSliderAppear = false;
      state.isEndChimeSliderAppear = false;
      state.isBgmSliderAppear = false;
    };
    const toggleNarrationSlider = (index: number) => {
      closeAllDropdownMenu();
      if (state.isNarrationSliderAppear[index]) {
        closeAllSlider();
      } else {
        closeAllSlider();
        state.isNarrationSliderAppear[index] = true;
      }
    };
    const toggleOpenChimeSlider = () => {
      closeAllDropdownMenu();
      if (state.isOpenChimeSliderAppear) {
        closeAllSlider();
      } else {
        closeAllSlider();
        state.isOpenChimeSliderAppear = true;
      }
    };
    const toggleEndChimeSlider = () => {
      closeAllDropdownMenu();
      if (state.isEndChimeSliderAppear) {
        closeAllSlider();
      } else {
        closeAllSlider();
        state.isEndChimeSliderAppear = true;
      }
    };
    const toggleBgmSlider = () => {
      closeAllDropdownMenu();
      if (state.isBgmSliderAppear) {
        closeAllSlider();
      } else {
        closeAllSlider();
        state.isBgmSliderAppear = true;
      }
    };
    const onClickSomewhere = () => {
      closeAllDropdownMenu();
      closeAllSlider();
    };
    return {
      ...toRefs(state),
      clearNarration,
      clearOpenChime,
      clearEndChime,
      clearBgm,
      create,
      update,
      play,
      stop,
      openPlayModal,
      closePlayModal,
      openSaveModal,
      closeSaveModal,
      openSavedModal,
      closeSavedModal,
      createAndOpenPlayModal,
      stopAndClosePlayModal,
      updateAndOpenSavedModal,
      Constants,
      convertNumberToTime,
      addRecording,
      addNarration,
      addVoiceTemplate,
      addVoiceFree,
      changeRecording,
      changeNarration,
      changeVoiceTemplate,
      changeVoiceFree,
      UPLOAD_CM_STATE,
      MAX_NARRATION_COUNT,
      playNarration,
      playOpenChime,
      playEndChime,
      playBgm,
      toHome,
      closeAllDropdownMenu,
      toggleNarrationDropdown,
      toggleOpenChimeDropdown,
      toggleEndChimeDropdown,
      toggleBgmDropdown,
      closeAllSlider,
      toggleNarrationSlider,
      toggleOpenChimeSlider,
      toggleEndChimeSlider,
      toggleBgmSlider,
      onClickSomewhere,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;

::v-deep .form-group .title {
  width: 162px;
}

.header-info {
  @include flex_between;
  align-items: center;
  height: 60px;
  width: 440px;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  button {
    width: 110px;
    margin-left: 5px;
    img {
      width: 30px;
      height: 23px;
      margin-right: 16px;
    }
  }
  p {
    color: white;
    font-size: 16px;
    font-weight: $font_weight_bold;
    margin-right: 28px;
  }
}

.dropdown-toggle::after {
  content: none;
}
</style>
