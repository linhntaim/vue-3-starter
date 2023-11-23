import {pass} from '@/starter/helpers'

export const loadNotFoundView = () => import('@/resources/views/errors/NotFound.vue')

/**
 *
 * @param {Boolean|Object} rootIncluded
 * @param {String|null} rootName
 * @returns Object|Array
 */
export function makeFallbackRoute(rootIncluded = false, rootName = null) {
    const fallbackRoute = {
        path: ':pathMatch(.*)*',
        component: loadNotFoundView,
    }
    if (rootIncluded !== false) {
        return [
            pass(
                rootIncluded === true ? {
                    path: '',
                    component: loadNotFoundView,
                } : {
                    path: '',
                    redirect: rootIncluded,
                },
                rootRoute => {
                    if (rootName) {
                        rootRoute.name = rootName
                    }
                    return rootRoute
                },
            ),
            fallbackRoute,
        ]
    }
    return fallbackRoute
}
