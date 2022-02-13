# My blog

https://www.zhuwenlong.com

## How to deploy to aliyun-fc

### 1. Build nextjs

```
npm run build
```

### 2. Test localy

Run the commend below, and open a browser to make sure the site works.
If you don't have the `s` (i.e. serverless devs tool), follow [this doc](https://github.com/Serverless-Devs/Serverless-Devs#%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B) to install it.
```
s local start --custom-domain auto
```

### 3. Deploy to aliyun-fc

```
s deploy
```