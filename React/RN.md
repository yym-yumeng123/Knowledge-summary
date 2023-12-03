# React Native Android 组件 和 API 简介

> 最近在学习 Reactnative 开发, 记录一下开发中常用的 组件 和 API, 以及一些常用的 第三方库, 简单记录一下

```js
adb devices // 查看设备
```

### 目录

- `__tests__` 单元测试文件夹
- `android` 原生 Android 工程文件夹
- `ios` 原生 ios 工程文件夹
- `node_modules` 依赖的第三方库
- `index.js` App 入口文件
- `app.js` 入口文件显示的内容

### 调试

- `yarn android 启动项目`
- 输入 d 打开 development menu => Debug, 可以开启远端调试

### Flex 布局

1. `flexDirection` 属性: 布局中子组件的排列方向 => flex-direction
2. `flexWrap` 属性: 控制是否换行 => flex-wrap
3. `justifyContent` 属性: 组组件横向排列的位置 => justify-content
4. `alignSelf` 属性: 组件在容器内部的排列情况 => align-self
5. `flex` 属性: 子控件占父组件空间的比例

```js
// 在 rn 中写 css
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

export default styles;
```

---

### RN 组件详解

> React Native 无法使用传统的 HTML 元素标签, 只能使用 React 提供的基础组件来开发页面

**基础组件**

1. `Text:` 显示文本内容的组件, 支持文本和样式的嵌套以及触摸事件处理

```js
<Text style={styles.baseText} onPress={onPress} selectable>
```

2. `TextInput:` 输入框组件, 支持自动拼写修复, 自动大小写切换, 展位默认字符以及多种键盘设置

```html
<TextInput onChangeText={(text) => onChangeText(text)} value={value} autoCorrect
{...restProps} />
```

3. `Image:` 图片展示组件, 支持多种类型图片的展示, 包括网络图片, 静态资源, 本地图片等

```html
<Image style={styles.tinyLogo} source={{ uri:
"https://reactnative.dev/img/tiny_logo.png", }} width={150} height={150}
blurRadius={1} />
```

4. `ActivityIndicator:` 加载指示器组件(loading)

```js
<ActivityIndicator animating={animating} />
```

5. `Switch:` 状态切换组件(开关)

```js
<Switch
  trackColor={{ false: "#767577", true: "#81b0ff" }}
  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
  onValueChange={toggleSwitch}
  value={isEnabled}
/>
```

**容器组件**

1. `View:` 容器组件, 支持 Flexbox 布局, 样式, 触摸事件和处理一些无障碍功能, 可以放到其它容器组件, 也可以包含任意多个子组件

```js
<View style={styles.centeredView}>
  <View style={styles.modalView}>
    <Text style={styles.modalText}>Hello World!</Text>
  </View>
</View>
```

2. `ScrollView:` 一个通用的滚动容器组件, 支持垂直和水平两个方向上的滚动, 必须有一个确定的高度才能正常工作

3. `Touchable[Opacity | Highlight | WithoutFeedback | NativeFeedback]:` 透明触摸/高亮触摸/无反馈/水波纹

```js
<TouchableOpacity onPress={press}>
  <Text style={{ color: "red" }}>跳转到下一页面</Text>
</TouchableOpacity>
```

**列表组件**

