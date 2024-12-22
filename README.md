# My blog

这是[我的博客](https://www.mofei.life)的前端代码，使用了Next.js


## 如何部署(默认部署在aliyun函数计算)

### 1. 安装依赖

```bash
npm install
```

### 2. 部署到阿里云函数计算


请参考 https://docs.serverless-devs.com/ 官网，修改 `s.yaml` 中的必要信息

```
s deploy
```

## 如何本地测试

Run the commend below, and open a browser to make sure the site works.
If you don't have the `s` (i.e. serverless devs tool), follow [this doc](https://github.com/Serverless-Devs/Serverless-Devs#%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B) to install it.
```
s local start --custom-domain auto
```