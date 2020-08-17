# admin-ui

系统管理平台界面

## 目录结构
```
- assets 前端文件目录
    - src 前端源代码
        - assets 存放图片类的资源文件
        - components 公共组件
    - build 构建代码
    - config 构建配置
    - theme elementui的主题样式代码(构建之后)
    - element-variables.css elementui的样式源代码
- public 构建后的代码
```

## 运行项目

```
npm run dev
```

## 线上运行

```
ENV PORT 80
```

没有配置文件，要通过 `ENV` 设定运行端口。
