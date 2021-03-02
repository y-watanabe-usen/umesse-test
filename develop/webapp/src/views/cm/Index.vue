<template>
  <BasicLayout>
    <template #header>
      <Header>
        <template #title>
          <div class="header-info">
            <Button @click="createAndOpenPlayModal">
              <img src="@/assets/icon_play.svg" />試聴する
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
            :volume="100"
            @togglePlay="playOpenChime"
          >
            <template #operaions>
              <button
                class="btn btn-link dropdown-toggle p-0"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg
                  id="メニュー"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="6"
                  viewBox="0 0 30 6"
                >
                  <circle
                    id="楕円形_2"
                    data-name="楕円形 2"
                    cx="3"
                    cy="3"
                    r="3"
                    fill="#578ed9"
                  />
                  <circle
                    id="楕円形_3"
                    data-name="楕円形 3"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(12)"
                    fill="#578ed9"
                  />
                  <circle
                    id="楕円形_4"
                    data-name="楕円形 4"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(24)"
                    fill="#578ed9"
                  />
                </svg>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'CmChime', params: { div: 'open' } }"
                >
                  変更
                </router-link>
                <a
                  class="dropdown-item"
                  href="#"
                  @click.prevent="clearOpenChime"
                  >削除</a
                >
              </div>
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
          <template
            v-for="(narration, index) in narrarions"
            :key="narration.contentsId"
          >
            <CmItem
              :title="
                'ナレーション ' +
                `${index + 1}` +
                '/' +
                `${MAX_NARRATION_COUNT}`
              "
              size="flexible"
              :contentTitle="`${narration.title}`"
              :duration="`${convertNumberToTime(narration.seconds)}`"
              :volume="100"
              @togglePlay="playNarration(index)"
            >
              <template #operations>
                <button
                  class="btn btn-link dropdown-toggle p-0"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    id="メニュー"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="6"
                    viewBox="0 0 30 6"
                  >
                    <circle
                      id="楕円形_2"
                      data-name="楕円形 2"
                      cx="3"
                      cy="3"
                      r="3"
                      fill="#578ed9"
                    />
                    <circle
                      id="楕円形_3"
                      data-name="楕円形 3"
                      cx="3"
                      cy="3"
                      r="3"
                      transform="translate(12)"
                      fill="#578ed9"
                    />
                    <circle
                      id="楕円形_4"
                      data-name="楕円形 4"
                      cx="3"
                      cy="3"
                      r="3"
                      transform="translate(24)"
                      fill="#578ed9"
                    />
                  </svg>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="changeRecording(index)"
                  >
                    自分で録音して音声と入れ替える</a
                  >
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="changeNarration(index)"
                    >他のナレーションと入れ替える</a
                  >
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="changeVoiceTemplate(index)"
                  >
                    合成音声(テンプレートから)入れ替える</a
                  >
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="changeVoiceFree(index)"
                  >
                    合成音声(フリー入力から)入れ替える</a
                  >
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="clearNarration(index)"
                    >削除</a
                  >
                </div>
              </template>
            </CmItem>
          </template>
          <template v-if="narrarions.length < MAX_NARRATION_COUNT">
            <CmItem
              :title="
                'ナレーション ' +
                `${narrarions.length + 1}` +
                '/' +
                `${MAX_NARRATION_COUNT}`
              "
              :isEmpty="true"
              size="flexible"
              @add="addNarration"
            />
          </template>
        </template>
        <template #bottom>
          <CmItem
            v-if="bgm"
            title="BGM"
            size="flexible"
            :contentTitle="bgm.title"
            :duration="`${convertNumberToTime(bgm.seconds)}`"
            :volume="50"
            @togglePlay="playBgm"
          >
            <template #operaions>
              <button
                class="btn btn-link dropdown-toggle p-0"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg
                  id="メニュー"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="6"
                  viewBox="0 0 30 6"
                >
                  <circle
                    id="楕円形_2"
                    data-name="楕円形 2"
                    cx="3"
                    cy="3"
                    r="3"
                    fill="#578ed9"
                  />
                  <circle
                    id="楕円形_3"
                    data-name="楕円形 3"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(12)"
                    fill="#578ed9"
                  />
                  <circle
                    id="楕円形_4"
                    data-name="楕円形 4"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(24)"
                    fill="#578ed9"
                  />
                </svg>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <router-link class="dropdown-item" :to="{ name: 'CmBgm' }">
                  変更
                </router-link>
                <a class="dropdown-item" href="#" @click.prevent="clearBgm"
                  >削除</a
                >
              </div>
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
            :volume="100"
            @togglePlay="playEndChime"
          >
            <template #operaions>
              <button
                class="btn btn-link dropdown-toggle p-0"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg
                  id="メニュー"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="6"
                  viewBox="0 0 30 6"
                >
                  <circle
                    id="楕円形_2"
                    data-name="楕円形 2"
                    cx="3"
                    cy="3"
                    r="3"
                    fill="#578ed9"
                  />
                  <circle
                    id="楕円形_3"
                    data-name="楕円形 3"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(12)"
                    fill="#578ed9"
                  />
                  <circle
                    id="楕円形_4"
                    data-name="楕円形 4"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(24)"
                    fill="#578ed9"
                  />
                </svg>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'CmChime', params: { div: 'end' } }"
                >
                  変更
                </router-link>
                <a class="dropdown-item" href="#" @click.prevent="clearEndChime"
                  >削除</a
                >
              </div>
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
</template>

<script lang="ts">
import { defineComponent, computed, reactive, onMounted, toRefs } from "vue";
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
import {
  isNarration,
  isRecording,
  isTts,
  MAX_NARRATION_COUNT,
} from "@/store/cm";
import router from "@/router";
import { ChimeItem } from "umesseapi/models";
import UMesseService from "@/services/UMesseService";

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
  },
  setup() {
    const audioStore = AudioStore();
    const audioPlayer = AudioPlayer();
    const { cm } = useGlobalStore();
    const state = reactive({
      openChime: computed(() => cm.openChime),
      narrarions: computed(() => cm.narrations),
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
      isUploading: false,
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
        chime.contentsId,
        chime.category
      );
      audioPlayer.start(audioBuffer);
    };

    const playNarration = async (index: number) => {
      const narration = cm.narration(index);
      if (!narration) return;
      console.log(narration);
      stop();
      let id: string = "";
      let category: string = "";
      if (isNarration(narration)) {
        id = narration.contentsId;
        category = Constants.CATEGORY.NARRATION;
      } else if (isRecording(narration)) {
        id = narration.recordingId;
        category = Constants.CATEGORY.RECORDING;
      } else if (isTts(narration)) {
        id = narration.ttsId;
        category = Constants.CATEGORY.TTS;
      }
      console.log(id, category);
      const audioBuffer = await UMesseService.resourcesService.getAudioBufferByContentsId(
        id,
        category
      );
      audioPlayer.start(audioBuffer);
    };
    const playBgm = async () => {
      const bgm = cm.bgm;
      if (!bgm) return;
      stop();
      const audioBuffer = await UMesseService.resourcesService.getAudioBufferByContentsId(
        bgm.contentsId,
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
        cm.create();
      } catch (e) {
        console.log(e);
      }
    };
    const update = async () => {
      try {
        cm.update(
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
        state.isUploading = true;
        await update();
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
