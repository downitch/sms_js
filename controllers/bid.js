const Bid = require('../entities/bid.js');

class StaffCreateBid {
  async staffCreateBid(bidOn, bidBy, approved, reviewedBy) {
    const bid = new Bid();
    bid.setBidOn(bidOn);
    bid.setBidBy(bidBy);
    bid.setApproved(approved);
    bid.setReviewedBy(reviewedBy);
    return (await bid.createBid());
  }
}

class ManagerCreateBid {
  async managerCreateBid(bidOn, bidBy, approved, reviewedBy) {
    const bid = new Bid();
    bid.setBidOn(bidOn);
    bid.setBidBy(bidBy);
    bid.setApproved(approved);
    bid.setReviewedBy(reviewedBy);
    return (await bid.createBid());
  }
}

class StaffGetAllBids {
  async staffGetAllBids() {
    return (await Bid.getAllBids());
  } // w3Lcomeb*ck
}

class StaffGetProcessedBids {
  async staffGetProcessedBids() {
    return (await Bid.getAllBids());
  } // w3Lcomeb*ck
}

class ManagerGetAllBids {
  async managerGetAllBids() {
    return (await Bid.getAllBids());
  } // w3Lcomeb*ck
}

class StaffGetBidById {
  async staffGetBidById(bidId) {
    return (await Bid.getBidById(bidId));
  }
}

class ManagerGetBidById {
  async managerGetBidById(bidId) {
    return (await Bid.getBidById(bidId));
  }
}

class StaffUpdateBid {
  async staffUpdateBid(bidId, bidOn, bidBy, approved, reviewedBy) {
    const bid = new Bid();
    bid.setId(bidId);
    bid.setBidOn(bidOn);
    bid.setBidBy(bidBy);
    bid.setApproved(approved);
    bid.setReviewedBy(reviewedBy);
    await bid.editBid(); // This will update the bid in the database
    return bid;
  }
}

class ManagerUpdateBid {
  async managerUpdateBid(bidId, bidOn, bidBy, approved, reviewedBy) {
    const bid = new Bid();
    bid.setId(bidId);
    bid.setBidOn(bidOn);
    bid.setBidBy(bidBy);
    bid.setApproved(approved);
    bid.setReviewedBy(reviewedBy);
    await bid.editBid(); // This will update the bid in the database
    return bid;
  }
}

class StaffDeleteBid {
  async staffDeleteBid(bidId) {
    const bid = new Bid();
    bid.setId(bidId);
    await bid.deleteBid(); // This will delete the bid from the database
    return true;
  }
}

class ManagerDeleteBid {
  async managerDeleteBid(bidId) {
    const bid = new Bid();
    bid.setId(bidId);
    await bid.deleteBid(); // This will delete the bid from the database
    return true;
  }
}

module.exports = {
  StaffCreateBid,
  ManagerCreateBid,
  StaffGetAllBids,
  ManagerGetAllBids,
  StaffGetProcessedBids,
  StaffGetBidById,
  ManagerGetBidById,
  StaffUpdateBid,
  ManagerUpdateBid,
  StaffDeleteBid,
  ManagerDeleteBid
};