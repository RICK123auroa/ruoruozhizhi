import { router } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';

@Entry
@Component
struct Index {
  @State message: string = 'Hello Harmony';

  build() {
    RelativeContainer() {
      Column(){
        Text(this.message)
          .id('HelloWorld')
          .fontSize($r('app.float.page_text_font_size'))
          .fontWeight(FontWeight.Bold)
          .alignRules({
            center: { anchor: '__container__', align: VerticalAlign.Center },
            middle: { anchor: '__container__', align: HorizontalAlign.Center }
          })
          .onClick(() => {
            this.message = 'Welcome';
          })
        Button(){
          Text('Next').fontSize(30).fontWeight(FontWeight.Bold)
        }
        .type(ButtonType.Capsule)
        .margin({top:20})
        .backgroundColor('#0D9FFB')
        .width('40#')
        .height('5%')
        .alignRules({
          center: { anchor: '__container__', align: VerticalAlign.Center },
          middle: { anchor: '__container__', align: HorizontalAlign.Center }
        })
        .onClick(()=>{
          console.info("Succeeded in clicking the Next Button")
          //跳转
          router.pushUrl({url:'pages/Page'}).then(()=>{
            console.info('成功跳转：页面2')
          }).catch((err: BusinessError) => {
            console.error(`Failed to jump to the second page. Code is ${err.code}, message is ${err.message}`)
          })
      }
      )
    }
    .height('100%')
    .width('100%')
  }
}}