const Verse = require('../model/verse');

module.exports = class VerseService {
    async findAllVerse(max,page){
        return await Verse.find({}).limit(max).skip(page).sort({date: -1});
    }

    async findVerseWithId(id){
        return await Verse.findOne({_id: id});
    }

    async findVerseWithTitle(title,max, page){
        return await Verse.find({title:title}).limit(max).skip(page).sort({date: -1});;
    }

    async createVerse(verse){
        return await Verse.create(verse);
    }  

    async updateVerse(id, payload){
        return await Verse.findByIdAndUpdate({_id:id}, payload, {
            new: true,
        });
    }
    
}