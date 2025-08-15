<template>
  <div class="controls-header">
    <div class="controls-header-btn">
      <van-uploader
        ref="uploaderRef"
        style="display: none;"
        accept="image/*"
        :after-read="onAfterRead"
        multiple
      />
      <div @click="imageHandler">
        <svg
          t="1736740140643"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="25546"
          width="20"
          height="20"
        >
          <path
            d="M938.666667 553.92V768c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V256c0-64.8 52.533333-117.333333 117.333334-117.333333h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333333v297.92z m-64-74.624V256a53.333333 53.333333 0 0 0-53.333334-53.333333H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333333v344.48A290.090667 290.090667 0 0 1 192 597.333333a286.88 286.88 0 0 1 183.296 65.845334C427.029333 528.384 556.906667 437.333333 704 437.333333c65.706667 0 126.997333 16.778667 170.666667 41.962667z m0 82.24c-5.333333-8.32-21.130667-21.653333-43.648-32.917333C796.768 511.488 753.045333 501.333333 704 501.333333c-121.770667 0-229.130667 76.266667-270.432 188.693334-2.730667 7.445333-7.402667 20.32-13.994667 38.581333-7.68 21.301333-34.453333 28.106667-51.370666 13.056-16.437333-14.634667-28.554667-25.066667-36.138667-31.146667A222.890667 222.890667 0 0 0 192 661.333333c-14.464 0-28.725333 1.365333-42.666667 4.053334V768a53.333333 53.333333 0 0 0 53.333334 53.333333h618.666666a53.333333 53.333333 0 0 0 53.333334-53.333333V561.525333zM320 480a96 96 0 1 1 0-192 96 96 0 0 1 0 192z m0-64a32 32 0 1 0 0-64 32 32 0 0 0 0 64z"
            fill="#000000"
            p-id="25547"
          ></path>
        </svg>
      </div>
      <div style="margin-left: 40px;" @click="changeTab('font')">
        <svg
          t="1736820003202"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="50903"
          width="20"
          height="20"
        >
          <path
            d="M479.829333 640H202.837333l-85.333333 213.333333H25.6L298.666667 170.666667h85.333333l273.066667 682.666666h-91.904l-85.333334-213.333333z m-34.133333-85.333333L341.333333 293.76 236.970667 554.666667h208.725333zM896 534.826667V512h85.333333v341.333333h-85.333333v-22.826666a170.666667 170.666667 0 1 1 0-295.68zM810.666667 768a85.333333 85.333333 0 1 0 0-170.666667 85.333333 85.333333 0 0 0 0 170.666667z"
            p-id="50904"
            :fill="
              formatStyles.titleClass
                ? '#CDD0D6'
                : currentTab == 'font'
                  ? '#FF0000'
                  : '#000000'
            "
          ></path>
        </svg>
      </div>
      <div style="margin-left: 40px;" @click="changeTab('format')">
        <svg
          t="1736740304649"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="31093"
          width="20"
          height="20"
        >
          <path
            d="M85.337088 1024A85.337088 85.337088 0 0 1 0.003072 938.665984V85.334016A85.362688 85.362688 0 0 1 85.337088 0h853.327872a85.337088 85.337088 0 0 1 85.334016 85.334016v853.331968A85.311488 85.311488 0 0 1 938.66496 1024z m0-85.334016h853.327872V85.334016H85.337088z m384-213.334016v-384H298.668032a42.65984 42.65984 0 0 1-42.667008-42.668032 42.656768 42.656768 0 0 1 42.667008-42.674176h426.662912a42.631168 42.631168 0 0 1 42.667008 42.674176 42.63424 42.63424 0 0 1-42.667008 42.668032H554.669056v384a42.630144 42.630144 0 0 1-42.667008 42.665984 42.655744 42.655744 0 0 1-42.66496-42.665984z"
            :fill="currentTab == 'format' ? '#FF0000' : '#000000'"
            p-id="31094"
          ></path>
        </svg>
      </div>
    </div>
    <div class="controls-step-btn">
      <div @click="setContentStep('Undo')">
        <svg
          t="1736738989286"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2601"
          width="20"
          height="20"
        >
          <path
            d="M20.48 20.48h983.04v983.04H20.48z"
            fill="#FFFFFF"
            p-id="2602"
          ></path>
          <path
            d="M311.05024 194.02752a30.72 30.72 0 0 0-43.4176-43.4176L135.82336 282.29632a34.816 34.816 0 0 0 0 49.27488l131.72736 131.6864a30.72 30.72 0 1 0 43.4176-43.4176L228.92544 337.67424h368.0256a241.62304 241.62304 0 0 1 0 483.24608H174.40768a30.72 30.72 0 0 0 0 61.44h422.5024a303.06304 303.06304 0 0 0 0-606.12608H228.84352l82.20672-82.20672z"
            :fill="hasUndo ? '#000000' : '#909399'"
            p-id="2603"
          ></path>
        </svg>
      </div>
      <div style="transform: scaleX(-1);" @click="setContentStep('Redo')">
        <svg
          t="1736738989286"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2601"
          width="20"
          height="20"
        >
          <path
            d="M20.48 20.48h983.04v983.04H20.48z"
            fill="#FFFFFF"
            p-id="2602"
          ></path>
          <path
            d="M311.05024 194.02752a30.72 30.72 0 0 0-43.4176-43.4176L135.82336 282.29632a34.816 34.816 0 0 0 0 49.27488l131.72736 131.6864a30.72 30.72 0 1 0 43.4176-43.4176L228.92544 337.67424h368.0256a241.62304 241.62304 0 0 1 0 483.24608H174.40768a30.72 30.72 0 0 0 0 61.44h422.5024a303.06304 303.06304 0 0 0 0-606.12608H228.84352l82.20672-82.20672z"
            :fill="hasRedo ? '#000000' : '#909399'"
            p-id="2603"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { isIOS } from '@/utils'
