### props

- proportion: string 裁切比例
    - 范例: 16:9

- maxSize: number 最大尺寸 单位b

- uploadPath: 上传的路径

### Methods
// 没啥用 picCut2
- cuttingPicFromUrl
    - 范例:`this.$refs.picCutting.cuttingPicFromUrl(url,fileName)`
    - function(url,fileName)
        - url: 图片地址
        - fileName:图片名
    - 裁切外部图片,需要图片源支持跨域


### TODO
- 规定裁切图片的尺寸
- 新增四角四个拖拽点