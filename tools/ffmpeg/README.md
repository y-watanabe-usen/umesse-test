# ffmpeg compile libfdk-aac

[Compile FFmpeg for Ubuntu, Debian, or Mint](https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu)

## build

```bash
docker build -t compile-ffmpeg .
docker run --name compile-ffmpeg compile-ffmpeg && docker cp compile-ffmpeg:/root/bin/ffmpeg ./ && docker rm compile-ffmpeg
```

## convert

```bash
sh convert.sh
```
