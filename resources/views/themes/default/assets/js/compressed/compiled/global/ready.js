(function(){var t,e,n,a,s,i,o,r,l,c,u,d,f,h,p,v,b,m,g,x,C,w,k,y,_,D,I;t=jQuery,n=t(document),s=t("html"),e=t(document.body).removeClass("nojs"),i=t(document.getElementById("page")),t.expr[":"].containsNS=t.expr.createPseudo(function(e){return function(n){var a;return a=t(n).text().substring(0,e.length).toUpperCase(),a===e.toUpperCase()}}),l=function(e,a){var s;return s=e.children().removeClass("filtered"),""!==a&&s.has(':not(:containsNS("'+a+'"))').not(".filter").addClass("filtered"),C(u(n),t(":focus"))},t(document).on("cbox_open",function(){var a,s;return a=u(n),s=a.index(t(this)),e.data("focus-recall-id",s)}),t(document).on("cbox_complete",function(){var e,n;return n=u(t(document.getElementById("colorbox"))),e=n.first(),C(n,e)}),t(document).on("cbox_close",function(){var t,a,s;return s=parseInt(e.data("colorbox-focus-id"),10),a=u(n),t=a.length>=s?a.eq(s):a.first(),C(a,t)}),m=function(e,n){var a,s,i;return i=parseInt(e.attr("tabindex"),10)+1,s=i-2,a=t("*[tabindex='"+i+"']"),0===a.length&&(a=t("undefined"!=typeof n&&n||1>s?"*[tabindex='1']":"*[tabindex='"+s+"']")),a},k=function(t,e,n){var a;return n=n||"",t.find(".last").removeClass("last"),a=t.find(e).last(),0===a.length&&""!==n&&(a=t.find(n)),a.addClass("last")},h={"fa-check":"&#xf00c;","fa-times":"&#xf00d;","fa-sort":"&#xf0dc;","fa-trash-o":"&#xf014;","fa-times-circle":"&#xf057;","fa-caret-square-o-down":"&#xf150;","fa-caret-square-o-up":"&#xf151;","fa-search":"&#xf002;"},c=function(a,s){var i,o,r,l;switch(l=s.url.split(":")[1],a){case"delete":r="<div class='dialog'><h2>"+lang_global_forms.delete_item+"</h2><p>"+lang_global_forms.confirm_delete+"</p><div class='dialog-buttons'><a class='button' href='"+l+"'><span class='button-icon fa-check'>"+h["fa-check"]+"</span><span class='button-label'>"+lang_global_forms.ok+"</span></a><a href='#' class='button cancel'><span class='button-icon fa-times'>"+h["fa-times"]+"</span><span class='button-label'>"+lang_global_forms.cancel+"</span></a></div>\n</div>"}return i=u(n),o=-1,i.each(function(e,n){var a;return a=t(n),a.attr("href")===l?o=e:void 0}),e.data("colorbox-focus-id",o),t.colorbox({html:r,scrolling:!1,closeButton:!1})},g=function(t){var e,n;return n=t.split("?")[1],e={},n.replace(/([^&=]+)=?([^&]*)(?:&+|$)/g,function(t,n,a){return(e[n]=e[n]||[]).push(a)}),e},u=function(t){return t.find('a[href], input, button, textarea, *[contenteditable="true"]').filter(":not(.disabled)").filter(":visible")},C=function(e,n){return t("*[tabindex]").attr("tabindex","-1"),e.each(function(e,n){var a;return a=t(n),a.attr("tabindex",e+1)}),n.focus()},I=function(e,a){var s,i;return e.preventDefault(),i=t(a),s=i.parent(),s.hasClass("inactive")?i.next().slideDown("fast",function(){var e,a,i;return s.removeClass("inactive").addClass("active"),a=u(n),e=u(t(this)).first(),C(a,e),i=t(this).closest("ul.select"),k(i,"a.option:visible","li.filter"),i.length>0?x(i,i.find("a.label"),i.find("a.close"),"right"):void 0}):i.next().slideUp("fast",function(){var t,e;return s.removeClass("active").addClass("inactive"),e=u(n),t=i,C(e,t)})},x=function(e,a,s,i){var r,l,c,d,f;return d=a.offset(),c=d.left,f="right"===i?c+a.outerWidth():c-s.outerWidth(),s.css({left:f+"px"}),D(e)?e.addClass("top_is_visible"):e.removeClass("top_is_visible"),s.css(o(e)?{position:"absolute",left:a.outerWidth()+"px"}:{position:"fixed",left:c+a.outerWidth()+"px"}),l=u(n),r=t(":focus"),0===r.length&&(r=u(e).first()),C(l,r)},D=function(e){var n,a,s,i,o;return i=e.offset().top,a=e.outerHeight(),n=t(window),o=n.height(),s=n.scrollTop(),o+s>i&&i>s},o=function(e){var n,a,s,i,o;return i=e.offset().top,a=e.outerHeight(),n=t(window),o=n.height(),s=n.scrollTop(),o+s>a+i},Dropzone.autoDiscover=!1,n.on("click","ul.select > li > a",function(t){return I(t,this)}),n.on("scroll",function(){return t("a.close").each(function(){var e,a,s,i,r;return i=t(this),s=t(this).closest("ul.select"),s.length>0?(r=s.find("a.label"),D(s)?s.addClass("top_is_visible"):s.removeClass("top_is_visible"),i.css(o(s)?{position:"absolute",left:r.outerWidth()+"px"}:{position:"fixed",left:s.offset().left+r.outerWidth()+"px"}),a=u(n),e=t(":focus"),0===e.length&&(e=u(s).first()),C(a,e)):void 0})}),n.on("click","a.cancel",function(a){var s,i,o;return a.preventDefault(),t.colorbox.remove(),i=u(n),o=parseInt(e.data("colorbox-focus-id"),10),s=i.length>=o?i.eq(o):i.first(),C(i,s)}),n.on("click","a.delete",function(t){var e;return t.preventDefault(),e={url:this.href},c("delete",e)}),d=function(e,n,a,s){return t("<div id='"+e+"' class='colorbox'><div id='"+e+"-tabs' class='tabs'><ul class='etabs clear-fix'><li class='tab'><a href='#"+e+"-new'>"+lang_global_forms["new"]+"</a></li><li class='tab'><a href='#"+e+"-existing'>"+lang_global_forms.existing+"</a></li></ul><ul id='"+e+"-new' class='tab-contents dropzone files'></ul><div id='"+e+"-existing' class='tab-contents' data-url='"+n+"' data-attachment_type='"+s+"' data-target_id='"+a+"'></div></div>\n</div>")},w=function(t,e,n){var a,s;return null==n&&(n=-1),s="<span class='icon'>"+h["fa-times"]+"</span>",a=" data-value='"+e.val()+"'",a+=-1===n?" class='unselect button unselected'":" class='unselect button'","<a href='#'"+a+">"+e.text()+s+"</a>"},v=function(t,e,n){var a;return null==n&&(n=-1),a=n>-1?" class='selected'":"","<li"+a+"><a class='option' href='#"+t+"' data-value='"+e.val()+"'>"+e.html()+"</a></li>"},b=function(e,a,s){var i,o,r,l,c,d,f;return l=e.find('option[selected="selected"]'),c=t("<div class='selected'></div>"),f=new Array,l.each(function(){return f.push(this.value)}),a.length!==l.length?(d="<ul class='multiselect select'><li class='inactive'>",d+="<a href='#' class='button label'>"+s+"<span class='icon'>"+h["fa-sort"]+"</span></a>",d+="<ul class='options'>",d+="<li class='filter'><div class='clearfix'><span class='icon'>"+h["fa-search"]+"</span><span class='editable' contentEditable='true'></span></div></li>",a.each(function(){var n,a,s;return n=t(this),a=e.attr("id"),s=t.inArray(this.value,f),d+=v(a,n,s),c.append(w(a,n,s))}),d+="</ul><a href='#' class='close icon'>"+h["fa-times-circle"]+"</a></li></ul>"):(e.addClass("disabled"),d="<ul class='multiselect select'><li><a class='label disabled'>"+s+" "+current+"<span class='icon disabled'>"+h["fa-sort"]+"</span></a></li></ul>"),e.before(c),r=t(d),e.after(r),o=u(n),i=t(":focus"),0===i.length&&(i=o.first()),C(o,i)},y=function(e,a,s){var i,o,r,l,c;return l=e.find('option[selected="selected"]').html(),a.length>1?(c="<ul class='singleselect select'><li class='inactive'>",c+="<a href='#' class='label'>"+s+"<span class='current'> "+l+"</span><span class='icon'>"+h["fa-sort"]+"</span></a>",c+="<ul class='options'>",a.each(function(){var n;return n=t(this),c+=option_html(e.attr("id"),n)}),c+="</ul><a href='#'>Close Select</a></li></ul>"):(e.addClass("disabled"),c="<ul class='singleselect select'><li><a class='label disabled'>"+s+" "+l+"<span class='icon disabled'>"+h["fa-sort"]+"</span></a></li></ul>"),r=t(c),e.after(r),o=u(n),i=t(":focus"),0===i.length&&(i=o.first()),C(o,i)},n.on("click","ul.select a.close",function(e){return e.preventDefault(),t(this).closest("ul.select").find("a.label").click()}),n.on("keyup","li.filter span.editable",function(){var e,n;return n=t(this),l(n.closest("ul, ol"),n.text()),e=n.closest("ul"),k(e,"a.option:visible","li.filter")}),n.on("keypress","li.filter span.editable",function(t){return 13!==t.which}),n.on("keyup","ul.select",function(e){var n,a,s,i;switch(e.which){case 38:return s=t(this),i=parseInt(s.find(":focus").attr("tabindex"),10)-1,a=s.find("*[tabindex='"+i+"']").not("a.close"),0===a.length&&(a=s.find("li").last().find("*[tabindex]")),a.focus();case 40:return s=t(this),i=parseInt(s.find(":focus").attr("tabindex"),10)+1,n=s.find("*[tabindex='"+i+"']").not("a.close"),0===n.length&&(n=s.find("li").first().find("*[tabindex]").first()),n.focus()}}),n.on("click","div.selected a.unselect",function(e){var a,s,i,o,r;return e.preventDefault(),o=t(this).focus(),o.addClass("unselected"),r=o.data("value"),i=o.closest("div.selected").next(),s=i.next(),s.find("a[data-value='"+r+"']").parent().removeClass("selected"),k(s,"a.option:visible","li.filter"),i.find("option[value='"+r+"']").prop("selected",!1).removeAttr("selected"),a=m(o),C(u(n),a)}),n.on("click","ul.multiselect a.option",function(e){var a,s,i,o,r,l,c,d,f;return e.preventDefault(),c=t(this),i=c.closest("li"),d=parseInt(c.attr("tabindex"),10)+1,i.addClass("selected"),o=i.closest("ul.select"),a=t("*[tabindex='"+d+"'"),0!==a.length&&a.hasClass("option")||(a=t("*[tabindex='"+(d-2)+"']"),0===a.length&&(a=o.find("*[contentEditable='true']"))),s=u(n),C(s,a),f=c.data("value"),k(o,"a.option:visible","li.filter"),r=o.prev(),r.find("option[value='"+f+"']").prop("selected",!0).attr("selected","selected"),l=r.prev(),l.find("a[data-value='"+f+"']").removeClass("unselected")}),n.on("click","ul.singleselect a.option",function(e){var n,a,s;return e.preventDefault(),s=t(this),a=t(s.attr("href")),a.val(s.data("value")),a.find('option[selected="selected"]').removeAttr("selected"),n=s.closest("ul").prev(),n.find("span.current").html(" "+s.html()),n.click()}),t("select").each(function(){var e,n,a,s;return a=t(this),e=a.prev().hide(),s=e.html(),n=a.find("option"),n.length<1?void 0:"multiple"===a.attr("multiple")?b(a,n,s):y(a,n,s)}),n.on("click","ul.etabs",function(e){var n,a,s,i,o,r,l,c;return l=e.target,"A"===l.tagName&&(r=!1,t(this).find("[data-href]").each(function(){var e;return this!==l?(e=t(this),e.attr("href",e.data("href")).removeAttr("data-href")):r=!0}),!r&&(s=t(l),o=s.attr("href"),s.attr("data-href",o).removeAttr("href"),n=t(o),i=n.data("attachment_type"),c=n.data("url"),/existing/.test(o)&&(a=t(document.getElementById("existing-files-"+o)),0===a.length)))?t.ajax({url:c+".json",dataType:"json",success:function(e){return a=t("<ul id='existing-files-"+o+"' class='files'></ul>"),t.each(e.records,function(e,s){var o,r;return r=n.data("target_id"),o=s.label,t.each(s.values,function(t,e){return"file-description"===e.field.slug?(o=e.current_revision.contents,!1):void 0}),"images"===i?a.append("<li><a class='file_select' title='"+s.label+"' href='"+c+"/"+s.slug+"' data-record_id='"+s.id+"' data-target_id='"+r+"'><img src='"+c+"/"+s.slug+"' alt='"+o+"' /><span class='caption'>"+s.label+"</span></a>\n</li>"):void 0}),n.append(a)},error:function(e){var n;return 404===e.status?(n=t.parseJSON(e.responseText),$id.html("<h1>HttpError: 404</h1><div class='error'>"+n.reason+"</div>")):void 0}}):void 0}),n.on("click","a.file_select",function(e){var n,a;return e.preventDefault(),a=t(this),n=t(document.getElementById(a.data("target_id"))),n.val(a.data("record_id")),t.colorbox.close()}),s.hasClass("lt-ie8")&&(r="*{noFocusLine: expression(this.hideFocus=true);}",f=document.getElementsByTagName("head")[0],_=document.createElement("style"),_.type="text/css",_.styleSheet.cssText=r,f.appendChild(_),e.height()>i.height()&&i.css("height",e.height()),t("form").each(function(){var e;return e=t(this),e.find("input[type=submit]").each(function(){return e=t(this),e.after("<a href='#' tabindex='"+e.attr("tabindex")+"' class='button submit'>"+e.val()+"</a>").remove()}),e.find("input[type=reset]").each(function(){return e=t(this),e.after("<a href='#' tabindex='"+e.attr("tabindex")+"' class='button reset'>"+e.val()+"</a>").remove()}),e.find("input[type=button]").each(function(){return e=t(this),e.after("<a href='#' tabindex='"+e.attr("tabindex")+"' class='button'>"+e.val()+"</a>").remove()})}),n.on("mousedown","label.checkbox",function(){return t(this).find("input.checkbox").focus()}),n.on("click","a.submit",function(e){return e.preventDefault(),t(this).closest("form").submit()}),n.on("focus","input, textarea",function(){var e;return e=t(this),(e.hasClass("file")||e.hasClass("checkbox"))&&e.next().addClass("focused"),e.addClass("focused")}),n.on("blur","input, textarea",function(){var e;return e=t(this),(e.hasClass("file")||e.hasClass("checkbox"))&&e.next().removeClass("focused"),e.removeClass("focused")}),n.on("keydown","input[type=file]",function(e){var n,a;return n=t(this),13===(a=e.which)||32===a?(e.preventDefault(),n.click()):void 0}),n.on("keydown","input[type=text], input[type=password]",function(e){var n;return n=t(this),13===e.which?n.closest("form").submit():void 0})),n.on("mouseup",function(){return t(".active-button").removeClass("active-button"),t(".active-checkbox").removeClass("active-checkbox")}),n.on("mousedown",".button, button",function(){return t(this).addClass("active-button")}),n.on("focus",".button, button",function(){return t(this).addClass("focused-button")}),n.on("blur",".button, button",function(){return t(this).removeClass("focused-button")}),(s.hasClass("opacity")||s.hasClass("ie"))&&(n.on("mousedown","label.checkbox",function(){return t(this).find("span.faux-checkbox").addClass("active-checkbox")}),t("form").each(function(){var e;return e=t(this),s.hasClass("lt-ie8")===!1&&e.find("input.checkbox").each(function(){return t(this).after("<span class='faux-checkbox' id='for-"+this.id+"'> <span unselectable='on' class='checkmark'>&#x2713;</span> </span>")}),e.find("a.file").each(function(){var n,a,s,i,o,r,l,c,u;return e=t(this),i=this.href.split("#")[1],l=e.data("prefix")+"/records/create?type="+i,u=e.data("token"),c=e.data("target_id"),s=d(i,e.data("path"),c,e.data("attachment_type")),t("body").append(s),r="<li><a class='dz-preview dz-file-preview'><img data-dz-thumbnail /><div class='dz-progress'><span class='dz-upload' data-dz-uploadprogress></span></div><span class='caption'>"+lang_global_forms.uploading+"</span></a>\n</li>",o=new Dropzone("#"+i+"-new",{url:e.data("url"),thumbnailWidth:500,thumbnailHeight:500,previewTemplate:r,dictDefaultMessage:lang_global_forms.dropzone}),o.on("sending",function(t,e,n){return n.append("_token",u)}),o.on("success",function(e,n){var a,s,i;return i=n.uri,l=n.record,s="<div class='dz-success-mark'><span class='button-icon'>"+h["fa-check"]+"</span></div>",a=t(e.previewElement).children().first(),a.addClass("dz-success").addClass("file_select"),a.attr("title",l.label).attr("href",i+"/"+l.slug),a.data("record_id",l.id).data("target_id",c),a.find("img").attr("alt",l.label),a.find(".caption").first().html(l.label).after(s)}),o.on("error",function(e,n){var a,s,i;return"object"==typeof n?n=n.error:(s=t(n),n=s.find("h1").first().html()),a=t(e.previewElement).children().first(),i=0,a.children().each(function(){return i+=t(this).outerHeight(!0)}),s=t("<div class='dz-error-message' style='height:"+i+"px'><span>"+n+"</span></div>"),a.removeAttr("href").addClass("dz-error"),a.html("").append(s),a.on("click",function(t){return t.preventDefault()})}),a=t(document.getElementById(i+"-tabs")),a.easytabs({updateHash:!1}),n=a.find("ul.etabs a").first(),n.attr("data-href",n.attr("href")).removeAttr("href"),e.colorbox({inline:!0,fixed:!0,width:"50%",height:"80%",scrolling:!1,onComplete:function(){var n,a;return t("body").css({overflow:"hidden"}),n=t(document.getElementById("cboxLoadedContent")),n.find(".colorbox").css({height:n.height()+"px"}),n.find(".dropzone").first().focus(),n.get(0).scrollTop=0,a=n.find(".etabs").first().outerHeight(),n.find(".tab-contents").each(function(){var s;return e=t(this),s=e.outerHeight()-e.height(),t(this).height(n.height()-a-s)})},onCleanup:function(){return i=e.closest(".colorbox").attr("id"),t("a[href=#"+i+"-new]").click()},onClosed:function(){return t("body").css({overflow:"auto"})}})})}),n.on("focus","input.file",function(){return t(this).next().addClass("focused-button")}),n.on("blur","input.file",function(){return t(this).next().removeClass("focused-button")}),"Opera"===navigator.appName&&(n.on("keydown","*[tabindex]",function(e){var n,a,s,i;if(9===e.which)if(a=t(e.target),n=t("*[tabindex]").not('[tabindex="-1"]').sort(function(e,n){var a,s;return a=parseInt(t(e).attr("tabindex")),s=parseInt(t(n).attr("tabindex")),a-s}),s=n.index(a),i=n.length-1,e.shiftKey){if(0!==s)return e.preventDefault(),e.stopPropagation(),a.blur(),setTimeout(function(){return n.eq(s-1).focus()},1)}else if(s!==i)return e.preventDefault(),e.stopPropagation(),a.blur(),setTimeout(function(){return n.eq(s+1).focus()},1)}),n.on("keydown","input.file",function(e){var n,a;return 13===(a=e.which)||32===a?(n=t(this),e.preventDefault(),e.stopPropagation(),n.click()):void 0})),s.hasClass("ie")&&(n.on("keydown","div.upload a.button",function(e){var n,a;return 13===(a=e.which)||32===a?(n=t(this),e.preventDefault(),e.stopPropagation(),n.click()):void 0}),n.on("click","div.upload a.button",function(e){var n;return e.preventDefault(),n=t(document.getElementById(this.id.substring(4))),t(":focus").blur(),n.click(),t(this).focus()})),n.on("click","label.checkbox",function(e){var n;return e.preventDefault(),n=t(this),t("#"+n.attr("for")).click()}),n.on("click","input.checkbox",function(e){var n;return e.stopPropagation(),n=t(this),n.is(":checked")===!0?n.parent().addClass("checked"):n.parent().removeClass("checked")})),a=t(document.getElementById("gallery")),a.find(".gallery").colorbox({rel:"gallery",photo:!0,maxHeight:"90%",maxWidth:"90%"}),t(document).on("click","ul.tabular > li > a",function(e){var n,a;return I(e,this),a=t(this),n=t(this).find("span.icon"),n.html(a.parent().hasClass("active")?h["fa-caret-square-o-down"]:h["fa-caret-square-o-up"])}),t.fn.flexNav=function(e){var n,a,s,i,o,r,l,c;return l=t.extend({animationSpeed:250,transitionOpacity:!0,buttonSelector:".menu-button",hoverIntent:!1,hoverIntentTimeout:150},e),n=t(this),s=!1,n.addClass("with-js"),l.transitionOpacity===!0&&n.addClass("opacity"),n.find("li").each(function(){return t(this).has("ul").length?t(this).addClass("item-with-ul").find("ul").hide():void 0}),n.data("breakpoint")&&(a=n.data("breakpoint")),c=function(){return n.hasClass("lg-screen")===!0?l.transitionOpacity===!0?t(this).find(">ul").addClass("show").stop(!0,!0).animate({height:["toggle","swing"],opacity:"toggle"},l.animationSpeed):t(this).find(">ul").addClass("show").stop(!0,!0).animate({height:["toggle","swing"]},l.animationSpeed):void 0},i=function(){return n.hasClass("lg-screen")===!0&&t(this).find(">ul").hasClass("show")===!0?l.transitionOpacity===!0?t(this).find(">ul").removeClass("show").stop(!0,!0).animate({height:["toggle","swing"],opacity:"toggle"},l.animationSpeed):t(this).find(">ul").removeClass("show").stop(!0,!0).animate({height:["toggle","swing"]},l.animationSpeed):void 0},o=function(){if(t(window).width()<=a)return n.removeClass("lg-screen").addClass("sm-screen"),t(".one-page li a").on("click",function(){return n.removeClass("show")});if(t(window).width()>a){if(n.removeClass("sm-screen").addClass("lg-screen"),n.removeClass("show"),l.hoverIntent===!0)return t(".item-with-ul").hoverIntent({over:c,out:i,timeout:l.hoverIntentTimeout});if(l.hoverIntent===!1)return t(".item-with-ul").on("mouseenter",c).on("mouseleave",i)}},t(l.buttonSelector).data("navEl",n),r=".item-with-ul, "+l.buttonSelector,t(r).append('<span class="touch-button"><i class="navicon">&#9660;</i></span>'),r=l.buttonSelector+", "+l.buttonSelector+" .touch-button",t(r).on("touchstart click",function(e){var n,a,i;return e.preventDefault(),e.stopPropagation(),i=l.buttonSelector,n=t(this).is(i)?t(this):t(this).parent(i),a=n.data("navEl"),s===!1?(s=!0,setTimeout(function(){return s=!1},301),a.toggleClass("show")):void 0}),t(".touch-button").on("touchstart click",function(e){var a,i;if(e.preventDefault(),e.stopPropagation(),a=t(this).parent(".item-with-ul").find(">ul"),i=t(this).parent(".item-with-ul").find(">span.touch-button"),s===!1){if(s=!0,setTimeout(function(){return s=!1},301),n.hasClass("lg-screen")===!0&&t(this).parent(".item-with-ul").siblings().find("ul.show").removeClass("show").hide(),a.hasClass("show")===!0)return a.removeClass("show").slideUp(l.animationSpeed),i.removeClass("active");if(a.hasClass("show")===!1)return a.addClass("show").slideDown(l.animationSpeed),i.addClass("active")}}),n.find(".item-with-ul *").focus(function(){return t(this).parent(".item-with-ul").parent().find(".open").not(this).removeClass("open").hide(),t(this).parent(".item-with-ul").find(">ul").addClass("open").show()}),o(),t(window).on("resize",o)},t(".flexnav").flexNav(),p=function(){var e,n;return n=u(t(document)),e=n.first(),C(n,e),t("select").attr("tabindex","-1")}()}).call(this);