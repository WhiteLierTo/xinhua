import VueInstance from "../main"

import tableWithFilter from "../components/tableWithFilter/tableWithFilter";
// import picCutting from "../components/picCutting/picCutting";
import picCut2 from "../components/picCutting/picCut2";
import dialogTemplate from "../components/dialogTemplate/dialogTemplate";
import SvgIcon from "../components/SvgIcon"
import uploadFile from "../components/uploadFile/uploadFile"
import personSelector from "../components/personSelector/personSelector"
import manuscriptConfig from "../components/manuscriptConfig/manuscript-config"
import NewsSectionSelector from "../components/NewsSectionSelector/NewsSectionSelector"
import channelTree from "../components/channelTree/channelTree"
import xhUeditor from "../components/xhUeditor/xh-ueditor"

function componentsRegister(Vue) {
  Vue.component("tableWithFilter", tableWithFilter);
  Vue.component("picCutting", picCut2);
  Vue.component("dialogTemplate", dialogTemplate);
  Vue.component('svg-icon', SvgIcon);
  Vue.component('uploadFile', uploadFile);
  Vue.component('personSelector', personSelector);
  Vue.component('manuscriptConfig', manuscriptConfig);
  Vue.component('NewsSectionSelector', NewsSectionSelector);
  Vue.component('channelTree', channelTree);
  Vue.component('xhUeditor', xhUeditor);

  const req = require.context('../assets/icons/svg', false, /\.svg$/);
  const requireAll = requireContext => requireContext.keys().map(requireContext);
  requireAll(req);


  // 权限组件的注册
  Vue.directive('allow', (el, binding) => {
    if (!VueInstance.$store.state.permissions.includes(binding.value)) {
      el.style.display = "none";
    } else if (binding.value !== 'allow') {
      // el.style.border = "1px solid rgba(100,0,0,0.4)"
    }
  })
}

export default componentsRegister