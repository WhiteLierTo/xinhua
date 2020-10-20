import request from "@/utils/request";

// 用户列表
export function userList(query) {
  return request({
    url: "/wechat/list",
    method: "get",
    params: query
  });
}

// 获取二维码url
export function getQR(query) {
  return request({
    url: "/wechat/qr",
    method: "get",
    params: query
  });
}

// 备注
export function remark(data) {
  return request({
    url: "/wechat/remark",
    method: "post",
    data: data
  });
}

//删除用户
export function delUser(id) {
  return request({
    url: "/wechat/del/" + id,
    method: "get"
  });
}
