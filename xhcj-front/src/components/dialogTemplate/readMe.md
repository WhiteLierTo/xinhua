### props:

1. width: number 宽度,默认为750px
2. title: string 显示在左上角的标题
3. footAlign: 'center'|'right' 底部标题栏的对其方式
4. onClose: 关闭回调
5. onSubmit: 点击确定的回调
    - 若函数返回`Truthy`,会执行close逻辑
    - 若函数返回 `Falsy`,不会执行close逻辑
    - 函数可以是异步的
    
6. submitText: 确认的文案,默认确定
7. closeText: 取消的文案,默认取消
### slot

1. head: 取代头部
2. 匿名: 身体
3. foot: 取代脚部
