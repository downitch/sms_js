const Role = require('../entities/role.js');

class CreateRole {
  async createRole(roleName) {
    const role = new Role();
    role.setRoleName(roleName);
    return (await role.createRole());
  }
}

class GetAllRoles {
  async getAllRoles() {
    return (await Role.getAllRoles());
  }
}

class GetRoleById {
  async getRoleById(roleId) {
    return (await Role.getRoleById(roleId));
  }
}

class UpdateRole {
  async updateRole(roleId, roleName) {
    const role = new Role();
    role.setId(roleId);
    role.setRoleName(roleName);
    await role.editRole(); // This will update the role in the database
    return role;
  }
}

class DeleteRole {
  async deleteRole(roleId) {
    const role = new Role();
    role.setId(roleId);
    await role.deleteRole(); // This will delete the role from the database
    return true;
  }
}

module.exports = {CreateRole, GetAllRoles, GetRoleById, UpdateRole, DeleteRole};
