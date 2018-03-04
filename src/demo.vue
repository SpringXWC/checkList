 <template>
  <div class="cl-div">
    <div class="center">复选框列表</div>
    <div class="inputText">
      <input type="text" placeholder="请选择地址" @focus="openChecklist">
    </div>
    <p v-for="(item,index) in changeVal">{{item.title}}</p>
    <check-list ref="checklist"
                :max="3" 
                :data-list="data"
                :checkbox-left="false" 
                @confirm="changeValue">
    </check-list>
    
  </div>
</template>
<script>
  import checkList from "./components/checklist/checklist.vue";
  export default{
    components:{
      checkList
    },
    data(){
      return{
        changeVal:[],
        data:[
          {
            title:'深圳宝安',
            value:'1',
            address:'深圳宝安1路'
          },
           {
            title:'深圳龙华新区',
            value:'2',
            address:'深圳龙华新区1路'
          },
           {
            title:'深圳盐田',
            value:'3',
            address:'深圳盐田1路'
          },
           {
            title:'深圳南山',
            value:'4',
            address:'深圳南山1路'
          },
           {
            title:'深圳福田',
            value:'5',
            address:'深圳福田1路'
          },
          {
            title:'深圳光明新区',
            value:'6',
            address:'深圳光明新区1路'
          },
          {
            title:'深圳龙岗',
            value:'7',
            address:'深圳龙岗1路'
          },
          {
            title:'深圳罗湖',
            value:'8',
            address:'深圳罗湖1路'
          },
          {
            title:'深圳坪山',
            value:'9',
            address:'深圳坪山1路'
          },
          {
            title:'深圳大鹏',
            value:'10',
            address:'深圳大鹏1路'
          },
        ],
        
      }
    },
    methods:{
      openChecklist(){
        this.$refs['checklist'].show();

      },
      changeValue(val){
        this.changeVal = val;
      }, 
    }
  }
</script>
<style scoped>
  .center{
    text-align: center;
    font-size: 24px;
    padding-top:40px;

  }
  .inputText input{
    height: 20px;
    border:1px solid #000;
  }
</style>