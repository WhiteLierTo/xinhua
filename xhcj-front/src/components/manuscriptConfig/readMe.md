- v-model: 关联对象数组

### props

- hides:String[]
    - 配置哪些项被隐藏
    - custom:稿件自定义
    - comment: 评论管理
    - tag: 稿件标签
    - position: 固定位置
    - isPcBanner: 稿件自定义下有误是否是pcBanner
    - setBanner: 设置Banner


### methods

- init: 初始化数据,会使用入参覆盖现有参数,之前所做的修改全部清空
    - 入参: `articleList`

### tips: 不需要给v-model绑定的值赋值,直接调用init方法进行初始化