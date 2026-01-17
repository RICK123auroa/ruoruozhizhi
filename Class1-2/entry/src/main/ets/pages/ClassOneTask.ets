@Entry
@Component
struct ClassOneTask {
  @State count: number = 0;
  @State fontSize: number = 24;
  @State offsetValue: number = 10;
  @State myText: string = "hello";
  @State imagePath: string = 'home.jpg';
  @State imageUrl: string = 'www.baidu.com/img/flexible/logo/pc/result.png';

  myClickHandler(): void {
    this.count += 2;
  }

  fn = () => {
    console.info(`counter: ${this.count}`)
    this.count++
  }

  build() {
    Row() {
      Column() {
        // string类型的参数
        Text('test')
          .fontSize(24)
        // $r形式引入应用资源，可应用于多语言场景
        Text($r('app.string.title_key'))
          .fontSize(this.fontSize)
        // 无参数形式
        Text()
        Text('hello')
          .fontSize(20)
          .fontColor(Color.Red)
          .fontWeight(FontWeight.Bold)
          .onClick(()=>{
            let fontNums = this.fontSize * 5
            //this.fontSize(fontNums)
          })

        Image(this.imagePath)
          .width(this.count % 2 === 0 ? 100 : 200)
          .height(this.offsetValue + 100)
          .backgroundColor(0xFFF09F)

        Image('https://' + this.imageUrl)
          .alt('common/play.jpg')
          .width(100)
          .height(100)
        Text(`count: ${this.count}`)

        Button(this.myText)
          .margin(10)
          .onClick(() => {
            this.myText = 'ArkUI';

          });
        Button('add counter')
          .margin(10)
          .onClick(this.fn)

        Button('add counter')
          .margin(10)
          .onClick(this.myClickHandler.bind(this))

        Button('add counter')
          .margin(10)
          .onClick(this.fn)
      }
      .width('100%')
    }
    .height('100%')
  }
}
