# 安装TypeScript
## 有两种主要的方式来获取TypeScript工具：
- 通过npm（Node.js包管理器）
- 安装Visual Studio的TypeScript插件

**Visual Studio 2017和Visual Studio 2015 Update 3默认包含了TypeScript。 如果你的Visual Studio还没有安装TypeScript，你可以[下载](https://www.tslang.cn/#download-links) 它。**

针对使用npm的用户：
```
> npm install -g typescript
```


## 构建你的第一个TypeScript文件

在编辑器，将下面的代码输入到greeter.ts文件里：
```
function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);

```
编译代码

我们使用了.ts扩展名，但是这段代码仅仅是JavaScript而已。 你可以直接从现有的JavaScript应用里复制/粘贴这段代码。

在命令行上，运行TypeScript编译器：
```
> tsc greeter.ts
```

输出结果为一个greeter.js文件，它包含了和输入文件中相同的JavsScript代码。 一切准备就绪，我们可以运行这个使用TypeScript写的JavaScript应用了！