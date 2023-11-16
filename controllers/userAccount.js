const UserAccount = require('../entities/userAccount.js');

class AdminCreateUserAccount {
  async adminCreateUserAccount(username, email, password, roleId, maxBids) {
    const user = new UserAccount();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
    user.setRoleId(roleId);
    user.setMaxBids(maxBids);
    const created = await user.createUserAccount(); // This will insert the user into the database
    return created;
  }
}

class ManagerCreateUserAccount {
  async managerCreateUserAccount(username, email, password, roleId, maxBids) {
    const user = new UserAccount();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
    user.setRoleId(roleId);
    user.setMaxBids(maxBids);
    const created = await user.createUserAccount(); // This will insert the user into the database
    return created;
  }
}

class StaffCreateUserAccount {
  async staffCreateUserAccount(username, email, password, roleId, maxBids) {
    const user = new UserAccount();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
    user.setRoleId(roleId);
    user.setMaxBids(maxBids);
    const created = await user.createUserAccount(); // This will insert the user into the database
    return created;
  }
}

class AdminGetAllUserAccounts {
  async adminGetAllUserAccounts() {
    return (await UserAccount.getAllUserAccounts());
  }
}


class ManagerGetAllUserAccounts {
  async managerGetAllUserAccounts() {
    return (await UserAccount.getAllUserAccounts());
  }
}

class StaffGetAllUserAccounts {
  async staffGetAllUserAccounts() {
    return (await UserAccount.getAllUserAccounts());
  }
}

class AdminGetUserAccountById {
  async adminGetUserAccountById(userId) {
    return (await UserAccount.getUserAccountById(userId));
  }
}

class ManagerGetUserAccountById {
  async managerGetUserAccountById(userId) {
    return (await UserAccount.getUserAccountById(userId));
  }
}

class StaffGetUserAccountById {
  async staffGetUserAccountById(userId) {
    return (await UserAccount.getUserAccountById(userId));
  }
}

class AdminUpdateUserAccount {
  async adminUpdateUserAccount(userId, username, email, password, roleId, maxBids) {
    const user = new UserAccount();
    user.setId(userId);
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
    user.setRoleId(roleId);
    user.setMaxBids(maxBids);
    await user.updateUserAccount(); // This will update the user in the database
    return user;
  }
}

class ManagerUpdateUserAccount {
  async managerUpdateUserAccount(userId, username, email, password, roleId, maxBids) {
    const user = new UserAccount();
    user.setId(userId);
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
    user.setRoleId(roleId);
    user.setMaxBids(maxBids);
    await user.updateUserAccount(); // This will update the user in the database
    return user;
  }
}

class StaffUpdateUserAccount {
  async staffUpdateUserAccount(userId, username, email, password, roleId, maxBids) {
    const user = new UserAccount();
    user.setId(userId);
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
    user.setRoleId(roleId);
    user.setMaxBids(maxBids);
    await user.updateUserAccount(); // This will update the user in the database
    return user;
  }
}

class AdminDeleteUserAccount {
  async adminDeleteUserAccount(userId) {
    const user = new UserAccount();
    user.setId(userId);
    await user.deleteUserAccount(); // This will delete the user from the database
    return true;
  }
}

class ManagerDeleteUserAccount {
  async managerDeleteUserAccount(userId) {
    const user = new UserAccount();
    user.setId(userId);
    await user.deleteUserAccount(); // This will delete the user from the database
    return true;
  }
}

class StaffDeleteUserAccount {
  async staffDeleteUserAccount(userId) {
    const user = new UserAccount();
    user.setId(userId);
    await user.deleteUserAccount(); // This will delete the user from the database
    return true;
  }
}

class AuthenticateUserAccount {
  async authenticateUserAccount(username, password) {
    const user = new UserAccount();
    user.setUsername(username);
    user.setPassword(password);
    return (user.authenticateUserAccount());
  }
}

module.exports = {
  AdminCreateUserAccount,
  ManagerCreateUserAccount,
  StaffCreateUserAccount,
  AdminGetAllUserAccounts,
  ManagerGetAllUserAccounts,
  StaffGetAllUserAccounts,
  AdminGetUserAccountById,
  ManagerGetUserAccountById,
  StaffGetUserAccountById,
  AdminUpdateUserAccount,
  ManagerUpdateUserAccount,
  StaffUpdateUserAccount,
  AdminDeleteUserAccount,
  ManagerDeleteUserAccount,
  StaffDeleteUserAccount,
  AuthenticateUserAccount
};