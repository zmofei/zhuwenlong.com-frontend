#!/bin/sh

SSH_PATH="$HOME/.ssh"
mkdir -p "$SSH_PATH"
touch "$SSH_PATH/known_hosts"

# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$SSH_S" \
  --output $SSH_PATH/deploy_rsa deploy_rsa.gpg

chmod 700 "$SSH_PATH"
chmod 600 "$SSH_PATH/known_hosts"
chmod 600 "$SSH_PATH/deploy_rsa"

eval "$(ssh-agent -s)"
ssh-add $SSH_PATH/deploy_rsa
ssh-keyscan -t rsa 47.110.229.91 >> "$SSH_PATH/known_hosts"

npm install
FileName=$(date +%y_%m_%d_%H_%M_%S)
echo "packup the tar"
tar -cvzf build_v2_$FileName.tar.gz ./
echo "scp file"
chmod 777 ./
ls ./
scp build_v2_$FileName.tar.gz root@47.110.229.91:/usr/local/zhuwenlong/www/zhuwenlong.com-frontend
rm -rf build_v2_$FileName.tar.gz
echo "login to deploy"
ssh root@47.110.229.91 "
cd /usr/local/zhuwenlong/www/zhuwenlong.com-frontend
tar -xvzf build_v2_$FileName.tar.gz
rm -rf node_modules/
npm install
npm run build
pm2 restart zhuwenlong-front
"