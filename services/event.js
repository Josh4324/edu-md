const Event = require('../model/event');

module.exports = class EventService {
    async findAllEvent(max, page){
        return await Event.find({}).limit(max).skip(page).sort({date: -1});
    }

    async findEventWithId(id){
        return await Event.findOne({_id: id});
    }

    async findEventWithName(name){
        return await Event.findOne({name});
    }

    async createEvent(event){
        return await Event.create(event);
    }  

    async updateEvent(id, payload){
        return await Event.findByIdAndUpdate({_id:id}, payload, {
            new: true,
        });
    }
    
}