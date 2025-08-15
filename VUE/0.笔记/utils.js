/**
 * @description 移除元素及其子元素的指定class
 * @param {HTMLElement} el - 目标DOM元素
 * @param {string} className - 要移除的class名称(多个可用空格分隔)
 * @param {boolean} [deep=true] - 是否递归处理子元素
 */
export const removeClass = (el, className, deep = true) => {
  if (!el || !className) return
  // 分割多个class名称
  const classes = className.split(/\s+/).filter(cls => cls)
  // 处理当前元素
  classes.forEach(cls => {
    if (el.classList) {
      el.classList.remove(cls)
    } else {
      // 兼容不支持classList的环境
      const currentClass = el.getAttribute('class') || ''
      el.setAttribute(
        'class',
        currentClass
          .replace(new RegExp(`(^|\\s)${cls}(\\s|$)`, 'g'), '$1$2')
          .trim()
      )
    }
  })
  // 移除空class
  cleanEmptyClass(el)
  // 递归处理子元素
  if (deep && el.children) {
    Array.from(el.children).forEach(child => {
      removeClass(child, className, deep)
    })
  }
}
export const cleanEmptyClass = el => {
  if (!el || !el.hasAttribute('class')) return

  const currentClass = el.getAttribute('class').trim()
  if (!currentClass) {
    el.removeAttribute('class')
  }
}

/**
 * @description 获取当前节点的第一个父级'nodeName'标签
 * @param {HTMLElement} el - 目标DOM元素
 * @param {string} nodeName - 父级标签
 */
export const getFirstParent = (el, nodeName) => {
  if (!el || el.nodeName === 'BODY') {
    return null // 到达根节点或没有父节点时返回null
  }
  const targetNames = Array.isArray(nodeName) ? nodeName : [nodeName]
  if (targetNames.some(name => el.nodeName === name)) {
    return el
  }

  return getFirstParent(el.parentNode, nodeName) // 递归向上查找
}

// 企业档案格式化逻辑
export const processFormat = content => {
  // 1. 创建临时 DOM 元素来解析内容
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = content
  // 2. 处理所有文本节点和元素的字体大小
  const processNodes = node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const style = node.style || {}
      // 判断是否为标题元素（h1-h6），直接设置为18px
      const isHeading = /^h[1-6]$/i.test(node.tagName)
      // 判断是否为段落元素
      const isParagraph = node.tagName.toLowerCase() === 'p'
      // 如果是空的p标签，则移除
      if (isParagraph && isEmptyParagraph(node)) {
        node.remove()
        return
      }
      // 获取当前字体大小
      const fontSize = parseInt(style.fontSize) || 16 // 默认16px
      const newStyles = {
        fontSize: fontSize > 16 ? '18px' : '16px',
        fontWeight: style.fontWeight || 400,
        fontStyle: style.fontStyle || 'normal',
        textAlign: style.textAlign || 'left',
        fontFamily: 'PingFang SC',
        lineHeight: '1.65em',
        color: '#646464'
      }
      // 如果是 p 标签，设置特定的 margin
      if (isParagraph) {
        newStyles.margin = '0px 0px 1.35em 0px'
      }
      // 移除所有现有样式
      node.removeAttribute('style')
      node.removeAttribute('class')
      // 添加新的样式
      Object.assign(node.style, newStyles)
      if (isHeading) {
        node.style.setProperty('font-size', '18px', 'important')
      }
      console.log('newStyles ', newStyles)
      // 递归处理子节点
      Array.from(node.childNodes).forEach(processNodes)
    }
  }
  // 检查是否为空的段落标签
  function isEmptyParagraph(pNode) {
    // 获取节点的纯文本内容
    const textContent = pNode.textContent || ''
    // 如果文本内容为空或只包含空白字符，则认为是空段落
    return textContent.trim() === ''
  }
  // 3. 处理整个内容
  Array.from(tempDiv.childNodes).forEach(processNodes)
  // 4. 返回处理后的内容
  return tempDiv.innerHTML
}
