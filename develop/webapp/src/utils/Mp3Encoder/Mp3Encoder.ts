const lamejs = require('lamejs');

export class Mp3Encoder {

    public encode(audioBuffer: AudioBuffer) {
        const numOfChan = audioBuffer!!.numberOfChannels;
        const sampleRate = audioBuffer!!.sampleRate;
        const length = audioBuffer!!.length;
        const mp3encoder = new lamejs.Mp3Encoder(numOfChan, sampleRate || 44100, 128);

        const samples = new Int16Array(this.waveBuffer(audioBuffer));
        const sampleBlockSize = 1152; //can be anything but make it a multiple of 576 to make encoders life easier
        const data = [];
        let buffer = [];

        for (let i = 0; i < length; i += sampleBlockSize) {
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
        const numOfChan = audioBuffer!!.numberOfChannels;
        const length = audioBuffer!!.length * numOfChan * 2 + 44;
        const buffer = new ArrayBuffer(length);
        const view = new DataView(buffer);
        const channels = [];
        let i;
        let sample;
        let offset = 0;
        let pos = 0;

        // write WAVE header
        view.setUint32(0, 0x46464952, true);                         // "RIFF"
        view.setUint32(4, length - 8, true);                         // file length - 8
        view.setUint32(8, 0x45564157, true);                         // "WAVE"

        view.setUint32(12, 0x20746d66, true);                         // "fmt " chunk
        view.setUint32(16, 16, true);                                 // length = 16
        view.setUint16(20, 1, true);                                  // PCM (uncompressed)
        view.setUint16(22, numOfChan, true);
        view.setUint32(24, audioBuffer.sampleRate, true);
        view.setUint32(28, audioBuffer.sampleRate * 2 * numOfChan, true); // avg. bytes/sec
        view.setUint16(32, numOfChan * 2, true);                      // block-align
        view.setUint16(34, 16, true);                                 // 16-bit (hardcoded in this demo)
        view.setUint32(36, 0x61746164, true);                         // "data" - chunk
        view.setUint32(40, length - pos - 4, true);                   // chunk length

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
