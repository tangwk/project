<template>
  <!-- <div id="container">
            <canvas id="the-canvas"></canvas>
            <div class="foot" v-if='pdfDoc'>
              <button class='left' v-if="pageNum>1" @click="onPrevPage">上一页</button>
              <button class='right' v-if="pageNum<pdfDoc.numPages" @click="onNextPage">下一页</button>
            </div>
        </div> -->
  <div>
    <iframe id="dv" :src="this.imgSrc" frameborder="0" width="100%"></iframe>
  </div>
</template>

<script>
  import PDFJS from 'pdfjs-dist'
  export default {
    name: 'pdfFile',
    data() {
      return {
        pdfDoc: null,
        pageNum: 1,
        pageRendering: false,
        pageNumPending: null,
        scale: 0.9,
        $url: '',
        fileUrl: "",
        imgSrc: "",
      }
    },
    methods: {
      demo() {
        if (this.$route.query.url) {
          var name = encodeURIComponent(this.$route.query.url)
          var imgSrc = "";
          imgSrc =
            'http://tc.ccpph.com.cn/Psms' +
            "/downloadPdf?name=" +
            name +
            "&t=" +
            sessionStorage.getItem("token");
            this.imgSrc = imgSrc
          //  this.fileUrl=encodeURIComponent(imgSrc)
        }
      }
      // showPDF (url) {
      //   let _this = this
      //   PDFJS.getDocument(url).then(function (pdf) {
      //     _this.pdfDoc = pdf
      //     _this.renderPage(1)
      //   })
      // },
      // renderPage (num) {
      //   //====================================
      //   this.pageRendering = true
      //   let _this = this
      //   this.pdfDoc.getPage(num).then(function (page) {
      //     var viewport = page.getViewport(_this.scale)
      //     let canvas = document.getElementById('the-canvas')
      //     canvas.height = viewport.height
      //     canvas.width = viewport.width
      //     var renderContext = {
      //       canvasContext: canvas.getContext('2d'),
      //       viewport: viewport
      //     }
      //     var renderTask = page.render(renderContext)
      //     renderTask.promise.then(function () {
      //       _this.pageRendering = false
      //       if (_this.pageNumPending !== null) {
      //         this.renderPage(_this.pageNumPending)
      //         _this.pageNumPending = null
      //       }
      //     })
      //   })
      // },
      // queueRenderPage (num) {
      //   if (this.pageRendering) {
      //     this.pageNumPending = num
      //   } else {
      //     this.renderPage(num)
      //   }
      // },
      // onPrevPage () {
      //   if (this.pageNum <= 1) {
      //     return
      //   }
      //   this.pageNum--
      //   this.queueRenderPage(this.pageNum)
      // },
      // onNextPage () {
      //   if (this.pageNum >= this.pdfDoc.numPages) {
      //     return
      //   }
      //   this.pageNum++
      //   this.queueRenderPage(this.pageNum)
      // }
    },
    mounted() {
      // this.$url = this.$route.query.url
      // this.showPDF(this.$url)
      this.demo()
    },
  }
</script>

<style scoped>
  #container {
    background-color: rgba(0, 0, 0, 0.75);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
    padding: 5px;
  }
  .pdf-page {}
  .foot {
    position: fixed;
    transform: translate(-50%, 0);
    left: 50%;
  }
  #dv {
    height: 100vh;
  }
</style>
