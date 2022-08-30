<!--
 * @Author: ZuoXichen
 * @Date: 2022-08-29 12:52:56
 * @LastEditTime: 2022-08-30 00:18:25
 * @LastEditors: ZuoXichen
 * @Description: 
-->
<script setup lang="ts">
import { $fetch } from 'ohmyfetch';
import { nextTick, onMounted, onUpdated, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NEmpty, NCard, NButton, NSpin, NIcon } from "naive-ui";
import PersonEdit20Regular from "@vicons/fluent/PersonEdit20Regular";
import AccessTimeRound from '@vicons/material/AccessTimeRound';
import { onBeforeRouteUpdate } from 'vue-router';

const router = useRouter();
const route = useRoute();
enum Status {
    loading = "Loading",
    error = "Err",
    success = "Success"
}
let status = ref(Status.loading)
let response = ref([])
let headers = {"Access-Control-Allow-Origin": "*"}
onMounted(async () => {
    const url = "https://v2.blog.bicpotato.net/api/";
    console.log(route.params.name)

    const meta = await $fetch(`${url}TypechoMetas/GetCategoryId?name=${route.params.name}`, { headers:headers, parseResponse: JSON.parse });

    const cidList = await $fetch(`${url}TypechoRelationships/mid/${meta.mid}`, { headers:headers, parseResponse: JSON.parse })
    console.log(cidList)
    cidList.forEach(async (elem) => {
        const data = await $fetch(`${url}TypechoContents/${elem.cid}`, { headers:headers, parseResponse: JSON.parse }).catch(() => { status.value = Status.error })
        // console.log(data)
        response.value.push(data);
    })
    status.value = Status.success
})

onBeforeRouteUpdate(async (to) => {
    response.value = []
    const url = "https://v2.blog.bicpotato.net/api/";
    console.log(to.params.name)

    const meta = await $fetch(`${url}TypechoMetas/GetCategoryId?name=${to.params.name}`, { parseResponse: JSON.parse });

    const cidList = await $fetch(`${url}TypechoRelationships/mid/${meta.mid}`, { parseResponse: JSON.parse })
    console.log(cidList)
    cidList.forEach(async (elem) => {
        const data = await $fetch(`${url}TypechoContents/${elem.cid}`, { parseResponse: JSON.parse }).catch(() => { status.value = Status.error })
        // console.log(data)
        response.value.push(data);
    })
    status.value = Status.success
    // console.log(status)
    // console.log(response)

})



const link = ref("/archive/")

</script>

<template>
    <div v-if="status === Status.success" class="mt-3 mb-3" v-for="item in response">
        <router-link :to="link + item.cid">
            <n-card class="text-2xl" size="huge" embedded :title="item.title">
                <div calss="flex flex-row flex-nowrap mt-4 justify-start items-center">
                    <div class="basis-1/2 text-left justify-start items-center columns-2 flex w-1/2">
                        <n-icon>
                            <PersonEdit20Regular class="w-4 text-left mr-2"> </PersonEdit20Regular>
                        </n-icon>
                        <div class="text-xs font-light text-slate-400 ml-2">
                            {{ item.author }}
                        </div>
                    </div>
                    <div class="basis-1/2 text-left justify-start items-center columns-2 flex w-1/2">
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
    </div>
    <n-empty v-if="status === Status.error" description="你什么也找不到">
        <template #extra>
            <n-button size="small">
                看看别的
            </n-button>
        </template>
    </n-empty>

    <n-spin v-if="status === Status.loading" size="large" />


</template>