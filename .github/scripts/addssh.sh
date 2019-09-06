#!/bin/sh

mkdir $HOME/secrets
# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$SSH_S" \
  --output $HOME/secrets/deploy_rsa deploy_rsa.gpg
eval "$(ssh-agent -s)"
chmod 600 $HOME/secrets/deploy_rsa
ssh-add $HOME/secrets/deploy_rsa

ssh-keyscan -H 47.110.229.91 >> ~/.ssh/known_hosts