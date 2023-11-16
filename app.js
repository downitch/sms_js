const express = require('express');
const bodyParser = require('body-parser');
const {CreateRole, GetAllRoles, GetRoleById, UpdateRole, DeleteRole} = require('./controllers/role.js');
const {
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
} = require('./controllers/userAccount.js');
const {
  StaffCreateTimeslot,
  ManagerCreateTimeslot,
  OwnerCreateTimeslot,
  StaffGetAllTimeslots, 
  ManagerGetAllTimeslots, 
  OwnerGetAllTimeslots, 
  StaffGetTimeslotById, 
  ManagerGetTimeslotById, 
  OwnerGetTimeslotById, 
  StaffUpdateTimeslot,
  ManagerUpdateTimeslot,
  OwnerUpdateTimeslot,
  StaffDeleteTimeslot,
  ManagerDeleteTimeslot,
  OwnerDeleteTimeslot
} = require('./controllers/timeslot.js');
const {
  StaffCreateBid,
  ManagerCreateBid,
  StaffGetAllBids,
  StaffGetProcessedBids,
  ManagerGetAllBids,
  StaffGetBidById,
  ManagerGetBidById,
  StaffUpdateBid,
  ManagerUpdateBid,
  StaffDeleteBid,
  ManagerDeleteBid
} = require('./controllers/bid.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// BOUNDARIES ARE DOWN THERE
// |
// |
// V
app.get('/', async (req, res) => {
  res.redirect('/login');
});

// ADMIN BOUNDARIES
app.get('/admin', async (req, res) => {
  res.redirect('/admin/list');
});

app.get('/admin/list', async (req, res) => {
  res.sendFile(__dirname + '/boundaries/userAccountList.html');
});

app.get('/admin/create', async (req, res) => {
  res.sendFile(__dirname + '/boundaries/userAccountCreate.html');
});

app.get('/admin/edit/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  res.sendFile(__dirname + '/boundaries/userAccountEdit.html');
});

// OWNER BOUNDARIES
app.get('/owner', async (req, res) => {
  res.redirect('/owner/list');
});

app.get('/owner/list', async (req, res) => {
  res.sendFile(__dirname + '/boundaries/timeslotList.html');
});

app.get('/owner/create', async (req, res) => {
  res.sendFile(__dirname + '/boundaries/timeslotCreate.html');
});

app.get('/owner/edit/:timeslotId', async (req, res) => {
  const timeslotId = parseInt(req.params.timeslotId, 10);
  res.sendFile(__dirname + '/boundaries/timeslotEdit.html');
});

// MANAGER BOUNDARIES
app.get('/manager', async (req, res) => {
  res.redirect('/manager/list');
});

app.get('/manager/list', async (req, res) => {
  res.sendFile(__dirname + '/boundaries/bidsList.html');
});

app.get('/manager/assign/:timeslotId', async (req, res) => {
  res.sendFile(__dirname + '/boundaries/bidsAssign.html');
});

// STAFF BOUNDARIES
app.get('/dashboard/:userId', async (req, res) => {
  res.sendFile(__dirname + '/boundaries/dashboard.html');
});

// LOGIN BOUNDARY
app.get('/login', async (req, res) => {
  res.sendFile(__dirname + '/boundaries/login.html');
});

// CONTROLLERS ARE DOWN THERE 
// |
// |
// V

// Create a new user account
app.post('/admin-user-accounts', async (req, res) => {
  const { username, email, password, roleId, maxBids } = req.body;
  const createUserAccount = new AdminCreateUserAccount();
  const created = await createUserAccount.adminCreateUserAccount(username, email, password, parseInt(roleId, 10), parseInt(maxBids, 10));
  res.json({success: created});
});

app.post('/manager-user-accounts', async (req, res) => {
  const { username, email, password, roleId, maxBids } = req.body;
  const createUserAccount = new ManagerCreateUserAccount();
  const created = await createUserAccount.managerCreateUserAccount(username, email, password, parseInt(roleId, 10), parseInt(maxBids, 10));
  res.json({success: created});
});

