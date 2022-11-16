import mongoose from "mongoose";

const novelSchema = new mongoose.Schema({
  collectionAddress: {
    type : String,
    unique : true
  }, //=> blockchain contract instance address
  novelName: {
    type : String,
    unique : true
  }, //=> Novel Name same as contract
  novelCreator: String, //=> User Name
  novelCreatedDate : {
    type : Date,
    default : Date.now()
  }, // => Novel start date.
  novelThumbnail: String, //=> Novel image
  freeChapterCount: Number, //=> free chapters
  chapterPrice: Number, //=>common for all for same novel, can be changed
  tags : Array, //=> Novel Tage
  genre : String, // => genre of novel
  description : String, //=> Summary of Novel
  lastUpdate : Date,
  weeklyClicks :  {
    type : Number,
    default : 0
  },
  monthlyClicks :  {
    type : Number,
    default : 0
  }, //=> monthly api calls 
  bookmarkCount : {
    type : Number,
    default : 0
  }, //=> count of users bookmarked this novel
  status : String, //=> status of book update
  chapterCount: {
    type: Number,
    default: 0,
  }, //=> total chapters
  stars: {
    type: Number,
    default: 0,
  }, //=> only one by a user, can be changed by a user
  comments: [
    {
      by: String,
      data: String,
    },
  ], //=> any number is allowed
  ChapterUpdates: [
    {
      chapter: Number,
      chapterTitle : String,
      updatedOn: {
        type: Date,
        default: Date.now(),
      },
    },
  ], // => for all chapters
});

novelSchema.index({novelName : "text"});

const NOVEL = new mongoose.model("Novel", novelSchema);

export default NOVEL;
