(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-member-member"],{"03d1":function(t,e,i){t.exports=i.p+"static/img/shuijin2.69fbdc23.png"},"08ec":function(t,e,i){t.exports=i.p+"static/img/navbar-vip-notactive.bcb5541b.png"},1296:function(t,e,i){t.exports=i.p+"static/img/baiyin.b8951cb1.png"},"198c":function(t,e,i){"use strict";i.r(e);var n=i("d690"),a=i("fe7b");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("3b5e");var o,c=i("f0c5"),s=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"097a6aec",null,!1,n["a"],o);e["default"]=s.exports},"2dd3":function(t,e,i){t.exports=i.p+"static/img/baiyin2.3b911bde.png"},"2fd5":function(t,e,i){t.exports=i.p+"static/img/navbar-record-notactive.007bb57b.png"},3928:function(t,e,i){"use strict";(function(t){i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"home-bar",created:function(){var t=this;this.fullScreen&&uni.getSystemInfo({success:function(e){t.swiperHeight=e.screenHeight-44}})},mounted:function(){},props:{tabIndex:{type:[Number,String],default:0}},data:function(){return{flag:!0,cardCur:0,swiperHeight:300}},computed:{},methods:{change:function(t){this.$emit("change",t)},ontab:function(e){t.log("ontab------\x3e",e);var i=e;if(this.tabIndex!=i)switch(i){case 0:uni.navigateTo({url:"/pages/main/main"});break;case 1:uni.navigateTo({url:"/pages/member/member"});break;case 2:uni.navigateTo({url:"/pages/task/task"});break;case 3:uni.navigateTo({url:"/pages/order/order"});break;case 4:uni.navigateTo({url:"/pages/user/user"});break;default:break}}}};e.default=n}).call(this,i("5a52")["default"])},"3b5e":function(t,e,i){"use strict";var n=i("795c"),a=i.n(n);a.a},"3c1d":function(t,e,i){t.exports=i.p+"static/img/qingtong2.7e37e729.png"},"4cff":function(t,e,i){t.exports=i.p+"static/img/navbar-task-notactive.f852beb3.png"},"506a":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".main-home-bar[data-v-097a6aec]{position:fixed;left:0;bottom:0;width:100%}.main-home-bar .tab-bar[data-v-097a6aec]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background-color:#373737;padding:%?12?% 0}.main-home-bar .tab-bar .bar-btn[data-v-097a6aec]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center}.main-home-bar .tab-bar .bar-btn .bar-view[data-v-097a6aec]{width:%?70?%;height:%?50?%;position:relative;margin:auto;margin-bottom:%?8?%}.main-home-bar .tab-bar .bar-btn .img-bar[data-v-097a6aec]{width:%?70?%;height:%?50?%}.main-home-bar .tab-bar .bar-btn .txt[data-v-097a6aec]{color:#fff;font-size:%?28?%}.main-home-bar .tab-bar .bar-btn.active .txt[data-v-097a6aec]{color:#bfa56d;font-size:%?24?%}.main-home-bar .tab-bar .bar-btn.active .img-bar[data-v-097a6aec]{width:%?70?%;height:%?74?%;position:absolute;bottom:0;left:0}.main-home-bar .tab-bar .bar-btn.active .img-bar.img-person[data-v-097a6aec]{width:%?102?%;height:%?74?%;left:%?-10?%}",""]),t.exports=e},"57d4":function(t,e,i){"use strict";(function(t){var n=i("ee27");i("7db0"),i("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("f3f3"));i("96cf");var r=n(i("c964")),o=i("2f62"),c=n(i("198c")),s=n(i("fdf0")),l={mixins:[s.default],data:function(){return{leveIconList:[{title:"普通会员",icon:i("77b4"),img:i("3c1d"),class:"vip-0",vip:0},{title:"青铜会员",icon:i("77b4"),img:i("3c1d"),class:"vip-1",vip:1},{title:"白银会员",icon:i("1296"),img:i("2dd3"),class:"vip-2",vip:2},{title:"铂金会员",icon:i("77b4"),img:i("3c1d"),class:"vip-3",vip:3},{title:"水晶会员",icon:i("f3db"),img:i("03d1"),class:"vip-4",vip:4}],vipInfo:{todayNotDoTask:0,myVip:0,list:[],myVipTitle:""},downOption:{},upOption:{empty:{tip:"暂无相关数据"}}}},computed:(0,o.mapState)(["hasLogin"]),onLoad:function(){this.initData()},components:{homeBar:c.default},methods:{downCallback:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.initData(),setTimeout((function(){t.$refs.mescrollRef.mescroll.resetUpScroll()}),300);case 2:case"end":return e.stop()}}),e)})))()},initData:function(){var e=this;this.$api.vipInfoTab().then((function(i){t.log("vipInfoTab------\x3e",i);var n=i&&i.list;n=n.map((function(t,i){return(0,a.default)({},t,{},e.leveIconList[i])}));var r=n.find((function(t){return t.vip==i.myVip}));e.vipInfo=(0,a.default)({},i,{myVipTitle:r&&r.title,list:n}),t.log("this.vipInfo-----\x3e",e.vipInfo)}))},onVip:function(e){t.log("vip-----\x3e",e),uni.navigateTo({url:"/pages/pay/payChannel?vip=".concat(e.vip)})}}};e.default=l}).call(this,i("5a52")["default"])},"6bd3":function(t,e,i){t.exports=i.p+"static/img/navbar-task-active.b0b6123a.png"},"77b4":function(t,e,i){t.exports=i.p+"static/img/qingtong.7505bc3b.png"},"795c":function(t,e,i){var n=i("506a");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("59dba457",n,!0,{sourceMap:!1,shadowMode:!1})},"8e8f":function(t,e,i){t.exports=i.p+"static/img/navbar-my-notactive.57220f8a.png"},"94cd":function(t,e,i){var n=i("b15a");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("35f1ecce",n,!0,{sourceMap:!1,shadowMode:!1})},"96cf":function(t,e){!function(e){"use strict";var i,n=Object.prototype,a=n.hasOwnProperty,r="function"===typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",c=r.asyncIterator||"@@asyncIterator",s=r.toStringTag||"@@toStringTag",l="object"===typeof t,m=e.regeneratorRuntime;if(m)l&&(t.exports=m);else{m=e.regeneratorRuntime=l?t.exports:{},m.wrap=y;var u="suspendedStart",f="suspendedYield",b="executing",v="completed",d={},p={};p[o]=function(){return this};var h=Object.getPrototypeOf,g=h&&h(h(P([])));g&&g!==n&&a.call(g,o)&&(p=g);var w=_.prototype=k.prototype=Object.create(p);C.prototype=w.constructor=_,_.constructor=C,_[s]=C.displayName="GeneratorFunction",m.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===C||"GeneratorFunction"===(e.displayName||e.name))},m.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,_):(t.__proto__=_,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(w),t},m.awrap=function(t){return{__await:t}},I(T.prototype),T.prototype[c]=function(){return this},m.AsyncIterator=T,m.async=function(t,e,i,n){var a=new T(y(t,e,i,n));return m.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},I(w),w[s]="Generator",w[o]=function(){return this},w.toString=function(){return"[object Generator]"},m.keys=function(t){var e=[];for(var i in t)e.push(i);return e.reverse(),function i(){while(e.length){var n=e.pop();if(n in t)return i.value=n,i.done=!1,i}return i.done=!0,i}},m.values=P,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=i,this.done=!1,this.delegate=null,this.method="next",this.arg=i,this.tryEntries.forEach(F),!t)for(var e in this)"t"===e.charAt(0)&&a.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=i)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,a){return c.type="throw",c.arg=t,e.next=n,a&&(e.method="next",e.arg=i),!!a}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],c=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var s=a.call(o,"catchLoc"),l=a.call(o,"finallyLoc");if(s&&l){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var i=this.tryEntries.length-1;i>=0;--i){var n=this.tryEntries[i];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var r=n;break}}r&&("break"===t||"continue"===t)&&r.tryLoc<=e&&e<=r.finallyLoc&&(r=null);var o=r?r.completion:{};return o.type=t,o.arg=e,r?(this.method="next",this.next=r.finallyLoc,d):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var i=this.tryEntries[e];if(i.finallyLoc===t)return this.complete(i.completion,i.afterLoc),F(i),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var i=this.tryEntries[e];if(i.tryLoc===t){var n=i.completion;if("throw"===n.type){var a=n.arg;F(i)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:P(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=i),d}}}function y(t,e,i,n){var a=e&&e.prototype instanceof k?e:k,r=Object.create(a.prototype),o=new O(n||[]);return r._invoke=L(t,i,o),r}function x(t,e,i){try{return{type:"normal",arg:t.call(e,i)}}catch(n){return{type:"throw",arg:n}}}function k(){}function C(){}function _(){}function I(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function T(t){function e(i,n,r,o){var c=x(t[i],t,n);if("throw"!==c.type){var s=c.arg,l=s.value;return l&&"object"===typeof l&&a.call(l,"__await")?Promise.resolve(l.__await).then((function(t){e("next",t,r,o)}),(function(t){e("throw",t,r,o)})):Promise.resolve(l).then((function(t){s.value=t,r(s)}),(function(t){return e("throw",t,r,o)}))}o(c.arg)}var i;function n(t,n){function a(){return new Promise((function(i,a){e(t,n,i,a)}))}return i=i?i.then(a,a):a()}this._invoke=n}function L(t,e,i){var n=u;return function(a,r){if(n===b)throw new Error("Generator is already running");if(n===v){if("throw"===a)throw r;return S()}i.method=a,i.arg=r;while(1){var o=i.delegate;if(o){var c=E(o,i);if(c){if(c===d)continue;return c}}if("next"===i.method)i.sent=i._sent=i.arg;else if("throw"===i.method){if(n===u)throw n=v,i.arg;i.dispatchException(i.arg)}else"return"===i.method&&i.abrupt("return",i.arg);n=b;var s=x(t,e,i);if("normal"===s.type){if(n=i.done?v:f,s.arg===d)continue;return{value:s.arg,done:i.done}}"throw"===s.type&&(n=v,i.method="throw",i.arg=s.arg)}}}function E(t,e){var n=t.iterator[e.method];if(n===i){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=i,E(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var a=x(n,t.iterator,e.arg);if("throw"===a.type)return e.method="throw",e.arg=a.arg,e.delegate=null,d;var r=a.arg;return r?r.done?(e[t.resultName]=r.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=i),e.delegate=null,d):r:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function F(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function P(t){if(t){var e=t[o];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,r=function e(){while(++n<t.length)if(a.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=i,e.done=!0,e};return r.next=r}}return{next:S}}function S(){return{value:i,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},acaa:function(t,e,i){t.exports=i.p+"static/img/navbar-vip-active.38719ff3.png"},ad96:function(t,e,i){t.exports=i.p+"static/img/1.8ea01228.png"},b15a:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".mescroll-body-view[data-v-15e97b9a]{width:100%;position:relative;top:0}.content[data-v-15e97b9a]{padding-bottom:%?140?%;background-color:#2b2d35;position:relative}.member-content[data-v-15e97b9a]{position:relative}.member-content .memeber-banner[data-v-15e97b9a]{position:absolute;left:0;top:0;height:100%;width:100%}.member-content .memeber-banner .img-member[data-v-15e97b9a]{width:100%;height:%?938?%}.member-content .member-head[data-v-15e97b9a]{position:relative;margin:auto;margin-top:%?600?%}.member-content .member-head .head-content[data-v-15e97b9a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:%?12?% %?5?% %?12?% %?20?%}.member-content .member-head .head-content .head-media[data-v-15e97b9a]{width:%?220?%}.member-content .member-head .head-content .head-media .media-title[data-v-15e97b9a]{font-size:%?28?%;color:#fff}.member-content .member-head .head-content .head-media .media-title .dd[data-v-15e97b9a]{font-size:%?24?%}.member-content .member-head .head-content .head-vip[data-v-15e97b9a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-flex:1;-webkit-flex:1;flex:1}.member-content .member-head .head-content .head-vip .vip-level[data-v-15e97b9a]{width:%?141?%;height:%?40?%;position:relative;margin:%?10?% %?12?%}.member-content .member-head .head-content .head-vip .vip-level .img-vip[data-v-15e97b9a]{width:%?141?%;height:%?40?%}.member-content .member-head .head-content .head-vip .vip-level .level[data-v-15e97b9a]{position:absolute;left:0;top:0;right:0;font-size:%?24?%;color:#fff;text-align:center;z-index:1}.member-content .member-list .member-item[data-v-15e97b9a]{position:relative;width:%?710?%;height:%?211?%;margin:auto;padding:12px;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-top:%?14?%}.member-content .member-list .member-item.vip-4 .item-content .item-media .title[data-v-15e97b9a]{color:#fff}.member-content .member-list .member-item.vip-4 .item-content .item-media .task[data-v-15e97b9a]{color:#fff}.member-content .member-list .member-item.vip-4 .item-content .item-price .unit[data-v-15e97b9a]{color:#fff}.member-content .member-list .member-item .item-cover[data-v-15e97b9a]{position:absolute;top:0;left:0}.member-content .member-list .member-item .item-cover .img-cover[data-v-15e97b9a]{width:%?710?%;height:%?211?%}.member-content .member-list .member-item .item-content[data-v-15e97b9a]{-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.member-content .member-list .member-item .item-content .item-media[data-v-15e97b9a]{font-size:%?28?%;color:#fff;-webkit-box-flex:1;-webkit-flex:1;flex:1}.member-content .member-list .member-item .item-content .item-media .title[data-v-15e97b9a]{font-size:%?38?%;color:#5f5f5f}.member-content .member-list .member-item .item-content .item-media .task[data-v-15e97b9a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:#5f5f5f;font-size:%?28?%;margin-bottom:%?8?%}.member-content .member-list .member-item .item-content .item-media .btn-level .btn-item[data-v-15e97b9a]{display:inline-block;padding:%?5?% %?24?%;background-color:#fff;color:#5f5f5f;border-radius:%?30?%;font-size:%?24?%}.member-content .member-list .member-item .item-content .item-price[data-v-15e97b9a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.member-content .member-list .member-item .item-content .item-price .num[data-v-15e97b9a]{font-size:%?80?%;color:#fff;text-shadow:%?3?% %?3?% %?3?% #eee;margin-right:%?12?%}.member-content .member-list .member-item .item-content .item-price .unit[data-v-15e97b9a]{color:#5f5f5f}",""]),t.exports=e},bac0:function(t,e,i){t.exports=i.p+"static/img/navbar-my-active.d5b07391.png"},befb:function(t,e,i){"use strict";i.r(e);var n=i("57d4"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},c6ff:function(t,e,i){t.exports=i.p+"static/img/navbar-home-notactive.364d558b.png"},c7ce:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"member-content"},[n("v-uni-view",{staticClass:"memeber-banner"},[n("v-uni-image",{staticClass:"img-member",attrs:{src:i("ad96"),mode:"scaleToFill"}})],1),n("v-uni-view",{staticClass:"member-head"},[n("v-uni-view",{staticClass:"head-content"},[n("v-uni-view",{staticClass:"head-media"},[n("v-uni-view",{staticClass:"media-title"},[n("v-uni-view",{staticClass:"dt"},[t._v("当前等级:")]),n("v-uni-view",{staticClass:"dd"},[t._v(t._s(t.vipInfo.myVipTitle))])],1),n("v-uni-view",{staticClass:"media-title media-task"},[n("v-uni-view",{staticClass:"dt"},[t._v("每日任务数:")]),n("v-uni-view",{staticClass:"dd"},[t._v(t._s(t.vipInfo.todayNotDoTask))])],1)],1),t.vipInfo.list&&t.vipInfo.list.length>0?n("v-uni-view",{staticClass:"head-vip"},t._l(t.vipInfo.list,(function(e,i){return n("v-uni-view",{key:i,staticClass:"vip-level"},[n("v-uni-image",{staticClass:"img-vip",attrs:{src:e.icon,mode:"scaleToFill"}}),n("v-uni-view",{staticClass:"level"},[t._v(t._s(e.title))])],1)})),1):t._e()],1)],1),t.vipInfo.list&&t.vipInfo.list.length>0?n("v-uni-view",{staticClass:"member-list"},t._l(t.vipInfo.list,(function(e,i){return n("v-uni-view",{key:i,staticClass:"member-item",class:e.class},[n("v-uni-view",{staticClass:"item-cover"},[n("v-uni-image",{staticClass:"img-cover",attrs:{src:e.img,mode:"scaleToFill"}})],1),n("v-uni-view",{staticClass:"item-content"},[n("v-uni-view",{staticClass:"item-media"},[n("v-uni-view",{staticClass:"title"},[t._v(t._s(e.title))]),n("v-uni-view",{staticClass:"task"},[t._v("每日多领取"),n("v-uni-view",{staticClass:"num"},[t._v(t._s(e.dayTaskCount))]),t._v("次任务")],1),n("v-uni-view",{staticClass:"btn-level"},[n("v-uni-view",{staticClass:"btn-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onVip(e)}}},[t._v("立即升级")])],1)],1),n("v-uni-view",{staticClass:"item-price"},[n("v-uni-view",{staticClass:"num"},[t._v(t._s(e.rechargeAmount))]),n("v-uni-view",{staticClass:"unit"},[t._v("元/年")])],1)],1)],1)})),1):t._e()],1),n("homeBar",{attrs:{tabIndex:1}})],1)},r=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}))},c964:function(t,e,i){"use strict";i.r(e),i.d(e,"default",(function(){return a}));i("d3b7"),i("e6cf");function n(t,e,i,n,a,r,o){try{var c=t[r](o),s=c.value}catch(l){return void i(l)}c.done?e(s):Promise.resolve(s).then(n,a)}function a(t){return function(){var e=this,i=arguments;return new Promise((function(a,r){var o=t.apply(e,i);function c(t){n(o,a,r,c,s,"next",t)}function s(t){n(o,a,r,c,s,"throw",t)}c(void 0)}))}}},ca94:function(t,e,i){t.exports=i.p+"static/img/navbar-home-active.11ee4756.png"},cedc:function(t,e,i){"use strict";var n=i("94cd"),a=i.n(n);a.a},d690:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"main-home-bar"},[n("v-uni-view",{staticClass:"tab-bar"},[n("v-uni-view",{staticClass:"bar-btn",class:[0==t.tabIndex?"active":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ontab(0)}}},[n("v-uni-view",{staticClass:"bar-view"},[0==t.tabIndex?n("v-uni-image",{staticClass:"img-bar",attrs:{src:i("ca94"),mode:"scaleToFill"}}):n("v-uni-image",{staticClass:"img-bar",attrs:{src:i("c6ff"),mode:"scaleToFill"}})],1),n("v-uni-view",{staticClass:"txt"},[t._v("首页")])],1),n("v-uni-view",{staticClass:"bar-btn",class:[1==t.tabIndex?"active":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ontab(1)}}},[n("v-uni-view",{staticClass:"bar-view"},[1==t.tabIndex?n("v-uni-image",{staticClass:"img-bar img-person",attrs:{src:i("acaa"),mode:"scaleToFill"}}):n("v-uni-image",{staticClass:"img-bar",attrs:{src:i("08ec"),mode:"scaleToFill"}})],1),n("v-uni-view",{staticClass:"txt"},[t._v("会员")])],1),n("v-uni-view",{staticClass:"bar-btn",class:[2==t.tabIndex?"active":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ontab(2)}}},[n("v-uni-view",{staticClass:"bar-view"},[2==t.tabIndex?n("v-uni-image",{staticClass:"img-bar img-task",attrs:{src:i("6bd3"),mode:"scaleToFill"}}):n("v-uni-image",{staticClass:"img-bar",attrs:{src:i("4cff"),mode:"scaleToFill"}})],1),n("v-uni-view",{staticClass:"txt"},[t._v("任务")])],1),n("v-uni-view",{staticClass:"bar-btn",class:[3==t.tabIndex?"active":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ontab(3)}}},[n("v-uni-view",{staticClass:"bar-view"},[3==t.tabIndex?n("v-uni-image",{staticClass:"img-bar img-recode",attrs:{src:i("e0ba"),mode:"scaleToFill"}}):n("v-uni-image",{staticClass:"img-bar",attrs:{src:i("2fd5"),mode:"scaleToFill"}})],1),n("v-uni-view",{staticClass:"txt"},[t._v("记录")])],1),n("v-uni-view",{staticClass:"bar-btn",class:[4==t.tabIndex?"active":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ontab(4)}}},[n("v-uni-view",{staticClass:"bar-view"},[4==t.tabIndex?n("v-uni-image",{staticClass:"img-bar img-mine",attrs:{src:i("bac0"),mode:"scaleToFill"}}):n("v-uni-image",{staticClass:"img-bar",attrs:{src:i("8e8f"),mode:"scaleToFill"}})],1),n("v-uni-view",{staticClass:"txt"},[t._v("我的")])],1)],1)],1)},r=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}))},e0ba:function(t,e,i){t.exports=i.p+"static/img/navbar-record-active.e6629339.png"},efd0:function(t,e,i){"use strict";i.r(e);var n=i("c7ce"),a=i("befb");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("cedc");var o,c=i("f0c5"),s=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"15e97b9a",null,!1,n["a"],o);e["default"]=s.exports},f3db:function(t,e,i){t.exports=i.p+"static/img/shuijin.ba047ee3.png"},fdf0:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{mescroll:null}},onPullDownRefresh:function(){this.mescroll&&this.mescroll.onPullDownRefresh()},onPageScroll:function(t){this.mescroll&&this.mescroll.onPageScroll(t)},onReachBottom:function(){this.mescroll&&this.mescroll.onReachBottom()},methods:{mescrollInit:function(t){this.mescroll=t,this.mescrollInitByRef()},mescrollInitByRef:function(){if(!this.mescroll||!this.mescroll.resetUpScroll){var t=this.$refs.mescrollRef;t&&(this.mescroll=t.mescroll)}},downCallback:function(){var t=this;this.mescroll.optUp.use?this.mescroll.resetUpScroll():setTimeout((function(){t.mescroll.endSuccess()}),500)},upCallback:function(){var t=this;setTimeout((function(){t.mescroll.endErr()}),500)}},mounted:function(){this.mescrollInitByRef()}},a=n;e.default=a},fe7b:function(t,e,i){"use strict";i.r(e);var n=i("3928"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a}}]);