app.post('/staff-user-accounts', async (req, res) => {
  const { username, email, password, roleId, maxBids } = req.body;
  const createUserAccount = new StaffCreateUserAccount();
  const created = await createUserAccount.staffCreateUserAccount(username, email, password, parseInt(roleId, 10), parseInt(maxBids, 10));
  res.json({success: created});
});

// Get all user accounts
app.get('/admin-user-accounts', async (req, res) => {
  const getAllUserAccounts = new AdminGetAllUserAccounts();
  const users = await getAllUserAccounts.adminGetAllUserAccounts();
  res.json(users);
});

app.get('/manager-user-accounts', async (req, res) => {
  const getAllUserAccounts = new ManagerGetAllUserAccounts();
  const users = await getAllUserAccounts.managerGetAllUserAccounts();
  res.json(users);
});

app.get('/staff-user-accounts', async (req, res) => {
  const getAllUserAccounts = new StaffGetAllUserAccounts();
  const users = await getAllUserAccounts.staffGetAllUserAccounts();
  res.json(users);
});

// Get a user account by ID
app.get('/admin-user-accounts/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const getUserAccountById = new AdminGetUserAccountById();
  const user = await getUserAccountById.adminGetUserAccountById(userId);
  res.json(user);
});

app.get('/manager-user-accounts/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const getUserAccountById = new ManagerGetUserAccountById();
  const user = await getUserAccountById.managerGetUserAccountById(userId);
  res.json(user);
});

app.get('/staff-user-accounts/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const getUserAccountById = new StaffGetUserAccountById();
  const user = await getUserAccountById.staffGetUserAccountById(userId);
  res.json(user);
});

// Update a user account
app.put('/admin-user-accounts/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { username, email, password, roleId, maxBids } = req.body;
  const updateUserAccount = new AdminUpdateUserAccount();
  const user = await updateUserAccount.adminUpdateUserAccount(userId, username, email, password, parseInt(roleId, 10), parseInt(maxBids, 10));
  res.json(user);
});

app.put('/manager-user-accounts/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { username, email, password, roleId, maxBids } = req.body;
  const updateUserAccount = new ManagerUpdateUserAccount();
  const user = await updateUserAccount.managerUpdateUserAccount(userId, username, email, password, parseInt(roleId, 10), parseInt(maxBids, 10));
  res.json(user);
});

app.put('/staff-user-accounts/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { username, email, password, roleId, maxBids } = req.body;
  const updateUserAccount = new StaffUpdateUserAccount();
  const user = await updateUserAccount.staffUpdateUserAccount(userId, username, email, password, parseInt(roleId, 10), parseInt(maxBids, 10));
  res.json(user);
});

// Delete a user account
app.delete('/admin-user-accounts/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const deleteUserAccount = new AdminDeleteUserAccount();
  await deleteUserAccount.adminDeleteUserAccount(userId);
  res.sendStatus(204);
});

app.delete('/manager-user-accounts/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const deleteUserAccount = new ManagerDeleteUserAccount();
  await deleteUserAccount.managerDeleteUserAccount(userId);
  res.sendStatus(204);
});

app.delete('/staff-user-accounts/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const deleteUserAccount = new StaffDeleteUserAccount();
  await deleteUserAccount.staffDeleteUserAccount(userId);
  res.sendStatus(204);
});

// Authenticate user account
app.post('/user-accounts/login', async (req, res) => {
  const { username, password } = req.body;
  const authenticateUserAccount = new AuthenticateUserAccount();
  const user = await authenticateUserAccount.authenticateUserAccount(username, password);
  res.json(user || {});
});

// Create a new timeslot
app.post('/staff-timeslots', async (req, res) => {
  const { timeframe, date } = req.body;
  const createTimeslot = new StaffCreateTimeslot();
  const created = await createTimeslot.staffCreateTimeslot(timeframe, date);
  res.json({success: created});
});

// Create a new timeslot
app.post('/manager-timeslots', async (req, res) => {
  const { timeframe, date } = req.body;
  const createTimeslot = new ManagerCreateTimeslot();
  const created = await createTimeslot.managerCreateTimeslot(timeframe, date);
  res.json({success: created});
});

// Create a new timeslot
app.post('/owner-timeslots', async (req, res) => {
  const { timeframe, date } = req.body;
  const createTimeslot = new OwnerCreateTimeslot();
  const created = await createTimeslot.ownerCreateTimeslot(timeframe, date);
  res.json({success: created});
});
  
