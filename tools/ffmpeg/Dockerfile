FROM ubuntu:20.04

ENV TZ=Asia/Tokyo 
RUN apt-get update -qq && apt-get install -y tzdata

#
# https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu
RUN apt-get update -qq && apt-get -y install \
  autoconf \
  automake \
  build-essential \
  cmake \
  git-core \
  libass-dev \
  libfreetype6-dev \
  libgnutls28-dev \
  libsdl2-dev \
  libtool \
  libva-dev \
  libvdpau-dev \
  libvorbis-dev \
  libxcb1-dev \
  libxcb-shm0-dev \
  libxcb-xfixes0-dev \
  pkg-config \
  texinfo \
  wget \
  yasm \
  zlib1g-dev

RUN mkdir -p ~/ffmpeg_sources ~/bin

#
# NASM
RUN apt-get -y install nasm
RUN cd ~/ffmpeg_sources && \
  wget https://www.nasm.us/pub/nasm/releasebuilds/2.14.02/nasm-2.14.02.tar.bz2 && \
  tar xjvf nasm-2.14.02.tar.bz2 && \
  cd nasm-2.14.02 && \
  ./autogen.sh && \
  PATH="$HOME/bin:$PATH" ./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin" && \
  make && \
  make install

#
# libfdk-aac
RUN apt-get -y install libfdk-aac-dev
RUN cd ~/ffmpeg_sources && \
  git -C fdk-aac pull 2> /dev/null || git clone --depth 1 https://github.com/mstorsjo/fdk-aac && \
  cd fdk-aac && \
  autoreconf -fiv && \
  ./configure --prefix="$HOME/ffmpeg_build" --disable-shared && \
  make && \
  make install

#
# libmp3lame
RUN apt-get -y install libmp3lame-dev
RUN cd ~/ffmpeg_sources && \
  wget -O lame-3.100.tar.gz https://downloads.sourceforge.net/project/lame/lame/3.100/lame-3.100.tar.gz && \
  tar xzvf lame-3.100.tar.gz && \
  cd lame-3.100 && \
  PATH="$HOME/bin:$PATH" ./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin" --disable-shared --enable-nasm && \
  PATH="$HOME/bin:$PATH" make && \
  make install

#
# libopus
RUN apt-get -y install libopus-dev
RUN cd ~/ffmpeg_sources && \
  git -C opus pull 2> /dev/null || git clone --depth 1 https://github.com/xiph/opus.git && \
  cd opus && \
  ./autogen.sh && \
  ./configure --prefix="$HOME/ffmpeg_build" --disable-shared && \
  make && \
  make install

#
# ffmpeg
RUN cd ~/ffmpeg_sources && \
  wget -O ffmpeg-snapshot.tar.bz2 https://ffmpeg.org/releases/ffmpeg-snapshot.tar.bz2 && \
  tar xjvf ffmpeg-snapshot.tar.bz2 && \
  cd ffmpeg && \
  PATH="$HOME/bin:$PATH" PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig" ./configure \
    --prefix="$HOME/ffmpeg_build" \
    --pkg-config-flags="--static" \
    --extra-cflags="-I$HOME/ffmpeg_build/include" \
    --extra-ldflags="-L$HOME/ffmpeg_build/lib" \
    --extra-libs="-lpthread -lm" \
    --bindir="$HOME/bin" \
    --enable-libass \
    --enable-libfdk-aac \
    --enable-libfreetype \
    --enable-libmp3lame \
    --enable-libopus \
    --enable-libvorbis && \
  PATH="$HOME/bin:$PATH" make && \
  make install && \
  hash -r
