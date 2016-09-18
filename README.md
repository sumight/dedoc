# Dedoc

A library for generate demo in html quickly, also supports markdown。Unfortunately she dependence jQuery.

## Example 

```html
    <!-- Every example will import script or sytle in global-imports -->
    <template class="global-imports">
        <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css">
        <script type="text/javascript" src="http://cdn.bootcss.com/jquery/1.11.0/jquery.min.js"></script>
        <script src="http://cdn.bootcss.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
    </template>

    <!-- An example that you want to show -->
    <example>
        <!-- The html , you can set the height of viewport -->
        <template height="300"> 
            <button type="button" class="btn btn-primary btn-lg js-modal">Launch demo modal</button>
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                ...
            </div>
        </template>
        <!-- If you example depends on any script or style, put thay here -->
        <template class="imports">
            <script type="text/javascript" src="example.js"></script>
            <link rel="stylesheet" type="text/css" href="example.css">
        </template>
        <!-- The script -->
        <script type="text/javascript" src>
            $('.js-modal').on('click', function(){
                alert('sss');
                $('#myModal').modal();
            })
        </script>
    </example>
```

#### outcome

![xx](http://sumight.oss-cn-shanghai.aliyuncs.com/sundry/dedoc.png)