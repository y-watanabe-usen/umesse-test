# ffmpeg compile libfdk-aac

[Compile FFmpeg on CentOS](https://trac.ffmpeg.org/wiki/CompilationGuide/Centos)

## build

```bash
docker build -t compile-ffmpeg .
docker run --name compile-ffmpeg compile-ffmpeg && docker cp compile-ffmpeg:/root/bin/ffmpeg ./ && docker rm compile-ffmpeg
```

## convert

```bash
sh convert.sh
```
