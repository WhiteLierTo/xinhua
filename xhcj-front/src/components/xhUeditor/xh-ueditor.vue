<template>
  <div class="ueditor-container" ref="container">
    <vue-ueditor-wrap
      v-if="isShow"
      v-bind="$attrs"
      @input="onUeditorInput"
      :config="UEditorConfig"
      @ready="onUeditorReady"
      @beforeInit="onBeforeInit"
    ></vue-ueditor-wrap>

    <div style="height:400px" v-else></div>

    <resourcePoolSelector ref="resourcePoolSelector" />
    <uploadImg ref="uploadImg" />
    <uploadVideo ref="uploadVideo" />
  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import uploadImg from "./children/uploadImg/uploadImg";
import uploadVideo from "./children/uploadVideo/uploadVideo";
import resourcePoolSelector from "./children/resource-pool-selector";

export default {
  components: { VueUeditorWrap, uploadImg, resourcePoolSelector, uploadVideo },
  data() {
    return {
      isShow: false,
      ueditor: null, // Ueditor实例
      UEditorConfig: {
        autoHeightEnabled: false,
        initialFrameHeight: 400,
        initialFrameWidth: 700,
        serverUrl: "http://35.201.165.105:8000/controller.php", // 实际上没有用,不填会报错
        UEDITOR_HOME_URL: "/ueditor/",
        enableAutoSave: false,
        wordCount: false,
        maximumWords: 999999999999,
        toolbars: [
          [
            "fullscreen",
            "source",
            "|",
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "underline",
            "fontborder",
            "strikethrough",
            "superscript",
            "subscript",
            "formatmatch",
            "removeformat",
            "autotypeset",
            "blockquote",
            "pasteplain",
            "|",
            "forecolor",
            "backcolor",
            "insertorderedlist",
            "insertunorderedlist",
            "selectall",
            "cleardoc",
            "|",
            "rowspacingtop",
            "rowspacingbottom",
            "lineheight",
            "|",
            "|",
            "customstyle",
            "paragraph",
            "fontfamily",
            "fontsize",
            "|",
            "directionalityltr",
            "directionalityrtl",
            "indent",
            "|",
            "justifyleft",
            "justifycenter",
            "justifyright",
            "justifyjustify",
            "|",
            "touppercase",
            "tolowercase",
            "|",
            "link",
            "unlink",
            "anchor",
            "|",
            "imagenone",
            "imageleft",
            "imageright",
            "imagecenter",
            "|",
            "insertimage",
            "emotion",
            "map",
            "insertframe",
            "insertcode",
            "pagebreak",
            "template",
            "background",
            "|",
            "horizontal",
            "date",
            "time",
            "spechars",
            "|",
            "inserttable",
            "deletetable",
            "insertparagraphbeforetable",
            "insertrow",
            "deleterow",
            "insertcol",
            "deletecol",
            "mergecells",
            "mergeright",
            "mergedown",
            "splittocells",
            "splittorows",
            "splittocols",
            "charts",
            "|",
            "print",
            "preview",
            "searchreplace",
            "drafts",
            "help" /*'insertvideo'*/,
          ],
        ],
      },
      UIList: [
        // {uiName: UI名字, iconPath: UI图标地址, refKey: 激活那个子组件, index: 图标位置, query:act时的额外参数},
        {
          uiName: "从资源库选择",
          iconPath: "/ueditorIcons/resource.jpg",
          refKey: "resourcePoolSelector",
          index: 30,
        },
        {
          uiName: "上传单图",
          iconPath: "/ueditorIcons/onePic.jpg",
          refKey: "uploadImg",
          index: 31,
          query: [false],
        },
        {
          uiName: "上传多图",
          iconPath: "/ueditorIcons/manyPic.jpg",
          refKey: "uploadImg",
          index: 32,
          query: [true],
        },
        {
          uiName: "上传视频",
          iconPath: "/ueditorIcons/video.jpg",
          refKey: "uploadVideo",
          index: 33,
        },
      ],
    };
  },

  mounted() {
    this.$nextTick(() => {
      let width = this.$refs.container.offsetWidth;
      if (width) {
        this.UEditorConfig.initialFrameWidth = width;
      }
      this.isShow = true;
    });
  },

  methods: {
    onUeditorReady(editorInstance) {
      this.ueditor = editorInstance;
    },

    onBeforeInit() {
      this.UIList.forEach((UI) => {
        window.UE.registerUI(
          UI.uiName,
          (editor, uiName) => {
            let bt = new window.UE.ui.Button({
              name: uiName,
              title: uiName,
              cssRules: `background-image: url('${UI.iconPath}') !important;background-size: cover;`,
              onclick: () => {
                this.$refs[UI.refKey].act(editor, ...(UI.query || []));
              },
            });
            editor.addListener("selectionchange", () =>
              this.selectionchange(bt, uiName)
            );
            return bt;
          },
          UI.index
        );
      });
    },

    selectionchange(ui, uiName) {
      let state = this.ueditor.queryCommandState(uiName);
      if (state === -1) {
        ui.setDisabled(true);
        ui.setChecked(false);
      } else {
        ui.setDisabled(false);
        ui.setChecked(state);
      }
    },

    onUeditorInput(content) {
      this.$emit("input", content);
    },
  },
};
</script>

<style scoped lang="less">
.ueditor-container {
  width: 100%;
  display: flex;
}
</style>
