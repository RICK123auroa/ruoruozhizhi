
// 导入导航数据模型
import { NavigatorBean } from '../viewmodel/NavigatorBean';
// 导入公共常量定义
import { CommonConstant as Const } from '../common/Constant';
import { router } from '@kit.ArkUI';

// 定义按钮样式扩展装饰器
// @Extend装饰器用于扩展原生组件样式
// 该函数为Button组件添加统一的样式配置
@Extend(Button)
function fancy(top: string) {
  // 设置字体大小，使用常量定义
  .fontSize(Const.MAIN_CONSTANT_BUTTON_FONT_SIZE)
  // 设置字体颜色，从资源文件中获取
  .fontColor($r('app.color.start_window_background'))
  // 设置按钮宽度，使用常量定义
  .width(Const.MAIN_CONSTANT_BUTTON_WIDTH)
  // 设置按钮高度，使用常量定义
  .height(Const.MAIN_CONSTANT_BUTTON_HEIGHT)
  // 设置上边距，参数top由调用时传入
  .margin({ top: top })
  // 设置背景颜色，从资源文件中获取蓝色
  .backgroundColor($r('app.color.blue'))
  // 设置边框圆角半径，使用常量定义
  .borderRadius(Const.MAIN_CONSTANT_BUTTON_BORDER_RADIUS)
}

// 主页面入口组件
// @Entry装饰器表示此组件为页面入口
// @Component装饰器表示此结构体为自定义组件
@Entry
@Component
struct MainPage {
  // 导航路径栈实例，用于管理页面导航
  pathStack: NavPathStack = new NavPathStack();

  // build方法：定义组件的UI结构
  build() {
    // 导航容器：管理页面堆栈导航
    Navigation(this.pathStack) {
      // 背景图片
      Image($r("app.media.pagebackground"))
        // 设置宽度为全屏高度（可能是常量名有误，应为宽度）
        .width(Const.MAIN_CONSTANT_FULL_HEIGHT)
          // 设置图片高度，使用常量定义
        .height(Const.MAIN_CONSTANT_IMAGE_HEIGHT)

      // 按钮1：加载本地H5页面
      Button($r('app.string.loadLocalH5'))
        // 应用自定义fancy样式，传入上边距常量
        .fancy(Const.MAIN_CONSTANT_BUTTON_MARGIN_TOP)
          // 点击事件：导航到WebPage页面，传递本地路径参数
        .onClick(() => {

          // 将WebPage页面推入导航栈，传入导航参数
          this.pathStack.pushPathByName('WebPage',
            {
              path: Const.LOCAL_PATH,          // 本地路径常量
              tips: $r('app.string.local')     // 本地提示文本资源
            } as NavigatorBean);               // 类型断言为NavigatorBean
        })

      // 按钮2：加载云端H5页面
      Button($r('app.string.loadCloudH5'))
        // 应用自定义fancy样式，传入上边距常量（第二个按钮的间距）
        .fancy(Const.MAIN_CONSTANT_BUTTON_MARGIN_TOP_BUTTON)
          // 点击事件：导航到WebPage页面，传递云端路径参数
        .onClick(() => {
          this.pathStack.pushPathByName('WebPage',
            {
              path: Const.CLOUD_PATH,          // 云端路径常量
              tips: $r('app.string.online')    // 在线提示文本资源
            } as NavigatorBean);
        })

      // 按钮3：加载本地Vue页面
      Button($r('app.string.loadVue'))
        // 应用自定义fancy样式
        .fancy(Const.MAIN_CONSTANT_BUTTON_MARGIN_TOP_BUTTON)
          // 点击事件：导航到VuePage页面，传递本地Vue路径参数
        .onClick(() => {
          this.pathStack.pushPathByName('VuePage',
            {
              path: Const.VUE_PATH,            // Vue本地路径常量
              tips: $r('app.string.local')     // 本地提示文本资源
            } as NavigatorBean);
        })

      // 按钮4：加载云端Vue页面
      Button($r('app.string.loadCloudVue'))
        // 应用自定义fancy样式
        .fancy(Const.MAIN_CONSTANT_BUTTON_MARGIN_TOP_BUTTON)
          // 点击事件：导航到VuePage页面，传递云端Vue路径参数
        .onClick(() => {
          this.pathStack.pushPathByName('VuePage',
            {
              path: Const.VUE_CLOUD_PATH,      // Vue云端路径常量
              tips: $r('app.string.online')    // 在线提示文本资源
            } as NavigatorBean);
        })
    }
    // 隐藏导航标题栏（重复两次可能是编码错误，通常只需一次）
    .hideTitleBar(true)
    .hideTitleBar(true)  // 重复设置，可能为冗余代码
    // 设置导航容器高度为全屏高度
    .height(Const.MAIN_CONSTANT_FULL_HEIGHT)
    // 设置导航容器背景颜色为海军蓝，从资源文件获取
    .backgroundColor($r('app.color.navy_blue'))
  }
}