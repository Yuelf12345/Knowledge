<template>
  <div class="tinymce-container">
    <!-- <div class="header">
      <slot name="header"></slot>
    </div> -->
    <div class="main">
      <div class="title">
        <slot name="title"></slot>
      </div>
      <div :id="tinymceId" class="content" style="border: none;"></div>
    </div>
    <div
      id="controls"
      class="controls"
      :style="{ height: isHidden ? '10vh' : '55vh' }"
    >
      <TinymceControlsHeader
        :has-undo="hasUndo"
        :hasRedo="hasRedo"
        :formatStyles="formatStyles"
        :currentTab="currentTab"
        @changeTab="changeTab"
        @setContentStep="setContentStep"
        @imageHandler="onAfterRead"
      />
      <div v-if="currentTab == 'font' && !isHidden" class="controls-body">
        <div class="controls-title">文字格式</div>
        <div class="flex controls-btn-list">
          <div
            v-for="(fs, index) in fontStyleList"
            :key="index"
            class="controls-btn"
            :class="{ active: fontStyles[fs.value] }"
            @click="setFontStyle(fs.value)"
          >
            <div
              class="controls-btn-img"
              :style="{ backgroundImage: `url(${fs.img})` }"
            />
          </div>
        </div>
        <div class="flex controls-btn-list">
          <template v-for="fs in fontSizeList">
            <div
              :key="fs.value"
              class="controls-btn"
              :class="{ active: fontStyles.fontSize === fs.value }"
              @click="setFontSize(fs.value)"
            >
              {{ fs.name }}
            </div>
          </template>
        </div>
        <div class="controls-title">文字颜色</div>
        <div style="width: 100%; overflow-x: auto;">
          <div class="controls-color-list">
            <template v-for="fc in fontColorList">
              <div
                :key="fc.color"
                class="color-active"
                :style="{
                  backgroundColor:
                    fontStyles.fontColor === fc.color ? fc.color : '#fafafa'
                }"
              >
                <div
                  class="controls-color-btn"
                  :style="{ backgroundColor: fc.color }"
                  @click="setColorContent(fc.color)"
                ></div>
              </div>
            </template>
          </div>
        </div>
        <div class="controls-title">高亮颜色</div>
        <div style="width: 100%; overflow-x: auto;">
          <div class="controls-color-list">
            <template v-for="fc in fontColorList">
              <div
                :key="fc.name"
                class="color-active"
                :style="{
                  backgroundColor:
                    fontStyles.fontBackColor === fc.color ? fc.color : '#fafafa'
                }"
              >
                <div
                  class="controls-color-btn"
                  :style="{ backgroundColor: fc.color }"
                  @click="setBackColorContent(fc.color)"
                ></div>
              </div>
            </template>
          </div>
        </div>
        <div class="controls-title">对齐方式</div>
        <div class="flex controls-btn-list">
          <template v-for="fa in alignmentList">
            <div
              :key="fa.value"
              class="controls-btn"
              :class="{ active: fontStyles.fontAlignment === fa.value }"
              @click="setAlignment(fa.value)"
            >
              <div
                class="controls-btn-img"
                :style="{ backgroundImage: `url(${fa.img})` }"
              />
            </div>
          </template>
        </div>
      </div>
      <div v-if="currentTab == 'format'" class="controls-body">
        <template v-if="!isAboutUs">
          <div class="controls-title">标题样式</div>
          <div class="flex controls-btn-list">
            <div
              v-for="(t, index) in titleClassList"
              :key="index"
              class="controls-btn"
              :class="{
                active: formatStyles.titleClass === t.value,
                [t.value]: true
              }"
              @click="setInsertTitle(t.value)"
            >
              {{ t.name }}
            </div>
          </div>
        </template>
        <div class="controls-title">引用样式</div>
        <div class="flex controls-btn-list">
          <div
            v-for="(b, index) in blockquoteList"
            :key="index"
            class="controls-btn"
            :class="{
              active:
                formatStyles.mceBlockQuote &&
                formatStyles.blockQuoteClass == b.value
            }"
            @click="setInsertQuote(b.value)"
          >
            {{ b.name }}
          </div>
        </div>
        <div class="flex">
          <div>
            <div class="controls-title">列表</div>
            <div class="flex controls-btn-list">
              <div
                v-for="(l, index) in listTypeList"
                :key="index"
                class="controls-btn"
                :class="{ active: formatStyles[l.value] }"
                @click="setInsertList(l.value)"
              >
                <div
                  class="controls-btn-img"
                  :style="{ backgroundImage: `url(${l.img})` }"
                />
              </div>
            </div>
          </div>
          <div>
            <div class="controls-title">分割线</div>
            <div class="controls-btn" @click="setInsertDivider">
              <div
                class="controls-btn-img"
                :style="{
                  backgroundImage: `url( ${require('@/assets/images/rich_text/divider.png')} )`
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-loading
      v-if="uploadLoading"
      size="40"
      type="spinner"
      vertical
      class="loading-pop"
    >
      上传中...</van-loading>
  </div>
