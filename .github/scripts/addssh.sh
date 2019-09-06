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
