#!/bin/sh
PRJ_ROOT=$(cd `dirname $0`; pwd)
PRJ_NAME=`basename ${PRJ_ROOT}`

ENV=$2
if [ "${ENV}" == "" ];then
    ENV="dev"
fi
BIN_NAME="ctcciptv_ui" # 生成二进制文件文件名，也是docker镜像名称
BIN=${PRJ_ROOT}/bin/${BIN_NAME} # 生成二进制文件路径
BIN_DOCKER="sudo docker " # docker二进制文件路径
HUB="hub.docker.vodjk.com:5000/iptv"  # 镜像hub地址
if [ "${ENV}" == "demo" ];then
    HUB="192.168.40.5:5000"
fi

echo "-------------------- ${PRJ_NAME} --------------------"
# 删除docker镜像
function docker_rmi(){
    name=$1
    imageids=`${BIN_DOCKER} images|grep "${name}"|grep "${ENV}"|grep -v "grep"|awk -F ' ' '{print $3}'`
    for imageid in ${imageids}
    do
        ${BIN_DOCKER} rmi -f ${imageid}
    done
}

# 删除docker container
function docker_kill(){
    name=$1
    containerids=`${BIN_DOCKER} ps |grep "${name}"|grep "${ENV}"|grep -v "grep"|awk -F ' ' '{print $1}'`
    for containerid in ${containerids}
    do
        ${BIN_DOCKER} kill  ${containerid}
    done
}

# 编译docker镜像
function run_docker_build(){
    docker_kill ${BIN_NAME}
    docker_rmi ${BIN_NAME}
    ${BIN_DOCKER} build -t ${BIN_NAME}:${ENV} ${PRJ_ROOT}/
}

# 推送docker镜像
function run_docker_push(){
    ${BIN_DOCKER} tag ${BIN_NAME}:$ENV ${HUB}/${BIN_NAME}:$ENV
    ${BIN_DOCKER} push ${HUB}/${BIN_NAME}:$ENV
}


# 执行
if [ ! -d "${PRJ_ROOT}/public" ];then
    rm -rf ${PRJ_ROOT}/public
fi
cp -rf ${PRJ_ROOT}/../assets/public ${PRJ_ROOT}/
cp -rf ${PRJ_ROOT}/../version.txt ${PRJ_ROOT}/

run_docker_build
run_docker_push

exit 0
