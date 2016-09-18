var hljs = require('highlight.js');
var _ = require('underscore');
var beautify_js = require("js-beautify");
var beautify_html = require('js-beautify').html;
require('./node_modules/highlight.js/styles/github.css');
require('./src/docs.css');
// require('./src/docs.js');
require('./src/docs.override.css');

function template() {
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

function openCode() {
    var $codeArea = $(this).parent().find('.bs-code');
    $codeArea.slideToggle();
}

function createIframe(parent, content) {
    content = content.replace(/\n/g, '');
    var iframe = document.createElement('iframe');
    parent.appendChild(iframe);
    iframe.contentWindow.document.body.innerHTML = content;
    iframe.style.width = '100%';
}

function renderExample($example) {

    var $examplePost = $(template());
    // 获取 html 字符串
    var htmlStr = $example.find('template').not('.imports').html();
    // 获取 js 字符串
    var jsStr = $example.find('script[src=""]').html();
    // 替换元素
    $example.replaceWith($examplePost);

    // 向iframe 中注入组件
    var iframe = document.createElement('iframe');
    $examplePost.find('.bs-example')[0].appendChild(iframe);

    // 执行 html
    if (_.isString(htmlStr)) {
        iframe.contentWindow.document.body.innerHTML = htmlStr;
    }
    // 执行 lib 资源引入
    var scriptCount = 0; // 用来统计脚本是否全部加载完毕
    var $imports = $($example.find('.imports').html()).add($('.global-imports').html());
    console.log($imports);
    $imports.filter('script').each(function() {
        var document = iframe.contentWindow.document;
        var script = document.createElement('script');
        script.src = this.src;
        script.type = this.type;
        document.body.appendChild(script);
        // 将会加载一个脚本
        scriptCount++;
        script.onload = function() {
            // 一个脚本加载完毕
            scriptCount--;
            // 如果所有脚本加载完毕
            if (scriptCount === 0) {
                $example.trigger('example.importsloaded');
            }
        }
    });
    $imports.filter('link').each(function() {
        var document = iframe.contentWindow.document;
        var link = document.createElement('link');
        link.rel = this.rel;
        link.type = this.type;
        link.href = this.href;
        document.body.appendChild(link);
    });
    // 执行代码
    if (!_.isUndefined(jsStr)) {
        (function() {
            var document = iframe.contentWindow.document;
            var script = document.createElement('script');
            script.innerHTML = jsStr;
            $example.on('example.importsloaded', function() {
                document.body.appendChild(script);
            })
        })()
    }

    // 渲染 html 代码
    if (!_.isUndefined(htmlStr)) {
        var $htmlCode = $examplePost.find('.bs-lang-html code');
        htmlStr = beautify_html(htmlStr);
        $htmlCode.html(_.escape(htmlStr));
        hljs.highlightBlock($htmlCode.get(0));
    } else {
        $('.bs-lang-html').remove();
    }

    // 渲染 js 代码
    if (!_.isUndefined(jsStr)) {
        var $jsCode = $examplePost.find('.bs-lang-js code');
        jsStr = beautify_js(jsStr);
        $jsCode.html(jsStr);
        hljs.highlightBlock($jsCode.get(0));
    } else {
        $('.bs-lang-js').remove();
    }

    if ($examplePost.find('.bs-lang-js, .bs-lang-html').length === 0) {
        $('.bs-btn-show-code, .bs-code').remove();
    }

    $examplePost.find('.bs-btn-show-code').on('click', openCode);
}

// 启动
jQuery(function($) {
    $('example').each(function() {
        renderExample($(this));
    });
});
