<!--
 * @Author: ZuoXichen
 * @Date: 2022-08-28 23:12:47
 * @LastEditTime: 2022-08-30 11:19:05
 * @LastEditors: ZuoXichen
 * @Description: 
-->
<script setup lang="ts">
import {NH1,NText, NPageHeader, NSpace, NBreadcrumb, NBreadcrumbItem, NIcon,NTimeline,NTimelineItem } from "naive-ui";
import { onMounted, reactive, Ref, ref } from "vue";
import { Home24Regular } from '@vicons/fluent'
import AccessTimeRound from '@vicons/material/AccessTimeRound';
import { useRouter } from "vue-router";
import { $fetch } from "ohmyfetch";
import { TypechoContent } from "../TypechoContent";
enum Status{
  loading = "Loading",
  error = "Err",
  success = "Success"
}
let status = ref(Status.loading)
let response:Ref<TypechoContent[]> = ref()
let headers = {'Access-Control-Allow-Origin': "*"}

onMounted(async() => {
  
  const url = "https://v2.blog.bicpotato.net/api/";
  const data  = await $fetch<TypechoContent[]>(`${url}TypechoContents/post`,{ headers:headers, parseResponse: JSON.parse })
  console.log(data)
  if (data == null){
    status.value = Status.error
  } else {
    response.value= data
    status.value = Status.success
  }
  // console.log(status)
  console.log(response)
})
</script>
<template>
            <n-space class="ml-5 sm:ml-20" vertical>
    <n-page-header>

      <template #header>
        <n-h1>
            <n-text type="primary">时间线</n-text>
        </n-h1>
      </template>
    </n-page-header>
    <n-breadcrumb>
      <n-breadcrumb-item>
        <n-icon :component="Home24Regular" />
        首页
      </n-breadcrumb-item>
      <n-breadcrumb-item>
        时间线
      </n-breadcrumb-item>
    </n-breadcrumb>
</n-space>
    <div class="mx-auto sm:ml-40 mt-10 w-4/5 sm:w-1/2 lg:w-2/3 2xl:w-2/5">

    <n-timeline >
        <n-timeline-item v-for="item in response" :title="item.title" :time="item.modified"></n-timeline-item>
    </n-timeline>
      
</div>
    
</template>