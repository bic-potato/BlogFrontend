<!--
 * @Author: ZuoXichen
 * @Date: 2022-08-17 16:42:47
 * @LastEditTime: 2022-08-30 11:17:37
 * @LastEditors: ZuoXichen
 * @Description: 
-->
<script setup lang="ts">
import { ref, onBeforeMount, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Renderer from "./Renderer.vue";
import { NSpace, NH1, NPageHeader, NIcon, NBreadcrumb, NBreadcrumbItem, NButton, NEmpty, NText, NSpin } from "naive-ui";
import { useFetch, useTitle } from '@vueuse/core';
import { $fetch } from "ohmyfetch";
import { Home24Regular } from '@vicons/fluent'
import PersonEdit20Regular from "@vicons/fluent/PersonEdit20Regular";
import AccessTimeRound from '@vicons/material/AccessTimeRound';
import { TypechoContent } from "../TypechoContent";


const route = useRoute();
const router = useRouter();
enum Status {
  loading = "Loading",
  error = "Err",
  success = "Success"
}
let STATUS = ref(Status.loading)
function toIndex() {
  router.push("/")
}
function statusCahnge(status) {
  STATUS.value = status
}

let headers = { "Access-Control-Allow-Origin": "*" }
// console.log(resp.text)
let typecho_content: Ref<TypechoContent> = ref({
  cid: 0, title: "", slug: "", created: "", modified: "",
  text: "",
  order: 0,
  author: "",
  template: "",
  type: "",
  status: "",
  commentsNum: "",
  sllowComment: "",
  allowPing: "",
  allowFeed: "",
  parent: 0,
  views: 0,
});
onBeforeMount(async () => {

  const url = "https://v2.blog.bicpotato.net/api/";
  const id = route.params.cid;
  const data = await $fetch<TypechoContent>(`${url}TypechoContents/${id}`, {
    headers: headers, parseResponse: JSON.parse, async onResponseError({ request, response, options }) {
      // Log error
      statusCahnge(Status.error)
    }
  })
  console.log(data)

  if (data != undefined) {
    typecho_content.value = data
    STATUS.value = Status.success
  } else {
    STATUS.value = Status.error;
  }
  console.log(STATUS.value)
  useTitle(ref(`BicPotato 的 Blog | ${typecho_content.value.title}`))
})



</script> 

<template>

  <div class="lg:w-4/5 w-5/6 sm:ml-20 mx-auto sm:mr-20 lg:mr-0">
    <n-space vertical class="">
      <n-page-header>
        <div class="flex flex-row justify-start items-baseline gap-x-6">

          <div class="flex flex-row items-baseline gap-x-1">
            <n-icon :component="PersonEdit20Regular"></n-icon>

            <n-text depth="3">{{ typecho_content.author }}</n-text>

          </div>

          <div class="flex flex-row items-baseline gap-x-1">

            <n-icon :component="AccessTimeRound"></n-icon>


            <n-text depth="3">{{ typecho_content.modified }}</n-text>

          </div>
        </div>
        <template #header>
          <n-h1>
            <n-text type="primary">{{ typecho_content.title }}</n-text>
          </n-h1>
        </template>
      </n-page-header>
      <n-breadcrumb>
        <n-breadcrumb-item>
          <n-icon :component="Home24Regular" />
          首页
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          正文
        </n-breadcrumb-item>
      </n-breadcrumb>
    </n-space>

    <Renderer v-if="STATUS === Status.success" :model-value="typecho_content.text"></Renderer>



  </div>
  <n-empty class="mx-auto my-60" v-if="STATUS === Status.error" description="你什么也找不到">
    <template #extra>
      <n-button @click="toIndex" size="small">
        看看别的
      </n-button>
    </template>
  </n-empty>

  <n-spin class="flex mx-auto my-60" v-if="STATUS === Status.loading" size="large" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
