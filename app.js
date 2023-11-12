const express = require('express');
const bodyParser = require('body-parser');
const {CreateUserAccount, GetAllUserAccounts, GetUserAccountById, UpdateUserAccount, DeleteUserAccount, AuthenticateUserAccount} = require('./controllers/userAccount.js');
const {CreateRole, GetAllRoles, GetRoleById, UpdateRole, DeleteRole} = require('./controllers/role.js');
const {CreateTimeslot, GetAllTimeslots, GetTimeslotById, UpdateTimeslot, DeleteTimeslot} = require('./controllers/timeslot.js');
const {CreateBid, GetAllBids, GetBidById, UpdateBid, DeleteBid} = require('./controllers/bid.js');

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
app.post('/user-accounts', async (req, res) => {
  const { username, email, password, roleId, maxBids } = req.body;
  const createUserAccount = new CreateUserAccount();
  const created = await createUserAccount.createUserAccount(username, email, password, parseInt(roleId, 10), parseInt(maxBids, 10));
  res.json({success: created});
});

// Get all user accounts
app.get('/user-accounts', async (req, res) => {
  const getAllUserAccounts = new GetAllUserAccounts();
  const users = await getAllUserAccounts.getAllUserAccounts();
  res.json(users);
});

// Get a user account by ID
app.get('/user-accounts/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const getUserAccountById = new GetUserAccountById();
  const user = await getUserAccountById.getUserAccountById(userId);
  res.json(user);
});

// Update a user account
app.put('/user-accounts/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { username, email, password, roleId, maxBids } = req.body;
  const updateUserAccount = new UpdateUserAccount();
  const user = await updateUserAccount.updateUserAccount(userId, username, email, password, parseInt(roleId, 10), parseInt(maxBids, 10));
  res.json(user);
});

// Delete a user account
app.delete('/user-accounts/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const deleteUserAccount = new DeleteUserAccount();
  await deleteUserAccount.deleteUserAccount(userId);
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
app.post('/timeslots', async (req, res) => {
  const { timeframe, date } = req.body;
  const createTimeslot = new CreateTimeslot();
  const created = await createTimeslot.createTimeslot(timeframe, date);
  res.json({success: created});
});
  
// Get all timeslots
app.get('/timeslots', async (req, res) => {
  const getAllTimeslots = new GetAllTimeslots();
  const timeslots = await getAllTimeslots.getAllTimeslots();
  res.json(timeslots);
});
  
// Get a timeslot by ID
app.get('/timeslots/:timeslotId', async (req, res) => {
  const timeslotId = parseInt(req.params.timeslotId, 10);
  const getTimeslotById = new GetTimeslotById();
  const timeslot = await getTimeslotById.getTimeslotById(timeslotId);
  res.json(timeslot);
});
  
// Update a timeslot
app.put('/timeslots/:timeslotId', async (req, res) => {
  const timeslotId = parseInt(req.params.timeslotId, 10);
  const { timeframe, date } = req.body;
  const updateTimeslot = new UpdateTimeslot();
  const timeslot = await updateTimeslot.updateTimeslot(timeslotId, timeframe, date);
  res.json(timeslot);
});
  
// Delete a timeslot
app.delete('/timeslots/:timeslotId', async (req, res) => {
  const timeslotId = parseInt(req.params.timeslotId, 10);
  const deleteTimeslot = new DeleteTimeslot();
  await deleteTimeslot.deleteTimeslot(timeslotId);
  res.sendStatus(204);
});

// Create a new bid
app.post('/bids', async (req, res) => {
  const { bidOn, bidBy, approved, reviewedBy } = req.body;
  const createBid = new CreateBid();
  const bid = await createBid.createBid(bidOn, bidBy, approved, reviewedBy);
  res.json(bid);
});
  
// Get all bids
app.get('/bids', async (req, res) => {
  const getAllBids = new GetAllBids();
  const bids = await getAllBids.getAllBids();
  res.json(bids);
});
  
// Get a bid by ID
app.get('/bids/:bidId', async (req, res) => {
  const bidId = parseInt(req.params.bidId, 10);
  const getBidById = new GetBidById();
  const bid = await getBidById.getBidById(bidId);
  res.json(bid);
});
  
// Update a bid
app.put('/bids/:bidId', async (req, res) => {
  const bidId = parseInt(req.params.bidId, 10);
  const { bidOn, bidBy, approved, reviewedBy } = req.body;
  const updateBid = new UpdateBid();
  const bid = await updateBid.updateBid(bidId, bidOn, bidBy, approved, reviewedBy);
  res.json(bid);
});
  
// Delete a bid
app.delete('/bids/:bidId', async (req, res) => {
  const bidId = parseInt(req.params.bidId, 10);
  const deleteBid = new DeleteBid();
  await deleteBid.deleteBid(bidId);
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
