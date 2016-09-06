var hljs = require('highlight.js');
var _ = require('underscore');
var beautify_js = require("js-beautify").js;
var beautify_html = require('js-beautify').html;
require('./node_modules/highlight.js/styles/github.css');
require('./src/docs.css');
require('./src/docs.js');
require('./src/docs.override.css');

function template(){
    return '<div class="bs-example-wrapper">\
                <div class="bs-example">\
                </div>\
                <div class="bs-code">\
                    <div class="highlight bs-lang-html">\
                        <pre><code class="html"></code></pre>\
                    </div>\
                    <div class="highlight bs-lang-js">\
                        <pre><code class="javascript"></code></pre>\
                    </div>\
                </div> \
                <a href="javascript:;" class="bs-btn-show-code">代码</a>\
            </div>';
}


function renderExample($example){

    var $examplePost = $(template());
    // 获取 html 字符串
    var htmlStr = $example.find('template').html();
    // 获取 js 字符串
    var jsStr = $example.find('script').html();
    // 替换元素
    $example.replaceWith($examplePost);
    // 渲染html
    if(_.isUndefined(htmlStr)){
        $('.bs-example').remove();
    }else{
        $examplePost.find('.bs-example').html(htmlStr);
    }

    // 执行代码
    if(!_.isUndefined(jsStr)){
        eval(jsStr);
    }
    // 渲染 html 代码
    if(!_.isUndefined(htmlStr)){
        var $htmlCode = $examplePost.find('.bs-lang-html code');
        htmlStr = beautify_html(htmlStr);
        $htmlCode.html(_.escape(htmlStr));
        hljs.highlightBlock($htmlCode.get(0));
    }else{
        $('.bs-lang-html').remove();
    }
    // 渲染 js 代码
    if(!_.isUndefined(jsStr)){
        var $jsCode = $examplePost.find('.bs-lang-js code');
        jsStr = beautify_html(jsStr);
        $jsCode.html(jsStr);
        hljs.highlightBlock($jsCode.get(0));
    }else{
        $('.bs-lang-js').remove();
    }

    if($examplePost.find('.bs-lang-js, .bs-lang-html').length === 0){
        $('.bs-btn-show-code, .bs-code').remove();
    }
}

// 启动
jQuery(function($){
    $('example').each(function(){
        renderExample($(this));
    });
});

window.renderExample = renderExample;