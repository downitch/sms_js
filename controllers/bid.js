const Bid = require('../entities/bid.js');

class CreateBid {
  async createBid(bidOn, bidBy, approved, reviewedBy) {
    const bid = new Bid();
    bid.setBidOn(bidOn);
    bid.setBidBy(bidBy);
    bid.setApproved(approved);
    bid.setReviewedBy(reviewedBy);
    return (await bid.createBid());
  }
}

class GetAllBids {
  async getAllBids() {
    return (await Bid.getAllBids());
  }
}

class GetBidById {
  async getBidById(bidId) {
    return (await Bid.getBidById(bidId));
  }
}

class UpdateBid {
  async updateBid(bidId, bidOn, bidBy, approved, reviewedBy) {
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

class DeleteBid {
  async deleteBid(bidId) {
    const bid = new Bid();
    bid.setId(bidId);
    await bid.deleteBid(); // This will delete the bid from the database
    return true;
  }
}

module.exports = {CreateBid, GetAllBids, GetBidById, UpdateBid, DeleteBid};