best-practice-about-frontend-dev
=============

记载一些实践出来的自我感觉良好的最佳实践经验总结，其实就是一群码畜的记事本，看了可以让你多出一些滚床单的时间

## 把目的摆在桌面上
1. 需要快速的出原型
2. 有一定程度的代码复用
3. 不求MVC，只求至少有MV
4. 模块化开发，最大化地提高合作开发效率
5. 前后台模板选型，方便前后端的人协作
6. 以widget形式来开发，提高复用度，降低维护成本
7. 改用 git 来合作，git flow 的合作方法

做前端开发的程序猿，经常面临着代码重用度低的问题，前端的开发，很大一部分时间里是在写 html+css，虽然有 emmet ，less 等强悍的东西，但始终逃避不了代码量巨大的问题

初级的代码复用，通常就是将样式和 html 以widget形式组织在不同的文件夹里，然后就复制粘贴到页面上去，不到几天，会发现改一个代码要同时改好多个地方，且不知道哪个地方的代码更改才是最新的

前端代码量是巨大的，且时间通常是很紧迫的，前端团队需要尽可能快速的做出反应

样例代码近期在整理，由于自己也不是十分把握得觉得自己的觉悟很有用，但至少是帮上了自己的忙，算是小有所成，在样例代码还没出来的前提下，我就描述下我是怎样做一个页面的开发的

1. 拿到美工的效果图
2. 根据效果图将网页切分成几个widget
3. 建立widget a, b, c ..... 的文件夹
4. 每个文件夹下有 css, js, examples, img, tpl, tpl-compiled, sample-data 这几个文件夹
5. 在examples 里新建一个 index.html; css 里新建对应的 init-widget-a.less，widget-a-config.less, widget-a-colors.less; js 文件夹建立init-widget-a.js；tpl 里放mustache语法的模板, widget-a.tpl； data-sample 里放和后端人员商议好的数据格式，data.json；tpl-complied 放模板 widget-a.tpl 和 data.json 的编译结果，widget-a-sample-html.html;
6. examples 里用 fis inline 编译后的 widget-a-sample-html.html, 引入  init-widget-a.css, 引入 seajs, seajs.use('init-widget-a.js');
7. 这样大概的一个widget 骨骼就架设完成了
8. 开始开发静态页面效果，css 用的 aliceui 的一些东西（因为兼容ie6），js 用的 aralejs （也是因为兼容ie6，且用spm工具安装很方便）；
9. 开发完 widget 之后，用 grunt 将其打包
10. 开个sites文件夹，子目录是站点，再子目录是页面，页面目录放一个 index.html inline 和许多要用到的 widget  widget-a-sample-html.html， less import 对应widget所需的less，seajs，require 所需的widget js脚本
11. 进行 fis release 发布，这是就可以看到一个完整的页面引用了开发出来的widget的效果页

### 问题：怎样和后端的人合作呢？
1. 后端的人只出数据，且后端的人规定能动的只有 tpl 模板这块，这样后端和前端的人就靠 tpl 这块连接了起来


### 解决了什么问题？
1. 多个页面重复使用相同wiget的问题
2. 后端人员更改 html 结构代码前端人员可以快速反应，只要数据格式不做大改变
3. 后端的人员完全不用动到 js，css 这一块东西，基于页面来引用所需的wiget，当widget源码改变的时候，重新导出一份新的资源直接发布就行，不用到处复制代码
4. 利用了 arale 的组件，让不懂js的人也可以很快的开发出widget出来，换句话说就是直接降低了写代码这个人他所需储备的知识和经验，开发的人只需要看得懂文档，遵守命名规则，就可以写出一个widget
5. 这样几个前端可以同时开发一个页面，最后导出页面所需资源文件就可以了，后端的人需要的只是 tpl 模板文件

## 实际使用效果
1. 当我这种方式开发的时候，我下达给下属的指令变得更加的单一和更有明确性了
2. 页面出现bug的时候，可以很方便的追踪到写bug的人是谁
3. 团队之间用 sourcetree 配合 github 的private 账户，感觉很舒服
4. 但是目前有个问题就是，当页面多起来的时候，widget的引用变得代码量有点多，但还是比原来的开发大大的改善了
5. 还有个问题，有些地方明显是应该分成两个 widget ，但是代码之间又非常的相似，这样的话开发成两个 widget 就有点过于冗余了，且变得难以维护，现在给自己下的规定就是，当一个地方的widget重用度低于三处地方的时候，就不精细的将其抽出为一个公用组件，因为前段代码，某种程度上属于易耗品，几乎每次改版，之前做的东西只有复杂的部分可以留下来，所以在冗余和结构明确上，我选择了结构明确，我觉得我是对的

## 完成了自己的 Gruntfile.js 配置
 mark 一下，已经很快就可以把 样例push上来了，最近没时间，等过几天出远门在机场可以有空干这件事
就目前自己的感觉而言。。。太爽了。。。
## 大致的完成了 demo project
当运行 `grunt build-all`的时候，会按顺序做以下的事情  
1. 执行clean  
2. 编译less到less文件所在目录  
3. 编译handlebars模板，数据是同名的json文件，输出为同名的html文件  
4. transport company 下的javascript文件夹的js文件到sea-modules  
5. transport company 下的wigets文件夹下的js文件sea-modules  
6. transport sites   下的所有js文件到 sea-modules/sites 下  
7. transport sites   下的所有js文件到 sea-modules/sites-concated 下（同上一步，只是目标文件夹不同）  
8. concat sea-modules/sites-concated 下的所有js文件，让其 `include: 'all'` 合并所有依赖模块  
9. uglify 所有产出的 js 文件  
10. 执行 fis release 构建，inline 所有该inline的文件，自动雪碧，资源域名定位      