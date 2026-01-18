import { abilityAccessCtrl, bundleManager, common } from '@kit.AbilityKit';
import { Want } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

function GotoPage(PagePath:string):boolean{

  return false;
}

@Entry
@Component
struct Index {
  // 创建一个页面栈对象并传入Navigation
  pageStack: NavPathStack = new NavPathStack()


  // 打开系统浏览器
  async openInSystemBrowser(url: string) {
    try {
      let want: Want = {
        action: 'ohos.want.action.viewData',
        uri: url,
        type: 'text/html'
      };

      let context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
      await context.startAbility(want);

      console.info('打开浏览器成功');
    } catch (error) {
      console.error('打开浏览器失败:', JSON.stringify(error));
    }
  }
  @State message: string = 'Hello World';
  @State AgreeOnAgreement:boolean = false;
  @State isHoverOnForget:boolean = false;
  @State isHoverOnRegister:boolean=false;
  @State LoginPath:number = 1;
  @State Url:string = "https://www.bilibili.com/video/BV1J1421k7Le/?spm_id_from=333.337.search-card.all.click&vd_source=6458a0205f55b36762d5de3562224f11";
  build() {

    Column({ space: 20 }) {

      Image($r('app.media.Home')).width('30%')
      Text('智能家居').fontSize(25).fontColor(Color.Blue).width('90%').textAlign(TextAlign.Center)

      Row() {
        Text("用户名:").textAlign(TextAlign.Start).fontSize(20).fontColor(Color.Black)
        TextInput().type(InputType.Email).fontSize(20).fontColor(Color.Gray).width("80%").textOverflow(TextOverflow.MARQUEE)
      }.width('90%').height(50)
      Row() {
        Text("密码    :").textAlign(TextAlign.Start).fontSize(20).fontColor(Color.Black)
        TextInput().type(InputType.Password).fontSize(20).fontColor(Color.Gray).width("80%")
      }.width('90%').height(50)
      Button("登录")
        .width('30%')
        .onClick(()=>{
            this.pageStack.pushPath({name:"content"})
        })
      Row() {
        Text('忘记密码').textAlign(TextAlign.Start).fontSize(20).fontColor(Color.Blue)
          .decoration({
            type:this.isHoverOnForget?TextDecorationType.Underline:TextDecorationType.None,
            color:Color.Blue

          })
          .onHover((isOnHover:boolean)=>{
            this.isHoverOnForget=isOnHover;
          })
        Blank()
        Text('立即注册').textAlign(TextAlign.Start).fontSize(20).fontColor(Color.Blue)
          .onHover((isOnHover:boolean,event:HoverEvent) => {
            this.isHoverOnRegister=isOnHover;
          })
          .decoration({
            type:this.isHoverOnRegister?TextDecorationType.Underline:TextDecorationType.None,
            color:Color.Blue

          })

      }
      .width('90%').height(20)
      Row() {
        Toggle({type:ToggleType.Checkbox,isOn:false}).width(20).height(20)


        Row(){
          Text("我已知晓并同意").textAlign(TextAlign.Start).fontSize(10).fontColor(Color.Black)
          Text("《用户协议》").textAlign(TextAlign.Start).fontSize(10).fontColor(Color.Blue).decoration({type:TextDecorationType.Underline,color:Color.Blue})
            .onClick(()=>{
              this.Url = 'https://www.bilibili.com/video/BV1J1421k7Le/?spm_id_from=333.337.search-card.all.click&vd_source=6458a0205f55b36762d5de3562224f11';
              this.openInSystemBrowser(this.Url)
            })
          Text("与").textAlign(TextAlign.Start).fontSize(10).fontColor(Color.Black)
          Text("《家居协议》").textAlign(TextAlign.Start).fontSize(10).fontColor(Color.Blue).decoration({type:TextDecorationType.Underline,color:Color.Blue})
          .onClick(()=>{
            this.Url = 'https://www.bilibili.com/video/BV1J1421k7Le/?spm_id_from=333.337.search-card.all.click&vd_source=6458a0205f55b36762d5de3562224f11';
            this.openInSystemBrowser(this.Url)
          })

          }.padding(10)

          .width('100%')
          .height('80%')
      }.width('90%').height(50)
    }.width('100%').height("100%").backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.Center)
  }

}