// Get all timeslots
app.get('/staff-timeslots', async (req, res) => {
  const getAllTimeslots = new StaffGetAllTimeslots();
  const timeslots = await getAllTimeslots.staffGetAllTimeslots();
  res.json(timeslots);
});

// Get all timeslots
app.get('/manager-timeslots', async (req, res) => {
  const getAllTimeslots = new ManagerGetAllTimeslots();
  const timeslots = await getAllTimeslots.managerGetAllTimeslots();
  res.json(timeslots);
});

// Get all timeslots
app.get('/owner-timeslots', async (req, res) => {
  const getAllTimeslots = new OwnerGetAllTimeslots();
  const timeslots = await getAllTimeslots.ownerGetAllTimeslots();
  res.json(timeslots);
});
  
// Get a timeslot by ID
app.get('/staff-timeslots/:timeslotId', async (req, res) => {
  const timeslotId = parseInt(req.params.timeslotId, 10);
  const getTimeslotById = new StaffGetTimeslotById();
  const timeslot = await getTimeslotById.staffGetTimeslotById(timeslotId);
  res.json(timeslot);
});

// Get a timeslot by ID
app.get('/manager-timeslots/:timeslotId', async (req, res) => {
  const timeslotId = parseInt(req.params.timeslotId, 10);
  const getTimeslotById = new ManagerGetTimeslotById();
  const timeslot = await getTimeslotById.managerGetTimeslotById(timeslotId);
  res.json(timeslot);
});

// Get a timeslot by ID
app.get('/owner-timeslots/:timeslotId', async (req, res) => {
  const timeslotId = parseInt(req.params.timeslotId, 10);
  const getTimeslotById = new OwnerGetTimeslotById();
  const timeslot = await getTimeslotById.ownerGetTimeslotById(timeslotId);
  res.json(timeslot);
});
  
// Update a timeslot
app.put('/staff-timeslots/:timeslotId', async (req, res) => {
  const timeslotId = parseInt(req.params.timeslotId, 10);
  const { timeframe, date } = req.body;
  const updateTimeslot = new StaffUpdateTimeslot();
  const timeslot = await updateTimeslot.staffUpdateTimeslot(timeslotId, timeframe, date);
  res.json(timeslot);
});

app.put('/manager-timeslots/:timeslotId', async (req, res) => {
  const timeslotId = parseInt(req.params.timeslotId, 10);
  const { timeframe, date } = req.body;
  const updateTimeslot = new ManagerUpdateTimeslot();
  const timeslot = await updateTimeslot.managerUpdateTimeslot(timeslotId, timeframe, date);
  res.json(timeslot);
});

app.put('/owner-timeslots/:timeslotId', async (req, res) => {
  const timeslotId = parseInt(req.params.timeslotId, 10);
  const { timeframe, date } = req.body;
  const updateTimeslot = new OwnerUpdateTimeslot();
  const timeslot = await updateTimeslot.ownerUpdateTimeslot(timeslotId, timeframe, date);
  res.json(timeslot);
});
  
// Delete a timeslot
app.delete('/staff-timeslots/:timeslotId', async (req, res) => {
  const timeslotId = parseInt(req.params.timeslotId, 10);
  const deleteTimeslot = new StaffDeleteTimeslot();
  await deleteTimeslot.staffDeleteTimeslot(timeslotId);
  res.sendStatus(204);
});

app.delete('/manager-timeslots/:timeslotId', async (req, res) => {
  const timeslotId = parseInt(req.params.timeslotId, 10);
  const deleteTimeslot = new ManagerDeleteTimeslot();
  await deleteTimeslot.managerDeleteTimeslot(timeslotId);
  res.sendStatus(204);
});

app.delete('/owner-timeslots/:timeslotId', async (req, res) => {
  const timeslotId = parseInt(req.params.timeslotId, 10);
  const deleteTimeslot = new OwnerDeleteTimeslot();
  await deleteTimeslot.ownerDeleteTimeslot(timeslotId);
  res.sendStatus(204);
});

