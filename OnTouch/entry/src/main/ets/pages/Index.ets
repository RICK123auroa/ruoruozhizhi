@Entry
@Component
struct Index {
  @State message: string = 'Hello World';
  @State OnColumnNum: number = 1 ;
  @State OnRowNum: number = 1 ;
  //defaultnumbers
  @State TitleMessage: string = "这是一个跟随点击的小页面，用户可以触摸Grid网格布局上的组件来改变组件样式"
  build() {

  }
}