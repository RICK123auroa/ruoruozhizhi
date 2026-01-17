
import { BusinessError } from '@kit.BasicServicesKit';

@Entry
@Component
struct Index {
  private scroller:Scroller = new Scroller();
  private arr:number[]=[0,1,2,3,4,5,6,7,8,9];

  @State message1: string = 'Class One';
  @State message2: string = 'Class Two';
  @State message3: string = 'Class Three';
  @State message4: string = 'Class Four';
  @State message5: string = 'Class Five';


  build() {

    Column() {
      Text("OPEN HARMONY").id('TitleOfAll').fontSize(30).fontStyle(FontStyle.Normal)
      Blank()

      Row({ space: 20 }) {

        Blank()
        Scroll(this.scroller) {
          Column({ space: 20 }) {
            Text(this.message1)
              .id('HelloWorld')
              .fontSize($r('app.float.page_text_font_size'))
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.message1 = 'OPen Harmony';
              })
            Button('TaskOne', { type: ButtonType.Normal, stateEffect: true })
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
            Button('TaskTwo', { type: ButtonType.Normal, stateEffect: true })
              .fontSize(50)
              .onClick(() => {
                console.info(`Succeeded in clicking the 'Next' button.`)
                // 获取UIContext
                let uiContext: UIContext = this.getUIContext();
                let router = uiContext.getRouter();
                // 跳转到第三
                router.pushUrl({ url: 'pages/choujiang' }).then(() => {
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
            ForEach(this.arr, (item: number) => {
              Text(item.toString())
                .width('90%')
                .height(150)
                .backgroundColor(0xFFFFFF)
                .borderRadius(15)
                .fontSize(16)
                .textAlign(TextAlign.Center)
                .margin({ top: 10 })

            }, (item: number) => item.toString())
          }
          .alignItems(HorizontalAlign.Center)
          .backgroundColor('rgb(242,242,242)')
          .justifyContent(FlexAlign.SpaceEvenly)
          .backgroundColor(0xFFFFFF)
          .borderRadius(15)
          .padding({ left: 12 })
          .width('100%')


        }
        .backgroundColor(0xDCDCDC)
        .scrollable(ScrollDirection.Vertical) // 滚动方向为垂直方向
        .scrollBar(BarState.On) // 滚动条常驻显示
        .scrollBarColor(Color.Gray) // 滚动条颜色
        .scrollBarWidth(10) // 滚动条宽度
        .edgeEffect(EdgeEffect.Spring) // 滚动到边沿后回弹


        Blank()
      }.justifyContent(FlexAlign.SpaceEvenly).backgroundColor(0xEFEFEF).padding(20).width('100%')
    }

    .height('100%')
    .width('100%')
  }
}