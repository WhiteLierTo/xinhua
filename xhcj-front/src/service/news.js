import service from "./base";
import Vue from "../main"
import axios from "axios"

class Search {
  static async createKeywordSync(data) {
    let res = await service.post('/searchKeyword/add', data);
    return res.code === 200;
  }

  static async updateKeywordSync(data) {
    let res = await service.post('/searchKeyword/update', data);
    return res.code === 200;
  }
}


class Resource {

  static async add(data) {
    let res = await service.post("/resource/add", data);
    return [res.code === 200, res.msg]
  }

  static async get(id) {
    let res = await service.get(`/resource/${id}`);
    return [res.code === 200, res.data]
  }

  static async update(data) {
    let res = await service.post("/resource/update", data);
    return [res.code === 200, res.msg]
  }

  static async download({
    name,
    ext,
    url
  }) {

    // 改成get
    let downloadStr = [name, ext, url].join("@#@");
    let base64Str = btoa(encodeURIComponent(downloadStr));
    let config = await axios.get("./config.json");
    let downloadBaseUrl = config.data.downloadUrl;
    window.open(`${downloadBaseUrl}/resource/download/${base64Str}`, "_self");
    // TODO iframe 优化
  }
}

class Express {
  constructor(ajax) {
    this.ajax = ajax
  }

  //快讯新增
  addNewsFlash(data) {
    return this.ajax.post("/newsFlash/add", data)
  }

  //快讯修改
  updateNewsFlash(data) {
    return this.ajax.post("/newsFlash/update", data)
  }

  //快讯详情
  detailNewsFlash(id) {
    return this.ajax.get(`/newsFlash/${id}`)
  }

  //快讯回收站操作
  recycle(data) {
    return this.ajax.post("/newsFlash/recycle", data)
  }
}

class Channel {
  constructor(ajax) {
    this.ajax = ajax
  }

  //频道新增
  addChannel(data) {
    return this.ajax.post("/channel/add", data)
  }

  //频道详情
  channelDetail(id) {
    return this.ajax.get(`/channel/${id}`)
  }

  //频道编辑
  editChannel(data) {
    return this.ajax.post("/channel/update", data)
  }

  // 检测重名
  checkName(name, id) {
    let baseUrl = `/channel/verify/${name}/`;
    if (id) {
      baseUrl += id
    }
    return this.ajax.get(baseUrl)
  }
}

class Thematic {
  constructor(ajax) {
    this.ajax = ajax
  }

  //专题列表
  getThematicListList(data) {
    return this.ajax.post("/channel/special/list", data)
  }

  /// 专题新增
  addThematic(data) {
    return this.ajax.post('/channel/special/add', data)
  }

  //专题详情
  thematicDetail(id) {
    return this.ajax.get(`/channel/special/${id}`)
  }

  //专题编辑
  editThematic(data) {
    return this.ajax.post("/channel/special/update", data)
  }

  //专题删除
  deleteThematic(data) {
    return this.ajax.post("/channel/special/del", data)
  }

  //移动至
  moveToInfo(data) {
    return this.ajax.post(`/channel/special/move`, data)
  }

  // 新增子栏目/channel/special/child/add
  addSubcolumn(data) {
    return this.ajax.post("/channel/special/child/add", data)
  }
}

class Manuscript {
  // 稿件
  static async getChannelTree(data) {
    let res = await service.post("/channel/tree", data);
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  // 详情
  static async detail(path, id, method = "GET") {
    if (method === 'GET') {
      let res = await service.get(`${path}/${id}`);
      return [res.code === 200, res.code === 200 ? res.data : res.msg]
    }

    if (method === 'POST') {
      let res = await service.post(path, {
        id
      });
      return [res.code === 200, res.code === 200 ? res.data : res.msg]
    }
  }

  static async update(data) {
    let res = await service.post("/integrate/relevance/update", data);
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  static async changeIsBanner({
    id,
    isBanner
  }) {
    let res = await service.post("/integrate/banner", {
      id,
      isBanner
    });
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  static async changeIsTop({
    id,
    isTop
  }) {
    let res = await service.post("/integrate/top", {
      id,
      isTop
    });
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  static async updateStatus({
    articleType,
    rid,
    status
  }) {
    // 撤稿与审核通过
    let res = await service.post("/integrate/audit", {
      articleType,
      rid,
      status
    });
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  // 取消关联
  static async cancelRelation({
    articleType,
    rid,
    channelId
  }) {
    let res = await service.post("/integrate/relevance/cancel", {
      articleType,
      rid,
      channelId
    });
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  // 生成海报
  static async createPoster({
    rid,
    title,
    articleType,
    description,
    linkUrl,
    picType,
    listPicOne,
    posterType
  }) {
    let res = await service.post("/integrate/genPoster", {
      rid,
      title,
      articleType,
      description,
      linkUrl,
      picType,
      listPicOne,
      posterType
    });
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  static async savePoster({
    articleType,
    rid,
    id,
    posterUrl
  }) {
    let res = await service.post("/integrate/poster/saveOrDel", {
      articleType,
      rid: rid || id,
      posterUrl
    });
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  // 查询已有海报地址
  static async getPosterImgUrl(path, id) {
    let res = await service.get(`${path}/${id}`);
    if (res.code !== 200) return "";
    return res.data.posterUrl;
  }

  // 查询海报对应的详情
  static async getPosterDetail(path, id) {
    let res = await service.get(`${path}/${id}`);
    if (res.code !== 200) return "";
    return res.data;
  }

  // 批量撤稿
  static async batchCancelAll(data) {
    let res = await service.post("/integrate/batchCancel", data);
    return res.code === 200
  }
}

class Article {
  constructor(ajax) {
    this.ajax = ajax
  }

  //来源列表/article/source/{type}
  getSourceList(type) {
    return this.ajax.get(`/article/source/${type}`)
  }

  //新增来源
  addResource(data) {
    return this.ajax.post('/article/source/add', data)
  }

  //来源详情
  resourceDetail(id) {
    return this.ajax.get(`/article/source/instance/${id}`)
  }

  //修改来源
  resourceUpdate(data) {
    return this.ajax.post(`/article/source/update`, data)
  }

  // 新增文章
  addArticle(data) {
    return this.ajax.post('/article/add', data)
  }

  //文章详情
  articleDetail(id) {
    return this.ajax.get(`/article/instance/${id}`)
  }

  //修改文章
  articleUpdate(data) {
    return this.ajax.post(`/article/update`, data)
  }

  //审核通过
  audit(data) {
    return this.ajax.post("/article/audit", data)
  }

  //直播置顶/取消置顶
  updateTop(data) {
    return this.ajax.post("/article/top", data)
  }

  //直播设置banner/取消banner
  updateBanner(data) {
    return this.ajax.post("/article/banner", data)
  }

  //校验稿件名
  checkTitle(data) {
    return this.ajax.post("/article/checkTitle", data)
  }


}

class Comment {
  // 评论
  static async update(data) {
    let res = await service.post("/comment/audit", data);
    return [res.code === 200, res.msg]
  }
}

export default {
  search: Search,
  resource: Resource,
  manuscript: Manuscript,
  comment: Comment,
  express: new Express(service),
  channel: new Channel(service),
  thematic: new Thematic(service),
  article: new Article(service)
}