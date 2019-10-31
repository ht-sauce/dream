<template>
  <div class="test">
    <iframe
      style="display:none"
      id="ifrm"
      src=""
      width="0px"
      height="0px"
    ></iframe>
    <span class="buttom" @click="ceshi">测试</span>
  </div>
</template>

<script>
export default {
  name: "test-toast",
  props: {},
  data() {
    return {
      list: []
    };
  },
  mounted() {
    /*$.ajax({
      type: "Get",
      url: "PrintCookie.aspx?checkInstall=9f2b1726-d2e8-433d-86b6-d72b1ef27eab",
      success: function (strResult) {
        if (strResult.indexOf("PrintControlInstall") == -1) {
          if (confirm("检测到打印控件未安装，您是否下载安装？")) {
            document.getElementById("downPrintControl").click();
          }
        }
      }
    });


    function topwebPrint(_url){
      $("#ifrm")[0].src = "ChuLinPrint:"+_url;
    }
    $(document).ready(function () {

      /!* This is basic - uses default settings *!/

      $("a.single_image").fancybox();

      /!* Using custom settings *!/

      $("a#inline").fancybox({
        'hideOnContentClick': true
      });

      /!* Apply fancybox to multiple items *!/

      $("a.group").fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 600,
        'speedOut': 200,
        'overlayShow': false
      });
    });*/
  },
  methods: {
    ceshi() {
      let ifrm = document.querySelector("#ifrm");
      ifrm.src = "ChuLinPrint:" + "http://www.clprint.cn/file/4.txt";
    }
  }
};
</script>

<style lang="scss">
.test {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .buttom {
    display: inline-block;
    background: #409eff;
    color: #ffffff;
    width: 80px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    &:active {
      background: #93e0ff;
    }
  }
}
</style>
