import Vue from "vue"

let registerWxUrl = "https://cms.xhfmedia.com/base/official/wx/signature";

Vue.prototype.$registerWX = async function () {

  let url = (location.href.split('#')[0]);
  let wxRes = null;
  let res = await this.$axios.post(registerWxUrl, {url}, {
    headers: {'contentType': "application/json; charset=utf-8"}
  });
  if (res.data.code === 200) {
    wxRes = res.data.data
  }

  return wxRes
};

// api.xhfmedia.com