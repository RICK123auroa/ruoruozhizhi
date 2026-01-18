if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WebPage_Params {
    param?: NavigatorBean;
    progressVal?: number;
    isLoading?: boolean;
    intervalLoading?: number;
    linkObj?: LinkClass;
    webController?: webview.WebviewController;
    pathStack?: NavPathStack;
}
import webview from "@ohos:web.webview";
import type { BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
import { CommonConstant as Const } from "@bundle:com.example.webcomponent/entry/ets/common/Constant";
import { NavigatorBean } from "@bundle:com.example.webcomponent/entry/ets/viewmodel/NavigatorBean";
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
let context = uiContext!.getHostContext()!;
class LinkClass {
    messageFromHtml(value: string) {
        try {
            let res = context.resourceManager.getStringSync({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" }.id);
            uiContext!.showAlertDialog({
                message: res + value,
                confirm: {
                    value: { "id": 16777242, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" },
                    action: () => {
                    }
                },
                cancel: () => {
                }
            });
        }
        catch (error) {
            let err = error as BusinessError;
            hilog.error(0x0000, 'LinkClass', `getStringSync failed, error code=${err.code}, message=${err.message}`);
        }
    }
}
export function WebPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new WebPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WebPage.ets", line: 47, col: 3 });
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
    private __param: ObservedPropertyObjectPU<NavigatorBean>;
    get param() {
        return this.__param.get();
    }
    set param(newValue: NavigatorBean) {
        this.__param.set(newValue);
    }
    private __progressVal: ObservedPropertySimplePU<number>;
    get progressVal() {
        return this.__progressVal.get();
    }
    set progressVal(newValue: number) {
        this.__progressVal.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __intervalLoading: ObservedPropertySimplePU<number>;
    get intervalLoading() {
        return this.__intervalLoading.get();
    }
    set intervalLoading(newValue: number) {
        this.__intervalLoading.set(newValue);
    }
    private __linkObj: ObservedPropertyObjectPU<LinkClass>;
    get linkObj() {
        return this.__linkObj.get();
    }
    set linkObj(newValue: LinkClass) {
        this.__linkObj.set(newValue);
    }
    private webController: webview.WebviewController;
    private pathStack: NavPathStack;
    aboutToAppear() {
        this.intervalLoading = setInterval(() => {
            this.progressVal = this.progressVal >= Const.WEB_CONSTANT_PROGRESS_MAX ?
                Const.WEB_CONSTANT_PROGRESS_MIN : (this.progressVal + Const.WEB_CONSTANT_PROGRESS_STEP);
        }, Const.WEB_CONSTANT_MILLI_SECONDS);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.TopStart });
                    Stack.debugLine("entry/src/main/ets/pages/WebPage.ets(69:7)", "entry");
                    Stack.backgroundColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777251, "type": 20000, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Image.debugLine("entry/src/main/ets/pages/WebPage.ets(70:9)", "entry");
                    Image.width(Const.MAIN_CONSTANT_FULL_HEIGHT);
                    Image.height(Const.MAIN_CONSTANT_IMAGE_HEIGHT);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/WebPage.ets(73:9)", "entry");
                    Row.margin({ top: Const.WEB_CONSTANT_MARGIN_TOP });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/WebPage.ets(74:11)", "entry");
                    Column.width(Const.WEB_CONSTANT_FULL_WIDTH);
                    Column.height(Const.WEB_CONSTANT_FULL_HEIGHT);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/WebPage.ets(75:13)", "entry");
                    Row.height(Const.WEB_CONSTANT_TOP_ROW_HEIGHT);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 0, "type": 30000, params: ['local/img/ic_public_back.png'], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Image.debugLine("entry/src/main/ets/pages/WebPage.ets(76:15)", "entry");
                    Image.width(Const.WEB_CONSTANT_IMAGE_WIDTH);
                    Image.height(Const.WEB_CONSTANT_IMAGE_HEIGHT);
                    Image.margin({ left: Const.WEB_CONSTANT_IMAGE_MARGIN_LEFT });
                    Image.onClick(() => {
                        this.pathStack.pop();
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777234, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Text.debugLine("entry/src/main/ets/pages/WebPage.ets(83:15)", "entry");
                    Text.fontSize(Const.WEB_CONSTANT_TOP_TEXT_FONT_SIZE);
                    Text.width(Const.WEB_CONSTANT_TOP_TEXT_WIDTH);
                    Text.height(Const.WEB_CONSTANT_TOP_TEXT_HEIGHT);
                    Text.fontColor({ "id": 16777244, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Text.margin({ left: Const.WEB_CONSTANT_TOP_TEXT_MARGIN_LEFT });
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // Web component loading H5.
                    Web.create({ src: this.param.path, controller: this.webController });
                    Web.debugLine("entry/src/main/ets/pages/WebPage.ets(93:13)", "entry");
                    // Web component loading H5.
                    Web.zoomAccess(false);
                    // Web component loading H5.
                    Web.width(Const.WEB_CONSTANT_WIDTH);
                    // Web component loading H5.
                    Web.aspectRatio(1);
                    // Web component loading H5.
                    Web.margin({
                        left: Const.WEB_CONSTANT_MARGIN_LEFT, right: Const.WEB_CONSTANT_MARGIN_RIGHT,
                        top: Const.WEB_CONSTANT_MARGIN_TOP
                    });
                    // Web component loading H5.
                    Web.onErrorReceive((event) => {
                        if (event?.error.getErrorInfo() === 'ERR_INTERNET_DISCONNECTED') {
                            this.getUIContext().getPromptAction().showToast({
                                message: { "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" },
                                duration: Const.WEB_CONSTANT_DURATION
                            });
                        }
                        if (event?.error.getErrorInfo() === 'ERR_CONNECTION_TIMED_OUT') {
                            this.getUIContext().getPromptAction().showToast({
                                message: { "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" },
                                duration: Const.WEB_CONSTANT_DURATION
                            });
                        }
                    });
                    // Web component loading H5.
                    Web.onProgressChange((event) => {
                        if (event?.newProgress === Const.WEB_CONSTANT_PROGRESS_MAX) {
                            this.isLoading = false;
                            clearInterval(this.intervalLoading);
                            this.intervalLoading = -1;
                        }
                    });
                    // Web component loading H5.
                    Web.javaScriptProxy({
                        object: this.linkObj,
                        name: 'linkObj',
                        methodList: ['messageFromHtml'],
                        controller: this.webController
                    });
                }, Web);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/WebPage.ets(129:13)", "entry");
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777240, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Text.debugLine("entry/src/main/ets/pages/WebPage.ets(130:15)", "entry");
                    Text.fontSize(Const.WEB_CONSTANT_TEXT_VALUE_FONT_SIZE);
                    Text.textAlign(TextAlign.Center);
                    Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Text.height(Const.WEB_CONSTANT_TEXT_VALUE_HEIGHT);
                    Text.fontWeight(Const.WEB_CONSTANT_TEXT_VALUE_FONT_WEIGHT);
                    Text.margin({ top: Const.WEB_CONSTANT_TEXT_VALUE_MARGIN_TOP });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.param.tips);
                    Text.debugLine("entry/src/main/ets/pages/WebPage.ets(137:15)", "entry");
                    Text.fontSize(Const.WEB_CONSTANT_TIP_TEXT_VALUE_FONT_SIZE);
                    Text.textAlign(TextAlign.Center);
                    Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Text.width(Const.WEB_CONSTANT_TIP_TEXT_VALUE_WIDTH);
                    Text.height(Const.WEB_CONSTANT_TIP_TEXT_VALUE_HEIGHT);
                    Text.opacity(Const.WEB_CONSTANT_TIP_TEXT_VALUE_OPACITY);
                    Text.margin({ top: Const.WEB_CONSTANT_TIP_TEXT_VALUE_MARGIN_TOP });
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Button.debugLine("entry/src/main/ets/pages/WebPage.ets(147:13)", "entry");
                    Button.fontSize(Const.WEB_CONSTANT_BUTTON_FONT_SIZE);
                    Button.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Button.margin({ top: Const.WEB_CONSTANT_BUTTON_MARGIN_TOP });
                    Button.width(Const.WEB_CONSTANT_BUTTON_WIDTH);
                    Button.height(Const.WEB_CONSTANT_BUTTON_HEIGHT);
                    Button.backgroundColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Button.borderRadius(Const.WEB_CONSTANT_BUTTON_BORDER_RADIUS);
                    Button.onClick(() => {
                        this.webController.runJavaScript('startDraw()');
                    });
                }, Button);
                Button.pop();
                Column.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.isLoading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Progress.create({
                                    value: Const.WEB_CONSTANT_PROGRESS_MIN,
                                    total: Const.WEB_CONSTANT_PROGRESS_MAX,
                                    type: ProgressType.ScaleRing
                                });
                                Progress.debugLine("entry/src/main/ets/pages/WebPage.ets(165:11)", "entry");
                                Progress.color(Color.Grey);
                                Progress.value(this.progressVal);
                                Progress.width(Const.WEB_CONSTANT_PROGRESS_WIDTH);
                                Progress.style({
                                    strokeWidth: Const.WEB_CONSTANT_PROGRESS_STROKE_WIDTH,
                                    scaleCount: Const.WEB_CONSTANT_PROGRESS_SCALE_COUNT,
                                    scaleWidth: Const.WEB_CONSTANT_PROGRESS_SCALE_WIDTH
                                });
                                Progress.zIndex(1);
                                Progress.position({
                                    x: Const.WEB_CONSTANT_PROGRESS_POSITION_X,
                                    y: Const.WEB_CONSTANT_PROGRESS_POSITION_Y
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
                Stack.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/WebPage" });
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pathStack = context.pathStack;
                this.param = context.pathInfo.param as NavigatorBean;
            });
            NavDestination.width(Const.WEB_CONSTANT_FULL_WIDTH);
            NavDestination.height(Const.WEB_CONSTANT_FULL_HEIGHT);
            NavDestination.hideTitleBar(true);
            NavDestination.hideToolBar(true);
            NavDestination.debugLine("entry/src/main/ets/pages/WebPage.ets(68:5)", "entry");
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
