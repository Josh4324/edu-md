const HomeGroup = require('../model/homegroup');

module.exports = class HomeGroupService {
    async findAllHomeGroup(max, page){
        return await HomeGroup.find({}).limit(max).skip(page).sort({date: -1});
    }

    async findHomeGroupWithId(id){
        return await HomeGroup.findOne({_id: id});
    }

    async createHomeGroup(homegroup){
        return await HomeGroup.create(homegroup);
    }  

    async updateHomeGroup(id, payload){
        return await HomeGroup.findByIdAndUpdate({_id:id}, payload, {
            new: true,
        });
    }
    
}