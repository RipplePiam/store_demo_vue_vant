// 本地化存储
export const setLocalStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        // 将非字符串类型的content字符串化为JSON格式
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

// 本地化获取
export const getLocalStore = (name) => {
    if (!name) return
    return window.localStorage.getItem(name)
}

// 本地化删除
export const removeLocalStore = (name) => {
    if (!name) return
    return window.localStorage.removeItem(name)
}

// 版本信息
export const _VERSION_ = '1.0.0'