# syntax=docker/dockerfile:1

# Sử dụng hình ảnh Ubuntu 22.04
FROM ubuntu:22.04

# Cài đặt các gói cần thiết và cập nhật
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    fontconfig \
    libfreetype6 \
    libjpeg-turbo8 \
    libpng16-16 \
    libx11-6 \
    libxcb1 \
    libxext6 \
    libxrender1 \
    xfonts-75dpi \
    xfonts-base \
    && rm -rf /var/lib/apt/lists/*

# Cài đặt Node.js
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

# Kiểm tra phiên bản Node.js và npm
RUN node -v
RUN npm -v

WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]
EXPOSE 3055

# Cài đặt wkhtmltox
RUN curl -L https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-3/wkhtmltox_0.12.6.1-3.jammy_amd64.deb -o wkhtmltox.deb
RUN dpkg -i wkhtmltox.deb
RUN apt-get install -f

