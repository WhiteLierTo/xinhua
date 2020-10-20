import QRCode from "qrcode";
import Gadgets from "../utils/gadgets"
import serverGadgets from "../service/gadgets"

let padding = 40; // 海报的padding
let titleFontSize = 60; // 标题字大小
let titleColor = "#333333"; // 标题颜色
let timeFontSize = 36; // 时间的字大小
let timeFontColor = "#979797"; // 时间的字颜色

function drawQRCode(path, bgCanvas, bgCtx) {
  let qrCanvasDom = document.createElement("canvas");
  qrCanvasDom.width = "200px";
  qrCanvasDom.height = "200pX";
  QRCode.toCanvas(qrCanvasDom, path, {
    width: 200,
    height: 200,
    margin: 1
  });
  bgCtx.drawImage(qrCanvasDom, (bgCanvas.width / 2) - 100, bgCanvas.height - 410);
}

function drawTitle(title, bgCanvas, bgCtx) {
  return _drawText(bgCtx, bgCanvas, title, titleFontSize, titleColor, 140, 0, 2)
}

function drawActivityTime(startTime, endTime, usedHeight, bgCanvas, bgCtx) {
  let startTimeStr = _getFormatTimeStr(startTime);
  let endTimeStr = _getFormatTimeStr(endTime);
  let content = `本场活动时间：${startTimeStr}——${endTimeStr}`;
  return _drawText(bgCtx, bgCanvas, content, timeFontSize, timeFontColor, usedHeight + 10, 0, 2, 5);
}

function drawDescWithImage(desc, usedHeight, bgCanvas, bgCtx) {
  return _drawText(bgCtx, bgCanvas, desc, timeFontSize, timeFontColor, usedHeight + 10, 0, 2, 1);
}

function drawDescWithoutImage(desc, usedHeight, bgCanvas, bgCtx) {
  return _drawText(bgCtx, bgCanvas, desc, timeFontSize, timeFontColor, usedHeight + 10, 860, 0, 0)
}

async function drawImage(src, usedHeight, bgCanvas, bgCtx, callback) {

  if (src.includes('?')) {
    src += "&v=1"
  } else {
    src += "?v=1"
  }

  let imgDom = document.createElement("img");
  imgDom.setAttribute("crossOrigin", 'Anonymous');
  imgDom.src = src;


  imgDom.onload = () => {
    document.body.append(imgDom);
    let imgWidth = imgDom.offsetWidth;
    let imgHeight = imgDom.offsetHeight;
    let imgAspectRatio = imgWidth / imgHeight;

    let canUseWidth = bgCanvas.width - (2 * padding);
    let canUseHeight = bgCanvas.height - usedHeight - padding - 480;
    let canUseAspectRatio = canUseWidth / canUseHeight;

    let drawWidth, drawHeight;
    if (imgAspectRatio > canUseAspectRatio) {
      // 图片比可用区域更扁
      drawWidth = canUseWidth;
      drawHeight = canUseWidth * (imgHeight / imgWidth);
    } else {
      // 图片比可用区域更方
      drawHeight = canUseHeight;
      drawWidth = canUseHeight * imgAspectRatio;
    }

    let startX = (canUseWidth - drawWidth) / 2 + padding;
    let startY = (canUseHeight - drawHeight) / 2 + usedHeight;
    bgCtx.drawImage(imgDom, startX, startY, drawWidth, drawHeight);
    imgDom.remove();
    callback && callback();
  }
}

function _getTextWidth(text, ctx) {
  return ctx.measureText(text).width;
}

function _getFormatTimeStr(stamp) {
  let date = new Date(stamp);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}


