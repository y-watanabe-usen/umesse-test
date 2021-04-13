// eslint-disable-next-line @typescript-eslint/no-var-requires
const lamejs = require('lamejs');

export class Mp3Encoder {

  public encode(audioBuffer: AudioBuffer) {
    const numOfChan = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;

    const mp3encoder = new lamejs.Mp3Encoder(numOfChan, sampleRate || 44100, 128);

    const samples = new Int16Array(this.waveBuffer(audioBuffer));
    const sampleBlockSize = 1152; //can be anything but make it a multiple of 576 to make encoders life easier
    const data = [];
    let buffer = [];

    for (let i = 0; i < samples.length; i += sampleBlockSize) {
      const chunk = samples.subarray(i, i + sampleBlockSize);
      buffer = mp3encoder.encodeBuffer(chunk);
      if (buffer.length > 0) {
        data.push(buffer);
      }
    }

    buffer = mp3encoder.flush();
    if (buffer.length > 0) {
      data.push(new Int8Array(buffer));
    }

    return new Blob(data, { type: 'audio/mp3' });
  }

  private waveBuffer(audioBuffer: AudioBuffer) {
    const numOfChan = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    const channels = [];
    let i;
    let sample;
    let offset = 0;
    let pos = 0;

    // write interleaved data
    pos = 44;
    for (i = 0; i < audioBuffer.numberOfChannels; i++) {
      channels.push(audioBuffer.getChannelData(i));
    }

    while (pos < length) {
      for (i = 0; i < numOfChan; i++) {             // interleave channels
        sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        // tslint:disable-next-line: no-bitwise
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
        view.setInt16(pos, sample, true);          // write 16-bit sample
        pos += 2;
      }
      offset++;                                    // next source sample
    }
    return buffer;
  }
}
