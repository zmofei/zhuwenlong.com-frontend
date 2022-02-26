# My blog

https://www.zhuwenlong.com

## 如何部署

### 1. 配置

* 将目录中的`code/s.example.yaml`文件复制为`code/s.yaml`
* 修改`code/s.yaml`的敏感信息，如将 `environmentVariables` 中的 `xxxx` 修改为真实参数：

```bash
environmentVariables:
    MysqlHost: xxxx #Mysql 数据库地址
    MysqlUser: xxxx # MySQL 数据库用户名
    MysqlDB: xxxx # MySQL 数据库DB名称
    MysqlPwd: xxxx # MySQL 数据库密码
    EmailUser: xxxx # 邮件系统用户名（用来发送留言回复等email）
    EmailPwd: xxxx # 邮件系统密码
```

### 2. 安装依赖

```bash
cd code
npm install
```

### 3. 部署到阿里云函数计算

```
s deploy
```

## 如何本地测试

Run the commend below, and open a browser to make sure the site works.
If you don't have the `s` (i.e. serverless devs tool), follow [this doc](https://github.com/Serverless-Devs/Serverless-Devs#%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B) to install it.
```
s local start --custom-domain auto
```