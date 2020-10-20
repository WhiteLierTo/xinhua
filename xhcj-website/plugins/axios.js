// export default function ({$axios, redirect}) {
//   $axios.setBaseURL("/websiteBase");
//   $axios.setHeader("device", "app");
// }


// 将baseUrl注入
export default (context, inject) => {
  inject('getBaseUrl', function() {
    // https://xhcj.jsxhfh.com/base/official/wx/signature
    // return "https://47.110.235.193:8091/xhcj"
    return "https://cms.xhfmedia.com/base"
  })
}