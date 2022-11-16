import NOVEL from "../databaseSchema/NovelCollection.mjs";

const resetMonthClicks = async () => {

    await NOVEL.updateMany({}, {
        $set : {
            monthlyClicks : 0
        }
    })

    return(99)
}

export default resetMonthClicks;