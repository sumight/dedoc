# 文档

## 按钮样式

每一个按钮都是很漂亮的

<div class="bs-callout bs-callout-info">
    <h4>输入控件组</h4>
    <p>如需在文本输入域 <code>&lt;input&gt;</code> 前面或后面添加文本内容或按钮控件，请参考<a href="../components/#input-groups">输入控件组</a>。</p>
</div>

<example>
    <template>
        <form role="form">
            <div class="checkbox">
                <label><input type="checkbox" value="">同意条款</label>
            </div>
        </form>
    </template>
    <script type="text/javascript" src>
        function abc() {
            $('.checkbox').find('label').html('哈哈哈哈');
            $('.checkbox').find('label').html('哈哈哈哈');
            $('.checkbox').find('label').html('哈哈哈哈');
        }
    </script>
</example>

<script type="text/javascript" src="http://cdn.bootcss.com/jquery/1.11.0/jquery.min.js"></script>
<!-- <script type="text/javascript" src="build/dedo.js"></script> -->
<script type="text/javascript" src="http://10.14.41.184:8080/fwd/js/dedo.js"></script>