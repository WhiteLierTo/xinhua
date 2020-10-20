### props
- filtersInfo: 过滤条件配置
- tableInfo: 表格配置
- mock: 是否mock数据
- hasCardView: 是否有卡片模式切换 (较少用)
- beforeSearch: Function 正式搜索之前的回调
- onSearchEnd: Function 获取数据后的回调

### filtersInfo 过滤条件配置
```
[]filer
```
#####filer
- type: 必填 筛选框的类型
    - input:输入框
    - select: 选择框
        - 需要提供options:[{label:'xxx',value:'xxx'}]
    - date: 日期时间选择器
    - dateRange: 起始结束日期时间选择器
        - dateRange是特殊的
        - submitName: 数组,分别为起始时间字段,结束时间字段
        - placeholder: 数组,分别为左侧holder,右侧holder,中间的分隔符
        - 会对起始和结束时间分别调用beforeSubmit
    - number: 数字输入框
    - dayRange: 日期选择器 不包含小时
- submitName: 必填 发送ajax请求时字段对应的名字
- beforeSubmit: 提交前对默认值的格式化函数
- defaultValue: 默认值
- value: 保留关键字    
- placeholder: placeholder

---

### tableInfo 表格配置

```
{
  permissionHead:"", // permisonKey的前半段,会对新建 修改 等此类按钮做默认处理
  columns:[]column,
  searchUrl:"",  // 查询地址
  method:"",  // 请求方式 只支持"POST" 和 "GET"
  defaultQuery:{key:value || function(searchMap){}  }, // 固定添加在data里的数据  // TODO 放到过滤条件里面去
  deleteAllUrl:"", // 批量删除地址
  operations:{}, // 开启哪些操作
  hides:string[], // 关闭哪些功能
  createConfig:{}, // 新建按钮的配置项
  modifyConfig:{}, // 修改的配置项
  selectConfig: {},// 选择表格行的配置项
  reSort: bool, // 表格行是否可以拖动,为真值时,会出现更新排序的按钮(移动到按钮待定) // 废弃
  reSortConfig:{} // 表格行的拖动行为配置项
  rowsKey:String // 默认会从返回数据的rows字段中取数据,但这个key值也可以配置
  minDisplayRows:Number // 最小展示的多少行的高度,在展开列表时比较有用
  isDelay: Boolen // 如果为True, 会一直保持loading,直到调用了reflush()方法
}
```

##### column

- prop: 在数据源中该字段的名字,同eleUi
- label: 必填, 表头名字,同eleUi
- styleConfig: 样式配置 map
    - css名: string | function(row,index)
        - row :该行数据
- presetStyle: map, 一些预设的样式,通过布尔值开关
    - withPoint: map 前面有小圆点,小圆点颜色与字颜色一致(需要显式生命`color`)

- type: 
    - `type === 'action'`:代表这是一列自定义按钮列
        - content: 此列展示的文字 str | function | str[] | function[]
        - onClick: 点击的回调 function(row, index, actionIndex) | function[]
        - disable: bool || function(row,index) 是否disabled
        - permissionKey: str | str[] | function(actionContent) | function(actionContent)[] 对应的promisonKey,只需要最后一截
    - `type === 'image'`:这是图片列
        - imageWidth: 图片的宽度,
        - imageHeight: 图片的高度
        - path: string | function(row,rowIndex) 图片的地址,本地图片使用`require`包裹
        - 推荐宽度不要超过280(随时变动),否在会有不可预期的变化 TODO

- align: 对其方式,表头表行一并调整,目前只支持"center"  !!废弃
- beforeDisplay: function(row, index) 最终的格式化函数 type === 'action' 时失效
- hasCardView: 默认false 是否有卡片视图, 如果为true,需要提供名为card的slot
- canModify: 是否可以原地修改,若为true,在modifyConfig内配置回调函数,此时改栏可以使用disable
    - disable: bool || function(row,index) 是否disabled
- minWidth: number 只对拥有prop的字段生效,字段计算宽度时,不会小于此宽度 慎用,目前有bug,有不可预期的影响,建议此值不要大于200
- maxWidth: 同上 慎用,目前有bug,列宽最终不一定能撑开至此值
- fixed: 同`ele-ui`的`fixed`



##### operations map
- 操作名: operation 
    - delete: 删除
