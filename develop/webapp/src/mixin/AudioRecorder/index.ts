import { reactive, toRefs } from 'vue';
import { AudioRecorderState } from './state';
import * as UMesseApi from "umesseapi"

export default () => {
  const state = reactive<AudioRecorderState>({
    recording: false,
    chunks: new Array<Blob>(),
    mediaRecorder: null
  })

  const isRecording = () => {
    return state.recording
  }
  const start = async () => {
    reset();
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.onstop = () => stream.getTracks().forEach(track => track.stop());
    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      state.chunks.push(e.data);
    };
    mediaRecorder.start();

    state.recording = true;
    state.mediaRecorder = mediaRecorder;
  }
  const stop = () => {
    state.mediaRecorder?.stop();
    state.recording = false;
  }
  const reset = () => {
    state.chunks = []
  }

  const getBlob = () => {
    if (state.chunks.length == 0) {
      console.log(`blob is not found.`)
      return undefined;
    }
    return new Blob(state.chunks)
  }

  const getAudioBuffer = async () => {

    const blob = getBlob();
    if (blob == undefined) return;
    const context = new window.AudioContext();

    return new Promise<AudioBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: Event) => {
        context.decodeAudioData(reader.result as ArrayBuffer, (buffer) => {
          resolve(buffer);
        });
      };
      reader.onerror = (event: Event) => {
        reject(event);
      };
      reader.readAsArrayBuffer(blob);
    });
  };

  const postData = (filename: string, fileData: string) => {
    var api = new UMesseApi.RecordingApi();
    api.userRecordingPost(filename, fileData);
  }

  const getAudioFile = async (audioBuffer: AudioBuffer) => {
    var duration = audioBuffer.duration,
            rate = audioBuffer.sampleRate,
          offset = 0;

    return URL.createObjectURL(bufferToWave(audioBuffer, audioBuffer.length));

  }

  const bufferToWave = (abuffer: AudioBuffer, len: number) => {
    var numOfChan = abuffer.numberOfChannels,
        length = len * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [], i, sample,
        offset = 0,
        pos = 0;
  
    // write WAVE header
    setUint32(0x46464952);                         // "RIFF"
    setUint32(length - 8);                         // file length - 8
    setUint32(0x45564157);                         // "WAVE"
  
    setUint32(0x20746d66);                         // "fmt " chunk
    setUint32(16);                                 // length = 16
    setUint16(1);                                  // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2);                      // block-align
    setUint16(16);                                 // 16-bit (hardcoded in this demo)
  
    setUint32(0x61746164);                         // "data" - chunk
    setUint32(length - pos - 4);                   // chunk length
  
    // write interleaved data
    for(i = 0; i < abuffer.numberOfChannels; i++)
      channels.push(abuffer.getChannelData(i));
  
    while(pos < length) {
      for(i = 0; i < numOfChan; i++) {             // interleave channels
        sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
        view.setInt16(pos, sample, true);          // write 16-bit sample
        pos += 2;
      }
      offset++                                     // next source sample
    }
  
    // create Blob
    return new Blob([buffer], {type: "audio/wav"});
  
    function setUint16(data: number) {
      view.setUint16(pos, data, true);
      pos += 2;
    }
  
    function setUint32(data: number) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  }

  return {
    ...toRefs(state),
    getBlob, getAudioBuffer,
    start, stop, reset, isRecording, postData, getAudioFile, bufferToWave
  };
}
