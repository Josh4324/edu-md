const DailyEdge = require('../model/dailyedge');

module.exports = class DailyEdgeService {
    async findAllDailyEdge(max, page){
        return await DailyEdge.find({}).limit(max).skip(page).sort({date: -1});
    }

    async findDailyEdgeWithId(id){
        return await DailyEdge.findOne({_id: id});
    }

    async createDailyEdge(dailyedge){
        return await DailyEdge.create(dailyedge);
    }  

    async updateDailyEdge(id, payload){
        return await DailyEdge.findByIdAndUpdate({_id:id}, payload, {
            new: true,
        });
    }
    
}