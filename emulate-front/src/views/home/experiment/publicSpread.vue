<template>
  <div class="container">
    <school-pano class="pano-view"></school-pano>
    <div class="container-box">
      <div class="container_titlebg">
        <p class="container_title">公共卫生安全舆情与风险监管虚拟仿真平台</p>
        <div class="info">
          <div class="info_left">
            <img class="avtor" src="../../../assets/image/studentAvtor.png" />
          </div>
          <div class="info_right">学生</div>
        </div>
      </div>
      <div class="tips" @click="testHandleClick">舆情扩散测试题</div>
      <div class="tips release" @click="goOnHandleClick">继续</div>
      <!-- <div class="wb" @click="weiboHandleClick">电脑屏幕</div> -->
      <div class="left-talk" v-if="showLeft">
        <p>真的吗？给我看看。</p>
      </div>
      <div class="right-talk" v-if="showRight">
        <p>昨天咱们学校食堂食物中毒的事情听说了吗？都在微博上传开了。</p>
      </div>
    </div>
    <div class="ffweweffwe">
      <el-dialog :visible.sync="dialogTableVisible" :show-close="false" width="2.3rem">
        <div class="weibo" v-if="isComments">
          <div class="input">
            <el-row>
              <el-col :span="2">
                <img class="watch" src="../../../assets/image/experiment/watch.png" />
              </el-col>
              <el-col :span="22" class="title">#南京某某学校食堂集体中毒事件#</el-col>
            </el-row>
          </div>
          <el-row class="v_tab">
            <el-col :span="3">
              <span class="synthesis">综合</span>
            </el-col>
            <el-col :span="3">实时</el-col>
            <el-col :span="3">热门</el-col>
            <el-col :span="3">视频</el-col>
            <el-col :span="3">问答</el-col>
            <el-col :span="3">图片</el-col>
            <el-col :span="4">
              <img class="add" src="../../../assets/image/experiment/add.png" />
            </el-col>
          </el-row>
          <div class="line"></div>
          <div class="remen">热门</div>
          <div class="v_body">
            <div class="v_ls">
              <div class="v_ts" v-for="(item,index) in newsList" :key="index">
                <div class="v_body_title">
                  <el-row>
                    <el-col :span="5">
                      <img class="v_avtor" :src="item.actor" />
                    </el-col>
                    <el-col :span="19">
                      <dl class="v_info">
                        <dt class="name">{{item.name}}</dt>
                        <dt class="time">{{item.publishDate}}</dt>
                      </dl>
                    </el-col>
                  </el-row>
                </div>
                <div class="v_body_context">
                  <div class="title">
                    <span>#南京某某学校食堂集体中毒事件#</span>
                    {{item.content}}
                  </div>
                </div>
              </div>
            </div>
            <div class="v_body_bottom">
              <el-row>
                <el-col :span="8">
                  <div @click="forwardHandleClick">
                    <el-row>
                      <el-col :span="6">
                        <img class="icon" src="../../../assets/image/experiment/forwarding.png" />
                      </el-col>
                      <el-col :span="16" class="num">209</el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div @click="conmonHandleClick">
                    <el-row>
                      <el-col :span="6">
                        <img class="icon" src="../../../assets/image/experiment/comments.png" />
                      </el-col>
                      <el-col :span="16" class="num">685</el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div @click="likeHandleClick">
                    <el-row>
                      <el-col :span="6">
                        <img
                          class="icon"
                          src="../../../assets/image/experiment/like.png"
                          v-if="!isLike"
                        />
                        <img
                          class="icon"
                          src="../../../assets/image/experiment/likeactive.png"
                          v-else
                        />
                      </el-col>
                      <el-col :span="16" class="num">{{num}}</el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="comment" v-if="isComment" @click="isComment = false">
            <div class="comment-inner" @click.stop>
              <img class="com_avtor" src="../../../assets/image/experiment/v-avtor.png" />
              <el-input type="textarea" v-model="comment" resize="none" class="com-input"></el-input>
              <el-button type="primary" size="mini" @click="forwarding" class="com-bt">转发</el-button>
            </div>
          </div>
        </div>
        <div class="weibo" v-else>
          <div class="vb_header">
            <img src="../../../assets/image/experiment/top.png" />
            <div class="vb_header_title">
              <el-row>
                <el-col :span="2">
                  <img
                    class="back_icon"
                    @click="backHandleClick"
                    src="../../../assets/image/experiment/left.png"
                  />
                </el-col>
                <el-col :span="22" class="title">评论</el-col>
              </el-row>
            </div>
            <div class="v_body">
              <div class="v_ls">
                <div class="v_ts" v-for="(item,index) in commentList" :key="index">
                  <div class="v_body_title">
                    <el-row>
                      <el-col :span="5">
                        <img class="v_avtor" :src="item.actor" />
                      </el-col>
                      <el-col :span="19">
                        <dl class="v_info">
                          <dt class="name">{{item.name}}</dt>
                          <dt class="time">{{item.publishDate}}</dt>
                        </dl>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="v_body_context">
                    <div class="title">
                      <span>#南京某某学校食堂集体中毒事件#</span>
                      {{item.content}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="comment2">
            <div class="comment-inner">
              <img class="com_avtor" src="../../../assets/image/experiment/v-avtor.png" />
              <el-input type="textarea" v-model="chatVal" resize="none"></el-input>
              <el-button type="primary" size="mini" @click="chatHandleClick" class="com-bt">评论</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="ffweweffwewdwddw">
      <el-dialog :visible.sync="dialogTempShow" :show-close="false" :modal="false">
        <test-questions :process="4" @dialog-show="dialogShow"></test-questions>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { subProcess } from "../../../api/progress";
export default {
  name: "PublicSpread",
  components: {
    testQuestions: () => import("./testQuestions"),
    schoolPano: () => import("@/components/pano/school")
  },
  created() {
    window.schoolObj = this;
  },
  data() {
    return {
      showLeft: false,
      showRight: false,
      dialogTempShow: false,
      dialogTableVisible: false,
      isComment: false,
      processNo: "",
      isLike: false,
      num: "23502",
      comment: "",
      chatVal: "", //评论
      commentList: [
        {
          name: "探心猫家庭教育28",
          content:
            "#家庭教育# 20岁学生食堂中毒去世，除了痛苦家长还能做什么#探心猫家庭教育# 探心猫家庭教育 最近几日，一则有关学生食堂因食物中毒不幸去世的消息被刷上了热搜，不少人对此事表示十分愤慨，同时也再次吸引了社会各界人士对食品安全问题的关心，尤其是家里有孩子的家长朋友，通过这件事他们的内心深处隐隐约约",
          publishDate: "2019-11-12 10:06:00",
          actor: require("../../../assets/image/weibo/actor1.jpg")
        },
        {
          name: "听风起",
          content:
            "回复@你的主治医师:可能你有所不知，在南京甚至整个江苏吧，老鼠药是违禁品一类的，出现了，说明就有问题了，，//@你的主治医师:回复@Michelle_hao:又不一定是在食堂吃饭的时候吃的，其他地方呢？接头路边摊嫌疑更大//@风魔无下限:转发微博 @头条新闻 【#学生食堂吃饭呕吐体内被检出老鼠药成分#，暂未脱离生命",
          publishDate: "2019-11-19 17:58:31",
          actor: require("../../../assets/image/weibo/actor2.jpg")
        }
      ],
      newsList: [
        {
          name: "探心猫家庭教育28",
          content:
            "#家庭教育# 20岁学生食堂中毒去世，除了痛苦家长还能做什么#探心猫家庭教育# 探心猫家庭教育 最近几日，一则有关学生食堂因食物中毒不幸去世的消息被刷上了热搜，不少人对此事表示十分愤慨，同时也再次吸引了社会各界人士对食品安全问题的关心，尤其是家里有孩子的家长朋友，通过这件事他们的内心深处隐隐约约",
          publishDate: "2019-11-12 10:06:00",
          actor: require("../../../assets/image/weibo/actor1.jpg")
        },
        {
          name: "听风起",
          content:
            "回复@你的主治医师:可能你有所不知，在南京甚至整个江苏吧，老鼠药是违禁品一类的，出现了，说明就有问题了，，//@你的主治医师:回复@Michelle_hao:又不一定是在食堂吃饭的时候吃的，其他地方呢？接头路边摊嫌疑更大//@风魔无下限:转发微博 @头条新闻 【#学生食堂吃饭呕吐体内被检出老鼠药成分#，暂未脱离生命",
          publishDate: "2019-11-19 17:58:31",
          actor: require("../../../assets/image/weibo/actor2.jpg")
        },
        {
          name: "小可爱上猫",
          content:
            "转发微博 @寻根炎帝故里随州 这样的事为何频频发生？#食堂呕吐体内检出鼠药成分#，暂未脱离生命危险，一学生食堂就餐后突发腹痛呕吐抽搐，医院检查出体内有氟乙酰胺成分，怀疑学生老鼠药中毒。",
          publishDate: "2019-11-12 21:23:45",
          actor: require("../../../assets/image/weibo/actor3.jpg")
        },
        {
          name: "搜狐视频",
          content:
            "【20岁学生食堂就餐后腹痛抽搐死亡，疑老鼠药中毒，查不到录像给12万后人去楼空】10月22日，江苏南京一名20岁学生在学校吃过午餐后，出现全身抽搐并呕吐，医院检查出他体内有氟乙酰胺成分。这是杀虫剂的成分之一，学生父亲怀疑孩子是老鼠药中毒。11月7日，学生抢救无效不幸去世。据悉事发当日学生是吃了该",
          publishDate: "2019-11-11 21:34:00",
          actor: require("../../../assets/image/weibo/actor4.jpg")
        },
        {
          name: "佛山电视台小强热线",
          content:
            "【学生学校中毒 家属确认孩子去世】这两天网上关注的南京学生中毒事件，再次引起大家对学校的关注，在学校饮食后出现不适，而且病情恶化，经过检验，学生肚子有老鼠药的成分，去了解下事件。 南京电视台小强热线的微博视频",
          publishDate: "2019-11-11 18:00:39",
          actor: require("../../../assets/image/weibo/actor5.jpg")
        },
        {
          name: "潍坊高新检察",
          content:
            "【#疑似老鼠药中毒的学生已确认去世# 官方：就读学校无办学资质】10月22日，江苏南京一名20岁学生在学校就餐后突发腹痛呕吐抽搐。经检查，学生体内有氟乙酰胺成分，怀疑是服用老鼠药后中毒。11月7日，家属表示学生因病情恶化去世。南京市香洲区教育局办公室工作人员称，涉事学校食堂无卫生资质。",
          publishDate: "2019-11-11 07:44:54",
          actor: require("../../../assets/image/weibo/actor6.jpg")
        },
        {
          name: "黑恶摇滚圈",
          content:
            "南京20岁学生学校就餐中毒去世 官方：已关停 无办学资质 11月7日，江苏南京20岁中毒学生已不治身亡。10月22日学生在学校就餐后，突发腹痛、呕吐、抽搐等症状，医院检查出其体内有氟乙酰胺成分。据悉，氟乙酰胺是杀虫剂的成分之一。学生父亲怀疑孩子是老鼠药中毒。老师反馈，孩子当日在学校内吃了粉条。",
          publishDate: "2019-11-11 03:33:02",
          actor: require("../../../assets/image/weibo/actor7.jpg")
        },
        {
          name: "书墨明",
          content:
            "转发微博 转发内容：【#南京学校食物中毒学生去世# 家属：老师称孩子中午吃的粉条】11月7日，红星新闻从家属处获悉，江苏南京学校食物中毒学生已去世。10月22日，位于南京市香洲区发生学校食物中毒事件，一名20岁叶姓名学生在该服务部就餐后出现呕吐现象。",
          publishDate: "2019-11-10 21:23:37",
          actor: require("../../../assets/image/weibo/actor8.jpg")
        },
        {
          name: "集宁反邪园",
          content:
            "//@乌兰察布市反邪教:【#学生学校呕吐体内检出鼠药成分#，暂未脱离生命危险，学校已被关停】@内蒙古反邪教 转发内容：【#学生学校呕吐体内检出鼠药成分#，暂未脱离生命危险，学校已被关停】江苏南京，一学生学校就餐后突发腹痛呕吐抽搐，医院检查出体内有氟乙酰胺成分，怀疑学生老鼠药中毒。南京警方通告",
          publishDate: "2019-11-10 15:09:29",
          actor: require("../../../assets/image/weibo/actor9.jpg")
        },
        {
          name: "xiaogao0501",
          content:
            "严查 转发内容：【学生学校就餐后不幸去世 医院：疑老鼠药中毒】10月22号，江苏南京叶先生的20岁儿子小锐在学校吃过午饭后，出现全身抽搐并呕吐被送进了重症监护室，昏迷不醒↓↓11月7日小锐病情恶化去世。而医院在小锐检出氟乙酰胺成分，氟乙酰胺是老鼠药成分，小锐（化名）疑似老鼠药中毒。详情↓↓",
          publishDate: "2019-11-10 15:09:29",
          actor: require("../../../assets/image/weibo/actor10.jpg")
        },
        {
          name: "拘杰之",
          content:
            "它们拿着那么点工资,还想让它们事事都兼顾到,难道它们是公益的为人民服务的 转发内容：#南京身边事#【南京教育局回应20岁学生在学校就餐后中毒离世：系违法办食堂】11月7日，江苏南京。20岁学生小锐在学校就餐后食物中毒，治疗16天后去世。医院在其生前尿液检出氟乙酰胺（老鼠药成份）。有传言说是购买的大米被其他人投毒所致。",
          publishDate: "2019-11-10 13:49:32",
          actor: require("../../../assets/image/weibo/actor11.jpg")
        },
        {
          name: "最IN南京",
          content:
            "#南京身边事# 【#南京5岁学生学校就餐中毒去世# 官方：已关停 无办食堂资质】11月7日，江苏南京20岁中毒学生已不治身亡。10月22日学生在学校就餐后，突发腹痛、呕吐、抽搐等症状，医院检查出其体内有氟乙酰胺成分。据悉，氟乙酰胺是杀虫剂的成分之一。学生父亲怀疑孩子是老鼠药中毒。",
          publishDate: "2019-11-10 12:41:25",
          actor: require("../../../assets/image/weibo/actor12.jpg")
        },
        {
          name: "有你相伴潮声频道",
          content:
            "江苏南京某学校20岁学生被老鼠药毒死！当地警方已经介入调查，结果是??????网页链接",
          publishDate: "2019-11-09 08:13:31",
          actor: require("../../../assets/image/weibo/actor13.jpg")
        },
        {
          name: "双旗镇刀客201608",
          content:
            "江苏学生学校就餐后身亡 医院：疑鼠药中毒 近日，江苏南京一名20岁学生在学校就餐后食物中毒离世，尿检结果显示，该学生体内检出灭鼠药成分氟乙酰氨。 学生家长表示，学校没有监控，“目前联系不上学校。” 家长：联系不上学校 红星新闻等媒体报导，中毒学生已于11月7日早晨去世。学生爸爸叶先生8日表示",
          publishDate: "2019-11-09 07:47:39",
          actor: require("../../../assets/image/weibo/actor14.jpg")
        },
        {
          name: "沧海浪子",
          content:
            "江苏学生学校就餐后身亡 医院：疑鼠药中毒      近日，江苏南京一名20岁学生在学校就餐后食物中毒离世，尿检结果显示，该学生体内检出灭鼠药成分氟乙酰氨。 学生家长表示，学校没有监控，“目前联系不上学校。”家长：联系不上学校      红星新闻等媒体报导，中毒学生已于11月7日早晨去世。学生",
          publishDate: "2019-11-09 07:47:00",
          actor: require("../../../assets/image/weibo/actor15.jpg")
        },
        {
          name: "食品安全刘红兵",
          content:
            "【南京一学校中毒学生去世 园方:在配合调查】江苏南京一学生在学校就餐后突发腹痛呕吐搐，医院检查出有氟乙酰胺成分，怀疑学生在学校误食老鼠药。据警方此前通报，学生在学生服务部就餐后呕吐抽搐，警方已介入调查。11月7日，北京青年报记者从学生家属处了解到，学生已经抢救不过来，家属在医院 ...全文",
          publishDate: "2019-11-08 17:51:07",
          actor: require("../../../assets/image/weibo/actor16.jpg")
        },
        {
          name: "壹品健康官方微博",
          content:
            "【南京学校食物中毒学生已去世 家属：老师称孩子中午吃的粉条】饮食安全是人们都注重的事情，但说到学生的饮食安全那更是头等大事。近日，一则#学生学校呕吐体内检出老鼠药成分#的新闻登上微博热搜榜，牵动着万千网友的心，就在昨日，红星新闻记者已从家属处获悉，南京学校食物中毒学生已去世...http://",
          publishDate: "2019-11-08 17:41:53",
          actor: require("../../../assets/image/weibo/actor17.jpg")
        },
        {
          name: "郭乘希",
          content:
            "#学校中毒去世#上级主管部门应当责令香洲区教育局局长辞职——因为我们中国的行政官员从来没有引咎辞职的先例，无论发生伤亡和死人的责任事故，责任官员从不内疚、绝不辞职——待遇丰厚的官位历来是要死死霸住、绝不能拱手于人的！南京20岁学生在学校内就餐时误食老鼠药，当日抢救无效离世， 又一条无辜鲜活的生命毁",
          publishDate: "2019-11-08 16:56:16",
          actor: require("../../../assets/image/weibo/actor18.jpg")
        },
        {
          name: "明天有你南京",
          content:
            "文 | 米粒妈 （公众号 米粒妈爱分享） 学校又出事了！ 昨天刚吃完午饭，米粒妈就看到群里被一个消息刷屏了：江苏南京一个20岁学生在学校内疑似老鼠药中毒。 老鼠药？！这也太恐怖了吧！米粒妈看完之后，更是吓得脊背发凉。 10月22号，这个20岁的学生在学校吃完饭后，突然肚子特别痛，还一阵呕吐",
          publishDate: "2019-11-08 12:36:00",
          actor: require("../../../assets/image/weibo/actor19.jpg")
        },
        {
          name: "证据哥",
          content:
            "#学生学校呕吐体内检出鼠药成分# 校园食品安全关系广大师生健康，是全社会关注的一件大事，不能有丝毫的闪失和懈怠。近日，江苏南京一名5岁学生在学校就餐后突发腹痛呕吐抽搐，医院检查出体内有氟乙酰胺成分，怀疑是老鼠药中毒，家属将其转至南京救治。11月7日，家属表示学生病情不断恶化，#学校食物中毒学生",
          publishDate: "2019-11-08 12:31:00",
          actor: require("../../../assets/image/weibo/actor21.jpg")
        },
        {
          name: "阿米酱biubiu",
          content:
            "我现在要天天看法律博主写的东西 码住 转发内容：#学生学校呕吐体内检出鼠药成分# 校园食品安全关系广大师生健康，是全社会关注的一件大事，不能有丝毫的闪失和懈怠。近日，江苏南京一名20岁学生在学校就餐后突发腹痛呕吐抽搐，医院检查出体内有氟乙酰胺成分，怀疑是老鼠药中毒，家属将其转至南京救治。",
          publishDate: "2019-11-08 12:22:27",
          actor: require("../../../assets/image/weibo/actor22.jpg")
        },
        {
          name: "这里是江苏",
          content:
            "光查处是不行的，核心还是解决食堂的卫生问题，这是政府的工作没做到位。政府脱不了干系。。。 @湖北私家车广播 【曝#中毒学生就读学校无食堂卫生资质#，曾2次被查】近日，南京20岁学生在学校食物中毒，体内检出氟乙酰胺成分，医生怀疑是老鼠药中毒。11月7日，学生病情恶化去世，家属抱头痛哭，希望还孩子一个公道",
          publishDate: "2019-11-08 09:51:51",
          actor: require("../../../assets/image/weibo/actor23.jpg")
        },
        {
          name: "章先森-深圳",
          content:
            "出事了说无卫生资质，之前怎么不查办呢！！！问题关键孩子是老鼠药中毒，明显是投毒的刑事案件啊~~~~ 转发内容：【痛心！#南京学校食物中毒学生去世# 教育局：学校无卫生资质】近日，南京20岁学生在学校食物中毒，体内检出氟乙酰胺成分，医生怀疑是老鼠药中毒，家属将其转至南京救治。后学生死亡。",
          publishDate: "2019-11-08 09:46:00",
          actor: require("../../../assets/image/weibo/actor24.jpg")
        },
        {
          name: "想喝水啊",
          content:
            "#南京学校食物中毒学生去世# 天啊初为人母的我简直无法想象其父母有多痛苦 真的感到痛心 昨天看到一个神经病用30分钟把一个9岁的小男孩活活打死的热搜 现在祖国的花朵都没人保护了吗 他们犯了什么错要被你们这样折磨",
          publishDate: "2019-11-08 09:51:51",
          actor: require("../../../assets/image/weibo/actor25.jpg")
        },
        {
          name: "这里是苏州",
          content:
            "“我们问了老师，孩子中午吃了什么，他们说吃了粉条，现在也不清楚孩子是吃什么中毒的”，叶先生告诉红星新闻记者，孩子在这家学校上学上了三年，“目前联系不上学校，他们到现在也没有一个说法”。叶先生还称，现在警方已经立案侦查。 11月7日中午，红星新闻记者从家属处获悉，江苏南京学校食物中毒学生已去世",
          publishDate: "2019-11-08 07:38:00",
          actor: require("../../../assets/image/weibo/actor26.jpg")
        },
        {
          name: "黄冈周边事",
          content:
            "2019年3月对该学生食堂进行过实地查处，并下达了整改通知书，责令其停止违法行为，要求限期整改。 咋又是整改的又是停止违法行为的？ 转发内容：【南京教育局回应20岁学生在学校就餐后中毒离世：系无资质营业】",
          publishDate: "2019-11-07 22:28:51",
          actor: require("../../../assets/image/weibo/actor27.jpg")
        },
        {
          name: "今日最新闻官方微博",
          content:
            "【南京：疑在食堂食物中毒 体内查出毒鼠药成分】昨日早上，我们接到有南京街坊报料称，自己的儿子怀疑在校园内吃错了东西，病情急转恶化，需要进ICU抢救。而经医生检查，孩子的体内竟然有毒老鼠的成分。这究竟是什么回事呢？ 今日最新闻官方微博的微博视频",
          publishDate: "2019-11-06 10:58:47",
          actor: require("../../../assets/image/weibo/actor28.jpg")
        },
        {
          name: "民众社新闻",
          content:
            "# 腾讯新闻 # 《南京学生在校疑似误食老鼠药中毒 正在就医》南京学生在学校疑似误食老鼠药中毒 正在南京就医 来自@腾讯新闻",
          publishDate: "2019-11-06 09:20:52",
          actor: require("../../../assets/image/weibo/actor29.jpg")
        },
        {
          name: "我是瘦子0214",
          content:
            "同学的侄子，发生在南京『揪心！疑在学生误食老鼠药，20岁生命垂危』网页链接",
          publishDate: "2019-11-05 23:11:22",
          actor: require("../../../assets/image/weibo/actor30.jpg")
        }
      ],
      isComments: true
    };
  },
  mounted() {
    var signNo = this.$route.query.signNo;
    if (signNo === "11") {
      this.processNo = "12";
    } else if (signNo === "23") {
      this.processNo = "24";
    } else if (signNo === "42") {
      this.processNo = "43";
    }
  },
  methods: {
    //提交评论
    chatHandleClick() {
      const temp = {
        name: "南京在线",
        content: "",
        publishDate: "2019-11-12 10:06:00",
        actor: require("../../../assets/image/experiment/v-avtor.png")
      };
      temp.content = this.chatVal;
      this.commentList.unshift(temp);
      this.chatVal = "";
      this.$message({
        message: "评论成功",
        center: true
      });
    },
    // 返回
    backHandleClick() {
      this.isComments = true;
    },
    testHandleClick() {
      this.dialogTempShow = true;
    },
    dialogShow(val) {
      this.dialogTempShow = val;
    },
    goOnHandleClick() {
      // 上报流程
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let data = {
        userId,
        processNo: this.processNo
      };
      subProcess(data);
      if (this.processNo === "12") {
        this.$router.push({
          path: "/publicGovern",
          query: {
            signNo: this.processNo,
            status: true
          }
        });
      } else if (this.processNo === "24") {
        this.$router.push({
          path: "/publicMonitor",
          query: {
            signNo: this.processNo
          }
        });
      } else if (this.processNo === "43") {
        this.$router.push({
          path: "/publicMonitor",
          query: {
            signNo: this.processNo
          }
        });
      }
    },
    weiboHandleClick() {
      this.dialogTableVisible = true;
      this.isComments = true;
    },
    //点赞
    likeHandleClick() {
      if (!this.isLike) {
        this.isLike = true;
        this.num++;
      } else {
        this.isLike = false;
        this.num--;
      }
    },
    //转发
    forwardHandleClick() {
      this.isComment = true;
    },
    conmonHandleClick() {
      this.isComments = false;
    },
    //输入转发
    forwarding() {
      this.isComment = false;
      this.comment = "";
      this.$message({
        message: "转发成功",
        center: true
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url("../../../assets/image/loginbg.png") no-repeat;
  background-size: 102%;
  background-attachment: fixed;
  .container-box {
    position: relative;
    .tips {
      position: absolute;
      left: 3.9167rem;
      top: 0.3333rem;
      width: 1.0938rem;
      height: 0.3438rem;
      background: url("../../../assets/image/experiment/tips.png") no-repeat;
      background-size: 100%;
      text-align: center;
      font-size: 0.1042rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(170, 240, 255, 1);
      line-height: 0.3rem;
      cursor: pointer;
      z-index: 999;
    }
    .release {
      margin-left: 1.0677rem;
    }
    .wb {
      position: absolute;
      left: 4.5rem;
      top: 2rem;
      width: 400px;
      height: 200px;
      background: #999;
      z-index: 20;
      cursor: pointer;
    }
    .container_titlebg {
      width: 98%;
      height: 0.7552rem;
      z-index: 2;
      background: url("../../../assets/image/index_img/commonbg.png") no-repeat
        center center;
      background-size: 100%;
      margin: 0 auto;
      overflow: hidden;
      .container_title {
        float: left;
        width: 4.0417rem;
        font-size: 0.1667rem;
        font-family: Source Han Sans CN;
        font-weight: 550;
        color: rgba(255, 255, 255, 1);
        line-height: 0.4688rem;
        text-align: left;
        margin-top: 0.0833rem;
        margin-left: 0.3229rem;
        font-family: Source Han Sans CN;
        background: linear-gradient(#00d6ff 32%, #003a91);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .info {
        overflow: hidden;
        float: right;
        margin-top: 0.2135rem;
        margin-right: 0.3698rem;
        .info_left {
          float: left;
          .avtor {
            width: 0.3125rem;
            height: 0.3125rem;
          }
        }
        .info_right {
          float: left;
          font-size: 0.1563rem;
          font-family: Adobe Heiti Std;
          font-weight: normal;
          color: rgba(170, 240, 255, 1);
          line-height: 0.25rem;
          margin-left: 0.0781rem;
          margin-top: 0.0417rem;
        }
      }
    }
    .pano-view {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
    }
    .left-talk {
      background: url("../../../assets/image/experiment/left-talk.png")
        no-repeat;
      background-size: 100% 100%;
      width: 2.140625rem;
      height: 1.213541rem;
      position: absolute;
      top: 1.328125rem;
      left: 0.71875rem;
      color: #aaf0ff;
      p {
        font-size: 0.125rem;
        font-weight: 500;
        margin-top: 0.3125rem;
        margin-left: 0.369791rem;
      }
    }
    .right-talk {
      background: url("../../../assets/image/experiment/right-talk.png")
        no-repeat;
      background-size: 100% 100%;
      width: 2.140625rem;
      height: 1.213541rem;
      position: absolute;
      top: 1.614583rem;
      right: 0.770833rem;
      color: #aaf0ff;
      p {
        width: 1.432291rem;
        font-size: 0.125rem;
        font-weight: 500;
        margin-top: 0.3125rem;
        margin-left: 0.369791rem;
      }
    }
  }
  .weibo {
    position: relative;
    background: #fff;
    height: 4rem;
    width: 2.3rem;
    margin: 0 auto;
    .vb_header {
      width: 100%;
      img {
        width: 100%;
      }
      .vb_header_title {
        color: #333;
        background: #f8f8f8;
        font-size: 0.1146rem;
        margin-top: -7px;
        padding: 0.0833rem 0;
        text-align: center;
        z-index: 2;
        overflow: hidden;
        .back_icon {
          width: 0.05rem;
          cursor: pointer;
        }
        .title {
          padding-right: 0.2604rem;
          font-weight: 600;
        }
      }

      .v_ls {
        height: 3rem !important;
      }
    }
    .input {
      display: inline-block;
      width: 100%;
      height: 0.1823rem;
      background: #eee;
      border-radius: 0.026rem;
      width: 90%;
      margin: 0.1042rem 0 0 5%;
      .watch {
        width: 0.1rem;
        height: 0.1rem;
        padding: 0.0521rem;
      }
      .title {
        font-size: 0.0833rem;
        color: #333333;
        padding: 0.0417rem;
      }
    }
    .v_tab {
      border-top: 0.0052rem solid #e6e6e6;
      margin: 0.0781rem 0 0.0521rem;
      text-align: center;
      color: #999999;
      font-size: 0.0833rem;
      font-weight: 400;
      padding-top: 0.0521rem;
      padding-left: 0.0781rem;
      .add {
        width: 0.1rem;
        height: 0.1rem;
        margin-left: 0.151rem;
      }
      .synthesis {
        color: #333333;
        font-weight: 700;
        border-bottom: 0.0156rem solid #ec8928;
        padding-bottom: 0.026rem;
      }
    }
    .line {
      width: 100%;
      height: 0.026rem;
      background: #eee;
    }
    .remen {
      color: #999999;
      font-size: 0.0833rem;
      padding-left: 0.1354rem;
      padding-top: 0.0417rem;
      padding-bottom: 0.0417rem;
      border-bottom: 0.0052rem solid #e6e6e6;
    }
    .v_body {
      .v_ls {
        height: 2.7rem;
        overflow-y: auto;
        z-index: 18;
      }
      .v_body_title {
        .v_avtor {
          width: 0.2917rem;
          height: 0.2917rem;
          padding: 0.0417rem 0.1167rem;
        }
        .v_info {
          padding-left: 0.0417rem;
          .name {
            color: #ec8928;
            font-size: 0.0938rem;
          }
          .time {
            color: #999;
            font-size: 0.0833rem;
            padding-top: 0.026rem;
          }
        }
      }
      .v_body_context {
        width: 90%;
        margin: 0 auto;
        font-size: 0.0833rem;
        font-weight: 600;
        line-height: 0.125rem;
        .title {
          margin-bottom: 0.0521rem;
        }
        span {
          color: #2b7edb;
        }
        .tu {
          height: 0.625rem;
          background: #96b7cc;
          margin-left: 0.0156rem;
          margin-top: 0.0156rem;
        }
      }
      .v_body_bottom {
        border-top: 0.0052rem solid #e6e6e6;
        padding-top: 0.0781rem;
        width: 88%;
        margin: 0.0938rem auto 0;
        .icon {
          width: 0.1042rem;
          height: 0.1042rem;
          padding-left: 0.1302rem;
          cursor: pointer;
        }
        .num {
          padding-top: 0.0156rem;
          padding-left: 0.1302rem;
          cursor: pointer;
        }
      }
    }
    .comment {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      background: rgba(0, 0, 0, 0.8);
      box-sizing: border-box;
    }

    .comment2 {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #e5e5e5;
    }

    .comment-inner {
      width: 100%;
      padding: 0.07rem;
      background: #e5e5e5;
      position: absolute;
      bottom: 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      img {
        width: 0.2rem;
        height: 0.2rem;
        margin-right: 0.05rem;
        flex-shrink: 0;
      }

      .com-bt {
        margin-left: 0.05rem;
        height: 0.2rem;
      }
    }
  }
}
</style>

<style lang="scss">
.ffweweffwewdwddw {
  .el-dialog__wrapper {
    background: url("../../../assets/image/model.png") no-repeat;
    background-size: 100% 100%;
  }
  .el-dialog {
    background: transparent;
    width: 100%;
    .el-dialog__body {
      width: 66%;
      margin: 0 auto;
    }
  }
}
.ffweweffwe {
  .el-dialog__wrapper {
    background: url("../../../assets/image/model.png") no-repeat;
    background-size: 100% 100%;
  }
  .el-dialog {
    background: transparent;
    margin-top: 8vh !important;
    .el-dialog__body {
      width: 100%;
      margin: 0 auto;
    }
  }
}
</style>
