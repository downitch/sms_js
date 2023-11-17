const Timeslot = require('../entities/timeslot.js');

class StaffCreateTimeslot {
  async staffCreateTimeslot(timeframe, date) {
    const timeslot = new Timeslot();
    timeslot.setTimeframe(timeframe);
    timeslot.setDate(date);
    return (await timeslot.createTimeslot());
  }
}

class ManagerCreateTimeslot {
  async managerCreateTimeslot(timeframe, date) {
    const timeslot = new Timeslot();
    timeslot.setTimeframe(timeframe);
    timeslot.setDate(date);
    return (await timeslot.createTimeslot());
  }
}

class OwnerCreateTimeslot {
  async ownerCreateTimeslot(timeframe, date) {
    const timeslot = new Timeslot();
    timeslot.setTimeframe(timeframe);
    timeslot.setDate(date);
    return (await timeslot.createTimeslot());
  }
}

class StaffGetAllTimeslots {
  async staffGetAllTimeslots() {
    return (await Timeslot.getAllTimeslots());
  }
}

class ManagerGetAllTimeslots {
  async managerGetAllTimeslots() {
    return (await Timeslot.getAllTimeslots());
  }
}

class OwnerGetAllTimeslots {
  async ownerGetAllTimeslots() {
    return (await Timeslot.getAllTimeslots());
  }
}

class StaffGetTimeslotById {
  async staffGetTimeslotById(timeslotId) {
    return (await Timeslot.getTimeslotById(timeslotId));
  }
}

class ManagerGetTimeslotById {
  async managerGetTimeslotById(timeslotId) {
    return (await Timeslot.getTimeslotById(timeslotId));
  }
}

class OwnerGetTimeslotById {
  async ownerGetTimeslotById(timeslotId) {
    return (await Timeslot.getTimeslotById(timeslotId));
  }
}

class StaffUpdateTimeslot {
  async staffUpdateTimeslot(timeslotId, timeframe, date) {
    const timeslot = new Timeslot();
    timeslot.setId(timeslotId);
    timeslot.setTimeframe(timeframe);
    timeslot.setDate(date);
    await timeslot.updateTimeslot(); // This will update the timeslot in the database
    return timeslot;
  }
}

class ManagerUpdateTimeslot {
  async managerUpdateTimeslot(timeslotId, timeframe, date) {
    const timeslot = new Timeslot();
    timeslot.setId(timeslotId);
    timeslot.setTimeframe(timeframe);
    timeslot.setDate(date);
    await timeslot.updateTimeslot(); // This will update the timeslot in the database
    return timeslot;
  }
}

class OwnerUpdateTimeslot {
  async ownerUpdateTimeslot(timeslotId, timeframe, date) {
    const timeslot = new Timeslot();
    timeslot.setId(timeslotId);
    timeslot.setTimeframe(timeframe);
    timeslot.setDate(date);
    await timeslot.updateTimeslot(); // This will update the timeslot in the database
    return timeslot;
  }
}

class StaffDeleteTimeslot {
  async staffDeleteTimeslot(timeslotId) {
    const timeslot = new Timeslot();
    timeslot.setId(timeslotId);
    await timeslot.deleteTimeslot(); // This will delete the timeslot from the database
    return true;
  }
}

class ManagerDeleteTimeslot {
  async managerDeleteTimeslot(timeslotId) {
    const timeslot = new Timeslot();
    timeslot.setId(timeslotId);
    await timeslot.deleteTimeslot(); // This will delete the timeslot from the database
    return true;
  }
}

class OwnerDeleteTimeslot {
  async ownerDeleteTimeslot(timeslotId) {
    const timeslot = new Timeslot();
    timeslot.setId(timeslotId);
    await timeslot.deleteTimeslot(); // This will delete the timeslot from the database
    return true;
  }
}

module.exports = {
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
};