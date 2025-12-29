<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, lineNumbers } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark'

const props = defineProps({
  modelValue: { type: String, required: true },
  height: { type: String, default: '360px' },
})

const emit = defineEmits(['update:modelValue'])

const host = ref(null)
let view = null

const cmTheme = EditorView.theme({
  '&': { backgroundColor: '#0b1520', borderRadius: '0.375rem', border: '1px solid rgba(255,255,255,0.1)' },
  '.cm-content': { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', fontSize: '0.875rem' },
  '.cm-scroller': { overflow: 'auto' },
  '&.cm-editor.cm-focused': { outline: 'none', boxShadow: '0 0 0 1px #CCF303 inset' }
})

onMounted(() => {
  view = new EditorView({
    state: EditorState.create({
      doc: props.modelValue || '',
      extensions: [
        lineNumbers(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        cpp(),
        oneDark,
        cmTheme,
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            emit('update:modelValue', v.state.doc.toString())
          }
        }),
      ],
    }),
    parent: host.value,
  })
})

watch(
  () => props.modelValue,
  (val) => {
    if (!view) return
    const current = view.state.doc.toString()
    if (val !== current) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: val || '' },
      })
    }
  }
)

onBeforeUnmount(() => {
  if (view) {
    view.destroy()
    view = null
  }
})

const boxStyle = computed(() => ({ height: props.height }))
</script>

<template>
  <div class="cm-wrapper bg-[#0b1520] text-white p-0" :style="boxStyle">
    <div ref="host" class="h-full"></div>
  </div>
</template>

<style scoped>
.cm-wrapper { width: 100%; }
.cm-wrapper :deep(.cm-editor) { height: 100%; }
.cm-wrapper :deep(.cm-lineNumbers .cm-gutterElement) { color: rgba(255,255,255,0.5); }
</style>