function _drawText(ctx, canvasDom, content, fontsize, color, startY, endY, maxLineNumber, letter = 0) {
  let contentList = content ? content.split('') : [];

  ctx.save();
  ctx.font = `${fontsize}px test`;
  ctx.fillStyle = color;
  let lineNumber = 1;
  let fontX = padding;
  let fontY = startY;
  let maxWidth = canvasDom.width - padding;

  let textList = [];

  for (let i = 0; i < contentList.length; i++) {
    let textWidth = _getTextWidth(contentList[i], ctx);

    if (fontX + letter + textWidth > maxWidth) {
      // 本行放不下,需要换行

      // 此时处理本行的行间距
      let noUseWidth = maxWidth - fontX + letter; // 最后一个字不需要letter
      let oneShare = noUseWidth / (textList.filter(text => text.lineNumber === lineNumber).length - 1);


      textList.filter(text => text.lineNumber === lineNumber).reduce((total, text) => {
        text.startX += total;
        return total + oneShare;
      }, 0);

      if ((maxLineNumber && lineNumber >= maxLineNumber) || (endY && endY < (fontY + fontsize * 1.3))) {
        // 已经是最后一行了 点点点准备
        textList.pop();
        let lastThreeText = textList.pop();
        textList.push(new Text("…", ctx, lastThreeText.startX + 14, lastThreeText.startY, lineNumber, textWidth));
        break;
      }

      lineNumber++;
      fontY += fontsize * 1.3;
      fontX = padding;
    }

    textList.push(new Text(contentList[i], ctx, fontX + letter, fontY, lineNumber, textWidth));
    fontX += (textWidth + letter);
  }
  textList.forEach(text => text.drawSelf());
  ctx.restore();
  return fontY + fontsize * 1.3;
}


class Text {
  constructor(text, ctx, startX, startY, lineNumber, textWidth) {
    this.text = text;
    this.ctx = ctx;
    this.startX = startX;
    this.startY = startY;
    this.lineNumber = lineNumber;
    this.textWidth = textWidth;
  }

  drawSelf() {
    this.ctx.fillText(this.text, this.startX, this.startY);
  }

}


async function drawPoster(article, articleType, posterType, callBack) {

  let config = await serverGadgets.getConfigSync();
  let path = `${config.websiteUrl}newsDetail?id=${article.id}&type=${articleType}`;

  // 先加载好原图
  let imgDom = document.createElement("img");
  imgDom.src = require("../assets/bg.png");
  imgDom.onload = () => {
    document.body.append(imgDom);
    let width = imgDom.offsetWidth;
    let height = imgDom.offsetHeight;

    // 创造canvas
    let bgCanvas = document.createElement("canvas");
    bgCanvas.style.position = "fixed";
    bgCanvas.style.left = "-5000px";
    bgCanvas.width = width;
    bgCanvas.height = height;
    let bgCtx = bgCanvas.getContext("2d");
    bgCtx.drawImage(imgDom, 0, 0);
    document.body.append(bgCanvas);
    imgDom.remove();

    drawQRCode(path, bgCanvas, bgCtx);
    let usedHeight = drawTitle(article.title || article.name, bgCanvas, bgCtx);
    if (posterType === 3) {
      // 活动
      if (article.startdate && article.enddate) {
        // 时间
        usedHeight = drawActivityTime(article.startdate, article.enddate, usedHeight, bgCanvas, bgCtx);
      }
      // 画图
      if (article.contentimgpath) {
        return drawImage(article.contentimgpath, usedHeight, bgCanvas, bgCtx, () => toFile(bgCanvas, article, callBack));
      }
    }

    if (posterType === 1) {
      // 纯文
      drawDescWithoutImage(article.description, usedHeight, bgCanvas, bgCtx);
    }

    if (posterType === 2) {
      // 图文
      usedHeight = drawDescWithImage(article.description, usedHeight, bgCanvas, bgCtx);

      let imgPath = article.listPicOne || article.preImgPath || article.preImagePath || article.indexPicUrl;

      if (imgPath) {
        return drawImage(imgPath, usedHeight, bgCanvas, bgCtx, () => toFile(bgCanvas, article, callBack));
      }
    }

    toFile(bgCanvas, article, callBack);


  }
}

function toFile(bgCanvas, article, callBack) {
  // 转换成img
  let dataURL = bgCanvas.toDataURL();
  let file = Gadgets.dataURLtoFile(dataURL, `${article.title || article.name || 'empty'}.png`);
  bgCanvas.remove();
  callBack && callBack(file);
}


export default {
  drawPoster
}