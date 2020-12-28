#!/usr/bin/env bash
set -u

DATA_DIR="../../sample_data/s3/umesse-contents"

DATA_LIST="
chime/サンプル01.mp3
chime/サンプル02.mp3
bgm/サンプル01.mp3
narration/サンプル01.mp3
narration/サンプル02.mp3
narration/サンプル03.mp3
"

INPUT_FILE=""
for i in $DATA_LIST; do
  INPUT_FILE="$INPUT_FILE -i $DATA_DIR/$i"
done

ffmpeg="./ffmpeg"

echo
echo "========================================"
echo "1. 音源結合 + wav変換"
echo "========================================"
$ffmpeg -hide_banner -y $INPUT_FILE \
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
  -ar 44100 -acodec pcm_s16le -ac 2 -map_metadata -1 -flags +bitexact \
  ./tmp_1.wav

echo
echo "========================================"
echo "2. ラウドネス値取得 (1回目)"
echo "========================================"
check=$($ffmpeg -hide_banner -i tmp_1.wav -af loudnorm=I=-24.0:LRA=+20.0:tp=-2.0:print_format=json -f null - 2>&1 | tail -12)
echo $check | jq
eval $(echo $check | jq -r 'keys[] as $k | "\($k)=\(.[$k])"')

echo
echo "========================================"
echo "3. ラウドネス調整 + 音圧調整"
echo "========================================"
$ffmpeg -hide_banner -y -i tmp_1.wav \
  -af \
  loudnorm=print_format=json:linear=true:I=-24.0:LRA=+20.0:tp=-2.0:measured_I=$input_i:measured_LRA=$input_lra:measured_tp=$input_tp:measured_thresh=$input_thresh:offset=$target_offset,acompressor=threshold=-35dB:ratio=1.7:attack=200,alimiter=limit=-17dB:level=false:level_out=17dB \
  -ar 44100 tmp_2.wav

echo
echo "========================================"
echo "4. ラウドネス値取得 (2回目)"
echo "========================================"
check=$($ffmpeg -hide_banner -i tmp_2.wav -af loudnorm=I=-12.0:LRA=+10.0:tp=-2.0:print_format=json -f null - 2>&1 | tail -12)
echo $check | jq
eval $(echo $check | jq -r 'keys[] as $k | "\($k)=\(.[$k])"')

echo
echo "========================================"
echo "5. ラウドネス調整 + HE-AACv2化"
echo "========================================"
if [ `echo "$input_i > -17.5" | bc` -eq 1 ]; then
  $ffmpeg -hide_banner -y -i tmp_2.wav -af volume=-`echo "$input_i + 17.5" | bc`dB -acodec libfdk_aac -profile:a aac_he_v2 -ab 48k -ar 48000 -ac 2 output.aac
else
  $ffmpeg -hide_banner -y -i tmp_2.wav -af volume=0dB -acodec libfdk_aac -profile:a aac_he_v2 -ab 48k -ar 48000 -ac 2 output.aac
fi
