<!--
 * @Author: ZuoXichen
 * @Date: 2022-08-17 23:22:35
 * @LastEditTime: 2022-08-29 20:21:56
 * @LastEditors: ZuoXichen
 * @Description: 
-->
<script setup lang="ts">
import Vditor from 'vditor';
import { onMounted, ref, watch, toRaw, onUnmounted, unref } from 'vue';
import { NText } from 'naive-ui';
import 'vditor/dist/css/content-theme/light.css'
import 'vditor/dist/index.css'
import 'vditor/dist/js/highlight.js/styles/dracula.css'
import VditorPreview from 'vditor/dist/method.min'

const emit = defineEmits([
  'update:modelValue',
  'after',
  'focus',
  'blur',
  'esc',
  'ctrlEnter',
  'select',
]);

const props = defineProps({
  options: {
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const contentEditor = ref();
const editorRef = ref<string | HTMLElement>();



onMounted(async () => {

  props.modelValue.replace(/<!--markdown-->/g, "<!--markdown-->\n");
  // console.log(props.modelValue)
  contentEditor.value = await Vditor
    .preview(editorRef.value as HTMLDivElement, props.modelValue, props.options as IPreviewOptions);
});




onUnmounted(() => {
  const editorInstance = unref(contentEditor);
  if (!editorInstance) return;
  try {
    editorInstance?.destroy?.();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <n-text>
  <div class="prose lg:prose-xl" ref="editorRef"></div>
</n-text>
</template>
