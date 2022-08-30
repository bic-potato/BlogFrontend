<!--
 * @Author: ZuoXichen
 * @Date: 2022-08-28 23:41:54
 * @LastEditTime: 2022-08-29 10:47:41
 * @LastEditors: ZuoXichen
 * @Description: 
-->
<script setup lang="ts">
    import { useRouter } from "vue-router";
    import { NResult, NButton } from "naive-ui";

    const router =  useRouter()
    
  function toIndex(){
    router.push("/")
  }




    </script> 
    
    <template>
  <n-result status="404" title="404 资源不存在" description="生活中总会找不到东西的">
    <template #footer>
      <n-button @click="toIndex">让我们重新开始吧</n-button>
    </template>
  </n-result>
    
    
    </template>
    
    <style scoped>
    .read-the-docs {
      color: #888;
    }
    </style>
    