- extra : operation[] 定义额外按钮
- operation 
   - show: bool 是否显示
   - label: 显示的字符
   - onClick: function(row,rowIndex) 触发事件时,优先采用此函数,如果不存在,走默认逻辑
   - path: string 删除的路径,无则默认
   - icon: 图标,只能是`ele-ui`的类名
   - iconPath: 图标,是被`require`进来的图片,优先于icon
   ```
      operations: {
        delete: {
          show: true,
        },
        extra: [
          {
            label: "操作名",
            iconPath: require('../../../assets/other/close.png'),
            onClick(row, index) {}
          }
        ]
      }
    ```

##### hides
- deleteAll: 批量删除
- create: 创建
- select: 选择
- index: 序号
- modify: 左上角的修改按钮

---

##### createConfig

- path: 点击按钮跳转的路由,若有此属性,默认为跳转而非弹窗
    - 否则必须提供名为`create`的slot,此组件需要在关闭时调用`scope.onClose`
    - onClose(isRefresh=true) :isRefresh 重新请求数据 页码跳转到1
- label: 新建按钮的文案
- icon: 新建按钮的图标 必须是ele-ui的类名

##### modifyConfig

- path: str | function(row,index): 点击按钮跳转的路由,若有此属性,默认为跳转而非弹窗
    - 同`createConfig.path`,slot名为`modify`,此时额外提供`scope.row`
- onInSituModify: function(oldRow,col,newVale,searchFunc) 原地修改的回调
    - searchFunc:函数,调用辞函数,可以刷新页面,回显修改后的结果

---

##### reSortConfig

- moveToPath:string // "移动至"的接口地址
- sortPath:string // 更新排序的接口地址

---

##### selectConfig

- singleChoice: bool 是否单选

### slot 
- filters-right: 放置在过滤栏最右侧
- table-right: 放置在表格的顶部右侧
- table-left: 放置在表格的顶部左侧
   
- create: 放新建的表单组件,组件内在需要关闭自己时,需利用父组件发射`onClose`事件,在提交成功时,利用父组件发射`onSubmitSucess`事件
    - `this.$parent.$emit("onClose",{});` // TODO 用法非常丑陋,目前没有更好的解决方案 // 废弃 不需要了
    - TODO` onSubmitSucess`
    - 暂时不用
    
- card: 卡片模式
    - 需要显示申明有这个模式, TODO: 自动判断有没有传入slot
    ```html
          <template slot-scope="scope" slot="card">
            {{ scope.data }}
          </template>
    ```
    - 需要根据`scope.isSelected`来切换选中/未选中状态
    - 需要提供选中按钮,调用`scope.toggleSelect()`来提交事件

- table-offset-left:
    - 放置在表格的左侧,因为`table-left`之前用过了,只能用这个
    - `height:100%`即可与表格同宽

- table-offset-right:同上
---

### v-model

- v-model绑定的值会变成组件的`this`
    - `tableThis.table`:表格的`this`
        - `tableThis.table.multipleSelection`获取当前表格选中的值,
        - `tableThis.table.refresh()`刷新数据,
            - 入参: `Boolen`,是否将表格滚动至顶
        - `tableThis.table.searchMap`获取过滤数据
        - `tableThis.table.setEmpty()`置空数据,
    - `tableThis.filter`:过滤组件的`this`
        - `tableThis.filter.getSearchMap()`: 获取最新的过滤条件
---

### TODO
 
- styleConfig下的cssName支持list

- 筛选条件多选
    
- 原地修改 是否为空 可以配置

- 根据搜索项对结果染色

- 恢复width

- 权限

- maxWidth 逻辑错误


- 监听外层容器的变化,在**适当的时候**`reBuild`
---

### 约定

1. 单击行选中
2. 双击行 === 单击行 + 点击左上角编辑
3. 表格右上角的按钮,是切换表格视图用的
4. 主键为id
5. 表格label不能相同
6. type !== 'action'的列,必须穿prop字段,这会作为该列的唯一id,这是个bug,但是暂时不改
7. 默认展示的action的列,permissionKey给"allow"

### mock
```html
:mock="true"
```
- 模拟数据,而不是向后端请求


### beforeSearch
- type: Function
- 入参: 一个对象,包含将要搜索的条件们
- 返回值: 真实搜索的条件们
- ex:`:beforeSearch="d=>d"`

### onSearchEnd
- type: Function
- 入参: 返回值数组
- 返回值: 需要被渲染的数组
- ex: `:onSearchEnd="d=>d"`

### 按钮顺序

- 表格左上方的一排按钮,order为 -100 -90 -80 -70 60 ....
- 若想在对应的位置插入
    - 写入slot=table-left的插槽
    - 内容设定对应style="order:-95"(将插入新增按钮与修改按钮之间)
