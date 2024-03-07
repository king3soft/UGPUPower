# 安装Python依赖

```bash
pip install -r requirements.txt
```

> 也可以创建虚拟环境，进入venv再安装

# 安装前端依赖

```bash
cd miniperf/ui

yarn
```

# 启动方式一：webview嵌套（支持热更新）

## 前端部分

进入 miniperf/ui 目录，运行：
```bash
yarn prebuild # 文件更改后会自动输出打包产物到dist目录
```

## 外层

进入项目根目录，运行：
```
python -m miniperf.dev
```

# 启动方式二：无webview，纯前端运行
进入 miniperf/ui 目录，运行：
```bash
yarn dev
```
