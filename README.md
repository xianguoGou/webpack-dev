# webpack-dev

### 自动清理构建产物
* 通过 npm scripts 清理构建目录
```javascript
rm -rf ./dist && webpack

或者

rimraf ./dist && webpack
```
* 通过webpack插件`clean-webpack-plugin`
  - 默认会删除output指定的输出目录
  - webpack5 直接使用output中的clean: true。


### 移动端CSS px 自动转换成rem
* 使用 `px2rem-loader`, 也可以使用手淘的`lib-flexible`库（现在几乎不用了）

### 静态资源内联
好处：
1. 减少http网络请求数
2. css内联避免页面闪动

* html 和 js内联使用 `row-loader`
* css 内联借助`style-loader`的 `singleton` 属性，将所有的style标签合成一个, 也可以使用插件 `html-inline-css-webpack-plugin`