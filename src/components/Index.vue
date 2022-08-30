<!--
 * @Author: ZuoXichen
 * @Date: 2022-08-17 21:57:17
 * @LastEditTime: 2022-08-30 10:55:40
 * @LastEditors: ZuoXichen
 * @Description: 
-->

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { NPageHeader, NH1, NText, NPagination, NEmpty, NCard, NButton, NSpin, NIcon } from "naive-ui";
import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, reactive, Ref, ref, watchEffect } from "vue";
import PersonEdit20Regular from "@vicons/fluent/PersonEdit20Regular";
import AccessTimeRound from '@vicons/material/AccessTimeRound';
import { useRouter } from "vue-router";
import { useFetch } from "@vueuse/core";
import { $fetch, Headers } from 'ohmyfetch'
import { TypechoContent } from "../TypechoContent";



enum Status {
  loading = "Loading",
  error = "Err",
  success = "Success"
}
let STATUS = ref(Status.loading)
function statusCahnge(status) {
  STATUS.value = status
}

let page = ref(1)
let pageSize = ref(5)
const url = "https://v2.blog.bicpotato.net/api/";
let itemCount = ref(0)
let response: Ref<TypechoContent[]> = ref()
let headers = { 'Access-Control-Allow-Origin': "*" }
watchEffect(async () => {
  // console.log(resp.text)
  let dataurl = ref(`${url}TypechoContents/Post/FromPage?pageIndex=` + page.value + "&pageSize=" + pageSize.value)

  const data = await $fetch(dataurl.value, {
    headers: headers, parseResponse: JSON.parse, async onResponseError({ request, response, options }) {
      // Log error
      statusCahnge(Status.error)
    }
  })
  console.log(data.length)
  if (data == null) {
    STATUS.value = Status.error
  } else {
    response.value = data
    STATUS.value = Status.success
  }

}
)

onMounted(async () => {

  const url = "https://v2.blog.bicpotato.net/api/";
  let numberurl = ref(`${url}TypechoContents/Post/Counts`)
  let dataurl = ref(`${url}TypechoContents/Post/FromPage?pageIndex=${page.value}&pageSize=${pageSize.value}`)
  const number = await $fetch(numberurl.value)
  itemCount.value = number
  console.log(number)

  const data = await $fetch<TypechoContent[]>(dataurl.value, { headers: headers, parseResponse: JSON.parse })

  console.log(data.length)
  if (data == null) {
    STATUS.value = Status.error
  } else {
    response.value = data
    STATUS.value = Status.success
  }

})




const link = ref("/archive/")




// let response = reactive(await (await fetch(url, {method:"GET"})).json());
</script>

<template>
  <n-page-header class="ml-5 sm:ml-20">
    <template #header>
      <n-h1>
        <n-text type="primary">BicPotato的博客</n-text>
      </n-h1>
    </template>
    <template #footer>
      <n-text depth="3">相逢的人会再相逢</n-text>
    </template>
  </n-page-header>


  <div v-if="STATUS === Status.success" class="sm:ml-20 flex flex-col justify-center w-5/6 mx-auto sm:mr-20 lg:mr-0  lg:w-4/5 2xl:w-3/4">
    <router-link class=" mt-5 mb-5" v-for="item in response" :to="link + item.cid">
      <n-card class="text-2xl mt-5 mb-5 text-center" size="huge" embedded :title="item.title">
        <div class="flex flex-row flex-nowrap mt-4">
          <div class="justify-start items-center columns-2 flex w-1/3">
            <n-icon>
              <PersonEdit20Regular class="w-4 text-left mr-2"> </PersonEdit20Regular>
            </n-icon>
            <div class="text-xs font-light text-slate-400 ml-2">

              {{ item.author }}
            </div>
          </div>
          <div class="items-center columns-2 flex w-1/2 grow">
            <n-icon>
              <AccessTimeRound class="w-4 text-left mr-2 "> </AccessTimeRound>
            </n-icon>
            <div class="text-xs font-light text-slate-400 ml-2">
              {{ item.modified }}
            </div>
          </div>
        </div>
      </n-card>
    </router-link>

    <n-pagination class="mx-auto mt-2" v-model:page-size="pageSize" :item-count="itemCount" v-model:page="page"
      :page-sizes="[5, 6, 10, 15]" />
  </div>




  <n-spin class="flex mx-auto mt-40 mb-80" v-if="STATUS === Status.loading" size="large" />


</template>


