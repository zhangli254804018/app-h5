# huoju-app-h5
huoju-app-h5 对应svn地址

### 使用方法
### npm install 
### 在允许项目代码


# 使用方法
### ajax已经封装在全局
### 调用方式为 默认为POST JSON格式提交

```
this.$api.getConfig({
	url: location.href
}).then(res => {
	this.testData = res
})
```

### 插入vux 对外暴露为$store
```
设置数据
this.$store.dispatch('userInfo')
获取数据
this.$store.state.userInfo
```

[接口doc地址](https://docs.google.com/spreadsheets/d/1EgJ3Py2lcnYO12S24WYxBLm-qNJsojp3OKotDvc1kPw/edit#gid=1775478639)

[uchart文档](http://doc.ucharts.cn/1073940)