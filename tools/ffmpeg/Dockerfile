FROM lambci/lambda:build

#
# https://trac.ffmpeg.org/wiki/CompilationGuide/Centos
RUN yum install -y \
  autoconf \
  automake \
  bzip2 \
  bzip2-devel \
  cmake \
  freetype-devel \
  gcc \
  gcc-c++ \
  git \
  libtool \
  make \
  mercurial \
  pkgconfig \
  zlib-devel \
  nasm \
  yasm

RUN mkdir ~/ffmpeg_sources

#
# libfdk_aac
RUN cd ~/ffmpeg_sources && \
  git clone --depth 1 https://github.com/mstorsjo/fdk-aac && \
  cd fdk-aac && \
  autoreconf -fiv && \
  ./configure --prefix="$HOME/ffmpeg_build" --disable-shared && \
  make && \
  make install

#
# libmp3lame
RUN cd ~/ffmpeg_sources && \
  curl -O -L https://downloads.sourceforge.net/project/lame/lame/3.100/lame-3.100.tar.gz && \
  tar xzvf lame-3.100.tar.gz && \
  cd lame-3.100 && \
  ./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin" --disable-shared --enable-nasm && \
  make && \
  make install

#
# libopus
RUN cd ~/ffmpeg_sources && \
  curl -O -L https://archive.mozilla.org/pub/opus/opus-1.3.1.tar.gz && \
  tar xzvf opus-1.3.1.tar.gz && \
  cd opus-1.3.1 && \
  ./configure --prefix="$HOME/ffmpeg_build" --disable-shared && \
  make && \
  make install

#
# ffmpeg
RUN cd ~/ffmpeg_sources && \
  curl -O -L https://ffmpeg.org/releases/ffmpeg-snapshot.tar.bz2 && \
  tar xjvf ffmpeg-snapshot.tar.bz2 && \
  cd ffmpeg && \
  PATH="$HOME/bin:$PATH" PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig" ./configure \
  --prefix="$HOME/ffmpeg_build" \
  --pkg-config-flags="--static" \
  --extra-cflags="-I$HOME/ffmpeg_build/include" \
  --extra-ldflags="-L$HOME/ffmpeg_build/lib" \
  --extra-libs=-lpthread \
  --extra-libs=-lm \
  --bindir="$HOME/bin" \
  --enable-gpl \
  --enable-version3 \
  --enable-nonfree \
  --enable-static \
  --enable-small \
  --disable-doc \
  --disable-debug \
  --disable-ffplay \
  --disable-indev=sndio \
  --disable-outdev=sndio \
  --disable-shared \
  --disable-libxcb \
  --cc=gcc \
  --enable-libfdk_aac \
  --enable-libmp3lame \
  --enable-libopus

RUN cd ~/ffmpeg_sources && \
  cd ffmpeg && \
  make && \
  make install && \
  hash -r
