// 小玩意儿 不适合放在其他地方的工具函数放在这里
import axios from "axios"
import Vue from "../main"

class Gadgets {

  // 解构url传参 好像就是Vue.$router.query?
  getQueryObject(url) {
    url = url === null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
      const name = decodeURIComponent($1)
      let val = decodeURIComponent($2)
      val = String(val)
      obj[name] = val
      return rs
    })
    return obj
  }

  // 获取字符串的uft8字节长度 有啥用?
  getByteLength(str) {
    // returns the byte length of an utf8 string
    let s = str.length
    for (var i = str.length - 1; i >= 0; i--) {
      const code = str.charCodeAt(i)
      if (code > 0x7f && code <= 0x7ff) s++
      else if (code > 0x7ff && code <= 0xffff) s += 2
      if (code >= 0xDC00 && code <= 0xDFFF) i--
    }
    return s
  }

  // 判断值是否为真, 0被认为为真值
  isSpecialTrue(val) {
    if (val === 0) return true;
    return !!val
  }


  // 将json转换为url字符串,空值将被舍弃
  jsonToParams(json, baseUrl = "") {
    if (!json) return baseUrl;
    if (baseUrl) baseUrl += "?";
    let param = Object.keys(json).map(key => {
      if (this.isSpecialTrue(json[key])) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      }
    }).filter(d => !!d).join("&")
    return `${baseUrl}${param}`
  }

  // 防抖高阶函数
  debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp

      // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }

    return function (...args) {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }

      return result
    }
  }

  // 一个有巨多bug的深拷贝
  /**
   * This is just a simple version of deep copy
   * Has a lot of edge cases bug
   * If you want to use a perfect deep copy, use lodash's _.cloneDeep
   * @param {Object} source
   * @returns {Object}
   */
  deepClone(source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = this.deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
    return targetObj
  }

  // 随机字符串
  getRandomStr() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  // 下载canvas的图片
  downloadCanvas(canvas, name, extension = "jpg") {
    // extension: 扩展名 目前支持png jpg

    let dataUrlType = extension === "jpg" ? '"image/jpeg"' : '"image/png"';

    let url = canvas.toDataURL(dataUrlType);

    let aDom = document.createElement("a");
    aDom.download = `${name}.${extension}`;
    aDom.href = url;
    document.body.appendChild(aDom);
    aDom.click();
    aDom.remove();
  }

  // 给服务器图片加水印
  // TODO 支持图片由用户上传
  // TODO 支持水印位置
  // TODO 加完水印变png变成jpg了
  async watermarkByPath(
      imgList = ["./test/1.jpg", "./test/2.jpg", "./test/3.jpg", "./test/4.jpg"],
      waterPicUrl = "./test/0.png",
      uploadPath,
      callBack
  ) {

    // imgList 需要加水印的图片地址列表
    // waterPicUrl 水印图
    // uploadPath 上传图片的地址
    // callBack 转换过程为异步,在全部转换完成后执行的回调


    let canvas = document.createElement("canvas");
    canvas.style.display = "none";
    document.body.append(canvas);
    canvas.style.border = "1px solid red";

    let ctx = canvas.getContext("2d");

    let waterPic = document.createElement("img");
    waterPic.style.display = "none";
    document.body.append(waterPic);
    waterPic.src = waterPicUrl;

    waterPic.onload = addOneImg.bind(this);

    function addOneImg() {
      let currentUrl = imgList.shift();
      let pic = document.createElement("img");
      pic.style.display = "none";
      document.body.append(pic);
      pic.src = currentUrl;
      pic.onload = () => {
        canvas.width = pic.width;
        canvas.height = pic.height;
        ctx.drawImage(pic, 0, 0);
        // 开始画水印
        ctx.drawImage(waterPic, canvas.width - waterPic.width, canvas.height - waterPic.height);
        // 上传服务器 先不上传,下载完事儿
        this.downloadCanvas(canvas, "test");
        pic.remove();

        if (imgList.length) {
          addOneImg.call(this);
        } else {
          Vue.$message.success("水印批量添加完成");

          canvas.remove();
          waterPic.remove();

          callBack && callBack();
        }
      }
    }
  }

  download(url) {
    axios.get(url).then(res => {
    })
  }

  getPermison(key) {
    return Vue.$store.state.permissions.includes(key);
  }

}

export default new Gadgets();


