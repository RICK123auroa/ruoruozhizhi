if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WebPage_Params {
    param?: NavigatorBean;
    progressVal?: number;
    isLoading?: boolean;
    intervalLoading?: number;
    linkObj?: LinkClass;
    // WebView控制器，用于控制Web组件
    webController?: webview.WebviewController;
    pathStack?: NavPathStack;
}
import webview from "@ohos:web.webview";
import type { BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
import { CommonConstant as Const } from "@bundle:com.example.webcomponent/entry/ets/common/Constant";
import { NavigatorBean } from "@bundle:com.example.webcomponent/entry/ets/viewmodel/NavigatorBean";
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
            let res = context.resourceManager.getStringSync({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" }.id);
            // 显示弹窗对话框，包含HTML传递的消息
            uiContext!.showAlertDialog({
                message: res + value,
                confirm: {
                    value: { "id": 16777242, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" },
                    action: () => {
                        // 确认按钮点击后的操作（此处为空）
                    }
                },
                cancel: () => {
                    // 取消按钮点击后的操作（此处为空）
                }
            });
        }
        catch (error) {
            // 捕获并处理资源获取失败的错误
            let err = error as BusinessError;
            hilog.error(0x0000, 'LinkClass', `getStringSync failed, error code=${err.code}, message=${err.message}`);
        }
    }
}
// 构建器函数，用于创建WebPage组件
export function WebPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new WebPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WebPage.ets", line: 48, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "WebPage" });
    }
}
export class WebPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__param = new ObservedPropertyObjectPU(new NavigatorBean(), this, "param");
        this.__progressVal = new ObservedPropertySimplePU(0, this, "progressVal");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.__intervalLoading = new ObservedPropertySimplePU(-1, this, "intervalLoading");
        this.__linkObj = new ObservedPropertyObjectPU(new LinkClass(), this, "linkObj");
        this.webController = new webview.WebviewController();
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WebPage_Params) {
        if (params.param !== undefined) {
            this.param = params.param;
        }
        if (params.progressVal !== undefined) {
            this.progressVal = params.progressVal;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.intervalLoading !== undefined) {
            this.intervalLoading = params.intervalLoading;
        }
        if (params.linkObj !== undefined) {
            this.linkObj = params.linkObj;
        }
        if (params.webController !== undefined) {
            this.webController = params.webController;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: WebPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__param.purgeDependencyOnElmtId(rmElmtId);
        this.__progressVal.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__intervalLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__linkObj.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__param.aboutToBeDeleted();
        this.__progressVal.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__intervalLoading.aboutToBeDeleted();
        this.__linkObj.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 状态变量：导航参数，包含路径和提示信息
    private __param: ObservedPropertyObjectPU<NavigatorBean>;
    get param() {
        return this.__param.get();
    }
    set param(newValue: NavigatorBean) {
        this.__param.set(newValue);
    }
    // 状态变量：进度条当前值
    private __progressVal: ObservedPropertySimplePU<number>;
    get progressVal() {
        return this.__progressVal.get();
    }
    set progressVal(newValue: number) {
        this.__progressVal.set(newValue);
    }
    // 状态变量：是否正在加载
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    // 状态变量：加载定时器ID
    private __intervalLoading: ObservedPropertySimplePU<number>;
    get intervalLoading() {
        return this.__intervalLoading.get();
    }
    set intervalLoading(newValue: number) {
        this.__intervalLoading.set(newValue);
    }
    // 状态变量：Web交互对象实例
    private __linkObj: ObservedPropertyObjectPU<LinkClass>;
    get linkObj() {
        return this.__linkObj.get();
    }
    set linkObj(newValue: LinkClass) {
        this.__linkObj.set(newValue);
    }
    // WebView控制器，用于控制Web组件
    private webController: webview.WebviewController;
    // 导航路径栈实例，用于页面导航
    private pathStack: NavPathStack;
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 堆叠布局容器，内容从顶部开始对齐
                    Stack.create({ alignContent: Alignment.TopStart });
                    // 堆叠布局容器，内容从顶部开始对齐
                    Stack.backgroundColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 背景图片
                    Image.create({ "id": 16777250, "type": 20000, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    // 背景图片
                    Image.width(Const.MAIN_CONSTANT_FULL_HEIGHT);
                    // 背景图片
                    Image.height(Const.MAIN_CONSTANT_IMAGE_HEIGHT);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 行布局，包含主要内容
                    Row.create();
                    // 行布局，包含主要内容
                    Row.margin({ top: Const.WEB_CONSTANT_MARGIN_TOP });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 列布局，包含所有内容元素
                    Column.create();
                    // 列布局，包含所有内容元素
                    Column.width(Const.WEB_CONSTANT_FULL_WIDTH);
                    // 列布局，包含所有内容元素
                    Column.height(Const.WEB_CONSTANT_FULL_HEIGHT);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 顶部导航行
                    Row.create();
                    // 顶部导航行
                    Row.height(Const.WEB_CONSTANT_TOP_ROW_HEIGHT);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 返回按钮图标
                    Image.create({ "id": 0, "type": 30000, params: ['local/img/ic_public_back.png'], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    // 返回按钮图标
                    Image.width(Const.WEB_CONSTANT_IMAGE_WIDTH);
                    // 返回按钮图标
                    Image.height(Const.WEB_CONSTANT_IMAGE_HEIGHT);
                    // 返回按钮图标
                    Image.margin({ left: Const.WEB_CONSTANT_IMAGE_MARGIN_LEFT });
                    // 返回按钮图标
                    Image.onClick(() => {
                        // 点击返回按钮时，弹出当前页面
                        this.pathStack.pop();
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 提示文本
                    Text.create({ "id": 16777234, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    // 提示文本
                    Text.fontSize(Const.WEB_CONSTANT_TOP_TEXT_FONT_SIZE);
                    // 提示文本
                    Text.width(Const.WEB_CONSTANT_TOP_TEXT_WIDTH);
                    // 提示文本
                    Text.height(Const.WEB_CONSTANT_TOP_TEXT_HEIGHT);
                    // 提示文本
                    Text.fontColor({ "id": 16777244, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    // 提示文本
                    Text.margin({ left: Const.WEB_CONSTANT_TOP_TEXT_MARGIN_LEFT });
                }, Text);
                // 提示文本
                Text.pop();
                // 顶部导航行
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // Web组件：加载H5页面
                    Web.create({ src: this.param.path, controller: this.webController });
                    // Web组件：加载H5页面
                    Web.zoomAccess(false);
                    // Web组件：加载H5页面
                    Web.width(Const.WEB_CONSTANT_WIDTH);
                    // Web组件：加载H5页面
                    Web.aspectRatio(1);
                    // Web组件：加载H5页面
                    Web.margin({
                        left: Const.WEB_CONSTANT_MARGIN_LEFT,
                        right: Const.WEB_CONSTANT_MARGIN_RIGHT,
                        top: Const.WEB_CONSTANT_MARGIN_TOP
                    });
                    // Web组件：加载H5页面
                    Web.onErrorReceive((event) => {
                        // 网络断开错误处理
                        if (event?.error.getErrorInfo() === 'ERR_INTERNET_DISCONNECTED') {
                            this.getUIContext().getPromptAction().showToast({
                                message: { "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" },
                                duration: Const.WEB_CONSTANT_DURATION
                            });
                        }
                        // 连接超时错误处理
                        if (event?.error.getErrorInfo() === 'ERR_CONNECTION_TIMED_OUT') {
                            this.getUIContext().getPromptAction().showToast({
                                message: { "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" },
                                duration: Const.WEB_CONSTANT_DURATION
                            });
                        }
                    });
                    // Web组件：加载H5页面
                    Web.onProgressChange((event) => {
                        // 当进度达到100%时，停止加载
                        if (event?.newProgress === Const.WEB_CONSTANT_PROGRESS_MAX) {
                            this.isLoading = false;
                            clearInterval(this.intervalLoading);
                            this.intervalLoading = -1;
                        }
                    });
                    // Web组件：加载H5页面
                    Web.javaScriptProxy({
                        object: this.linkObj,
                        name: 'linkObj',
                        methodList: ['messageFromHtml'],
                        controller: this.webController // 控制器
                    });
                }, Web);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 提示信息列
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 提示标题
                    Text.create({ "id": 16777240, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    // 提示标题
                    Text.fontSize(Const.WEB_CONSTANT_TEXT_VALUE_FONT_SIZE);
                    // 提示标题
                    Text.textAlign(TextAlign.Center);
                    // 提示标题
                    Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    // 提示标题
                    Text.height(Const.WEB_CONSTANT_TEXT_VALUE_HEIGHT);
                    // 提示标题
                    Text.fontWeight(Const.WEB_CONSTANT_TEXT_VALUE_FONT_WEIGHT);
                    // 提示标题
                    Text.margin({ top: Const.WEB_CONSTANT_TEXT_VALUE_MARGIN_TOP });
                }, Text);
                // 提示标题
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 路径提示文本
                    Text.create(this.param.tips);
                    // 路径提示文本
                    Text.fontSize(Const.WEB_CONSTANT_TIP_TEXT_VALUE_FONT_SIZE);
                    // 路径提示文本
                    Text.textAlign(TextAlign.Center);
                    // 路径提示文本
                    Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    // 路径提示文本
                    Text.width(Const.WEB_CONSTANT_TIP_TEXT_VALUE_WIDTH);
                    // 路径提示文本
                    Text.height(Const.WEB_CONSTANT_TIP_TEXT_VALUE_HEIGHT);
                    // 路径提示文本
                    Text.opacity(Const.WEB_CONSTANT_TIP_TEXT_VALUE_OPACITY);
                    // 路径提示文本
                    Text.margin({ top: Const.WEB_CONSTANT_TIP_TEXT_VALUE_MARGIN_TOP });
                }, Text);
                // 路径提示文本
                Text.pop();
                // 提示信息列
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 操作按钮
                    Button.createWithLabel({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    // 操作按钮
                    Button.fontSize(Const.WEB_CONSTANT_BUTTON_FONT_SIZE);
                    // 操作按钮
                    Button.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    // 操作按钮
                    Button.margin({ top: Const.WEB_CONSTANT_BUTTON_MARGIN_TOP });
                    // 操作按钮
                    Button.width(Const.WEB_CONSTANT_BUTTON_WIDTH);
                    // 操作按钮
                    Button.height(Const.WEB_CONSTANT_BUTTON_HEIGHT);
                    // 操作按钮
                    Button.backgroundColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    // 操作按钮
                    Button.borderRadius(Const.WEB_CONSTANT_BUTTON_BORDER_RADIUS);
                    // 操作按钮
                    Button.onClick(() => {
                        // 点击按钮时，执行Web页面中的JavaScript函数
                        this.webController.runJavaScript('startDraw()');
                    });
                }, Button);
                // 操作按钮
                Button.pop();
                // 列布局，包含所有内容元素
                Column.pop();
                // 行布局，包含主要内容
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 条件渲染：如果正在加载，显示进度条
                    if (this.isLoading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Progress.create({
                                    value: Const.WEB_CONSTANT_PROGRESS_MIN,
                                    total: Const.WEB_CONSTANT_PROGRESS_MAX,
                                    type: ProgressType.ScaleRing // 刻度环形进度条
                                });
                                Progress.color(Color.Grey);
                                Progress.value(this.progressVal);
                                Progress.width(Const.WEB_CONSTANT_PROGRESS_WIDTH);
                                Progress.style({
                                    strokeWidth: Const.WEB_CONSTANT_PROGRESS_STROKE_WIDTH,
                                    scaleCount: Const.WEB_CONSTANT_PROGRESS_SCALE_COUNT,
                                    scaleWidth: Const.WEB_CONSTANT_PROGRESS_SCALE_WIDTH // 刻度宽度
                                });
                                Progress.zIndex(1);
                                Progress.position({
                                    x: Const.WEB_CONSTANT_PROGRESS_POSITION_X,
                                    y: Const.WEB_CONSTANT_PROGRESS_POSITION_Y // Y轴位置
                                });
                            }, Progress);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                // 堆叠布局容器，内容从顶部开始对齐
                Stack.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/WebPage" });
            NavDestination.onReady((context: NavDestinationContext) => {
                // 获取路径栈
                this.pathStack = context.pathStack;
                // 获取传递的参数
                this.param = context.pathInfo.param as NavigatorBean;
            });
            NavDestination.width(Const.WEB_CONSTANT_FULL_WIDTH);
            NavDestination.height(Const.WEB_CONSTANT_FULL_HEIGHT);
            NavDestination.hideTitleBar(true);
            NavDestination.hideToolBar(true);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("WebPage", wrapBuilder(WebPageBuilder));
    }
})();
