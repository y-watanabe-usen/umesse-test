<template>
  <div @click="onClickSomewhere">
    <BasicLayout>
      <template #header>
        <Header :clickBack="openConfirmBackHomeModal">
          <template #title>
            <div class="header-info">
              <Button
                :isDisabled="narrations.length === 0"
                @click="createAndOpenPlayModal"
              >
                <img
                  v-show="narrations.length === 0"
                  src="@/assets/icon_sound_white.svg"
                />
                <img
                  v-show="narrations.length !== 0"
                  src="@/assets/icon_sound.svg"
                />
                試聴
              </Button>
              <p v-if="isIndicateCmTime">{{ convertNumberToTime(cmTime) }}</p>
              <p v-else>約 {{ convertNumberToTime(getAboutCmTime()) }}</p>
            </div>
          </template>
          <template #buttons>
            <Button :isDisabled="narrations.length === 0" @click="clickConfirm"
              >確定</Button
            >
          </template>
        </Header>
      </template>
      <template #contents>
        <CmLayout>
          <template #left>
            <CmItem
              v-if="startChime"
              title="開始チャイム"
              size="fixed"
              :contentTitle="startChime.title"
              :duration="`${convertNumberToTime(startChime.seconds)}`"
              :volume="startChime.volume"
              :contentTitleName="'chime'"
              @toggleSlider="toggleStartChimeSlider"
              @click="clickStartChimeAndOpenPlayModal"
            >
              <template #volume>
                <transition>
                  <VolumeSlider
                    v-show="isStartChimeSliderAppear"
                    v-model="startChime.volume"
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
                  @click.stop="toggleStartChimeDropdown"
                >
                  <img src="@/assets/icon_more.svg" />
                  <transition>
                    <DropdownMenu
                      v-if="isStartChimeDropdownAppear"
                      :width="200"
                      :targetWidth="30"
                      :targetHeight="30"
                      direction="down"
                      :params="[
                        {
                          title: '変更',
                          action: () => {
                            changeCmStartChime(startChime.id);
                          },
                        },
                        {
                          title: '削除',
                          action: () => {
                            clearStartChime(startChime.id);
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
              title="開始チャイム"
              :isEmpty="true"
              size="fixed"
              @add="$router.push({ name: 'CmChime', params: { div: 'start' } })"
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
              :contentTitleName="'narration' + `${narrations.length}`"
              @toggleSlider="toggleNarrationSlider(index)"
              @click="clickNarrationAndOpenPlayModal(index)"
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
                          title: '自分で録音した音声と入れ替える',
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
                          title: '音声合成(テンプレート)から入れ替える',
                          action: () => {
                            changeVoiceTemplate(index);
                          },
                        },
                        {
                          title: '音声合成(フリー入力)から入れ替える',
                          action: () => {
                            changeVoiceFree(index);
                          },
                        },
                        {
                          title: '削除',
                          action: () => {
                            clearNarration(index, narration.id);
                          },
                          isCaution: true,
                          isDisabled: narrations.length == 1,
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
                :contentTitleName="'narration' + `${narrations.length}`"
                size="flexible"
                @add="toggleNarrationDropdown(narrations.length)"
              >
                <template #dropdownmenu>
                  <transition>
                    <DropdownMenu
                      v-if="isNarrationDropdownAppear[narrations.length]"
                      :width="320"
                      :targetWidth="100"
                      :targetHeight="100"
                      direction="down"
                      :params="[
                        {
                          title: '自分で録音して音声を追加',
                          action: () => {
                            addRecording();
                          },
                        },
                        {
                          title: '他のナレーションを追加',
                          action: () => {
                            addNarration();
                          },
                        },
                        {
                          title: '音声合成(テンプレート)を追加',
                          action: () => {
                            addVoiceTemplate();
                          },
                        },
                        {
                          title: '音声合成(フリー入力)を追加',
                          action: () => {
                            addVoiceFree();
                          },
                        },
                      ]"
                    />
                  </transition>
                </template>
              </CmItem>
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
              :contentTitleName="'bgm'"
              @toggleSlider="toggleBgmSlider"
              @click="clickBgmAndOpenPlayModal"
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
                            changeCmBgm(bgm.id);
                          },
                        },
                        {
                          title: '削除',
                          action: () => {
                            clearBgm(bgm.id);
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
              title="終了チャイム"
              size="fixed"
              :contentTitle="endChime.title"
              :duration="`${convertNumberToTime(endChime.seconds)}`"
              :volume="endChime.volume"
              :contentTitleName="'chime'"
              @toggleSlider="toggleEndChimeSlider"
              @click="clickEndChimeAndOpenPlayModal"
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
                            changeCmEndChime(endChime.id);
                          },
                        },
                        {
                          title: '削除',
                          action: () => {
                            clearEndChime(endChime.id);
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
              title="終了チャイム"
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
            @play="playGenerateCm()"
            @stop="stop"
            :oninput="seekAudioPlayerProgressBar"
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
        v-if="isPlayStartChimeModalAppear"
        @close="stopAndClosePlayStartChimeModal"
      >
        <template #header>
          <ModalHeader title="試聴" @close="stopAndClosePlayStartChimeModal" />
        </template>
        <template #contents>
          <PlayDialogContents
            :isLoading="isDownloading || isCreating"
            :isPlaying="isPlaying"
            :playbackTime="playbackTime"
            :duration="duration"
            @play="play(startChime.id, Constants.CATEGORY.CHIME)"
            @stop="stop"
            :oninput="seekAudioPlayerProgressBar"
          />
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="stopAndClosePlayStartChimeModal"
              >終了</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalDialog
        v-if="isPlayNarrationModalAppear"
        @close="stopAndClosePlayNarrationModal"
      >
        <template #header>
          <ModalHeader title="試聴" @close="stopAndClosePlayNarrationModal" />
        </template>
        <template #contents>
          <PlayDialogContents
            :isLoading="isDownloading || isCreating"
            :isPlaying="isPlaying"
            :playbackTime="playbackTime"
            :duration="duration"
            @play="play(narrationIndex, Constants.CATEGORY.NARRATION)"
            @stop="stop"
            :oninput="seekAudioPlayerProgressBar"
          />
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="stopAndClosePlayNarrationModal"
              >終了</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalDialog
        v-if="isPlayBgmModalAppear"
        @close="stopAndClosePlayBgmModal"
      >
        <template #header>
          <ModalHeader title="試聴" @close="stopAndClosePlayBgmModal" />
        </template>
        <template #contents>
          <PlayDialogContents
            :isLoading="isDownloading || isCreating"
            :isPlaying="isPlaying"
            :playbackTime="playbackTime"
            :duration="duration"
            @play="play(bgm.id, Constants.CATEGORY.BGM)"
            @stop="stop"
            :oninput="seekAudioPlayerProgressBar"
          />
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="stopAndClosePlayBgmModal"
              >終了</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalDialog
        v-if="isPlayEndChimeModalAppear"
        @close="stopAndClosePlayEndChimeModal"
      >
        <template #header>
          <ModalHeader title="試聴" @close="stopAndClosePlayEndChimeModal" />
        </template>
        <template #contents>
          <PlayDialogContents
            :isLoading="isDownloading || isCreating"
            :isPlaying="isPlaying"
            :playbackTime="playbackTime"
            :duration="duration"
            @play="play(endChime.id, Constants.CATEGORY.CHIME)"
            @stop="stop"
            :oninput="seekAudioPlayerProgressBar"
          />
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="stopAndClosePlayEndChimeModal"
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
        :isFocus="isFocus"
        @close="closeSaveModal"
      >
        <template #header>
          <ModalHeader title="保存しますか？" @close="closeSaveModal" />
        </template>
        <template #contents>
          <FormGroup title="タイトル" :required="true">
            <TextBox
              v-model="title"
              :maxLength="Constants.MAX_LENGTH_TITLE"
              @focus="inputFocusBlur(true)"
              @blur="inputFocusBlur(false)"
            />
          </FormGroup>
          <FormGroup title="説明">
            <TextArea
              v-model="description"
              :maxLength="Constants.MAX_LENGTH_DESCRIPTION"
              @focus="inputFocusBlur(true)"
              @blur="inputFocusBlur(false)"
            />
          </FormGroup>
          <FormGroup title="シーン">
            <SelectBox
              v-model="scene"
              :options="
                inputScenesList.map((scene) => {
                  return { title: scene.name, value: scene.cd };
                })
              "
            />
          </FormGroup>
          <FormGroup title="アップロード先">
            <SelectBox
              v-model="uploadSystem"
              :options="
                uploadSystemArray.map((uploadSystemArray) => {
                  return {
                    title: uploadSystemArray.name,
                    value: uploadSystemArray.cd,
                  };
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
      <ModalDialog v-if="isSavedModalAppear" @close="toBackFunction">
        <template #contents>
          <MessageDialogContents>
            作成が完了いたしました。
          </MessageDialogContents>
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="primary" @click="toBackFunction">終了する</Button>
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
    <ModalLoading
      v-if="isLoading || isCreateCmLoadingModalAppear"
      title="音源の合成中（CMの長さによっては、処理に数分かかる場合があります。）"
    />
    <transition>
      <ModalDialog
        v-if="isConfirmBackHomeModalAppear"
        @close="closeConfirmBackHomeModal"
      >
        <template #contents>
          <MessageDialogContents>
            {{
              backScreenName
            }}画面へ戻ります。作成中のCMは保存されませんが、よろしいでしょうか？
          </MessageDialogContents>
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="closeConfirmBackHomeModal"
              >キャンセル</Button
            >
            <Button type="primary" @click="toBackFunction"
              >{{ backScreenName }}画面へ戻る</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
} from "vue";
import useAudioPlayer from "@/utils/audioPlayer";
import { useGlobalStore } from "@/store";
import * as formatDate from "@/utils/formatDate";
import Constants from "@/utils/constants";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
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
import { MAX_NARRATION_COUNT, UPLOAD_CM_STATE, useCmStore } from "@/store/cm";
import router from "@/router";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import { audioService } from "@/services";
import * as common from "@/utils/common";
import { User } from "umesseapi/models";
import analytics from "@/utils/firebaseAnalytics";
import useModalController from "@/mixins/modalController";
import useLoadingModalController from "@/mixins/loadingModalController";
import useErrorModalController from "@/mixins/errorModalController";
import { displayCache } from "@/repository/cache";
import { DISPLAY_CACHE_KEY } from "@/repository/cache/displayCache";

export default defineComponent({
  components: {
    BasicLayout,
    Header,
    Button,
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
    CmLayout,
    CmItem,
    DropdownMenu,
    VolumeSlider,
    ModalLoading,
  },
  setup() {
    const audioPlayer = useAudioPlayer();
    const { auth } = useGlobalStore();
    const cm = useCmStore();
    const authUser = <User>auth.getUserInfo();
    const uploadSystemArray = common.getUploadSystemService(authUser.serviceCd);
    const inputScenesList = common.getInputScenes();
    const {
      isApper: isPlayModalAppear,
      open: openPlayModal,
      close: closePlayModal,
    } = useModalController();
    const {
      isApper: isPlayStartChimeModalAppear,
      open: openPlayStartChimeModal,
      close: closePlayStartChimeModal,
    } = useModalController();
    const {
      isApper: isPlayNarrationModalAppear,
      open: openPlayNarrationModal,
      close: closePlayNarrationModal,
    } = useModalController();
    const {
      isApper: isPlayBgmModalAppear,
      open: openPlayBgmModal,
      close: closePlayBgmModal,
    } = useModalController();
    const {
      isApper: isPlayEndChimeModalAppear,
      open: openPlayEndChimeModal,
      close: closePlayEndChimeModal,
    } = useModalController();
    const {
      isApper: isSaveModalAppear,
      open: openSaveModal,
      close: closeSaveModal,
    } = useModalController();
    const {
      isApper: isSavedModalAppear,
      open: openSavedModal,
    } = useModalController();
    const {
      isApper: isConfirmBackHomeModalAppear,
      open: openConfirmBackHomeModal,
      close: closeConfirmBackHomeModal,
    } = useModalController();
    const {
      isApper: isCreateCmLoadingModalAppear,
      open: openCreateCmLoadingModal,
      close: closeCreateCmLoadingModal,
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
    const state = reactive({
      cmTime: computed(() => cm.secounds),
      startChime: computed(() => cm.startChime),
      narrations: computed(() => cm.narrations),
      bgm: computed(() => cm.bgm),
      endChime: computed(() => cm.endChime),
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: false,
      isCreating: computed(() => cm.status() == UPLOAD_CM_STATE.CREATING),
      isUpdating: computed(() => cm.status() == UPLOAD_CM_STATE.UPDATING),
      status: computed(() => cm.status()),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      title: cm.title,
      description: cm.description,
      scene: common.getSceneCd(cm.scene.sceneCd, cm.isEdit),
      uploadSystem: common.getUploadSystemServiceCd(
        authUser.serviceCd,
        cm.uploadSystem,
        cm.isEdit
      ),
      isNarrationDropdownAppear: [false, false, false, false],
      isStartChimeDropdownAppear: false,
      isEndChimeDropdownAppear: false,
      isBgmDropdownAppear: false,
      isNarrationSliderAppear: [false, false, false, false],
      isStartChimeSliderAppear: false,
      isEndChimeSliderAppear: false,
      isBgmSliderAppear: false,
      narrationIndex: 0,
      isFocus: false,
      isIndicateCmTime: cm.isEdit,
    });

    const inputFocusBlur = (isFocus: boolean) => {
      state.isFocus = isFocus;
    };
    const clickStartChimeAndOpenPlayModal = async () => {
      if (!cm.startChime) return;
      try {
        state.isDownloading = true;
        openPlayStartChimeModal();
        const url = await audioService.getUrlById(
          cm.startChime.id,
          cm.startChime.category
        );
        analytics.pressButtonPlayTrial(
          cm.startChime.id,
          Constants.CATEGORY.CHIME,
          Constants.SCREEN.CM
        );
        await audioPlayer.load(url);
      } catch (e) {
        closePlayStartChimeModal();
        openErrorModal(e);
      } finally {
        state.isDownloading = false;
      }
    };
    const clickEndChimeAndOpenPlayModal = async () => {
      if (!cm.endChime) return;
      try {
        state.isDownloading = true;
        openPlayEndChimeModal();
        const url = await audioService.getUrlById(
          cm.endChime.id,
          cm.endChime.category
        );
        analytics.pressButtonPlayTrial(
          cm.endChime.id,
          Constants.CATEGORY.CHIME,
          Constants.SCREEN.CM
        );
        await audioPlayer.load(url);
      } catch (e) {
        closePlayEndChimeModal();
        openErrorModal(e);
      } finally {
        state.isDownloading = false;
      }
    };
    const clickNarrationAndOpenPlayModal = async (index: number) => {
      state.narrationIndex = index;
      const narration = cm.narration(state.narrationIndex);
      if (!narration) return;
      try {
        state.isDownloading = true;
        openPlayNarrationModal();
        const url = await audioService.getUrlById(
          narration.id,
          narration.category
        );
        analytics.pressButtonPlayTrial(
          narration.id,
          Constants.CATEGORY.NARRATION,
          Constants.SCREEN.CM
        );
        await audioPlayer.load(url);
      } catch (e) {
        closePlayNarrationModal();
        openErrorModal(e);
      } finally {
        state.isDownloading = false;
      }
    };
    const clickBgmAndOpenPlayModal = async () => {
      if (!cm.bgm) return;
      try {
        state.isDownloading = true;
        openPlayBgmModal();
        const url = await audioService.getUrlById(cm.bgm.id, cm.bgm.category);
        analytics.pressButtonPlayTrial(
          cm.bgm.id,
          Constants.CATEGORY.BGM,
          Constants.SCREEN.CM
        );
        await audioPlayer.load(url);
      } catch (e) {
        closePlayBgmModal();
        openErrorModal(e);
      } finally {
        state.isDownloading = false;
      }
    };

    const play = async (id: string, category: string) => {
      if (state.isPlaying) return;
      analytics.pressButtonPlayTrial(id, category, Constants.SCREEN.CM);
      await audioPlayer.start();
    };

    const playGenerateCm = async () => {
      if (!cm.url) return;
      try {
        state.isDownloading = true;
        analytics.pressButtonPlayTrial(
          cm.url,
          Constants.CATEGORY.CM,
          Constants.SCREEN.CM
        );
        await audioPlayer.start();
      } catch (e) {
        openErrorModal(e);
      } finally {
        state.isDownloading = false;
      }
    };
    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };

    const clearNarration = (index: number, id: string) => {
      analytics.pressButtonRemove(
        id,
        Constants.CATEGORY.NARRATION,
        Constants.SCREEN.CM
      );
      cm.clearNarration(index);
      closeAllDropdownMenu();
      state.isIndicateCmTime = false;
    };
    const clearStartChime = (id: string) => {
      analytics.pressButtonRemove(
        id,
        Constants.CATEGORY.CHIME,
        Constants.SCREEN.CM
      );
      cm.clearStartChime();
      state.isIndicateCmTime = false;
    };
    const clearEndChime = (id: string) => {
      analytics.pressButtonRemove(
        id,
        Constants.CATEGORY.CHIME,
        Constants.SCREEN.CM
      );
      cm.clearEndChime();
      state.isIndicateCmTime = false;
    };
    const clearBgm = (id: string) => {
      analytics.pressButtonRemove(
        id,
        Constants.CATEGORY.BGM,
        Constants.SCREEN.CM
      );
      cm.clearBgm();
      state.isIndicateCmTime = false;
    };

    const clickConfirm = async () => {
      try {
        openLoadingModal();
        await cm.create();
        state.isIndicateCmTime = true;
        closeLoadingModal();
        openSaveModal();
      } catch (e) {
        openErrorModal(e);
        state.isIndicateCmTime = false;
      } finally {
        closeLoadingModal();
      }
    };

    const createAndOpenPlayModal = async () => {
      try {
        openCreateCmLoadingModal();
        await cm.create();
        closeCreateCmLoadingModal();
        openPlayModal();
        state.isIndicateCmTime = true;
        await audioPlayer.load(cm.url);
      } catch (e) {
        closeCreateCmLoadingModal();
        closePlayModal();
        openErrorModal(e);
        state.isIndicateCmTime = false;
      }
    };
    const stopAndClosePlayModal = () => {
      state.isDownloading = false;
      stop();
      closePlayModal();
    };
    const updateAndOpenSavedModal = async () => {
      saveAnalytics();
      try {
        openLoadingModal();
        await cm.update(
          state.title,
          state.description,
          state.scene,
          state.uploadSystem
        );
        closeSaveModal();
        openSavedModal();
      } catch (e) {
        openErrorModal(e);
      } finally {
        closeLoadingModal();
      }
    };
    const stopAndClosePlayStartChimeModal = () => {
      state.isDownloading = false;
      stop();
      closePlayStartChimeModal();
    };
    const stopAndClosePlayNarrationModal = () => {
      state.isDownloading = false;
      stop();
      closePlayNarrationModal();
    };
    const stopAndClosePlayBgmModal = () => {
      state.isDownloading = false;
      stop();
      closePlayBgmModal();
    };
    const stopAndClosePlayEndChimeModal = () => {
      state.isDownloading = false;
      stop();
      closePlayEndChimeModal();
    };
    const convertNumberToTime = (second: number) =>
      formatDate.convertNumberToTime(second);

    const addRecording = () => {
      cm.unSelectNarrationIndex();
      toRecoding();
    };
    const addNarration = () => {
      cm.unSelectNarrationIndex();
      toNarration();
    };
    const addVoiceTemplate = () => {
      cm.unSelectNarrationIndex();
      removeDisplayCacheVoiceTemplate();
      toVoiceTemplate();
    };
    const addVoiceFree = () => {
      cm.unSelectNarrationIndex();
      toVoiceFree();
    };
    const changeRecording = (index: number) => {
      cm.selectNarrationIndex(index);
      toRecoding();
    };
    const changeNarration = (index: number) => {
      cm.selectNarrationIndex(index);
      toNarration();
    };
    const changeVoiceTemplate = (index: number) => {
      cm.selectNarrationIndex(index);
      removeDisplayCacheVoiceTemplate();
      toVoiceTemplate();
    };
    const changeVoiceFree = (index: number) => {
      cm.selectNarrationIndex(index);
      toVoiceFree();
    };
    const removeDisplayCacheVoiceTemplate = () => {
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_INDUSTRY_CD);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SCENE_CD);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_TEMPLATES);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SCENES);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SORT);
    };
    const toHome = () => {
      cm.reset();
      router.go(1 - history.length); // gohome.
    };
    const toRecoding = () => {
      router.push({ name: "Recording" });
    };
    const toNarration = () => {
      router.push({ name: "Narration" });
    };
    const toVoiceTemplate = () => {
      router.push({ name: "VoiceTemplate" });
    };
    const toVoiceFree = () => {
      router.push({ name: "VoiceFree" });
    };
    const toManagement = () => {
      cm.reset();
      router.push({
        name: "Management",
      });
    };
    const closeAllDropdownMenu = () => {
      state.isNarrationDropdownAppear = [false, false, false, false];
      state.isStartChimeDropdownAppear = false;
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
    const toggleStartChimeDropdown = () => {
      closeAllSlider();
      if (state.isStartChimeDropdownAppear) {
        closeAllDropdownMenu();
      } else {
        closeAllDropdownMenu();
        state.isStartChimeDropdownAppear = true;
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
      state.isStartChimeSliderAppear = false;
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
    const toggleStartChimeSlider = () => {
      closeAllDropdownMenu();
      if (state.isStartChimeSliderAppear) {
        closeAllSlider();
      } else {
        closeAllSlider();
        state.isStartChimeSliderAppear = true;
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

    const handleBackButton = () => {
      openConfirmBackHomeModal();
      history.go(1);
    };
    onMounted(() => {
      analytics.screenView(Constants.SCREEN.CM);
      history.pushState(null, "", location.href);
      window.addEventListener("popstate", handleBackButton);
    });
    onUnmounted(() => {
      window.removeEventListener("popstate", handleBackButton);
    });
    const changeCmStartChime = (id: string) => {
      analytics.pressButtonChange(
        id,
        Constants.CATEGORY.CHIME,
        Constants.SCREEN.CM
      );
      router.push({
        name: "CmChime",
        params: { div: "start" },
      });
    };
    const changeCmEndChime = (id: string) => {
      analytics.pressButtonChange(
        id,
        Constants.CATEGORY.CHIME,
        Constants.SCREEN.CM
      );
      router.push({
        name: "CmChime",
        params: { div: "end" },
      });
    };
    const changeCmBgm = (id: string) => {
      analytics.pressButtonChange(
        id,
        Constants.CATEGORY.BGM,
        Constants.SCREEN.CM
      );
      router.push({ name: "CmBgm" });
    };
    const saveAnalytics = () => {
      analytics.pressButtonSave(
        {
          narrations:
            state.narrations.length === 0
              ? []
              : [
                  state.narrations[0].id,
                  state.narrations[1]?.id,
                  state.narrations[2]?.id,
                  state.narrations[3]?.id,
                ],
          bgm: !state.bgm ? null : state.bgm.id,
          start_chime: !state.startChime ? null : state.startChime.id,
          end_chime: !state.endChime ? null : state.endChime.id,
        },
        Constants.SCREEN.CM
      );
    };
    const backScreenName = cm.isEdit ? "管理" : "ホーム";
    const toBackFunction = cm.isEdit ? toManagement : toHome;

    const getAboutCmTime = () => {
      let aboutCmTime =
        (state.startChime?.seconds ?? 0) + (state.endChime?.seconds ?? 0);
      state.narrations.forEach((v) => {
        aboutCmTime += v.seconds;
      });
      return aboutCmTime;
    };

    const seekAudioPlayerProgressBar = (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        audioPlayer.changePlaybackTime(+e.target.value);
      }
    };

    return {
      ...toRefs(state),
      clearNarration,
      clearStartChime,
      clearEndChime,
      clearBgm,
      playGenerateCm,
      stop,
      createAndOpenPlayModal,
      stopAndClosePlayModal,
      updateAndOpenSavedModal,
      stopAndClosePlayStartChimeModal,
      stopAndClosePlayNarrationModal,
      stopAndClosePlayBgmModal,
      stopAndClosePlayEndChimeModal,
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
      clickStartChimeAndOpenPlayModal,
      clickEndChimeAndOpenPlayModal,
      clickBgmAndOpenPlayModal,
      clickNarrationAndOpenPlayModal,
      play,
      toHome,
      getAboutCmTime,
      closeAllDropdownMenu,
      toggleNarrationDropdown,
      toggleStartChimeDropdown,
      toggleEndChimeDropdown,
      toggleBgmDropdown,
      closeAllSlider,
      toggleNarrationSlider,
      toggleStartChimeSlider,
      toggleEndChimeSlider,
      toggleBgmSlider,
      onClickSomewhere,
      authUser,
      uploadSystemArray,
      inputScenesList,
      changeCmStartChime,
      changeCmEndChime,
      changeCmBgm,
      clickConfirm,
      seekAudioPlayerProgressBar,
      isPlayModalAppear,
      openPlayModal,
      closePlayModal,
      isPlayStartChimeModalAppear,
      openPlayStartChimeModal,
      closePlayStartChimeModal,
      isPlayNarrationModalAppear,
      openPlayNarrationModal,
      closePlayNarrationModal,
      isPlayBgmModalAppear,
      openPlayBgmModal,
      closePlayBgmModal,
      isPlayEndChimeModalAppear,
      openPlayEndChimeModal,
      closePlayEndChimeModal,
      isSaveModalAppear,
      openSaveModal,
      closeSaveModal,
      isSavedModalAppear,
      openSavedModal,
      isConfirmBackHomeModalAppear,
      openConfirmBackHomeModal,
      closeConfirmBackHomeModal,
      isLoading,
      loadingMessage,
      openLoadingModal,
      closeLoadingModal,
      isErrorModalApper,
      errorCode,
      errorMessage,
      openErrorModal,
      closeErrorModal,
      backScreenName,
      toBackFunction,
      inputFocusBlur,
      isCreateCmLoadingModalAppear,
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
      height: 26px;
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
