<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { treeSelect,queryOrgTree } from '@/api/common'
export default {
  name: 'Home',
  data(){
    return{

    }
  },
  components: {
    HelloWorld
  },
  methods:{
    // getList(){
    //   console.log(2222)
    //   // treeSelect()
    // }
      getList1() {
      treeSelect().then(()=>{
        console.log(222)
      })
      // console.log(1111111)
      // let a = await treeSelect();
      // console.log(222222222)
     
    },
    test2(){
      queryOrgTree().then(()=>{
        console.log(3333)
      })
    }
  },
  mounted(){
   this.getList1()
   this.test2()
  }
}
</script>
