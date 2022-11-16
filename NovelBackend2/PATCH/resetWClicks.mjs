import NOVEL from "../databaseSchema/NovelCollection.mjs";

const resetWeekClicks = async () => {

    await NOVEL.updateMany({}, {
        $set : {
            weeklyClicks : 0
        }
    })

    return(99)
}

export default resetWeekClicks;