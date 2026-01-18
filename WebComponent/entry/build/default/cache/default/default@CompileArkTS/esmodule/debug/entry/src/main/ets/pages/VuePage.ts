if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VuePage_Params {
    param?: NavigatorBean;
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
            let res = context.resourceManager.getStringSync({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" }.id);
            // 显示弹窗对话框，包含HTML传递的消息
            uiContext!.showAlertDialog!({
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
// 构建器函数，用于创建VuePage组件
export function VuePageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new VuePage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/VuePage.ets", line: 48, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "VuePage" });
    }
}
export class VuePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__param = new ObservedPropertyObjectPU(new NavigatorBean(), this, "param");
        this.__linkObj = new ObservedPropertyObjectPU(new LinkClass(), this, "linkObj");
        this.webController = new webview.WebviewController();
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VuePage_Params) {
        if (params.param !== undefined) {
            this.param = params.param;
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
    updateStateVars(params: VuePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__param.purgeDependencyOnElmtId(rmElmtId);
        this.__linkObj.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__param.aboutToBeDeleted();
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
                    // 返回首页文本
                    Text.create({ "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    // 返回首页文本
                    Text.fontSize(Const.WEB_CONSTANT_TOP_TEXT_FONT_SIZE);
                    // 返回首页文本
                    Text.width(Const.WEB_CONSTANT_TOP_TEXT_WIDTH);
                    // 返回首页文本
                    Text.height(Const.WEB_CONSTANT_TOP_TEXT_HEIGHT);
                    // 返回首页文本
                    Text.fontColor({ "id": 16777244, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    // 返回首页文本
                    Text.margin({ left: Const.WEB_CONSTANT_TOP_TEXT_MARGIN_LEFT });
                }, Text);
                // 返回首页文本
                Text.pop();
                // 顶部导航行
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // Web组件：加载Vue页面
                    Web.create({ src: this.param.path, controller: this.webController });
                    // Web组件：加载Vue页面
                    Web.zoomAccess(false);
                    // Web组件：加载Vue页面
                    Web.width(Const.WEB_CONSTANT_WIDTH);
                    // Web组件：加载Vue页面
                    Web.aspectRatio(1);
                    // Web组件：加载Vue页面
                    Web.margin({
                        left: 0,
                        right: Const.WEB_CONSTANT_MARGIN_RIGHT,
                        top: Const.WEB_CONSTANT_MARGIN_TOP // 上边距
                    });
                    // Web组件：加载Vue页面
                    Web.backgroundColor(Color.Transparent);
                    // Web组件：加载Vue页面
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
                    Text.create({ "id": 16777241, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
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
                        // 点击按钮时，执行Vue页面中的JavaScript函数
                        this.webController.runJavaScript('outWeb()');
                    });
                }, Button);
                // 操作按钮
                Button.pop();
                // 列布局，包含所有内容元素
                Column.pop();
                // 行布局，包含主要内容
                Row.pop();
                // 堆叠布局容器，内容从顶部开始对齐
                Stack.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/VuePage" });
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
        NavigationBuilderRegister("VuePage", wrapBuilder(VuePageBuilder));
    }
})();