</template>

<script>
import loadScript from './dynamicLoadScript'
import { apiCommonUpload } from '@/api/index'
import { debounce } from '@/utils/index'
import { isIOS, isAndroid } from '@/utils'
import { removeClass, getFirstParent, processFormat } from './utils'
export default {
  components: {
    TinymceControlsHeader: () => import('./TinymceControlsHeader.vue')
  },
  props: {
    id: {
      type: String,
      default: () =>
        'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
    },
    content: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 650
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    // 1:关于我们 2 产品内容
    editorType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      // MAX_FILE_COUNT: 5,
      uploadLoading: false,
      isScrolling: null,
      startX: null,
      startY: null,
      longPressTimer: null,
      hasChange: false,
      isHidden: true,
      fullscreen: false,
      wordNum: 0,
      editor: null,
      currentTab: null,
      hasUndo: false,
      hasRedo: false,
      previousScrollTop: 0,
      // 字体样式
      fontStyles: {
        fontSize: '16px',
        fontColor: 'rgb(33, 53, 71)',
        fontBackColor: 'rgb(33, 53, 71)',
        fontAlignment: 'justifyleft',
        Bold: false,
        Italic: false,
        StrikeThrough: false,
        Underline: false
      },
      fontStyleList: [
        {
          name: '加粗',
          value: 'Bold',
          img: require('@/assets/images/rich_text/bold.png')
        },
        {
          name: '斜体',
          value: 'Italic',
          img: require('@/assets/images/rich_text/italic.png')
        },
        {
          name: '删除线',
          value: 'StrikeThrough',
          img: require('@/assets/images/rich_text/strikethrough.png')
        },
        {
          name: '下划线',
          value: 'Underline',
          img: require('@/assets/images/rich_text/underline.png')
        }
      ],
      fontSizeList: [
        { name: '小', value: '14px' },
        { name: '标准', value: '16px' },
        { name: '大', value: '18px' },
        { name: '超大', value: '20px' }
      ],
      fontColorList: [
        { color: 'rgb(33, 53, 71)', name: '黑色' },
        { color: 'rgb(255, 51, 51)', name: '红色' },
        { color: 'rgb(255, 153, 0)', name: '橙色' },
        { color: 'rgb(255, 255, 0)', name: '黄色' },
        { color: 'rgb(0, 204, 0)', name: '绿色' },
        { color: 'rgb(0, 153, 255)', name: '蓝色' },
        { color: 'rgb(153, 51, 255)', name: '紫色' },
        { color: 'rgb(255, 255, 255)', name: '白色' },
        { color: 'rgb(204, 204, 204)', name: '灰色' },
        { color: 'rgb(153, 153, 153)', name: '深灰色' }
      ],
      alignmentList: [
        {
          name: '两端',
          value: 'justifyfull',
          img: require('@/assets/images/rich_text/justifyfull.png')
        },
        {
          name: '左',
          value: 'justifyleft',
          img: require('@/assets/images/rich_text/justifyleft.png')
        },
        {
          name: '居中',
          value: 'justifycenter',
          img: require('@/assets/images/rich_text/justifycenter.png')
        },
        {
          name: '右',
          value: 'justifyright',
          img: require('@/assets/images/rich_text/justifyright.png')
        }
      ],
      // 格式样式
      formatStyles: {
        titleClass: '',
        blockQuoteClass: '',
        mceBlockQuote: false,
        Insertunorderedlist: false,
        Insertorderedlist: false
      },
      titleClassList: [
        { name: '标题', value: 'arrow-right' },
        { name: '标题', value: 'center-line' },
        { name: '标题', value: 'decimal' }
      ],
      blockquoteList: [
        { name: '引用', value: 'blockquote-abstract' },
        { name: '| 引用', value: 'blockquote-border' }
        // { name: '"引用', value: 'blockquote' },
      ],
      listTypeList: [
        {
          name: '有序列表',
          value: 'Insertorderedlist',
          img: require('@/assets/images/rich_text/unorderedlist.png')
        },
        {
          name: '无序列表',
          value: 'Insertunorderedlist',
          img: require('@/assets/images/rich_text/orderedlist.png')
        }
      ],
      tinymceCDN:
        'https://zuiyouliao-prod.oss-cn-beijing.aliyuncs.com/ZYL-HQ/libs/tinymce-all-in-one@4.9.5/tinymce.min.js'
    }
  },
  computed: {
    tinymceId() {
      return this.id
    },
    isIOSPlatform() {
      return isIOS()
    },
    isAndroidPlatform() {
      return isAndroid()
    },
    isAboutUs() {
      return this.editorType === 1
    }
  },
  watch: {
    content: {
      handler(newVal) {
        console.log('===>')
        if (!this.hasChange) {
          this.editor && this.editor.setContent(newVal)
        }
      }
    }
  },
  created() {
    this.setMeta()
  },
  mounted() {
    loadScript(this.tinymceCDN, err => {
      if (err) {
        return
      }
      this.initTinymce()
    })
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  beforeDestroy() {
    this.destroyTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        mobile: {
          menubar: true
        },
        language: 'zh_CN', // 注意大小写
        placeholder: '请输入正文',
        toolbar: false,
        content_style:
          'img,video {width: 100%; max-width: 100% !important; height: auto;} ol{ list-style: decimal;} ul{ list-style: disc;} table{width: 100% !important;};' + this.isAboutUs ? 'p{margin: 0px 0px 1.35em 0px}' : '',
        menubar: false,
        inline: true,
        height: this.height,
        min_height: 400,
        plugins: ['autoresize lists'],
        // start 添加扩展插件
        external_plugins: {
          powerpaste:
            'https://zuiyouliao-prod.oss-cn-beijing.aliyuncs.com/ZYL-HQ/libs/tinymce/powerpaste/plugin.min.js'
        },
        powerpaste_word_import: this.isAboutUs ? 'merge' : 'propmt', // clean 去除格式 merge 保留格式 prompt 可选择
        powerpaste_html_import: this.isAboutUs ? 'merge' : 'propmt', // propmt, merge, clear
        powerpaste_allow_local_images: true, // 允许带图片
        paste_data_images: true,
        // end
        setup: editor => {
          if (!this.editor) {
            this.editor = editor
          }
          editor.on('nodechange', this.handleNodeChange) // 监听光标位置
          editor.on('keydown', this.hanldeKeydown) // 监听键盘事件
          editor.on('NodeChange Change KeyUp', () => {
            this.hasChange = true
            this.$emit('getHtmlContent', this.editor.getContent())
          })
          editor.on('focus', () => {
            if (!this.changeTab) {
              this.handleFocus()
            }
          })
          editor.on('blur', this.handleBlur)
          editor.on('click', this.handleFocus)
        },
        // 粘贴时替换掉图片的属性，否则微信公众号图片不显示
        paste_preprocess: (editor, args) => {
          console.log('粘贴')
          args.content = this.formatContent(args.content)
          // this.imageHandler()
        },
        init_instance_callback: () => {
          this.hasChange = false
          this.setContent(this.content)
          this.$emit('getHtmlContent', this.getContent())
        },
        images_upload_handler: async (blobInfo, success, failure) => {
          console.log('复制粘贴图片', blobInfo.blob())
          const blob = blobInfo.blob()
          if (!blob.size) {
            // this.$utils.toast('图片识别出错，请重试')
            this.imageHandler()
          }
          // const fd = new FormData()
          // fd.append('file', blob)
          // try {
          //   const {
          //     data: { entity = {} }
          //   } = await apiCommonUpload(fd)
          //   success(entity.url)
          // } catch (error) {
          //   this.$utils.toast(
          //     error.message || '出现未知问题，刷新页面，或者联系程序员'
          //   )
          // }
        }
      })
      this.editor = window.tinymce.editors[this.tinymceId]

      this.preventDefault()
    },
    setContent(content) {
      if (this.editor) {
        this.editor.setContent(content)
      }
    },
    getContent() {
      if (this.editor) {
        return this.editor.getContent()
      }
      return ''
    },
    getContentNum() {
      if (this.editor) {
        return this.editor.getContent({ format: 'text' }).length
      }
      return 0
    },
    // 监听滚动条
    // handleScroll() {
    //   const currentScrollTop = this.tinymcElement.scrollTop
    //   const scrollDifference = Math.abs(currentScrollTop - this.previousScrollTop)
    //   if (scrollDifference > 100 && !this.currentTab) {
    //     this.isHidden = true
    //     this.previousScrollTop = currentScrollTop
    //   }
    // },
    // 步骤
    setContentStep(step) {
      if (!this.editor) return
      this.hasUndo = this.editor.undoManager.hasUndo()
      this.hasRedo = this.editor.undoManager.hasRedo()
      console.log(step, this.hasUndo, this.hasRedo)
      if (this[`has${step}`]) {
        console.log(`${step}成功===>`)
        this.editor.execCommand(step)
      }
    },
    setFontSize(size) {
      if (!this.editor) return
      this.editor.execCommand('fontsize', false, size)
    },
    setAlignment(fa) {
      if (!this.editor) return
      this.editor.execCommand(fa)
      this.fontStyles.fontAlignment = fa
    },

    setFontStyle(fs) {
      if (!this.editor) return
      const currentState = this.editor.queryCommandState(fs)
      this.fontStyles[fs] = !currentState
      this.editor.execCommand(fs, false, currentState ? false : undefined)
    },
    // 文件处理
    async onAfterRead(files) {
      this.uploadLoading = true
      console.log('files', files)
      if (!Array.isArray(files)) {
        files = [files]
      }
      // if (files.length > this.MAX_FILE_COUNT) {
      //   this.$utils.toast(`一次最多上传 ${this.MAX_FILE_COUNT} 张图片`)
      //   files = files.slice(0, this.MAX_FILE_COUNT)
      //   // return; // 停止进一步处理
      // }
      try {
        for (let i = 0; i < files.length; i++) {
          const { file } = files[i]
          console.log('file', file)
          if (file.type.includes('image')) {
            const formData = new FormData()
            formData.append('file', file)
            const {
              data: {
                entity: { url = '' }
              }
            } = await apiCommonUpload(formData)
            this.$utils.toast('上传成功')
            console.log('image', url)
            this.uploadImage(url)
          } else {
            this.$utils.toast('请选择图片上传')
            continue
          }
          // if (file.type.includes('video')) {
          //   console.log('video', url)
          //   this.uploadVideo(url)
          // }
          // 上传成功后插入一个空行
          this.editor.execCommand(
            'mceInsertContent',
            false,
            i === files.length - 1 ? '<p><br/></p>' : '<p><br/><br/></p>'
          )
        }
      } catch (error) {
        this.$utils.toast('上传失败')
      } finally {
        this.uploadLoading = false
      }
    },
    uploadVideo(url) {
      if (!this.editor) {
        return
      }
      const videoHtml = `<p><div class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src=${url} data-mce-html="%20"><video src="${url}" controls="true" /></div><br/></p>`
      this.editor.execCommand('mceInsertContent', false, videoHtml)
    },
    uploadImage(url) {
      if (!this.editor) {
        return
      }
      this.editor.execCommand('InsertImage', false, url)
    },
    setColorContent(foreColor) {
      if (!this.editor) {
        return
      }
      this.editor.execCommand('ForeColor', false, foreColor)
    },
    setBackColorContent(fontBackColor) {
      if (!this.editor) {
        return
      }
      const backColor =
        this.fontStyles.fontBackColor === fontBackColor
          ? 'rgb(255, 255, 255)'
          : fontBackColor
      this.editor.execCommand('BackColor', false, backColor)
      this.fontStyles.fontBackColor = backColor
    },
    // 插入标题
    setInsertTitle(titleClass) {
      if (!this.editor) {
        return
      }
      const node = this.editor.selection.getNode()
      // 获取能修改为标题的最外层节点
      const currentNode = getFirstParent(node, ['H1', 'P', 'DIV']) || node
      if (currentNode.tagName === 'H1') {
        if (this.formatStyles.titleClass === titleClass) {
          // 二次点击移除样式
          currentNode.removeAttribute('class')
          currentNode.removeAttribute('data-index')
          this.editor.execCommand('FormatBlock', false, 'p')
        } else {
          // 更新样式
          currentNode.setAttribute('class', titleClass)
          this.reorderDecimalIndexes()
        }
      } else {
        // 设置为 H1 并应用样式
        currentNode.setAttribute('class', titleClass)
        this.editor.execCommand('FormatBlock', false, 'h1')
        this.reorderDecimalIndexes()
      }
      this.formatStyles.titleClass = titleClass
    },
    // 重新排序所有 class 为 decimal 的元素的 data-index
    reorderDecimalIndexes() {
      const decimalElements = document.querySelectorAll('.decimal')
      decimalElements.forEach((element, index) => {
        const newIndex = (index + 1).toString().padStart(2, '0')
        element.setAttribute('data-index', newIndex)
      })
    },
    // 引用样式
    setInsertQuote(quoteClass) {
      if (!this.editor) {
        return
      }
      // 如果没有聚焦 则聚焦
      if (!this.editor.hasFocus()) {
        this.editor.focus()
      }
      // 清空标题样式
      this.formatStyles.titleClass = null
      if (this.formatStyles.blockQuoteClass === quoteClass) {
        this.formatStyles.blockQuoteClass = null
      }
      // 统一应用在最近的p父标签上
      const node = this.editor.selection.getNode()
      const currentNode = getFirstParent(node, 'P') || node
      if (!this.formatStyles.blockQuoteClass) {
        this.editor.execCommand('mceBlockQuote', false, false)
      }
      this.formatStyles.blockQuoteClass = quoteClass
      currentNode.setAttribute('class', quoteClass)
    },
    // 插入列表
    setInsertList(listType) {
      if (!this.editor) {
        return
      }
      const currentState = this.editor.queryCommandState(listType)
      this.formatStyles[listType] = !currentState
      if (currentState) {
        this.editor.execCommand(listType, false, false)
      } else {
        this.editor.execCommand(listType, false, {
          'list-style-type':
            listType === 'Insertunorderedlist' ? 'decimal' : 'disc',
          'list-item-attributes': { class: 'list-item' }, // list-item 自定义样式
          'list-attributes': { id: 'mylist' }
        })
      }
    },
    // 插入分割线
    setInsertDivider() {
      if (!this.editor) {
        return
      }
      this.editor.execCommand('mceInsertContent', false, '<hr>')
      // 标题样式后插入分割线会新增一个标题 (tinymce 内部问题) 需重新排序
      this.reorderDecimalIndexes()
    },
    handleNodeChange() {
      if (!this.editor) return
      this.hasUndo = this.editor.undoManager.hasUndo()
      this.hasRedo = this.editor.undoManager.hasRedo()
      this.fontStyles.fontSize = this.editor.queryCommandValue('FontSize')
      this.fontStyles.Bold = this.editor.queryCommandState('Bold')
      this.fontStyles.Italic = this.editor.queryCommandState('Italic')
      this.fontStyles.StrikeThrough = this.editor.queryCommandState(
        'Strikethrough'
      )
      this.fontStyles.Underline = this.editor.queryCommandState('Underline')
      this.fontStyles.fontColor =
        this.editor.queryCommandValue('ForeColor') || 'rgb(33, 53, 71)'
      this.fontStyles.fontBackColor =
        this.editor.queryCommandValue('BackColor') || 'rgb(33, 53, 71)'

      const alignmentStates = {
        justifyleft: this.editor.queryCommandState('JustifyLeft'),
        justifycenter: this.editor.queryCommandState('JustifyCenter'),
        justifyright: this.editor.queryCommandState('JustifyRight'),
        justifyfull: this.editor.queryCommandState('JustifyFull')
      }

      this.fontStyles.fontAlignment =
        Object.keys(alignmentStates).find(key => alignmentStates[key]) ||
        'justifyleft'

      // 标题样式
      const node = this.editor.selection.getNode()
      const currentNode = getFirstParent(node, ['H1', 'P', 'DIV']) || node
      if (
        currentNode &&
        currentNode.nodeType === 1 &&
        currentNode.tagName === 'H1'
      ) {
        // 确保节点是一个元素节点
        const className = currentNode.getAttribute('class')
        this.formatStyles.titleClass = [
          'arrow-right',
          'center-line',
          'decimal'
        ].includes(className)
          ? className
          : null
      } else {
        this.formatStyles.titleClass = null
      }
      // 引用样式
      this.formatStyles.mceBlockQuote = this.editor.queryCommandState(
        'mceBlockQuote'
      )
      if (this.formatStyles.mceBlockQuote) {
        const className = currentNode.getAttribute('class')
        this.formatStyles.blockQuoteClass = className
      } else {
        this.formatStyles.blockQuoteClass = null
        // 使用正则移除当前元素和子元素上class里的 blockquote-abstract blockquote-border
        removeClass(currentNode, 'blockquote-abstract blockquote-border')
      }
      this.formatStyles.Insertunorderedlist = this.editor.queryCommandState(
        'Insertunorderedlist'
      )
      this.formatStyles.Insertorderedlist = this.editor.queryCommandState(
        'InsertOrderedList'
      )
      // console.log('Format Styles:===>', this.formatStyles)
    },
    hanldeKeydown(e) {
      if (e.keyCode === 13) {
        // 阻止默认行为
        // e.preventDefault()
        // 插入一个新的段落
        console.log('Enter')
        // editor.execCommand('mceInsertContent', false, '<p></p>')
        this.scrollIntoView()
      }
    },
    // 切换tab
    changeTab(tab) {
      // 选中标题样式时，字体样式不可用
      if (tab === 'font' && this.formatStyles.titleClass) {
        return
      }
      this.handleShowControls()
      this.currentTab = this.currentTab === tab ? null : tab
      !this.currentTab && this.handleFocus()
    },
    handleFocus() {
      console.log('handleFocus')
      if (
        !['14px', '16px', '18px', '20px'].includes(this.fontStyles.fontSize)
      ) {
        this.setFontSize('16px')
      }
      this.editor.focus()
      this.currentTab = null
      this.handleHiddenControls()
      this.scrollIntoView()
    },
    handleBlur() {
      console.log('handleBlur')
      this.isHidden = !this.currentTab
    },
    reset() {
      this.isHidden = true
      this.currentTab = null
      this.fontStyles = {
        fontSize: '16px',
        fontColor: 'rgb(33, 53, 71)',
        fontBackColor: 'rgb(33, 53, 71)',
        fontAlignment: 'justifyleft',
        Bold: false,
        Italic: false,
        StrikeThrough: false,
        Underline: false
      }
      this.formatStyles = {
        titleClass: '',
        blockQuoteClass: '',
        mceBlockQuote: false,
        Insertunorderedlist: false,
        Insertorderedlist: false
      }
    },
    // 处理ios/android键盘弹出后控制面板高度问题
    handleHiddenControls() {
      console.log('isIOS', isIOS())
      console.log('isAndroid', isAndroid())
      if (isIOS()) {
        this.isHidden = false
      }
      if (isAndroid()) {
        this.isHidden = true
      }
    },
    handleShowControls() {
      this.isHidden = false
    },
    handleTouchStart(e) {
      console.log('touchstart===>')
      this.startX = e.touches[0].clientX
      this.startY = e.touches[0].clientY
      // 获取触摸位置的元素
      const touchElement = document.elementFromPoint(this.startX, this.startY)
      // 检查触摸位置是否在有内容的元素上
      if (touchElement && touchElement.textContent.trim().length > 0) {
        this.longPressTimer = setTimeout(() => {
          if (!this.isScrolling) {
            console.log('触发长按')
            this.handleHiddenControls()
            this.$nextTick(() => {
              // 滚动到元素位置
              touchElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              })
            })
          }
        }, 600)
      }
    },
    handleTouchMove(e) {
      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      // 检测是否滚动
      if (
        Math.abs(currentX - this.startX) > 10 ||
        Math.abs(currentY - this.startY) > 10
      ) {
        this.isScrolling = true
        clearTimeout(this.longPressTimer)
      }
    },
    handleTouchEnd() {
      clearTimeout(this.longPressTimer)
      this.isScrolling = false
    },
    // 页面滚动到光标位置
    scrollIntoView: debounce(function() {
      console.log('scrollIntoView')
      this.$nextTick(() => {
        const selection = this.editor.selection.getNode()
        if (selection) {
          selection.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
    }, 150),
    destroyTinymce() {
      const tinymce = window.tinymce?.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
      const content = document.querySelector('.content')
      if (content) {
        content.removeEventListener('touchstart', this.handleTouchStart)
        content.removeEventListener('touchstart', this.handleTouchMove)
        content.removeEventListener('touchend', this.handleTouchEnd)
        clearTimeout(this.longPressTimer)
      }
    },
    // 处理引用外部的图片无法展示问题
    setMeta() {
      const meta = document.createElement('meta')
      meta.content = 'no-referrer'
      meta.name = 'referrer'
      document.getElementsByTagName('head')[0].appendChild(meta)
    },
    formatContent(content) {
      // 企业档案格式化逻辑
      if (this.isAboutUs) {
        this.$utils.toast('粘贴内容将自动匹配模板样式')
        content = processFormat(content)
      }
      // pre 标签替换为div标签
      content = content.replace(/<pre(.*?)>(.*?)<\/pre>/g, function(match, p1, p2) {
        return `<div${p1}>${p2}</div>`
      })
      return content.replace(
        /<img(.*?)crossorigin="anonymous"(.*?)>/g,
        function(match, p1, p2) {
          return `<img${p1}${p2}>`
        }
      )
    },
    imageHandler() {
      // 获取所有图片元素
      const images = document.querySelectorAll('img')
      // 对所有展示不出来的图片处理
      images.forEach(img => {
        img.onerror = function() {
          // img的src 设置为 data-src
          img.src = img.getAttribute('data-src')
        }
      })
    },
    // 处理默认行为
    preventDefault() {
      // 点击样式面板不失焦
      const controls = document.querySelector('.controls')
      controls.addEventListener(
        'mousedown',
        function(e) {
          e.preventDefault()
        },
        false
      )
      // 编辑器长按事件
      const content = document.querySelector('.content')
      content.addEventListener('touchstart', this.handleTouchStart)
      content.addEventListener('touchmove', this.handleTouchMove)
      content.addEventListener('touchend', this.handleTouchEnd)

      // 原生粘贴事件处理图片粘贴问题 无效
      // content.addEventListener('paste', (e) => {
      //   e.preventDefault();
      //    // 获取粘贴板数据
      //   try {
      //     const clipboardData = e.clipboardData || window.clipboardData;
      //   const pastedData = clipboardData.getData('text/html');
      //   const content = this.formatContent(pastedData)
      //   this.editor.insertContent(content)
      //   } catch (error) {
      //     console.log('error',error);
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
// vant 样式影响
::v-deep ol,
::v-deep ul {
  margin: 16px 0px;
  padding: 0px 0px 0px 40px;
}

// .list-item{
//   background-color: aqua;
// }

// 定义 arrow-right 混入
@mixin arrow-right {
  padding-left: 0;
  position: relative;

  &::before {
    content: '';
    display: inline-block;
    position: static;
    margin-right: 4px;
    margin-top: -3px;
    width: 32px;
    height: 32px;
    vertical-align: middle;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAM1BMVEUAAAD/YGD/Xl7/X1//a2v/X1//enr/X1//YGD/X1//b2//X1//X1//YGD/YWH/Xl7/Xl6tC6eVAAAAEHRSTlMAgOzLE2YCmTV5CqWTUkk2rbJclgAAAIRJREFUSMftlMEKgCAQRMtVU0vb///aIII5tnNYKPCdffAQnWXyFVrdUyTOZ1HVkLJZ6HojxSqs+rBFSkCXTUAXIaCLEND1LqCLENBFCOiyCOgiBHRRgoZuFMDJCgctOCeF4XqtUlyeBmpcnjdqPL+oFI+ZqeyQDXYqG8bYPvc1LpN/cQEDvh+z6ML+gAAAAABJRU5ErkJggg==)
      no-repeat 50%;
    background-size: cover;
  }
}

@mixin center-line {
  position: relative;
  padding-left: 0;
  padding-bottom: 8px;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background: #f85959;
  }
}

@mixin decimal {
  padding-left: 0;
  position: relative;

  &::before {
    content: attr(data-index);
    font-size: 40px;
    line-height: 50px;
    margin-right: 16px;
    margin-top: 0;
    display: inline-block;
    border: none;
    border-bottom: 4px solid #f04142;
    position: static;
    background: transparent;
    height: auto;
    width: auto;
    vertical-align: middle;
  }
}

.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

::-webkit-scrollbar {
  display: none;
}

.tinymce-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 30px;
  background-color: white;

  .loading-pop {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2003;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 16px;
    color: black;
  }

  ::v-deep img {
    width: 100%;
  }

  ::v-deep video {
    width: 100%;
  }

  ::v-deep h1 {
    font-size: 50px !important;

    &.arrow-right {
      span {
        font-size: 50px !important;
      }

      @include arrow-right;
    }

    &.center-line {
      span {
        font-size: 50px !important;
      }

      @include center-line;
    }

    &.decimal {
      span {
        font-size: 50px !important;
      }

      @include decimal;
    }
  }

  ::v-deep blockquote {
    .blockquote-abstract {
      padding: 16px 20px;
      border: none;
      border-radius: 4px;
      color: #505050;
      background: #f8f8f8;
      background-color: #f4f5f6;
    }

    .blockquote-border {
      padding-left: 20px;
      border-left: 4px solid #e8e8e8;
    }
  }

  img {
    width: 100%;
    object-fit: contain;
  }

  .header {
    height: 5vh;
    display: flex;
    justify-content: space-between;
  }

  .main {
    flex: 1;
    overflow-y: auto;
    padding: 20px 0px;
    display: flex;
    flex-direction: column;

    .content {
      border: none;
      outline: none;
      margin-top: 20px;
      position: relative;
      // min-height: 40vh;
      flex: 1;
      overflow-y: auto;
    }
  }

  .controls {
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 100%;
    box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    .controls-body {
      overflow-y: auto;
      margin: 10px 0px;
      font-size: 30px;
      height: 100%;

      .controls-title {
        margin: 20px 0px;
        font-size: 20px;
        color: #646464;
      }

      .controls-btn-list {
        justify-content: space-around;
        margin-top: 20px;
        background-color: #fafafa;

        .arrow-right {
          @include arrow-right;
        }

        .center-line {
          @include center-line;

          &::after {
            bottom: 20%;
          }
        }

        .decimal {
          @include decimal;

          &::before {
            content: '01';
            font-size: 35px;
            line-height: 40px;
          }
        }
      }

      .controls-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        width: 20vw;
        // border: 1px solid #eee;
        background-color: #fafafa;
        border-radius: 10px;
        cursor: pointer;

        .controls-btn-img {
          height: 40px;
          width: 40px;
          background-repeat: no-repeat;
          background-size: cover;
        }
      }

      .active {
        background-color: #e8e8e8;
      }

      .controls-color-list {
        width: 128vw;
        display: flex;
        gap: 40px;
        background-color: #fafafa;
        overflow-x: auto;
        padding: 15px 20px;

        .color-active {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;

          .controls-color-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 5px solid white;
          }
        }
      }
    }
  }

  .title {
    border-bottom: 4px solid #eee;
    // margin-bottom: 20px;
    font-size: 50px;

    .no-border {
      width: 100%;
      border: none;
      outline: none;
    }
  }
}
</style>
