fis.config.merge({
  namespace: 'csssprites',
  modules: {
    spriter: 'csssprites'
  },
  roadmap: {

    domain: {
      //widget目录下的所有css文件使用 http://css1.example.com 作为域名
      'sites/**.css' : ['http://s1.sample.com/product', 'http://s2.sample.com/product', 'http://s3.sample.com/product', 'http://s4.sample.com/product', 'http://s5.sample.com/product'],
      'image': ['http://s1.sample.com/product', 'http://s2.sample.com/product', 'http://s3.sample.com/product', 'http://s4.sample.com/product', 'http://s5.sample.com/product']
    },

    // ext : {
    //             //并且在parser之后的其他处理流程中被当做html文件处理
    //             tpl : 'html'
    //         },
    path: [{
        reg: '/sites/**.css',
        useSprite: true
      }, {
        reg: '/company/**.tpl',
        isHtmlLike: true
      }, {
        // 前面规则未匹配到的其他文件
        reg: /^(\/sea-modules)/i,
        // 编译的时候不要产出了
        // release: false
        useCompile: false
      }, {
        // 前面规则未匹配到的其他文件
        reg: /^(\/node_modules)/i,
        //编译的时候不要产出了
        release: false,
        useCompile: false
      }
      // , {
      //   // 前面规则未匹配到的其他文件
      //   reg: /\/company\/widgets\/.*\/examples\/.*/,
      //   // 编译的时候不要产出了
      //   release: false
      // }, {
      //   // 前面规则未匹配到的其他文件
      //   reg: /\/company\/widgets\/.*\/css\/.*/,
      //   //编译的时候不要产出了
      //   release: false
      // }, {
      //   // 前面规则未匹配到的其他文件
      //   reg: /\/company\/widgets\/.*\/tpl\/.*/,
      //   // 编译的时候不要产出了
      //   release: false
      // }
    ]
  },
  deploy: {
    //使用fis release --dest remote来使用这个配置
    remote: {
      //如果配置了receiver，fis会把文件逐个post到接收端上
      receiver: 'http://s1.sample.com/whatthefuckxxx.php',
      //从产出的结果的static目录下找文件
      from: '/',
      //保存到远端机器的/home/fis/www/static目录下
      //这个参数会跟随post请求一起发送
      to: '/home/wwwroot/s1.sample.com/product',
      //通配或正则过滤文件，表示只上传所有的js文件
      include: '**/*'
      //widget目录下的那些文件就不要发布了
      // exclude: /\/widget\//i
    },
    //名字随便取的，没有特殊含义
    local: {
      //from参数省略，表示从发布后的根目录开始上传
      // from: '/static',
      //发布到当前项目的上一级的output目录中
      to: './product'
    }
  },
  // pack: {
  //   '/sites/gz/index/css/sites_gz_index_css_pack.css': '/sites/gz/index/css/sites_gz_index_css.css'
  // },
  settings: {
    spriter: {
      csssprites: {
        margin: 10
      }
    }
  }

});