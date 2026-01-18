// 导入WebView相关模块
import { webview } from '@kit.ArkWeb';
// 导入错误处理模块
import { BusinessError } from '@kit.BasicServicesKit';
// 导入日志模块
import { hilog } from '@kit.PerformanceAnalysisKit';
// 导入常量定义
import { CommonConstant as Const } from '../common/Constant';
// 导入导航数据模型
import { NavigatorBean } from '../viewmodel/NavigatorBean';

// 从应用存储中获取UI上下文
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
// 获取宿主上下文，用于资源管理
let context = uiContext!.getHostContext()!;

// 定义与Web页面交互的类
class LinkClass {
  // 从HTML接收消息的方法
  messageFromHtml(value: string) {
    try {
      // 从资源管理器中获取本地化字符串
      let res = context.resourceManager.getStringSync($r('app.string.congratulate').id);
      // 显示弹窗对话框，包含HTML传递的消息
      uiContext!.showAlertDialog!({
        message: res + value, // 拼接本地化字符串和HTML传递的值
        confirm: {
          value: $r('app.string.web_alert_dialog_button_value'), // 确认按钮文本
          action: () => {
            // 确认按钮点击后的操作（此处为空）
          }
        },
        cancel: () => {
          // 取消按钮点击后的操作（此处为空）
        }
      });
    } catch (error) {
      // 捕获并处理资源获取失败的错误
      let err = error as BusinessError;
      hilog.error(0x0000, 'LinkClass', `getStringSync failed, error code=${err.code}, message=${err.message}`);
    }
  }
}

// 构建器函数，用于创建VuePage组件
@Builder
export function VuePageBuilder() {
  VuePage()
}

// Vue页面组件，用于显示Vue页面
@Component
export struct VuePage {
  // 状态变量：导航参数，包含路径和提示信息
  @State param: NavigatorBean = new NavigatorBean();
  // 状态变量：Web交互对象实例
  @State linkObj: LinkClass = new LinkClass();
  // WebView控制器，用于控制Web组件
  webController: webview.WebviewController = new webview.WebviewController();
  // 导航路径栈实例，用于页面导航
  private pathStack: NavPathStack = new NavPathStack();

