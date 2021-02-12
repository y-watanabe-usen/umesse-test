const lamejs = require('lamejs');

export class Mp3Encoder {

    public encode(audioBuffer: AudioBuffer) {
        const numOfChan = audioBuffer!!.numberOfChannels;
        const sampleRate = audioBuffer!!.sampleRate;
        const kbps = 128;
        const mp3encoder = new lamejs.Mp3Encoder(numOfChan, sampleRate, kbps);
        const channel = [];

        const samples = new Int16Array(sampleRate);
        const sampleBlockSize = 1152;

        for (let i = 0; i < samples.length; i += sampleBlockSize) {
            const sampleChunk = samples.subarray(i, i + sampleBlockSize);
            const mp3buf = mp3encoder.encodeBuffer(sampleChunk);
            if (mp3buf.length > 0) {
                channel.push(mp3buf);
            }
        }
        const buffer = mp3encoder.flush();

        if (buffer.length > 0) {
            channel.push(new Int8Array(buffer));
        }

        return new Blob([buffer], { type: 'audio/mp3' });
    }

}
