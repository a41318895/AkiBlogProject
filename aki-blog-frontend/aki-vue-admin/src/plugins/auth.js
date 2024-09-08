import store from '@/store'

function authPermission(permission) {
  const all_permission = "*:*:*";
  const permissions = store.getters && store.getters.permissions
  if (permission && permission.length > 0) {
    return permissions.some(v => {
      return all_permission === v || v === permission
    })
  } else {
    return false
  }
}

function authRole(role) {
  const super_admin = "admin";
  const roles = store.getters && store.getters.roles
  if (role && role.length > 0) {
    return roles.some(v => {
      return super_admin === v || v === role
    })
  } else {
    return false
  }
}

export default {
  // Verify the current user hasThePermission
  hasPermi(permission) {
    return authPermission(permission);
  },

  // Verify the current user hasOneOfThePermissions
  hasPermiOr(permissions) {
    return permissions.some(item => {
      return authPermission(item)
    })
  },

  // Verify the current user hasAllThePermissions
  hasPermiAnd(permissions) {
    return permissions.every(item => {
      return authPermission(item)
    })
  },

  // Verify the current user hasTheRole
  hasRole(role) {
    return authRole(role);
  },

  // Verify the current user hasOneOfTheRoles
  hasRoleOr(roles) {
    return roles.some(item => {
      return authRole(item)
    })
  },

  // Verify the current user hasAllTheRoles
  hasRoleAnd(roles) {
    return roles.every(item => {
      return authRole(item)
    })
  }
}
