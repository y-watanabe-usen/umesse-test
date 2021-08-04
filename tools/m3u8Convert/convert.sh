#!/usr/bin/env bash
set -u

HOME_DIR=$(cd $(dirname $0);pwd)
SRC_DIR=$HOME_DIR/src
DIST_DIR=$HOME_DIR/dist

ffmpeg="ffmpeg"

cd $SRC_DIR
for filename in `\find . -name '*.mp3' | sed 's!^.*/!!'`; do
    file=`echo $filename | cut -f 1 -d '.'` # 拡張子を取り除く
    $ffmpeg \
        -i $filename \
        -c:v copy -c:a copy \
        -f hls \
        -hls_time 10 \
        -hls_playlist_type vod \
        -hls_segment_filename "$DIST_DIR/$file%4d.ts" $DIST_DIR/$file.m3u8
done