1. `VirtualizedList: `列表组件: [文档地址](https://reactnative.cn/docs/virtualizedlist)

   - 一般来说: 除非特殊的性能要求, 不建议直接使用, 因为 VirtualizedList 是一个抽象组件, 实际开发中, 使用 FlatList 和 SectionList 组件即可满足开发需求, 它们基于 VirtualizedList 组件扩展的

2. `FlatList: `适用于加载长列表数据, 高性能的简单列表数据

```html
<FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id}
// key // 分割线 => borderBottom 或者 ItemSeparatorComponent //
下拉刷新/上拉加载更多 refreshing // 是否处于正在刷新的状态 onRefresh //
开始刷新事件, 发起接口请求 onEndReached // 上拉加载更多
onEndReachedThreshold={0} // 当距离内容最底部还有多远时触发onEndReached回调,
此参数是一个比值而非像素单位。比如，0.5
表示距离内容最底部的距离为当前列表可见长度的一半时触发 />
```

3. `SectionList:` 高性能分组列表组件, 不同于 FlatList, SectionList 主要用于开发列表分组, 吸顶悬浮等功能

```js
const DATA = [
  {title: '', data: []}
]
<SectionList
  sections={DATA}
  keyExtractor={(item, index) => item + index}
  renderItem={({ item }) => <Item title={item} />} // 渲染每一个列表视图
  renderSectionHeader={({ section: { title } }) => ( // 渲染每一个 section中的每一个列表项视图
    <Text style={styles.header}>{title}</Text>
  )}
/>
```

**平台组件**

> 适用于 Android 和 Ios 自己平台的组件, 查看文档

---

### RN API

> 组件是构成页面视图的基本元素, API 就是构成功能模块的基本元素

**基础 API**

1. `AppRegistry`: AppRegistry 是所有 React Native 应用的 JS 入口。应用的根组件应当通过 AppRegistry.registerComponent 方法注册自己

```js
AppRegistry.registerComponent(appName, () => App);
```

2. `AppState: `告诉你应用当前是在前台还是在后台，并且能在状态变化的时候通知你

```js
active: 应用正在前台运行;
background: (在后台运行) => 在别的应用;
停留在桌面;
inactive: 正在前后台的切换过程中;

useEffect(() => {
  AppState.addEventListener("change", _handleAppStateChange);

  return () => {
    AppState.removeEventListener("change", _handleAppStateChange);
  };
}, []);

AppState.currentState;
```

3. `NetInfo:` 用于获取手机联网状态的 API

```js
// none: 离线;
// wifi: wifi联网;
// cellular: 通过蜂窝数据联网
// unkonwn: 联网状态异常
NetInfo.getConnectionInfo().then(); // 获取手机联网状态

NetInfo.addEventListener(name, handler); // 监听网络状态
NetInfo.isConnectionExpensive(); // 连接是否收费
```

4. `AsyncStorage:` 异步 持久化数据存储 API, 它以键值对方式保存数据 => 全局的, 先封装后再使用

```js
// 常用的:
getItem(): 根据键值获取数据, 结果返回回调函数
setItem(): 保存值
removeItem(): 删除
mergeItem():  合并已有的值和新的值
clear(): 清除
```

5. `DeviceEventEmitter: `发布订阅模式, 在两个相互独立的组件之间通信使用, 类似 Vue 的 `EventBus`

```js
DeviceEventEmitter.addListener("我要吃饭", (草莓) => {
  console.log(`我要吃${草莓}`);
});

DeviceEventEmitter.remove();

DeviceEventEmitter.emit("我要吃饭", "草莓");
```

**屏幕相关 API**

1. `Dimensions:` 用于获取设备屏幕的宽高。

```js
Dimensions.get("window");

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
```

2. `PixelRatio: `取到设备的像素密度和字体缩放比, 设备像素: 物理像素/设备独立像素
   - 例如: ip4 => 屏幕物理像素 640, 独立像素 320, PixelRatio 为 2
   - RN 开发使用的尺寸单位是 pt, 由于移动设备像素密度不一样, 1pt 对应的像素也不一样
   - 屏幕分辨率 = 屏幕宽高 \* 屏幕像素密度

```js
get() => 1: mdpi android devices; 1.5: hdpi android devices; ... // 设备的像素密度
getFontScale() // 字体大小缩放比例
```

**动画 API**

1. `requestAmimationFrame:` 帧动画, 通过不断改变组件的状态来实现动画效果
2. `LayoutAnimation:` 布局动画, 当布局发生改变时的动画模块 [布局动画文档](https://www.react-native.cn/docs/layoutanimation)
3. `Animated:` 侧重于输入和输出之间的声明性关系，以及两者之间的可配置变换，此外还提供了简单的 start/stop 方法来控制基于时间的动画执行

**平台 API**

1. `BackHandler: `用于监听 Android 设备返回事件的 API

```js
// 示例: android 退出应用
BackHandler.addEventListener("hardwareBackPress", () => {
  console.log("再按一次退出应用");
  BackHandler.exitApp();
});
BackHandler.removeEventListener("hardwareBackPress", () => {});
```

2. `PermissionsAndroid:` 访问 Android M(也就是 6.0)开始提供的权限模型, 仅对 Android 平台有效
   - [文档](https://www.react-native.cn/docs/permissionsandroid)

```js
CAMERA: (相机权限) => android.permission.CAMERA;
READ_CALENDAR: (日历) => android.permission.READ_CALENDAR;
...等等

check() // 检测用户是否授权过某个动态权限
request() // 弹出提示框向用户请求某项动态权限
requestMultiple() // 多个权限
```

---

### 第三方库

1. NativeBase: 一款优秀的 RN 组件库,提供了丰富的第三方组件
   - [组件地址](https://nativebase.io/)

```bash
yarn add native-base
```

2. react-native-elements: 也是一个常见的 ReactNative 组件库
   - [组件地址](https://reactnativeelements.com/)

```bash
yarn add @rneui/themed @rneui/base
yarn add react-native-vector-icons
```

3. react-navigation
   - 一个完整的移动应用有多个页面组成, 页面之间跳转, 使用 `react-navigation`
   - [中文文档](https://www.reactnavigation.org.cn/docs/guide-quick-start)
   - [英文文档](https://reactnavigation.org/docs/hello-react-navigation)

```js
// 支持三种类型的导航器
StackNavigator: 包含导航栏的页面导航组件
TabNavigator: 底部展示 TabBar 的页面导航组件
DrawerNavigator: 实现侧边栏抽屉页面的导航组件
```

4. react-native-snap-carousel: 一个轮播组件库
   - [github 仓库](https://github.com/meliorence/react-native-snap-carousel)

```js
<Carousel
  data={this.state.entries} // 数据源
  renderItem={this._renderItem} // 渲染单个视图
  sliderWidth={sliderWidth} // 循环容器的宽度
  itemWidth={itemWidth} // 子元素的宽度
/>
```

5. react-native-image-picker: 拍照和相册管理库, 实现拍照和图片选取功能

   - [文档地址](https://github.com/react-native-image-picker/react-native-image-picker)

6. react-native-video: 视频播放组件库
   - [github 地址](https://github.com/react-native-video/react-native-video)

# React Native Android 组件 和 API 简介

> 最近在学习 Reactnative 开发, 记录一下开发中常用的 组件 和 API, 以及一些常用的 第三方库, 简单记录一下

```js
adb devices // 查看设备
```

### 目录

- `__tests__` 单元测试文件夹
- `android` 原生 Android 工程文件夹
- `ios` 原生 ios 工程文件夹
- `node_modules` 依赖的第三方库
- `index.js` App 入口文件
- `app.js` 入口文件显示的内容

### 调试

- `yarn android 启动项目`
- 输入 d 打开 development menu => Debug, 可以开启远端调试

### Flex 布局

1. `flexDirection` 属性: 布局中子组件的排列方向 => flex-direction
2. `flexWrap` 属性: 控制是否换行 => flex-wrap
3. `justifyContent` 属性: 组组件横向排列的位置 => justify-content
4. `alignSelf` 属性: 组件在容器内部的排列情况 => align-self
5. `flex` 属性: 子控件占父组件空间的比例

```js
// 在 rn 中写 css
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

export default styles;
```

---

### RN 组件详解

> React Native 无法使用传统的 HTML 元素标签, 只能使用 React 提供的基础组件来开发页面

**基础组件**

1. `Text:` 显示文本内容的组件, 支持文本和样式的嵌套以及触摸事件处理

```js
<Text style={styles.baseText} onPress={onPress} selectable>
```

2. `TextInput:` 输入框组件, 支持自动拼写修复, 自动大小写切换, 展位默认字符以及多种键盘设置

```html
<TextInput onChangeText={(text) => onChangeText(text)} value={value} autoCorrect
{...restProps} />
```

3. `Image:` 图片展示组件, 支持多种类型图片的展示, 包括网络图片, 静态资源, 本地图片等

```html
<Image style={styles.tinyLogo} source={{ uri:
"https://reactnative.dev/img/tiny_logo.png", }} width={150} height={150}
blurRadius={1} />
```

4. `ActivityIndicator:` 加载指示器组件(loading)

```js
<ActivityIndicator animating={animating} />
```

5. `Switch:` 状态切换组件(开关)

```js
<Switch
  trackColor={{ false: "#767577", true: "#81b0ff" }}
  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
  onValueChange={toggleSwitch}
  value={isEnabled}
/>
```

**容器组件**

1. `View:` 容器组件, 支持 Flexbox 布局, 样式, 触摸事件和处理一些无障碍功能, 可以放到其它容器组件, 也可以包含任意多个子组件

```js
<View style={styles.centeredView}>
  <View style={styles.modalView}>
    <Text style={styles.modalText}>Hello World!</Text>
  </View>
</View>
```

2. `ScrollView:` 一个通用的滚动容器组件, 支持垂直和水平两个方向上的滚动, 必须有一个确定的高度才能正常工作

3. `Touchable[Opacity | Highlight | WithoutFeedback | NativeFeedback]:` 透明触摸/高亮触摸/无反馈/水波纹

```js
<TouchableOpacity onPress={press}>
  <Text style={{ color: "red" }}>跳转到下一页面</Text>
</TouchableOpacity>
```

**列表组件**

1. `VirtualizedList: `列表组件: [文档地址](https://reactnative.cn/docs/virtualizedlist)

   - 一般来说: 除非特殊的性能要求, 不建议直接使用, 因为 VirtualizedList 是一个抽象组件, 实际开发中, 使用 FlatList 和 SectionList 组件即可满足开发需求, 它们基于 VirtualizedList 组件扩展的

2. `FlatList: `适用于加载长列表数据, 高性能的简单列表数据

```html
<FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id}
// key // 分割线 => borderBottom 或者 ItemSeparatorComponent //
下拉刷新/上拉加载更多 refreshing // 是否处于正在刷新的状态 onRefresh //
开始刷新事件, 发起接口请求 onEndReached // 上拉加载更多
onEndReachedThreshold={0} // 当距离内容最底部还有多远时触发onEndReached回调,
此参数是一个比值而非像素单位。比如，0.5
表示距离内容最底部的距离为当前列表可见长度的一半时触发 />
```

3. `SectionList:` 高性能分组列表组件, 不同于 FlatList, SectionList 主要用于开发列表分组, 吸顶悬浮等功能

```js
const DATA = [
  {title: '', data: []}
]
<SectionList
  sections={DATA}
  keyExtractor={(item, index) => item + index}
  renderItem={({ item }) => <Item title={item} />} // 渲染每一个列表视图
  renderSectionHeader={({ section: { title } }) => ( // 渲染每一个 section中的每一个列表项视图
    <Text style={styles.header}>{title}</Text>
  )}
/>
```

**平台组件**

> 适用于 Android 和 Ios 自己平台的组件, 查看文档

---

### RN API

> 组件是构成页面视图的基本元素, API 就是构成功能模块的基本元素

**基础 API**

1. `AppRegistry`: AppRegistry 是所有 React Native 应用的 JS 入口。应用的根组件应当通过 AppRegistry.registerComponent 方法注册自己

```js
AppRegistry.registerComponent(appName, () => App);
```

2. `AppState: `告诉你应用当前是在前台还是在后台，并且能在状态变化的时候通知你

```js
active: 应用正在前台运行;
background: (在后台运行) => 在别的应用;
停留在桌面;
inactive: 正在前后台的切换过程中;

useEffect(() => {
  AppState.addEventListener("change", _handleAppStateChange);

  return () => {
    AppState.removeEventListener("change", _handleAppStateChange);
  };
}, []);

AppState.currentState;
```

3. `NetInfo:` 用于获取手机联网状态的 API

```js
// none: 离线;
// wifi: wifi联网;
// cellular: 通过蜂窝数据联网
// unkonwn: 联网状态异常
NetInfo.getConnectionInfo().then(); // 获取手机联网状态

NetInfo.addEventListener(name, handler); // 监听网络状态
NetInfo.isConnectionExpensive(); // 连接是否收费
```

4. `AsyncStorage:` 异步 持久化数据存储 API, 它以键值对方式保存数据 => 全局的, 先封装后再使用

```js
// 常用的:
getItem(): 根据键值获取数据, 结果返回回调函数
setItem(): 保存值
removeItem(): 删除
mergeItem():  合并已有的值和新的值
clear(): 清除
```

5. `DeviceEventEmitter: `发布订阅模式, 在两个相互独立的组件之间通信使用, 类似 Vue 的 `EventBus`

```js
DeviceEventEmitter.addListener("我要吃饭", (草莓) => {
  console.log(`我要吃${草莓}`);
});

DeviceEventEmitter.remove();

DeviceEventEmitter.emit("我要吃饭", "草莓");
```

**屏幕相关 API**

1. `Dimensions:` 用于获取设备屏幕的宽高。

```js
Dimensions.get("window");

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
```

2. `PixelRatio: `取到设备的像素密度和字体缩放比, 设备像素: 物理像素/设备独立像素
   - 例如: ip4 => 屏幕物理像素 640, 独立像素 320, PixelRatio 为 2
   - RN 开发使用的尺寸单位是 pt, 由于移动设备像素密度不一样, 1pt 对应的像素也不一样
   - 屏幕分辨率 = 屏幕宽高 \* 屏幕像素密度

```js
get() => 1: mdpi android devices; 1.5: hdpi android devices; ... // 设备的像素密度
getFontScale() // 字体大小缩放比例
```

**动画 API**

1. `requestAmimationFrame:` 帧动画, 通过不断改变组件的状态来实现动画效果
2. `LayoutAnimation:` 布局动画, 当布局发生改变时的动画模块 [布局动画文档](https://www.react-native.cn/docs/layoutanimation)
3. `Animated:` 侧重于输入和输出之间的声明性关系，以及两者之间的可配置变换，此外还提供了简单的 start/stop 方法来控制基于时间的动画执行

**平台 API**

1. `BackHandler: `用于监听 Android 设备返回事件的 API

```js
// 示例: android 退出应用
BackHandler.addEventListener("hardwareBackPress", () => {
  console.log("再按一次退出应用");
  BackHandler.exitApp();
});
BackHandler.removeEventListener("hardwareBackPress", () => {});
```

2. `PermissionsAndroid:` 访问 Android M(也就是 6.0)开始提供的权限模型, 仅对 Android 平台有效
   - [文档](https://www.react-native.cn/docs/permissionsandroid)

```js
CAMERA: (相机权限) => android.permission.CAMERA;
READ_CALENDAR: (日历) => android.permission.READ_CALENDAR;
...等等

check() // 检测用户是否授权过某个动态权限
request() // 弹出提示框向用户请求某项动态权限
requestMultiple() // 多个权限
```

---

### 第三方库

1. NativeBase: 一款优秀的 RN 组件库,提供了丰富的第三方组件
   - [组件地址](https://nativebase.io/)

```bash
yarn add native-base
```

2. react-native-elements: 也是一个常见的 ReactNative 组件库
   - [组件地址](https://reactnativeelements.com/)

```bash
yarn add @rneui/themed @rneui/base
yarn add react-native-vector-icons
```

3. react-navigation
   - 一个完整的移动应用有多个页面组成, 页面之间跳转, 使用 `react-navigation`
   - [中文文档](https://www.reactnavigation.org.cn/docs/guide-quick-start)
   - [英文文档](https://reactnavigation.org/docs/hello-react-navigation)

```js
// 支持三种类型的导航器
StackNavigator: 包含导航栏的页面导航组件
TabNavigator: 底部展示 TabBar 的页面导航组件
DrawerNavigator: 实现侧边栏抽屉页面的导航组件
```

4. react-native-snap-carousel: 一个轮播组件库
   - [github 仓库](https://github.com/meliorence/react-native-snap-carousel)

```js
<Carousel
  data={this.state.entries} // 数据源
  renderItem={this._renderItem} // 渲染单个视图
  sliderWidth={sliderWidth} // 循环容器的宽度
  itemWidth={itemWidth} // 子元素的宽度
/>
```

5. react-native-image-picker: 拍照和相册管理库, 实现拍照和图片选取功能

   - [文档地址](https://github.com/react-native-image-picker/react-native-image-picker)

6. react-native-video: 视频播放组件库
   - [github 地址](https://github.com/react-native-video/react-native-video)
