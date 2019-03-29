/**
 * Created by wangcong on 2019/03/23.
 */
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


driver.get('http://www.baidu.com');