  // 构建UI
  build() {
    // 导航目标页面容器
    NavDestination() {
      // 堆叠布局容器，内容从顶部开始对齐
      Stack({ alignContent: Alignment.TopStart }) {
        // 背景图片
        Image($r("app.media.pagebackground"))
          .width(Const.MAIN_CONSTANT_FULL_HEIGHT)
          .height(Const.MAIN_CONSTANT_IMAGE_HEIGHT)

        // 行布局，包含主要内容
        Row() {
          // 列布局，包含所有内容元素
          Column() {
            // 顶部导航行
            Row() {
              // 返回按钮图标
              Image($rawfile('local/img/ic_public_back.png'))
                .width(Const.WEB_CONSTANT_IMAGE_WIDTH)
                .height(Const.WEB_CONSTANT_IMAGE_HEIGHT)
                .margin({ left: Const.WEB_CONSTANT_IMAGE_MARGIN_LEFT })
                .onClick(() => {
                  // 点击返回按钮时，弹出当前页面
                  this.pathStack.pop();
                })

              // 返回首页文本
              Text($r('app.string.return_home'))
                .fontSize(Const.WEB_CONSTANT_TOP_TEXT_FONT_SIZE)
                .width(Const.WEB_CONSTANT_TOP_TEXT_WIDTH)
                .height(Const.WEB_CONSTANT_TOP_TEXT_HEIGHT)
                .fontColor($r('app.color.black'))
                .margin({ left: Const.WEB_CONSTANT_TOP_TEXT_MARGIN_LEFT })

            }.height(Const.WEB_CONSTANT_TOP_ROW_HEIGHT) // 设置顶部行高度


            // Web组件：加载Vue页面
            Web({ src: this.param.path, controller: this.webController })
              .zoomAccess(false) // 禁用缩放
              .width(Const.WEB_CONSTANT_WIDTH) // 设置宽度
              .aspectRatio(1) // 宽高比1:1
              .margin({
                left: 0, // 左边距为0
                right: Const.WEB_CONSTANT_MARGIN_RIGHT, // 右边距
                top: Const.WEB_CONSTANT_MARGIN_TOP // 上边距
              })
              .backgroundColor(Color.Transparent) // 背景色设置为透明
                // JavaScript代理，允许Web页面调用原生方法
              .javaScriptProxy({
                object: this.linkObj, // 代理对象
                name: 'linkObj', // 在Web页面中的名称
                methodList: ['messageFromHtml'], // 允许调用的方法列表
                controller: this.webController // 控制器
              })

            // 提示信息列
            Column() {
              // 提示标题
              Text($r('app.string.tip_vue'))
                .fontSize(Const.WEB_CONSTANT_TEXT_VALUE_FONT_SIZE)
                .textAlign(TextAlign.Center)
                .fontColor($r('app.color.text_value_font_color'))
                .height(Const.WEB_CONSTANT_TEXT_VALUE_HEIGHT)
                .fontWeight(Const.WEB_CONSTANT_TEXT_VALUE_FONT_WEIGHT)
                .margin({ top: Const.WEB_CONSTANT_TEXT_VALUE_MARGIN_TOP })

              // 路径提示文本
              Text(this.param.tips)
                .fontSize(Const.WEB_CONSTANT_TIP_TEXT_VALUE_FONT_SIZE)
                .textAlign(TextAlign.Center)
                .fontColor($r('app.color.text_value_font_color'))
                .width(Const.WEB_CONSTANT_TIP_TEXT_VALUE_WIDTH)
                .height(Const.WEB_CONSTANT_TIP_TEXT_VALUE_HEIGHT)
                .opacity(Const.WEB_CONSTANT_TIP_TEXT_VALUE_OPACITY)
                .margin({ top: Const.WEB_CONSTANT_TIP_TEXT_VALUE_MARGIN_TOP })
            }

            // 操作按钮
            Button($r('app.string.btnValue'))
              .fontSize(Const.WEB_CONSTANT_BUTTON_FONT_SIZE)
              .fontColor($r('app.color.start_window_background'))
              .margin({ top: Const.WEB_CONSTANT_BUTTON_MARGIN_TOP })
              .width(Const.WEB_CONSTANT_BUTTON_WIDTH)
              .height(Const.WEB_CONSTANT_BUTTON_HEIGHT)
              .backgroundColor($r('app.color.blue'))
              .borderRadius(Const.WEB_CONSTANT_BUTTON_BORDER_RADIUS)
              .onClick(() => {
                // 点击按钮时，执行Vue页面中的JavaScript函数
                this.webController.runJavaScript('outWeb()');
              })
          }
          .width(Const.WEB_CONSTANT_FULL_WIDTH) // 设置列宽度
          .height(Const.WEB_CONSTANT_FULL_HEIGHT) // 设置列高度
        }
        .margin({ top: Const.WEB_CONSTANT_MARGIN_TOP }) // 设置行上边距
      }
      .backgroundColor($r('app.color.navy_blue')) // 设置堆叠容器背景颜色
    }
    // 导航目标就绪时的回调
    .onReady((context: NavDestinationContext) => {
      // 获取路径栈
      this.pathStack = context.pathStack;
      // 获取传递的参数
      this.param = context.pathInfo.param as NavigatorBean;
    })
    .width(Const.WEB_CONSTANT_FULL_WIDTH) // 设置导航目标宽度
    .height(Const.WEB_CONSTANT_FULL_HEIGHT) // 设置导航目标高度
    .hideTitleBar(true) // 隐藏标题栏
    .hideToolBar(true) // 隐藏工具栏
  }
}