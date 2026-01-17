import { colorSpaceManager } from '@kit.ArkGraphics2D';
import { BusinessError } from '@kit.BasicServicesKit';
@Entry
@Component
struct Index {
  @State message1: string = 'Class One';
  @State message2: string = 'Class Two';
  @State message3: string = 'Class Three';
  @State message4: string = 'Class Four';
  @State message5: string = 'Class Five';


  build() {
    RelativeContainer() {
      Column() {
        Text("OPEN HARMONY").id('TitleOfAll').fontSize(50).fontStyle(FontStyle.Normal)
        Blank()
        Row() {

          Blank()
          Column({ space: 20 }) {
            Text(this.message1)
              .id('HelloWorld')
              .fontSize($r('app.float.page_text_font_size'))
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.message1 = 'OPen Harmony';
              })
            Button('Task', { type: ButtonType.Normal, stateEffect: true })
              .fontSize(50)
              .onClick(() => {
              console.info(`Succeeded in clicking the 'Next' button.`)
              // 获取UIContext
              let uiContext: UIContext = this.getUIContext();
              let router = uiContext.getRouter();
              // 跳转到第二页
              router.pushUrl({ url: 'pages/ClassOneTask' }).then(() => {
                console.info('Succeeded in jumping to the second page.')

              }).catch((err: BusinessError) => {
                console.error(`Failed to jump to the second page. Code is ${err.code}, message is ${err.message}`)
              })
            })
            Text(this.message2)
              .id('HelloWorld')
              .fontSize($r('app.float.page_text_font_size'))
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.message2 = 'OPen Harmony';
              })
            Button('Task', { type: ButtonType.Normal, stateEffect: true })
              .fontSize(50)
            Text(this.message3)
              .id('HelloWorld')
              .fontSize($r('app.float.page_text_font_size'))
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.message3 = 'OPen Harmony';
              })
            Button('Task', { type: ButtonType.Normal, stateEffect: true })
              .fontSize(50)
            Text(this.message4)
              .id('HelloWorld')
              .fontSize($r('app.float.page_text_font_size'))
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.message4 = 'OPen Harmony';
              })
            Button('Task', { type: ButtonType.Normal, stateEffect: true })
              .fontSize(50)
          }
          .alignItems(HorizontalAlign.Center)
          .backgroundColor('rgb(242,242,242)')
          .justifyContent(FlexAlign.SpaceEvenly)
          .backgroundColor(0xFFFFFF)
          .borderRadius(15)
          .padding({ left: 12 })
          .width('100%')

          Blank()
        }.justifyContent(FlexAlign.SpaceEvenly).backgroundColor(0xEFEFEF).padding(20).width('100%')
      }
    }
    .height('100%')
    .width('100%')
  }
}