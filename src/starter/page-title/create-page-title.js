import {getCurrentInstance, onBeforeUnmount} from 'vue'
import {PageTitle} from './page-title'

export function createPageTitle(options) {
    return {
        install(vue) {
            vue.config.globalProperties.$pageTitle = new PageTitle(options)
        },
    }
}

export function usePageTitle(...titles) {
    const pageTitle = getCurrentInstance().proxy.$pageTitle
    const placeholder = pageTitle.placeholder(...titles)
    onBeforeUnmount(() => {
        pageTitle.remove(placeholder)
    })
    return {
        setTitle: (...titles) => pageTitle.set(placeholder, ...titles).toString(),
        pushTitle: (...titles) => pageTitle.push(placeholder, ...titles).toString(),
        toString: () => pageTitle.toString(),
    }
}
