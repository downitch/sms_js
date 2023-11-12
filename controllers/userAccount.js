const UserAccount = require('../entities/userAccount.js');

class CreateUserAccount {
  async createUserAccount(username, email, password, roleId) {
    const user = new UserAccount();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
    user.setRoleId(roleId);
    const created = await user.createUserAccount(); // This will insert the user into the database
    return created;
  }
}

class GetAllUserAccounts {
  async getAllUserAccounts() {
    return (await UserAccount.getAllUserAccounts());
  }
}

class GetUserAccountById {
  async getUserAccountById(userId) {
    return (await UserAccount.getUserAccountById(userId));
  }
}

class UpdateUserAccount {
  async updateUserAccount(userId, username, email, password, roleId) {
    const user = new UserAccount();
    user.setId(userId);
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
    user.setRoleId(roleId);
    await user.updateUserAccount(); // This will update the user in the database
    return user;
  }
}

class DeleteUserAccount {
  async deleteUserAccount(userId) {
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

module.exports = {CreateUserAccount, GetAllUserAccounts, GetUserAccountById, UpdateUserAccount, DeleteUserAccount, AuthenticateUserAccount};