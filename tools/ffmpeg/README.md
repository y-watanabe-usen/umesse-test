# ffmpeg build libfdk-aac

[Compile FFmpeg for Ubuntu, Debian, or Mint](https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu)

## build

```bash
docker build -t compile-ffmpeg .
docker run --name compile-ffmpeg compile-ffmpeg && docker cp compile-ffmpeg:/root/bin/ffmpeg ./ && docker rm compile-ffmpeg
```

## try

```bash
./ffmpeg -y \
  -i ../../sample_data/チャイム/サンプル01.mp3 \
  -i ../../sample_data/チャイム/サンプル02.mp3 \
  -i ../../sample_data/BGM/サンプル01.mp3 \
  -i ../../sample_data/ナレーション/サンプル01.mp3 \
  -i ../../sample_data/ナレーション/サンプル02.mp3 \
  -i ../../sample_data/ナレーション/サンプル03.mp3 \
  -filter_complex '
    [0:a]volume=0.5[start_chime];
    [1:a]volume=0.5,adelay=3s|3s[end_chime];
    [2:a]volume=0.5,aloop=2:2.14748e+009[bgm];
    [3:a]volume=3.0,adelay=3s|3s[narration1];
    [4:a]volume=3.0,adelay=3s|3s[narration2];
    [5:a]volume=3.0,adelay=3s|3s,apad=pad_dur=5[narration3];
    [narration1][narration2][narration3]concat=n=3:v=0:a=1[join];
    [join][bgm]amix=duration=shortest[mix];
    [mix][end_chime]acrossfade=d=3[last];
    [start_chime][last]concat=n=2:v=0:a=1
  ' \
  -acodec libfdk_aac -profile:a aac_he_v2 -ab 48k -ar 48000 -ac 2 \
  ./output.aac
```
