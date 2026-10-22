#!/bin/bash

# (참고) 실행시 bash jpt-lab-activate 로 실행할 것

# 명령어가 실패하면 스크립트 실행을 중단
# set -e

# Conda 초기화
CONDA_URL=$(conda info --base)/etc/profile.d/conda.sh
source $CONDA_URL

# ml-study 가상환경 활성화
conda activate ml-study

# 작업 디렉터리 이동
cd /home/pluto2479/Documents/ML_study

# Tailscale IP 확인
TAILSCALE_IP=$(tailscale ip -4)

if [[ -z "$TAILSCALE_IP" ]]; then
    echo "오류: Tailscale IP를 확인할 수 없습니다."
    exit 1
fi

echo "활성화된 환경: $CONDA_DEFAULT_ENV"
echo "Python 경로: $(which python)"
echo "Tailscale IP: $TAILSCALE_IP"

# Jupyter Lab 서버 실행
jupyter lab \
  --no-browser \
  --ip="$TAILSCALE_IP" \
  --port=8888 \
  --ServerApp.port_retries=0

# (참고) 주피터 원격 서버 공유 URL 형식
# http://100.XXX.YYY.ZZZ:8888/?token=...