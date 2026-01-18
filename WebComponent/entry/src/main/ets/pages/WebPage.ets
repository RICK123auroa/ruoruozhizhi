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

// 从AppStorage获取UI上下文，用于显示对话框等UI操作
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
      uiContext!.showAlertDialog({
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

// 构建器函数，用于创建WebPage组件
@Builder
export function WebPageBuilder() {
  WebPage()
}

// Web页面组件，用于显示H5页面
@Component
export struct WebPage {
  // 状态变量：导航参数，包含路径和提示信息
  @State param: NavigatorBean = new NavigatorBean();
  // 状态变量：进度条当前值
  @State progressVal: number = 0;
  // 状态变量：是否正在加载
  @State isLoading: boolean = true;
  // 状态变量：加载定时器ID
  @State intervalLoading: number = -1;
  // 状态变量：Web交互对象实例
  @State linkObj: LinkClass = new LinkClass();
  // WebView控制器，用于控制Web组件
  webController: webview.WebviewController = new webview.WebviewController();
  // 导航路径栈实例，用于页面导航
  private pathStack: NavPathStack = new NavPathStack();

  // 生命周期方法：组件即将出现时调用
  aboutToAppear() {
    // 设置定时器，模拟加载进度
    this.intervalLoading = setInterval(() => {
      // 更新进度值，达到最大值时重置
      this.progressVal = this.progressVal >= Const.WEB_CONSTANT_PROGRESS_MAX ?
      Const.WEB_CONSTANT_PROGRESS_MIN : (this.progressVal + Const.WEB_CONSTANT_PROGRESS_STEP);
    }, Const.WEB_CONSTANT_MILLI_SECONDS); // 定时器执行间隔
  }

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

              // 提示文本
              Text($r('app.string.prompts'))
                .fontSize(Const.WEB_CONSTANT_TOP_TEXT_FONT_SIZE)
                .width(Const.WEB_CONSTANT_TOP_TEXT_WIDTH)
                .height(Const.WEB_CONSTANT_TOP_TEXT_HEIGHT)
                .fontColor($r('app.color.black'))
                .margin({ left: Const.WEB_CONSTANT_TOP_TEXT_MARGIN_LEFT })

            }.height(Const.WEB_CONSTANT_TOP_ROW_HEIGHT) // 设置顶部行高度

            // Web组件：加载H5页面
            Web({ src: this.param.path, controller: this.webController })
              .zoomAccess(false) // 禁用缩放
              .width(Const.WEB_CONSTANT_WIDTH) // 设置宽度
              .aspectRatio(1) // 宽高比1:1
              .margin({
                left: Const.WEB_CONSTANT_MARGIN_LEFT,
                right: Const.WEB_CONSTANT_MARGIN_RIGHT,
                top: Const.WEB_CONSTANT_MARGIN_TOP
              })
                // 错误接收事件处理
              .onErrorReceive((event) => {
                // 网络断开错误处理
                if (event?.error.getErrorInfo() === 'ERR_INTERNET_DISCONNECTED') {
                  this.getUIContext().getPromptAction().showToast({
                    message: $r('app.string.internet_err'),
                    duration: Const.WEB_CONSTANT_DURATION
                  });
                }
                // 连接超时错误处理
                if (event?.error.getErrorInfo() === 'ERR_CONNECTION_TIMED_OUT') {
                  this.getUIContext().getPromptAction().showToast({
                    message: $r('app.string.internet_err'),
                    duration: Const.WEB_CONSTANT_DURATION
                  });
                }
              })
                // 进度变化事件处理
              .onProgressChange((event) => {
                // 当进度达到100%时，停止加载
                if (event?.newProgress === Const.WEB_CONSTANT_PROGRESS_MAX) {
                  this.isLoading = false;
                  clearInterval(this.intervalLoading);
                  this.intervalLoading = -1;
                }
              })
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
              Text($r('app.string.tip_html'))
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
                // 点击按钮时，执行Web页面中的JavaScript函数
                this.webController.runJavaScript('startDraw()');
              })
          }
          .width(Const.WEB_CONSTANT_FULL_WIDTH)
          .height(Const.WEB_CONSTANT_FULL_HEIGHT)
        }
        .margin({ top: Const.WEB_CONSTANT_MARGIN_TOP })

        // 条件渲染：如果正在加载，显示进度条
        if (this.isLoading) {
          Progress({
            value: Const.WEB_CONSTANT_PROGRESS_MIN,
            total: Const.WEB_CONSTANT_PROGRESS_MAX,
            type: ProgressType.ScaleRing // 刻度环形进度条
          })
            .color(Color.Grey) // 进度条颜色
            .value(this.progressVal) // 当前进度值
            .width(Const.WEB_CONSTANT_PROGRESS_WIDTH) // 进度条宽度
            .style({
              strokeWidth: Const.WEB_CONSTANT_PROGRESS_STROKE_WIDTH, // 描边宽度
              scaleCount: Const.WEB_CONSTANT_PROGRESS_SCALE_COUNT, // 刻度数量
              scaleWidth: Const.WEB_CONSTANT_PROGRESS_SCALE_WIDTH // 刻度宽度
            })
            .zIndex(1) // 层级，确保在顶部显示
            .position({
              x: Const.WEB_CONSTANT_PROGRESS_POSITION_X, // X轴位置
              y: Const.WEB_CONSTANT_PROGRESS_POSITION_Y  // Y轴位置
            })
        }
      }
      .backgroundColor($r('app.color.navy_blue')) // 背景颜色
    }
    // 导航目标就绪时的回调
    .onReady((context: NavDestinationContext) => {
      // 获取路径栈
      this.pathStack = context.pathStack;
      // 获取传递的参数
      this.param = context.pathInfo.param as NavigatorBean;
    })
    .width(Const.WEB_CONSTANT_FULL_WIDTH) // 设置宽度
    .height(Const.WEB_CONSTANT_FULL_HEIGHT) // 设置高度
    .hideTitleBar(true) // 隐藏标题栏
    .hideToolBar(true) // 隐藏工具栏
  }
}