// Create a new bid
app.post('/staff-bids', async (req, res) => {
  const { bidOn, bidBy, approved, reviewedBy } = req.body;
  const createBid = new StaffCreateBid();
  const bid = await createBid.staffCreateBid(bidOn, bidBy, approved, reviewedBy);
  res.json(bid);
});

app.post('/manager-bids', async (req, res) => {
  const { bidOn, bidBy, approved, reviewedBy } = req.body;
  const createBid = new ManagerCreateBid();
  const bid = await createBid.managerCreateBid(bidOn, bidBy, approved, reviewedBy);
  res.json(bid);
});
  
// Get all bids
app.get('/staff-bids', async (req, res) => {
  const getAllBids = new StaffGetAllBids();
  const bids = await getAllBids.staffGetAllBids();
  res.json(bids);
});

// Get all bids
app.get('/staff-processed-bids', async (req, res) => {
  const getAllBids = new StaffGetProcessedBids();
  const bids = await getAllBids.staffGetProcessedBids();
  res.json(bids);
});

app.get('/manager-bids', async (req, res) => {
  const getAllBids = new ManagerGetAllBids();
  const bids = await getAllBids.managerGetAllBids();
  res.json(bids);
});
  
// Get a bid by ID
app.get('/staff-bids/:bidId', async (req, res) => {
  const bidId = parseInt(req.params.bidId, 10);
  const getBidById = new StaffGetBidById();
  const bid = await getBidById.staffGetBidById(bidId);
  res.json(bid);
});

app.get('/manager-bids/:bidId', async (req, res) => {
  const bidId = parseInt(req.params.bidId, 10);
  const getBidById = new ManagerGetBidById();
  const bid = await getBidById.managerGetBidById(bidId);
  res.json(bid);
});
  
// Update a bid
app.put('/staff-bids/:bidId', async (req, res) => {
  const bidId = parseInt(req.params.bidId, 10);
  const { bidOn, bidBy, approved, reviewedBy } = req.body;
  const updateBid = new StaffUpdateBid();
  const bid = await updateBid.staffUpdateBid(bidId, bidOn, bidBy, approved, reviewedBy);
  res.json(bid);
});

app.put('/manager-bids/:bidId', async (req, res) => {
  const bidId = parseInt(req.params.bidId, 10);
  const { bidOn, bidBy, approved, reviewedBy } = req.body;
  const updateBid = new ManagerUpdateBid();
  const bid = await updateBid.managerUpdateBid(bidId, bidOn, bidBy, approved, reviewedBy);
  res.json(bid);
});
  
// Delete a bid
app.delete('/staff-bids/:bidId', async (req, res) => {
  const bidId = parseInt(req.params.bidId, 10);
  const deleteBid = new StaffDeleteBid();
  await deleteBid.staffDeleteBid(bidId);
  res.sendStatus(204);
});

app.delete('/manager-bids/:bidId', async (req, res) => {
  const bidId = parseInt(req.params.bidId, 10);
  const deleteBid = new ManagerDeleteBid();
  await deleteBid.managerDeleteBid(bidId);
  res.sendStatus(204);
});

// Create a new role
app.post('/roles', async (req, res) => {
  const { roleName } = req.body;
  const createRole = new CreateRole();
  const role = await createRole.createRole(roleName);
  res.json(role);
});
  
// Get all roles
app.get('/roles', async (req, res) => {
  const getAllRoles = new GetAllRoles();
  const roles = await getAllRoles.getAllRoles();
  res.json(roles);
});
  
// Get a role by ID
app.get('/roles/:roleId', async (req, res) => {
  const roleId = parseInt(req.params.roleId, 10);
  const getRoleById = new GetRoleById();
  const role = await getRoleById.getRoleById(roleId);
  res.json(role);
});
  
// Update a role
app.put('/roles/:roleId', async (req, res) => {
  const roleId = parseInt(req.params.roleId, 10);
  const { roleName } = req.body;
  const updateRole = new UpdateRole();
  const role = await updateRole.updateRole(roleId, roleName);
  res.json(role);
});
  
// Delete a role
app.delete('/roles/:roleId', async (req, res) => {
  const roleId = parseInt(req.params.roleId, 10);
  const deleteRole = new DeleteRole();
  await deleteRole.deleteRole(roleId);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
