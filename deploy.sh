npm install
FileName=$(date +%y_%m_%d_%H_%M_%S)
rm -rf ./build
PUBLIC_URL="//cdn.zhuwenlong.com" npm run build
tar -cvzf build_$FileName.tar.gz ./build
scp build_$FileName.tar.gz root@47.110.229.91:/usr/local/zhuwenlong/www/zhuwenlong.com-frontend
rm -rf build_$FileName.tar.gz
ssh root@47.110.229.91 "
cd /usr/local/zhuwenlong/www/zhuwenlong.com-frontend
cp -r build build_bck_$FileName
tar -xvzf build_$FileName.tar.gz
"