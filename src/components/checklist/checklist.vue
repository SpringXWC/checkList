<template>
  <div class="cl-checklist">
     <div class="checklist" :class='{"show":isOpen}'>
        <div class="topbar">
          <div class="cancel" @click="hide">取消</div>
          <div class="title">选择地址</div>
          <div class="confirm" @click="onConfirm">确定</div>
        </div>
        <div class="desc">
          您已选中<span>{{checkboxValue.length}}</span>个，
          最多可选<span>{{max}}</span>个
        </div>
        <div class="list" ref="list">
          <div class="line borderBottom"
                  v-for="(item,index) in dataList" 
                  :key="index" 
                  :class="{'selected':item.isChecked,'disabled':item.isDisabled,'checkbox-left':checkboxLeft}"
                  @click="selectedItem(item)">
            <div class="lineLeft">
              <div class="title">{{item.title}}</div>
              <div class="address" v-if="item.address">{{item.address}}</div>
            </div>
            <div class="lineRight"></div>
          </div>
        </div>
     </div>
     <div class="checklist-overlay" v-if="isOpen" @click="hide"></div>
  </div>     
</template> 
<script>
  export default{
    props:{
      max:{
        type:Number,
        default:0
      },
      dataList:{
        type:Array,
        require:true
      },
      checkboxLeft:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        checkboxValue:[],
        isOpen:false, 
      }
    },
    methods:{
      show(){
        document.activeElement.blur();
        this.isOpen = true;
      },
      hide(){
        this.isOpen = false;
      },
      selectedItem(item){
       if(!item.isDisabled){
         item.isChecked = !item.isChecked;
         this.checkboxValue = this.dataList.filter(function(item){
           return item.isChecked;
         })
         if(this.checkboxValue.length === this.max){
          this.dataList.map(function(item){
            if(!item.isChecked){
              item.isDisabled = true;
            }
          })
         }else{
          this.dataList.map(function(item){
            item.isDisabled = false;

          })
         }
       }
       this.$emit("change",item);
      },
      onConfirm(){
        this.checkboxValue = this.dataList.filter(function(item){
          return item.isChecked;
        })
        this.$emit('confirm',this.checkboxValue);
        this.hide();
      }
    }
  }
</script> 
<style scoped>
.cl-checklist{
  overflow:hidden;
  
}
.checklist{
  position: fixed;
  bottom:0;
  left:0;
  width: 100%;
  z-index: 2000;
  transition:all 0.5s;
  transform:translateY(100%);
  background-color:#fff;
}
.checklist.show{
  transform:translateY(0%);
}
.checklist-overlay{
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index: 1000;
  background-color:rgba(0,0,0,.5);
  transition:all 0.5s;
}
.list .line.checkbox-left{
  flex-direction:row-reverse;
}
  .topbar{
    height:45px;
    font-size: 16px;
    padding:0 13px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    border-bottom:1px solid #d9d9d9;
  }
  .topbar .cancel{
    color:#9f9f9f;
  }
   .topbar .confirm{
    color:#2ea6f2;
  }
  .desc{
    height:30px;
    line-height: 30px;
    padding-right:10px;
    font-size: 14px;
    text-align: right;
    color:#9f9f9f;
  }
  .desc span{
    color: #1799fa;
  }
  .list{
    max-height:300px;
    font-size: 14px;
    padding:10px 13px;  
    overflow-y:auto;
    overflow-scrolling:touch;
    -webkit-overflow-scrolling: touch;
  }
  .list .line{
    display:flex;
    justify-content:center;
    align-items:center;
    height:50px;
  }
  .list .line .lineLeft{
    width: 90%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;
  }
  .list .line .lineRight{
    width: 20px;
    height: 20px;
    margin:0 5px;
    border-radius:50%;
    border:1px solid #9e9e9e;
    background-color:#fff; 
    position: relative;
    z-index: 0;
  }
  .list .line.selected .lineLeft .title{
    color:#1799fa;
  }
  .list .line.selected .lineRight{
    border:1px solid #1799fa;
    background-color:#1799fa;
  }
  .list .line.selected .lineRight::before{
    content:"";
    position: absolute;
    top:4px;
    left:4px;
    width: 12px;
    height:12px;
    background-image: url("../../assets/images/checked.png");
    background-repeat: no-repeat;
    background-size:22px 22px;
    background-position: center center;
    z-index: 1;
  }
  .list .line .lineLeft .address{
    color:#9f9f9f;
    position:relative;
    padding-left:15px;
  }
  .list .line .lineLeft .address::before{
    content:"";
    display: inline-block;
    position: absolute;
    width: 15px;
    height:15px;
    top:2px;
    left:0;
    background-image: url('../../assets/images/address.png');
    background-repeat:no-repeat;
    background-size:15px 15px;
    background-position: 0;
  }
  .list .line.disabled .lineLeft .title{
    color:#9e9e9e;
  }
  .list .line.disabled .lineRight{
    border:1px solid #9e9e9e;
    background-color:#9e9e9e;
  }
  .borderBottom{
    position:relative;
  }
  .borderBottom::after{
    content:'';
    display: block;
    position: absolute;
    left: 0;
    bottom:0;
    width: 100%;
    border-bottom:1px solid #d9d9d9;
  }
  @media(-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5){
    .borderBottom::after{
      -webkit-transform:scaleY(0.7);
      transform:scaleY(0.7);
    }
  }
   @media(-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){
    .borderBottom::after{
      -webkit-transform:scaleY(0.5);
      transform:scaleY(0.5);
    }
  }
</style>