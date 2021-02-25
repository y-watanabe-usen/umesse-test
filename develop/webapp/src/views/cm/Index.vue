<template>
  <BasicLayout>
    <template #header>
      <Header>
        <template #title>
          <div class="header-info">
            <button @click="createAndOpenPlayModal">
              <img src="@/assets/icon_play.svg" />試聴する
            </button>
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
    <ModalDialog v-if="isPlayModalAppear" @close="closePlayModal">
      <template #header>
        <ModalHeader title="試聴" @close="closePlayModal" />
      </template>
      <template #contents>
        <div class="row">
          <div class="col-4">
            <template v-if="isDownloading || isCreating">
              <button class="btn btn-play btn-light" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Loading...</span>
                <template v-if="isDownloading"> ダウンロード中 </template>
                <template v-else> CM作成中 </template>
              </button>
            </template>
            <template v-else>
              <template v-if="!isPlaying">
                <button
                  type="button"
                  class="btn btn-light shadow btn-play"
                  @click="play(selectedBgm)"
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
        <ModalHeader title="保存しますか？" @close="closeSaveModal" />
      </template>
      <template #contents>
        <FormGroup title="タイトル" :required="true">
          <TextBox v-model:value="title" />
        </FormGroup>
        <FormGroup title="説明">
          <TextArea v-model:value="description" />
        </FormGroup>
        <FormGroup title="シーン">
          <SelectBox
            v-model:value="scene"
            @change="scene = $event.target.value"
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
            v-model:value="uploadSystem"
            @change="uploadSystem = $event.target.value"
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
            :isDisabled="!title"
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
        <p class="saved">作成が完了いたしました。</p>
      </template>
      <template #footer>
        <ModalFooter :noBorder="true">
          <Button type="secondary" @click="closeSavedModal"
            >編集の続きをする</Button
          >
          <Button type="primary" @click="$router.push({ name: 'Home' })"
            >終了する</Button
          >
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
import FormGroup from "@/components/molecules/FormGroup.vue";
import TextBox from "@/components/atoms/TextBox.vue";
import TextArea from "@/components/atoms/TextArea.vue";
import SelectBox from "@/components/atoms/SelectBox.vue";
import CmLayout from "@/components/templates/CmLayout.vue";
import CmItem from "@/components/molecules/CmItem.vue";
import {
  isNarrationItem,
  isRecordingItem,
  isTtsItem,
  MAX_NARRATION_COUNT,
} from "@/store/cm";
import router from "@/router";
import * as UMesseApi from "umesseapi";
import { config } from "@/utils/UMesseApiConfiguration";
import { ChimeItem } from "umesseapi/models";

export default defineComponent({
  components: {
    BasicLayout,
    Header,
    Button,
    ModalDialog,
    ModalHeader,
    ModalFooter,
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
    const { cm, base } = useGlobalStore();
    const resourcesApi = new UMesseApi.ResourcesApi(config);
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
      playbackTimeHms: computed(() =>
        FormatDate.convertNumberToTime(audioPlayer.getPlaybackTime())
      ),
      duration: computed(() => audioPlayer.getDuration()),
      durationHms: computed(() =>
        FormatDate.convertNumberToTime(audioPlayer.getDuration())
      ),
      title: "",
      description: "",
      scene: "001",
      uploadSystem: "01",
      isPlayModalAppear: false,
      isSaveModalAppear: false,
      isSavedModalAppear: false,
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
      const audioBuffer = await getAudioBuffer(
        chime.contentsId,
        chime.category
      );
      audioPlayer.start(audioBuffer);
    };

    const playNarration = async (index: number) => {
      const narration = cm.narration(index);
      if (!narration) return;
      stop();
      let id: string = "";
      let category: string = "";
      if (isNarrationItem(narration)) {
        id = narration.contentsId;
        category = narration.category;
      } else if (isRecordingItem(narration)) {
        id = narration.recordingId;
        category = "recording";
      } else if (isTtsItem(narration)) {
        id = narration.ttsId;
        category = "tts";
      }
      const audioBuffer = await getAudioBuffer(id, category);
      audioPlayer.start(audioBuffer);
    };
    const playBgm = async () => {
      const bgm = cm.bgm;
      if (!bgm) return;
      stop();
      const audioBuffer = await getAudioBuffer(bgm.contentsId, bgm.category);
      audioPlayer.start(audioBuffer);
    };
    const getAudioBuffer = async (contentsId: string, category: string) => {
      const cacheKey = `${category}/${contentsId}`;
      if (base.cache.has(cacheKey)) {
        return <AudioBuffer>base.cache.get(cacheKey);
      }
      const response = await resourcesApi.getSignedUrl(contentsId, category);
      await audioStore.download(response.data.url);
      base.cache.set(cacheKey, <AudioBuffer>audioStore.audioBuffer);
      return <AudioBuffer>audioStore.audioBuffer;
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
      console.log(cm.createCmData);
      if (!cm.createCmData) return;
      await audioStore.download(cm.createCmData.url!!);
      audioPlayer.start(<AudioBuffer>audioStore.audioBuffer);
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
      await update();
      closeSaveModal();
      setTimeout(() => {
        openSavedModal();
      }, 500);
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
    width: 180px;
    height: 50px;
    border-radius: 25px;
    background-color: white;
    color: $color_blue;
    font-size: 16px;
    font-weight: $font_weight_bold;
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

.saved {
  font-size: 20px;
  font-weight: $font_weight_bold;
  text-align: center;
}

.dropdown-toggle::after {
  content: none;
}
</style>
