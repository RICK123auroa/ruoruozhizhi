if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
    // 导航路径栈实例，用于管理页面导航
    pathStack?: NavPathStack;
}
import type { NavigatorBean } from '../viewmodel/NavigatorBean';
import { CommonConstant as Const } from "@bundle:com.example.webcomponent/entry/ets/common/Constant";
// 定义按钮样式扩展装饰器
// @Extend装饰器用于扩展原生组件样式
// 该函数为Button组件添加统一的样式配置
function __Button__fancy(top: string): void {
    Button.fontSize(Const.MAIN_CONSTANT_BUTTON_FONT_SIZE);
    Button.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
    Button.width(Const.MAIN_CONSTANT_BUTTON_WIDTH);
    Button.height(Const.MAIN_CONSTANT_BUTTON_HEIGHT);
    Button.margin({ top: top });
    Button.backgroundColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
    Button.borderRadius(Const.MAIN_CONSTANT_BUTTON_BORDER_RADIUS);
}
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 导航路径栈实例，用于管理页面导航
    private pathStack: NavPathStack;
    // build方法：定义组件的UI结构
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 导航容器：管理页面堆栈导航
            Navigation.create(this.pathStack, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/MainPage", isUserCreateStack: true });
            // 导航容器：管理页面堆栈导航
            Navigation.hideTitleBar(true);
            // 导航容器：管理页面堆栈导航
            Navigation.hideTitleBar(true);
            // 导航容器：管理页面堆栈导航
            Navigation.height(Const.MAIN_CONSTANT_FULL_HEIGHT);
            // 导航容器：管理页面堆栈导航
            Navigation.backgroundColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 背景图片
            Image.create({ "id": 16777250, "type": 20000, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
            // 背景图片
            Image.width(Const.MAIN_CONSTANT_FULL_HEIGHT);
            // 背景图片
            Image.height(Const.MAIN_CONSTANT_IMAGE_HEIGHT);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 按钮1：加载本地H5页面
            Button.createWithLabel({ "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
            __Button__fancy(Const.MAIN_CONSTANT_BUTTON_MARGIN_TOP);
            // 按钮1：加载本地H5页面
            Button.onClick(() => {
                // 将WebPage页面推入导航栈，传入导航参数
                this.pathStack.pushPathByName('WebPage', {
                    path: Const.LOCAL_PATH,
                    tips: { "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" } // 本地提示文本资源
                } as NavigatorBean); // 类型断言为NavigatorBean
            });
        }, Button);
        // 按钮1：加载本地H5页面
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 按钮2：加载云端H5页面
            Button.createWithLabel({ "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
            __Button__fancy(Const.MAIN_CONSTANT_BUTTON_MARGIN_TOP_BUTTON);
            // 按钮2：加载云端H5页面
            Button.onClick(() => {
                this.pathStack.pushPathByName('WebPage', {
                    path: Const.CLOUD_PATH,
                    tips: { "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" } // 在线提示文本资源
                } as NavigatorBean);
            });
        }, Button);
        // 按钮2：加载云端H5页面
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 按钮3：加载本地Vue页面
            Button.createWithLabel({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
            __Button__fancy(Const.MAIN_CONSTANT_BUTTON_MARGIN_TOP_BUTTON);
            // 按钮3：加载本地Vue页面
            Button.onClick(() => {
                this.pathStack.pushPathByName('VuePage', {
                    path: Const.VUE_PATH,
                    tips: { "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" } // 本地提示文本资源
                } as NavigatorBean);
            });
        }, Button);
        // 按钮3：加载本地Vue页面
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 按钮4：加载云端Vue页面
            Button.createWithLabel({ "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" });
            __Button__fancy(Const.MAIN_CONSTANT_BUTTON_MARGIN_TOP_BUTTON);
            // 按钮4：加载云端Vue页面
            Button.onClick(() => {
                this.pathStack.pushPathByName('VuePage', {
                    path: Const.VUE_CLOUD_PATH,
                    tips: { "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.webcomponent", "moduleName": "entry" } // 在线提示文本资源
                } as NavigatorBean);
            });
        }, Button);
        // 按钮4：加载云端Vue页面
        Button.pop();
        // 导航容器：管理页面堆栈导航
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MainPage";
    }
}
registerNamedRoute(() => new MainPage(undefined, {}), "", { bundleName: "com.example.webcomponent", moduleName: "entry", pagePath: "pages/MainPage", pageFullPath: "entry/src/main/ets/pages/MainPage", integratedHsp: "false", moduleType: "followWithHap" });
