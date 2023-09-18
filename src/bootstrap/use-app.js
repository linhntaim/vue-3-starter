import {getCurrentInstance} from 'vue'

export function useApp() {
    return getCurrentInstance().proxy
}
