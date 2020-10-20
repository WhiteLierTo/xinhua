import cache from '@/common/cache.js'

/**
 * @param {Array} value
 * @returns {Boolean}
 */
export default {
	checkRole(value) {
		if (value && value instanceof Array && value.length > 0) {
			const roles = cache.get("roles")
			const permissionRoles = value
			if (roles.length > 0) {
				const hasPermission = roles.some(role => {
					return permissionRoles.includes(role)
				})
				if (!hasPermission) {
					return false
				}
			}

			// const hasPermission = ['top', 'middle']

			return true
		} else {
			console.error(`need roles! Like v-permission="['admin','editor']"`)
			return false
		}
	},

	checkPermission(value) {
		if (value && value instanceof Array && value.length > 0) {
			const permissions = cache.get("permissions")
			const permissionChecks = value
			if (permissions.length > 0) {
				const hasPermission = permissions.some(per => {
					return permissionChecks.includes(per)
				})
				if (!hasPermission) {
					return false
				}
			}
			// const hasPermission = ['top', 'middle']

			return true
		} else {
			console.error(`need permissions! Like v-permission="['admin','editor']"`)
			return false
		}
	}
}
