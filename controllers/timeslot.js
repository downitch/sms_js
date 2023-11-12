const Timeslot = require('../entities/timeslot.js');

class CreateTimeslot {
  async createTimeslot(timeframe, date) {
    const timeslot = new Timeslot();
    timeslot.setTimeframe(timeframe);
    timeslot.setDate(date);
    return (await timeslot.createTimeslot());
  }
}

class GetAllTimeslots {
  async getAllTimeslots() {
    return (await Timeslot.getAllTimeslots());
  }
}

class GetTimeslotById {
  async getTimeslotById(timeslotId) {
    return (await Timeslot.getTimeslotById(timeslotId));
  }
}

class UpdateTimeslot {
  async updateTimeslot(timeslotId, timeframe, date) {
    const timeslot = new Timeslot();
    timeslot.setId(timeslotId);
    timeslot.setTimeframe(timeframe);
    timeslot.setDate(date);
    await timeslot.editTimeslot(); // This will update the timeslot in the database
    return timeslot;
  }
}

class DeleteTimeslot {
  async deleteTimeslot(timeslotId) {
    const timeslot = new Timeslot();
    timeslot.setId(timeslotId);
    await timeslot.deleteTimeslot(); // This will delete the timeslot from the database
    return true;
  }
}

module.exports = {CreateTimeslot, GetAllTimeslots, GetTimeslotById, UpdateTimeslot, DeleteTimeslot};