import { nativeGetCameraPermissions } from '@/api/app'
export default {
  name: 'TinymceControlsHeader',
  props: {
    hasUndo: {
      type: Boolean,
      default: false
    },
    hasRedo: {
      type: Boolean,
      default: false
    },
    formatStyles: {
      type: Object,
      default: () => ({})
    },
    currentTab: {
      type: String,
      default: 'font'
    }
  },
  data() {
    return {
      status: 1 // 1 有权限 0 无权限
    }
  },
  computed: {
    isIOSPlatform() {
      return isIOS()
    }
  },
  async mounted() {
    if (this.isIOSPlatform) {
      this.status = await this.getPermission()
    }
  },
  methods: {
    changeTab(tab) {
      this.$emit('changeTab', tab)
    },
    setContentStep(step) {
      this.$emit('setContentStep', step)
    },
    // 请求超时或异常默认有权限
    async getPermission() {
      let timeoutId = null
      try {
        // nativeGetCameraPermissions不传参数时，获取是否有相册权限 传0时通知app获取权限
        const permissionPromise = nativeGetCameraPermissions()
        const timeoutPromise = new Promise(resolve => {
          timeoutId = setTimeout(() => {
            console.log('权限请求超时')
            resolve(1)
          }, 3000)
        })
        const result = await Promise.race([permissionPromise, timeoutPromise])
        return result
      } catch (error) {
        console.error('获取权限异常:', error)
        return 1
      } finally {
        if (timeoutId) clearTimeout(timeoutId)
      }
    },
    async imageHandler() {
      console.log('权限状态', this.isIOSPlatform, !this.status)
      if (this.isIOSPlatform && !this.status) {
        const status = await nativeGetCameraPermissions({ type: this.status })
        this.status = status
        console.log('通知', this.status)
        return
      }
      this.$refs.uploaderRef?.chooseFile()
    },
    async onAfterRead(files) {
      this.$emit('imageHandler', files)
    }
  }
}
</script>

<style lang="scss" scoped>
.controls-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background-color: white;
  padding: 0px 20px;

  .controls-header-btn {
    flex: 1;
    display: flex;
    // gap: 50px;
  }

  .controls-step-btn {
    display: flex;
    justify-content: space-around;
    width: 160px;
    border-left: 1px solid #eee;
  }
}
</style>
