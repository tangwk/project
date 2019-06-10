 <template>
  <div class="tplBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
  </div>
</template>

<script>
import commonBread from '../components/bread'
export default {
  name: '',
  data () {
    return {
      
    }
  },
  components: {
    commonBread
  }
}
</script>

<style lang="less" scoped>
@import '../style/mix';
.tplBor{
  .wh(100%,100%);
  .crumbs{
    height: 40px;
    margin: 10px 10px 10px 15px;
    background-color: @fc;
  }
}
</style>
