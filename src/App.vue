<!--
 * @Author: ZuoXichen
 * @Date: 2022-08-17 16:42:47
 * @LastEditTime: 2022-08-30 11:14:54
 * @LastEditors: ZuoXichen
 * @Description: 
-->
<script setup lang="ts">
import { NBadge, NAutoComplete, NH3, NConfigProvider, NScrollbar, NAvatar, NPageHeader, NAffix, NMenu, NIcon, NLayoutFooter, NSpace, NLayoutContent, NLayoutHeader, NLayoutSider, NLayout, NGrid, NGridItem, NSkeleton, NAnchor, NAnchorLink, MenuOption } from "naive-ui";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { Home, UserAvatar } from '@vicons/carbon'
import { Home24Regular, Timeline24Regular, DrinkCoffee16Regular } from '@vicons/fluent'
import { BrandGithub } from '@vicons/tabler'
import { useRoute, useRouter, RouterLink } from "vue-router";
import { Component, h, onMounted, reactive, Ref, ref } from "vue";
import { $fetch } from "ohmyfetch";
const router = useRouter()
const route = useRoute()

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
let IndexList: Ref<MenuOption[]> = ref([])
let date = new Date()
let year = ref(date.getFullYear())

onMounted(async () => {

  const url = "https://v2.blog.bicpotato.net/api/";
  const data = await $fetch(`${url}TypechoMetas/GetTypechoMetabyType?type=category`, {
    parseResponse: JSON.parse, async onResponseError({ request, response, options }) {
      // Log error
      console.log('[fetch response error]', request, response.status, response.body)
    }
  })
  // console.log(data)
  if (data !== undefined) {
    data.forEach(elem => {
      IndexList.value.push({
        label: () => h(
          RouterLink, {
          to: {
            path: `/category/${elem.name}`
          }
        },
          { default: () => elem.name }
        ),
        key: elem.mid
      })
    })

  }
  // console.log(IndexList)
  // console.log(response)
})



const menuOpt = [
  {
    type: 'group', label: "导航", key: "navgation", children: [
      {
        label: () => h(
          RouterLink, {
          to: {
            name: "index"
          }
        },
          { default: () => '首页' }
        ),
        icon: renderIcon(Home24Regular),
        key: "home"
      },
      {
        label: () => h(
          RouterLink, {
          to: {
            name: "timeline"
          }
        },
          { default: () => '时间线' }
        ),
        icon: renderIcon(Timeline24Regular),
        key: "timeline"
      },
      {
        label: () => h(
          RouterLink, {
          to: {
            name: "about"
          }
        },
          { default: () => '关于' }
        ),
        icon: renderIcon(DrinkCoffee16Regular),
        key: "about"
      }
    ]
  },
  {
    type: 'group', label: "组成", key: "formation", children: [
      {
        label: "分类",
        key: "category",
        children: IndexList.value
      },
      {
        label: "友链",
        key: "friends",
        children: [
          {
            label: () => h(
              'a', {
              href: "https://blog.yixuan-wang.site/"
            },
              { default: () => 'Pak' }
            ),
            icon: renderIcon(() => h(NAvatar, { size: 20, round: true, src: "https://blog.yixuan-wang.site/favicon.svg" })),
            key: "tomyxwang"
          },
        ]
      },


    ]
  }
]

const menuOption = reactive(menuOpt)

function toIndex() {
  router.push('/')
}

let value = ref('')

// let response = reactive(await (await fetch(url, {method:"GET"})).json());


</script>

<template>
  <n-config-provider preflight-style-disabled>
    <n-layout class="my-0 ">
      <n-layout-header class="h-[15vh] flex flex-row items-center gap-x-30 place-content-between">
        <div class="flex flex-row gap-x-20 items-center self-center">
          <n-h3 class="mt-0 mb-0 pl-5  self-center">BicPotato的Blog</n-h3>

          <n-auto-complete class="hidden sm:flex mt-0 h-12 place-items-center self-center w-60" v-model:value="value"
            placeholder="搜索(只是个装饰)" />
        </div>
        <div class="pr-5 self-center">
          <n-badge value="0">
            <n-avatar round>
              <user-avatar></user-avatar>
            </n-avatar>
          </n-badge>
        </div>
      </n-layout-header>
      <n-layout has-sider class="w-full  h-[85vh] my-0">
        <n-layout-sider class="mt-5 hidden lg:block">
          <n-affix>
            <n-menu class="lg:ml-5" accordion :options="menuOption"></n-menu>
          </n-affix>
        </n-layout-sider>

        <n-layout-content class="felx justify-center max-h-screen w-full my-0 p-0">
          <n-scrollbar class="h-6/5 my-0">
            <div class="my-0">
              <router-view></router-view>
            </div>
            <n-layout-footer
              class=" mt-20 2xl:py-4 mb-0 h-1/6 flex flex-wrap flex-col mx-auto 2xl:flex-row justify-items-center justify-center 2xl:justify-between">

              <n-space class="mx-auto lg:flex 2xl:ml-5">
                <div class="justify-self-center">&copy; {{ year }} Copyright</div> | <a
                  class="justify-self-center mx-auto" href="http://beian.miit.gov.cn/">京ICP备2021008392号</a>|
                <div class="mx-auto hidden md:flex flex-nowrap grow justify-self-center justify-center">
                  <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802034701"
                    style="isplay:inline-block;text-decoration:none;height:20px;line-height:20px;text-align:center"><img
                      src="https://driveforinner.oss-cn-zhangjiakou.aliyuncs.com/%E5%A4%87%E6%A1%88%E5%9B%BE%E6%A0%87.png"
                      style="float:left;" /> 京公网安备 11010802034701号</a>
                </div>
              </n-space>
              <n-space class="mx-auto lg:flex 2xl:mr-10">
                <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img
                    alt="Creative Commons License" style="border-width:0"
                    src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a>
                <div class="hidden md:flex">| Powered by Asp .NET Core 6 &
                  Vue3</div> | Theme Inspired by <a href="https://www.ihewro.com/archives/489/">Handsome</a>
              </n-space>
            </n-layout-footer>
          </n-scrollbar>

        </n-layout-content>

      </n-layout>
    </n-layout>

  </n-config-provider>

</template>


