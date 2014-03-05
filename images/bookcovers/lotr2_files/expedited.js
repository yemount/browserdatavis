define("lib/xhr",["jquery","nbd/trait/promise"],function(e,t){"use strict";return function(){var i=new t,n=e.ajax.apply(e,arguments);return i.resolve(n),i.thenable()}}),define("be/Controller/Dialog",["nbd/Controller/Entity","nbd/util/media"],function(e,t){"use strict";var i=e.extend({init:function(){this._super.apply(this,arguments),this.mediaView=this.mediaView.bind(this),t.on("all",this.mediaView)},destroy:function(){t.off(null,this.mediaView),this._view&&this._view.destroy(),this._model.destroy()},_initView:function(e,i){var n,s=t.getState();n="function"==typeof e?e:s.map(function(t){return e[t]}).filter(function(e){return!!e})[0],"function"==typeof n&&(this._view=this._view=new n(i),this._view._controller=this._view._controller=this)},render:function(){return this._view&&this._view.render.apply(this._view,arguments)},mediaView:function(e,t){var i=this.constructor.VIEW_CLASS[e];i&&t&&this.requestView(i)},switchView:function(e){var t=this._view;return this._initView(e,this._model),t&&t.destroy()}});return i}),define("be/Controller/Dialog/Roulette",["jquery","be/Controller/Dialog","nbd/util/async"],function(e,t,i){"use strict";var n=t.extend({$context:null,setContext:function(e){this.$context&&this.$context.off("click"),this.$context=e.on("click",function(e){e.isDefaultPrevented()||e.originalEvent.data===this._view||this.toggle(e.delegateTarget)}.bind(this))},render:function(e){var t=this._view.render(document.body);return this._view.position(e),t},toggle:function(e){this._view.$view&&this._view.$view.length?(this._view.toggle(),this._view.position(e)):(this.render(e||this.$context),i(this._view.show.bind(this._view)))}});return n}),define("require/hgn!templates/dialog",["hogan"],function(e){function t(){return i.render.apply(i,arguments)}var i=new e.Template({code:function(e,t,i){var n=this;return n.b(i=i||""),n.b('<div class="popup '),n.b(n.v(n.f("dialogType",e,t,0))),n.s(n.f("classes",e,t,1),e,t,0,44,50,"{{ }}")&&(n.rs(e,t,function(e,t,i){i.b(" "),i.b(i.v(i.d(".",e,t,0)))}),e.pop()),n.s(n.f("buttons",e,t,1),e,t,1,0,0,"")||n.b(" no-buttons"),n.s(n.f("title",e,t,1),e,t,1,0,0,"")||n.b(" no-title"),n.s(n.f("fullBleed",e,t,1),e,t,0,140,151,"{{ }}")&&(n.rs(e,t,function(e,t,i){i.b(" full-bleed")}),e.pop()),n.b('">'),n.b("\n"+i),n.b('  <div class="popup-inner-wrap">'),n.b("\n"),n.b("\n"+i),n.s(n.f("toolbar",e,t,1),e,t,0,218,647,"{{ }}")&&(n.rs(e,t,function(e,t,n){n.b('    <div class="'),n.s(n.f("layover",e,t,1),e,t,0,247,254,"{{ }}")&&(n.rs(e,t,function(e,t,i){i.b("toolbar")}),e.pop()),n.s(n.f("layover",e,t,1),e,t,1,0,0,"")||n.b("popup-header"),n.b('">'),n.b("\n"+i),n.b('      <div class="header">'),n.b(n.t(n.f("title",e,t,0))),n.b("</div>"),n.b("\n"+i),n.s(n.f("hideClose",e,t,1),e,t,1,0,0,"")||(n.b('        <a class="header-action close right js-close'),n.s(n.f("layover",e,t,1),e,t,1,0,0,"")||n.b(" popup-close"),n.b('">'),n.b("\n"+i),n.b('          <span class="nav-icon-close nav-icon"></span>'),n.b("\n"+i),n.b("        </a>"),n.b("\n"+i)),n.s(n.f("layover",e,t,1),e,t,0,569,619,"{{ }}")&&(n.rs(e,t,function(e,t,i){i.s(i.f("button",e,t,1),e,t,0,589,601,"{{ }}")&&(i.rs(e,t,function(e,t,i){i.b(i.rp("<button0",e,t,""))}),e.pop())}),e.pop()),n.b("    </div>"),n.b("\n"+i)}),e.pop()),n.b("\n"+i),n.b('    <div class="popup-content'),n.s(n.f("toolbar",e,t,1),e,t,0,702,714,"{{ }}")&&(n.rs(e,t,function(e,t,i){i.b(" has-toolbar")}),e.pop()),n.b('">'),n.b("\n"+i),n.b(n.rp("<content1",e,t,"      ")),n.s(n.f("layover",e,t,1),e,t,1,0,0,"")||(n.b("    </div>"),n.b("\n"+i)),n.b("\n"+i),n.b('      <div class="popup-buttons'),n.s(n.f("buttons",e,t,1),e,t,1,0,0,"")||n.b(" hide"),n.b('">'),n.b("\n"+i),n.s(n.f("buttons",e,t,1),e,t,0,878,890,"{{ }}")&&(n.rs(e,t,function(e,t,i){i.b(i.rp("<button2",e,t,""))}),e.pop()),n.b("      </div>"),n.b("\n"),n.b("\n"+i),n.s(n.f("layover",e,t,1),e,t,0,933,949,"{{ }}")&&(n.rs(e,t,function(e,t,n){n.b("    </div>"),n.b("\n"+i)}),e.pop()),n.b("\n"+i),n.b("  </div> <!-- /.popup-inner -->"),n.b("\n"),n.b("\n"+i),n.b("</div>"),n.b("\n"),n.b("\n"+i),n.s(n.f("blocking",e,t,1),e,t,0,1017,1051,"{{ }}")&&(n.rs(e,t,function(e,t,n){n.b('<div class="blocking-div"></div>'),n.b("\n"+i)}),e.pop()),n.fl()},partials:{"<button0":{name:"button",partials:{},subs:{}},"<content1":{name:"content",partials:{},subs:{}},"<button2":{name:"button",partials:{},subs:{}}},subs:{}},"",e);return t.template=i,t}),define("require/hgn!templates/button",["hogan"],function(e){function t(){return i.render.apply(i,arguments)}var i=new e.Template({code:function(e,t,i){var n=this;return n.b(i=i||""),n.b('  <div class="form-item form-item-a'),n.s(n.f("containerClasses",e,t,1),e,t,0,56,62,"{{ }}")&&(n.rs(e,t,function(e,t,i){i.b(" "),i.b(i.v(i.d(".",e,t,0)))}),e.pop()),n.b('">'),n.b("\n"+i),n.b('    <a class="form-button'),n.s(n.f("classes",e,t,1),e,t,0,123,129,"{{ }}")&&(n.rs(e,t,function(e,t,i){i.b(" "),i.b(i.v(i.d(".",e,t,0)))}),e.pop()),n.s(n.f("classes",e,t,1),e,t,1,0,0,"")||n.b(" form-button-default"),n.b('"'),n.b("\n"+i),n.b("      "),n.s(n.f("href",e,t,1),e,t,0,202,218,"{{ }}")&&(n.rs(e,t,function(e,t,i){i.b(' href="'),i.b(i.v(i.f("href",e,t,0))),i.b('"')}),e.pop()),n.b(' unselectable="on"'),n.b("\n"+i),n.b("      tabindex="),n.s(n.f("tabindex",e,t,1),e,t,0,274,288,"{{ }}")&&(n.rs(e,t,function(e,t,i){i.b('"'),i.b(i.v(i.f("tabindex",e,t,0))),i.b('"')}),e.pop()),n.b("\n"+i),n.b("      "),n.s(n.f("tabindex",e,t,1),e,t,1,0,0,"")||n.b('"0"'),n.b(">"),n.b(n.v(n.f("label",e,t,0))),n.b("</a>"),n.b("\n"+i),n.b("  </div>"),n.b("\n"),n.fl()},partials:{},subs:{}},"",e);return t.template=i,t}),define("be/View/Dialog",["jquery","nbd/View/Entity","nbd/util/extend","hgn!templates/dialog","hgn!templates/button"],function(e,t,i,n,s){"use strict";var o=t.extend({mustache:{},template:function(t){return e(n(t,i({content:this.mustache.template,button:s.template},this.partials)))},rendered:function(){this.$view.on("click",".js-close, .close, .form-button-close, .form-button-cancel",this.hide.bind(this)).find(".form-button-disabled").on("click",!1)},position:function(){},show:function(){return this.trigger("show",this.$view)},hide:function(){return this.trigger("hide",this.$view)},toggle:function(){var e=this.$view.is(":visible");return this[e?"hide":"show"]()}});return o}),define("be/View/Dialog/Layover",["jquery","be/View/Dialog"],function(e,t){"use strict";var i=t.extend({destroy:function(){this.hide(),this._super()},template:function(t){return this._super(e.extend({dialogType:"layover",layover:!0,toolbar:!0},t))},rendered:function(){this._super(),this.show()},show:function(){return this.$view?(this.scrollTop=this.scrollTop||e(window).scrollTop(),e("#site-content").hide(),e("html").addClass("overflow-hidden"),this.$view.show(),this._super()):void 0},hide:function(){return this.$view?(e("#site-content").show(),e("html").removeClass("overflow-hidden"),window.scrollTo(0,this.scrollTop),delete this.scrollTop,this.$view.hide(),this._super()):void 0}});return i}),define("lib/keyboard",["jquery","nbd/Class"],function(e,t){"use strict";var i=new(t.extend({listeners:null,globals:null,ignoredElements:{INPUT:!0,TEXTAREA:!0},init:function(t){t=t||{},this.globals=t.global||{},this.listeners=[],this.ignoredElements=e.extend({},this.ignoredElements),this.addListener=this.addListener.bind(this),this.appendListener=this.appendListener.bind(this),this.removeListener=this.removeListener.bind(this),this.addGlobal=this.addGlobal.bind(this),this.keydownHandler=this.keydownHandler.bind(this),e(document.body).on("keydown",this.keydownHandler)},destroy:function(){e(document.body).off("keydown",this.keydownHandler)},translate:function(t,i){function n(e,t){return function(i){var n=e.map(function(e){return e?e.toLowerCase()+"Key":null}).reduce(function(e,t){return e&&(t?i.originalEvent[t]:!0)},!0);return n?t.call(this,i):void 0}}var s,o,r,a=/^((?:(?:meta|shift|ctrl|alt)-)*)(.+)$/i;i=i||{};for(s in t)if(t.hasOwnProperty(s)){if(r=a.exec(s),!r)continue;o=this.constructor.keyCodes[r[2].toLowerCase()],o&&(i[o]=i[o]||e.Callbacks("unique stopOnFalse"),i[o].add(r[1]?n(r[1].split("-"),t[s]):t[s]))}return i},addListener:function(e){this.listeners.push(this.translate(e))},appendListener:function(e){this.listeners.length||this.listeners.push({}),this.translate(e,this.listeners[this.listeners.length-1])},removeListener:function(){this.listeners.pop()},addGlobal:function(e){this.translate(e,this.globals)},keydownHandler:function(e){var t=this.listeners.length?this.listeners[this.listeners.length-1]:{};(t.hasOwnProperty(e.which)||this.globals.hasOwnProperty(e.which))&&(!t[e.which]||!this.constructor.bypassCodes[e.which]&&this.ignoredElements[e.target.tagName]||t[e.which].fire(e),this.globals[e.which]&&this.globals[e.which].fire(e))},keyupHandler:function(){}},{keyCodes:{backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,pause:19,capslock:20,escape:27,pageup:33,pagedown:34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,"delete":46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},bypassCodes:{16:!0,17:!0,18:!0,19:!0,20:!0,27:!0,45:!0,112:!0,113:!0,114:!0,115:!0,116:!0,117:!0,118:!0,119:!0,120:!0,121:!0,122:!0,123:!0}}));return{on:i.addListener,off:i.removeListener,add:i.appendListener,global:i.addGlobal}}),define("be/View/Dialog/Popup",["nbd/util/extend","be/View/Dialog","lib/keyboard"],function(e,t,i){"use strict";var n=t.extend({template:function(t){return this._super(e({dialogType:"desktop",blocking:!0,toolbar:!0},t))},render:function(){return n.Z_INDEX+=2,this._zIndex=n.Z_INDEX,this._super.apply(this,arguments)},rendered:function(){this._super(),this.$view.filter(".blocking-div").on("click",this.hide.bind(this))},position:function(){if(this.$view){var e=this.$view.filter(".popup"),t=window.innerHeight||document.documentElement.offsetHeight,i=(t-e.outerHeight())/2;e.css({"z-index":this._zIndex,"margin-left":-~~(e.width()/2)+"px",top:i>0?i:void 0}).addClass("shown"),this.$view.filter(".blocking-div").css({"z-index":this._zIndex-1})}},show:function(){return this.$view?(i.on({escape:this.hide.bind(this)}),this.$view.parent().is(document.body)||this.$view.appendTo(document.body),this._super()):void 0},hide:function(){return this.$view?(i.off(),this.$view.detach(),this._super()):void 0},toggle:function(){var e=this.$view.parent().is(document.body);return this[e?"hide":"show"]()}},{Z_INDEX:250});return n}),define("require/hgn!templates/html",["hogan"],function(e){function t(){return i.render.apply(i,arguments)}var i=new e.Template({code:function(e,t,i){var n=this;return n.b(i=i||""),n.b(n.t(n.f("html",e,t,0))),n.b("\n"),n.fl()},partials:{},subs:{}},"",e);return t.template=i,t}),define("signup/trait/expedited",["jquery","vendor/spin","be/postmessage","hgn!templates/html"],function(e,t,i,n){"use strict";var s,o,r,a=1;return{mustache:n,handleMessage:function(t){var n,l,d,u,h=this,c=this._controller.constructor;try{n=JSON.parse(t.originalEvent.data)}catch(p){return}switch(n.type){case"countryChange":l="United States"===n.value||"Canada"===n.value,d=r?l?c.HEIGHT_STEP2_STATE_CAPTCHA:c.HEIGHT_STEP2_CAPTCHA:l?c.HEIGHT_STEP2_STATE:c.HEIGHT_STEP2,s.height(d);break;case"lastFieldChange":r=!0,u=l?c.HEIGHT_STEP2_CAPTCHA:c.HEIGHT_STEP2_STATE_CAPTCHA,s.height(u),h.position();break;case"signupStepTwo":s.css({height:c.HEIGHT_STEP2+"px",width:c.WIDTH_STEP2+"px"}),a=2,this.position();break;case"close":case"signupComplete":window.location.reload();break;case"openBrowser":window.location.href=n.url;break;case"unloading":e("#loading-expedited-signup").show(),s.css({visibility:"hidden"});break;case"ready":s=e("#expedited-signup"),e("#loading-expedited-signup").hide(),s.css({visibility:"visible"}),s.length&&(o=s[0].contentWindow,o&&(i({type:"expeditedSignup"},"*",o),1===a&&(i({type:"allowSocial"},"*",o),s.css({"max-height":"2000px",height:c.HEIGHT_STEP1+"px",overflow:"auto"}),this.position())))}},init:function(){this._super.apply(this,arguments),a=1,this.handleMessage=this.handleMessage.bind(this),e(window).on("message",this.handleMessage)},destroy:function(){e(window).off("message",this.handleMessage),this._super()},rendered:function(){this._super();var i=new t({lines:30,length:0,width:2,radius:9,corners:0,color:"#1769FF",speed:2,trail:100,hwaccel:!0,className:"spinner",zIndex:2e9,top:"19px",left:"20px",opacity:"0"});i.spin(e("#loading-expedited-signup").get(0))},templateData:function(){return e.extend({fullBleed:!0},this._model.data())}}}),define("signup/Controller/Expedited",["be/Controller/Dialog/Roulette","be/View/Dialog/Layover","be/View/Dialog/Popup","signup/trait/expedited"],function(e,t,i,n){"use strict";var s=i.extend(n),o=e.extend({},{HEIGHT_STEP1:491,HEIGHT_STEP2:470,HEIGHT_STEP2_STATE:510,HEIGHT_STEP2_CAPTCHA:560,HEIGHT_STEP2_STATE_CAPTCHA:600,WIDTH_STEP1:530,WIDTH_STEP2:530,VIEW_CLASS:{phone:t.extend(n),tablet:s,desktop:s}});return o}),define("signup/expedited",["jquery","has","nbd/util/media","nbd/util/async","lib/xhr","signup/Controller/Expedited"],function(e,t,i,n,s,o){"use strict";var r,a;return a={init:function(){e(document.body).on("click",".js-signup",function(t){var i=e(t.currentTarget).data("expedited_url");i&&(t.preventDefault(),this.open(i))}.bind(this))},open:function(e){if(e){var n,s=window.navigator.userAgent.match(/msie/i);if(!i.is("desktop")||Config.CCN2||s||t("touch"))return void(window.location.href=e);if(r)try{r.destroy()}catch(a){console.error(a)}e+="?skip_responsive=1",n={html:'<div id="loading-expedited-signup">Loading...</div><iframe id="expedited-signup" frameborder="0" src="'+e+'" style="width: '+o.WIDTH_STEP1+"px; overflow: hidden; visibility: hidden; height: "+o.HEIGHT_STEP1+'px;"></iframe>'},r=new o(n),r.render()}}}});