<template>
  <div class="hello">
    <template>
      <div style="background:#eee;padding: 20px">
          <Card :bordered="false">
              <p class="name" v-if="!changeName" @click="changeName=true">{{name}}</p>
              <p class="name" v-if="changeName">
                <Input v-model="name" autofocus="true" @on-blur="changeName=false" @on-enter="changeName=false"></Input>
              </p>
              <Button @click="sse" style="float:right">connect</Button>
              <div style="clear:both"></div> 
          </Card>
          <Card :bordered="false" id="sck" style="height:600px;overflow-y:auto;">
              
              <div class="msgBox" v-for="msg in sss">
                  <div class="headImg"></div>
                  <span><b>{{msg.name}}</b> {{msg.time}}</span>
                  <div class="popo" color="gold">{{msg.text}}</div>
                  <div style="clear:both"></div> 
              </div>
          </Card>
      </div>
  </template>
    <Input v-model="msg" @on-enter="send" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="Enter something..." />
    <Button @click="send" type="primary" :loading="Bloading">
        <span v-if="!Bloading" long>send</span>
        <span v-else long>Loading...</span>
    </Button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '',
      msgs:[],
      Bloading:false,
      changeName:false,
      name:'AnotherSola',
      columns: [
        {
            title: 'msg',
            key: 'text'
        },
        {
            title: 'time',
            key: 'time'
        }
      ]
    }
  },
  computed:{
    sss:function(){
      let res=[]
      for(let i=0;i<this.msgs.length;i++){
        res.push(this.msgs[i])
      }
      return res
    }
  },
  watch:{
  },
  created:function(){
    //setInterval()
  },
  methods: {
      sse(){
        console.log("start")
        var source = new EventSource('http://localhost:3000/connect');
        source.onmessage = (e)=> {
          console.log(e)
          this.msgs=JSON.parse(e.data).msg
          this.Bloading=false
          // this.msgs.push({})
          // this.msgs.splice(this.msgs.length-1,1)
          // console.log(this.msgs)
          // console.log(this.sss)
          setTimeout(function(){
            let sck = document.getElementById("sck")
            sck.scrollTop=sck.scrollHeight},50)
        };
      },
      send(){
        if(/^\s+$/.test(this.msg) || this.msg==''){this.$Notice.warning({title:'不能发送空白消息'}); return}
        this.Bloading=true
        axios.post('/send',{
          name:this.name,
          text:this.msg
        })
        this.msg=''
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1, h2 {
  font-weight: normal;
}
.ivu-card-head{
    position: -webkit-sticky;
    position: sticky;
    background: white;
    z-index: 10;
    width: 100%;
}
.hello{
  width: 800px;
  margin: 0 auto;
  border:1px solid gray;
  .name{
    text-align:left;
    width:50%;
    height: 33px;
    float:left;
  }
  .msgBox{
    width: 100%;
    min-height: 40px;
    span{
      text-align: left;
      position: absolute;
      left: 76px;
    }
    .headImg{
      border-radius: 50%;
      background: transparent url(https://gsp0.baidu.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK/tb/editor/images/default/fFace.png?t=20140529&t=1505996137490) no-repeat scroll left top;
      width: 30px;
      height: 30px;
      position: absolute;
      float: left;
    }
    .popo{
      font-size: 16px;
      margin-left: 60px;
      margin-right: 20px;
      margin-top: 26px;
      position: relative;
      float: left;
      text-align: left;
      word-wrap: break-word;
      word-break: break-all;
      background-color: aquamarine;
      padding: 10px 10px 10px 10px;
      border-radius: 7px;
      &::before{
        content: '';
        position: absolute;
        left: -20px;
        top: 14px;
        width: 0px;
        height: 0px;
        border-width: 0px 13px 14px 7px;
        border-style: solid;
        border-color: transparent aquamarine transparent transparent;
      }
    }
  }
  .textArea{
    border: none;
    height: 80px;
    padding: 0 20px;
    text-align: left;
    width: 100%;
    left: 0;
    font-size: 16px;
  }
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
