if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VuePage_Params {
    param?: NavigatorBean;
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
            uiContext!.showAlertDialog!({
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
    private __param: ObservedPropertyObjectPU<NavigatorBean>;
    get param() {
        return this.__param.get();
    }
    set param(newValue: NavigatorBean) {
        this.__param.set(newValue);
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.TopStart });
                    Stack.debugLine("entry/src/main/ets/pages/VuePage.ets(60:7)", "entry");
                    Stack.backgroundColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777251, "type": 20000, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Image.debugLine("entry/src/main/ets/pages/VuePage.ets(61:9)", "entry");
                    Image.width(Const.MAIN_CONSTANT_FULL_HEIGHT);
                    Image.height(Const.MAIN_CONSTANT_IMAGE_HEIGHT);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/VuePage.ets(64:9)", "entry");
                    Row.margin({ top: Const.WEB_CONSTANT_MARGIN_TOP });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/VuePage.ets(65:11)", "entry");
                    Column.width(Const.WEB_CONSTANT_FULL_WIDTH);
                    Column.height(Const.WEB_CONSTANT_FULL_HEIGHT);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/VuePage.ets(66:13)", "entry");
                    Row.height(Const.WEB_CONSTANT_TOP_ROW_HEIGHT);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 0, "type": 30000, params: ['local/img/ic_public_back.png'], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Image.debugLine("entry/src/main/ets/pages/VuePage.ets(67:15)", "entry");
                    Image.width(Const.WEB_CONSTANT_IMAGE_WIDTH);
                    Image.height(Const.WEB_CONSTANT_IMAGE_HEIGHT);
                    Image.margin({ left: Const.WEB_CONSTANT_IMAGE_MARGIN_LEFT });
                    Image.onClick(() => {
                        this.pathStack.pop();
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Text.debugLine("entry/src/main/ets/pages/VuePage.ets(74:15)", "entry");
                    Text.fontSize(Const.WEB_CONSTANT_TOP_TEXT_FONT_SIZE);
                    Text.width(Const.WEB_CONSTANT_TOP_TEXT_WIDTH);
                    Text.height(Const.WEB_CONSTANT_TOP_TEXT_HEIGHT);
                    Text.fontColor({ "id": 16777244, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Text.margin({ left: Const.WEB_CONSTANT_TOP_TEXT_MARGIN_LEFT });
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Web.create({ src: this.param.path, controller: this.webController });
                    Web.debugLine("entry/src/main/ets/pages/VuePage.ets(83:13)", "entry");
                    Web.zoomAccess(false);
                    Web.width(Const.WEB_CONSTANT_WIDTH);
                    Web.aspectRatio(1);
                    Web.margin({
                        left: 0, right: Const.WEB_CONSTANT_MARGIN_RIGHT,
                        top: Const.WEB_CONSTANT_MARGIN_TOP
                    });
                    Web.backgroundColor(Color.Transparent);
                    Web.javaScriptProxy({
                        object: this.linkObj,
                        name: 'linkObj',
                        methodList: ['messageFromHtml'],
                        controller: this.webController
                    });
                }, Web);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/VuePage.ets(98:13)", "entry");
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777241, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Text.debugLine("entry/src/main/ets/pages/VuePage.ets(99:15)", "entry");
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
                    Text.debugLine("entry/src/main/ets/pages/VuePage.ets(106:15)", "entry");
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
                    Button.debugLine("entry/src/main/ets/pages/VuePage.ets(116:13)", "entry");
                    Button.fontSize(Const.WEB_CONSTANT_BUTTON_FONT_SIZE);
                    Button.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Button.margin({ top: Const.WEB_CONSTANT_BUTTON_MARGIN_TOP });
                    Button.width(Const.WEB_CONSTANT_BUTTON_WIDTH);
                    Button.height(Const.WEB_CONSTANT_BUTTON_HEIGHT);
                    Button.backgroundColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
                    Button.borderRadius(Const.WEB_CONSTANT_BUTTON_BORDER_RADIUS);
                    Button.onClick(() => {
                        this.webController.runJavaScript('outWeb()');
                    });
                }, Button);
                Button.pop();
                Column.pop();
                Row.pop();
                Stack.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/VuePage" });
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pathStack = context.pathStack;
                this.param = context.pathInfo.param as NavigatorBean;
            });
            NavDestination.width(Const.WEB_CONSTANT_FULL_WIDTH);
            NavDestination.height(Const.WEB_CONSTANT_FULL_HEIGHT);
            NavDestination.hideTitleBar(true);
            NavDestination.hideToolBar(true);
            NavDestination.debugLine("entry/src/main/ets/pages/VuePage.ets(59:5)", "entry");
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
