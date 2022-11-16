import mongoose from "mongoose";
import express from "express";
import createUser from "./POST/createUser.mjs"
import login from "./POST/login.mjs";
import logout from "./GET/logout.mjs";
import createNovel from "./POST/createNovel.mjs";
import novelNameExist from "./GET/novelNameExist.mjs";
import userNameExist from "./GET/userNameExist.mjs";
import updateTags from "./PATCH/updateTags.mjs";
import addNewTag from "./POST/addNewTag.mjs";
import updateChapterPrice from "./PATCH/updateChapterPrice.mjs";
import updateFreeChapter from "./PATCH/updateFreeChapter.mjs";
import updateLastLogin from "./PATCH/updateLastLogin.mjs";
import updateVisitedToday from "./PATCH/updateVisitedToday.mjs"
import resetMonthClicks from "./PATCH/resetMClicks.mjs";
import resetWeekClicks from "./PATCH/resetWClicks.mjs";
import addChapter from "./PATCH/addChapter.mjs";
import updateComment from "./PATCH/updateComments.mjs";
import editChapter from "./PATCH/editChapter.mjs";
import updateSocial from "./PATCH/updateSocial.mjs";
import updateStars from "./PATCH/updateStars.mjs";
import updateBookmark from "./PATCH/updateBookmark.mjs";
import addTransaction from "./PATCH/addTransaction.mjs";
import updateFollowers from "./PATCH/updateFollowers.mjs";
import updateNovelStatus from "./PATCH/updateNovelStatus.mjs";
import searchBar from "./GET/searchBar.mjs";
import getProfile from "./GET/getProfile.mjs";
import getNovel from "./GET/getNovel.mjs";
import getNovelBG from "./GET/getNovelBG.mjs";
import getNovelBT from "./GET/getNovelBT.mjs";
import weeklyNovels from "./GET/weeklyNovels.mjs";
import monthlyNovels from "./GET/monthlyNovels.mjs";
import getUserTransactions from "./GET/getUserTransactions.mjs";
import getNovels from "./GET/getNovels.mjs";
import getNewRelease from "./GET/getNewRelease.mjs";
import getFollowingList from "./GET/getFollowingList.mjs";
import getTags from "./GET/getTags.mjs";
import getGenres from "./GET/getGenres.mjs";
import getBookmarkList from "./GET/getBookmarkList.mjs";
import updateUser from "./PATCH/updateUser.mjs";
import updateUserImage from "./PATCH/updateUserImage.mjs";
import updateNovelImage from "./PATCH/updateNovelImage.mjs";
import addCapter from "./POST/addChapter.mjs";
const PORT = 3000;

const app = express()

mongoose.connect("mongodb://localhost:27017/test",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() => console.log("connection success...")).catch((err)=> console.log(err));

app.use("/createuser", createUser); //=> (http://localhost:5000/createuser) POST

app.use("/login", login); //=> (http://localhost:5000/login) POST

app.use("/logout", logout); //=> (http://localhost:3000/logout) GET

app.use("/createnovel", createNovel); //=> (http://localhost:3000/logout) POST

app.use("/user", userNameExist);//=> (http://localhost:3000/user/s?name=MeetOswal) GET

app.use("/novel", novelNameExist);//=> (http://localhost:3000/novel/s?name=3+Idiots) GET

app.use("/updatetags", updateTags);//=> (http://localhost:3000/updatetags/add/636cdf329ca5da9ce1f7a939) PATCH

app.use("/addTag", addNewTag);//=> (http://localhost:3000/addTag) POST

app.use("/updateprice", updateChapterPrice);//=> (http://localhost:3000/updateprice/636cdf329ca5da9ce1f7a939) PATCH

app.use("/updatefcc", updateFreeChapter);//=> (http://localhost:3000/updateprice/636cdf329ca5da9ce1f7a939) PATCH

app.use("/updatelogin", updateLastLogin);//=> (http://localhost:3000/updatelogin) PATCH

app.use("/updatevisit", updateVisitedToday);//=> (http://localhost:3000/updatevisit/636cdf329ca5da9ce1f7a939) PATCH

app.use("/addnewchapter", addChapter);//=> (http://localhost:3000/addnewChapter/636cdf329ca5da9ce1f7a939) PATCH

app.use("/updatecomment", updateComment);//=> (http://localhost:3000/updateComment/add/636cdf329ca5da9ce1f7a939) PATCH

app.use("/updatechapter", editChapter);//=> (http://localhost:3000/updatechapter/636cdf329ca5da9ce1f7a939/1) PATCH

app.use("/updatesocialmedia", updateSocial);// =>(http://localhost:3000/updatesocialmedia/) PATCH

app.use("/updatestars", updateStars);// =>(http://localhost:3000/updatestars/636cdf329ca5da9ce1f7a939/4) PATCH

app.use("/updatebookmark", updateBookmark);//=> (http://localhost:3000/updatebookmark/636cdf329ca5da9ce1f7a939) PATCH

app.use("/addtransaction", addTransaction);//=> (http://localhost:3000/addtransaction/) PATCH

app.use("/updatefollower", updateFollowers);//=> (http://localhost:3000/updatefollower/636cdf329ca5da9ce1f7a939) PATCH

app.use("/updatestatus", updateNovelStatus);//=> (http://localhost:3000/updatestatus/636cdf329ca5da9ce1f7a939) PATCH

app.use("/search", searchBar);//=> (http://localhost:3000/search/s?name=Meet) GET

app.use("/profile", getProfile);// => (http://localhost:3000/profile/s?page=1&id=636cd7ae70c8d1ed85d760b3) GET

app.use("/novel", getNovel);//=> (http://localhost:3000/novel/636cdf329ca5da9ce1f7a939) GET

app.use("/novel/genre", getNovelBG);//=> (http://localhost:3000/novel/genre/fiction/s?page=) GET

app.use("/novel/tag", getNovelBT);//=> (http://localhost:3000/novel/tag/cheats/s?page=) GET

app.use("/weektop", weeklyNovels);//=> (http://localhost:3000/weeklytop/s?page=) GET

app.use("/monthlytop", monthlyNovels);//=> (http://localhost:3000/monthlytop/s?page=) GET

app.get("/transactions", getUserTransactions);

app.use("/novels", getNovels);

app.use("/newrelease", getNewRelease);

app.use("following", getFollowingList);

app.use("/tags", getTags);

app.use("/genres", getGenres);

app.use("/bookmark", getBookmarkList);

app.use("/updateuser", updateUser);

app.use("/userimage", updateUserImage);

app.use("/novelimage", updateNovelImage);

app.use("/upload", addChapter);

let x = new Date();
let date= x.getDate();
let  day = x.getDay();
let DateTimer = 30 - date;
let DayTimer = 7 - day;

setInterval(restMClicks, (DateTimer * 86400000 ));

async function restMClicks()//function to delete month clicks of novel 
{
    await resetMonthClicks();
    DateTimer = 30;
}

setInterval(restWClicks, (DayTimer * 86400000 ));

async function restWClicks()//function to delete  week clicks of novel 
{
    await resetWeekClicks();
    DayTimer = 7;
}


app.listen(PORT);
console.log(`${PORT} is the PORT`)