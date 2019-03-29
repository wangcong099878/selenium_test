https://www.cnblogs.com/yxi-liu/p/node-selenium-driver.html
Selenium-webdriver基本使用
准备
　　① node.js 的安装和配置略

　　② Selenium-webdriver

　　　　npm install -save selenium-webdriver

　　③ 驱动
　　　　chromedriver  欢迎大家FQ下载：https://sites.google.com/a/chromium.org/chromedriver/downloads。然后找个环境路径存一下就可以调用了。

　　　　IEdriver   　　 github下载：https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver 。 同样环境路径保存。

　　　　　　　　 　　 注意：IE玩家把internet选项-安全- 四个选项的启动保护模式都关掉！

　　       PhantomJS     直接解压，把bin目录放在环境路径中

　　　　Opera以及geckodriver试了一下，对最新版opera和firefox支持并不好。可以下载较低的版本使用。


一、基本使用
const {Builder, By, Key, until， Button} = require("selenium-webdriver");
let broswer = new Builder().forBrowser('ie').build()  #这里使用了ie引擎
broswer.get('http://www.baidu.com')
broswer.quit()  // 表示关闭浏览器   
//drive.close()表示关闭当前窗口
 

二、选择器
复制代码
broswer.findElement(By.name('btnG'))；
broswer.findElement({id:"btnG"})；
element.findElement()； //同样可以对元素使用findElement方法
findElements //查找多个元素

By.className(classname)
By.css(selector)   #css-selector
By.id(id)
By.name(name)
By.linkText(text)
By.partialLink(text)  
By.xpath()   
By.js()  //Locates an elements by evaluating a JavaScript expression. The result of this expression must be an element or list of elements.
复制代码
 

 

三、属性获取
复制代码
//获取代码：
browser.getPageSource().then(function(souce) {console.log(souce);
//获取网页标题:
browser.getTitle().then(b=>{console.log(b)});
//获取当前url：
browser.getCurrentUrl().then(b=>{console.log(b)});


//element为web元素对象，为findelement()的返回对象

element.getText().then(b=>{console.log("text",b)}) //返回里面没有被隐藏的文字（不带标签）

element.getTagName().then(b=>{console.log("Tagname",b)})
//返回标签名

element.getId().then(b=>{console.log("ID",b)})
//返回这个element服务器分配的不透明id


elements.getCssValue().then(=>{console.log("CSSvalue",b)})
//返回该element的CSS属性

//其他属性:
element.getAttribute("class").then(b=>{console.log(b)})
复制代码
 

四、等待
 
复制代码
//等待元素：
browser.wait(until.elementLocated(By.id('foo')), 10000);

browser.wait(function() {
    return driver.getTitle().then(function(title) { console.log(11111111);
        return title === 'webdriver - Google Search';
    });
}, 1000);

browser.wait(until.titleIs('webdriver - Google Search'), 1000)


//settimeouts
browser.manage().setTimeouts(args)
// args参数
{implicit: (number|null|undefined), pageLoad: (number|null|undefined), script: (number|null|undefined)}
implicit：等待元素加载的最大时间；pageLoad等待页面加载完成的最大时间
复制代码
 

五、操作

①input操作
//清空
element.clear();
//输入 
element.sendKeys("webdriver");
element.sendKeys(Key.ENTER);
element.submit();  //以submit命令提交执行
②截图
broswer.takeScreenshot().then()  //返回页面png截图
element.takeScreenshoot().then() //返回元素png截图


③鼠标操作
复制代码
//单击鼠标
element.click() 
//连锁动作(action对象)
const actions = driver.actions();
actions
     .keyDown(SHIFT)
     .move({origin: el})
     .press()
     .release()
     .keyUp(SHIFT)
     .perform();
//actions对象以perform()作为动作链结尾，表示命令执行


//具体方法如下：
actions.clear() //清空所有动作，按键和状态
actions.click(element) //对element左键单击一次
actions.contextClick(element) //对element右键单击一次
actions.doubleClick(element)  //对element双击一次
actions.dragAndDrop(ele_from,to) //单击鼠标拖动ele_from元素，如果to是坐标{x:number,y:number}移动距离;如果to是元素移动到to元素中心，并释放鼠标。


actions.keyDown(key) //按下键盘的key键
actions.keyUp(key)  //释放key键

actions.move(options) //移动参数如下：  
//options ({duration: (number|undefined), origin: (Origin|WebElement|undefined), x: (number|undefined), y: (number|undefined)}|undefined) 
　　//origin是起始位置，默认为鼠标当前位置，可以设置元素为起始位置。x,y为偏移量。duration为持续时间默认（100ms）

actions.press(button) //按下鼠标 button默认是鼠标左键，有LEFT,RIGHT,MIDDLE三个值，通过Button.LEFT....获得
actions.release(button) //释放鼠标，默认左键
actions.sendKeys()  //同sendkeys
actions.pause(ms,devices) //暂停ms时间，如果devices没有指定，会创建一个针对所有的事件
复制代码

举例：

 e.g.
更多细节参考：http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Actions.html

 

六、options对象
通过let options = broswer.manage() 获得

options.addCookie({name: 'foo', value: 'bar'})
options.deleteAllCookies() //删除所有cookies
options.deleteCookie(name) //按照name删除
options.getCookie(name) //拿到name字段的cookie值，为promise对象
options.getCookies() //返回所有cookies，为promise对象
 

 

七、nav对象
通过let nav = broswer.navigate()获得

nav有四个方法分别为：

　　nav.back();

　　nav.forward();

　　nav.refresh();

　　nav.to(url);

分别为后退，前进，刷新，跳转到url

 

八、其他
　　①browser.excuteScript(script) //在当前frame中执行js代码

　　②brower.switchTo() //targetlocator

　　　　targetlocator对象参见：http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_TargetLocator.html

　　　　其中targetlocator.frame(id)可以用来切换frame。通过parentFrame()切回

 

更多API详见：http://seleniumhq.github.io/selenium/docs/api/javascript/index.html

p.s. 根据浏览器版本和引擎不同，部分方法存在问题。

注意：一些执行操作的promise对象，需要合理利用async和await方法