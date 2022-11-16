// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NovelFactory{
    address[] public NovelCollection;
    address public ADMIN;

    constructor(){
        ADMIN = msg.sender;
    }

    function CreateNovel(string memory novelName) public {
        Novel newNovel = new Novel(novelName, msg.sender, ADMIN);
        NovelCollection.push(address(newNovel));
    }

    function GetCreatedNovel(uint256 index) public view returns(address){
        return NovelCollection[index];
    }

    function TotalNovels() public view returns(uint256){
        return NovelCollection.length;
    }
}

contract Novel{

    string public NOVEL_NAME; //saves novel name
    address payable public ADMIN; //admin of NOVEL platform
    address payable public  NOVEL_CREATOR; // novle writter
    uint256 public freeChapterCount; // free chapters count from start
    uint256 public chapter_price; //all chapter price
    mapping(uint256 => mapping(address => bool)) public novelChapter_Subscribers;//all chapter sub
    uint256 public chaptersCount = 0;//chapter count
    mapping(uint256 => string) private chapters;// chapter index to its cloud link

    constructor(string memory novel, address creator, address admin){
        NOVEL_NAME = novel;
        NOVEL_CREATOR = payable(creator);
        ADMIN = payable(admin);
    }

    function setfreeChapters(uint256 value) public{
        require(msg.sender == NOVEL_CREATOR);
        freeChapterCount = value;
    }

    function uploadNewChapter(string memory URI, string memory title) public returns(bool){
        require(msg.sender == NOVEL_CREATOR);
        chaptersCount = chaptersCount + 1;
        chapters[chaptersCount] = URI;
        return true;
    } 

    function uploadChapter(string memory URI, uint256 chapterNumber, string memory title) public returns(bool){
        require(msg.sender == NOVEL_CREATOR, "Sender NOt Creator");
        require(chapterNumber <= chaptersCount, "Chapter Does not exist");
        chapters[chaptersCount] = URI;
        return true;
    }

    function getChapter(uint256 chapterNumber) public view returns(string memory){
        require(chapterNumber <= chaptersCount, "Chapter Does Not exist");
        if(chapterNumber > freeChapterCount){
            require(novelChapter_Subscribers[chapterNumber][msg.sender] == true, "Not Subscribed");
        }

        return chapters[chapterNumber];
    }

    function getChapterAsOwner(uint256 chapterNumber) public view returns(string memory){
        require(chapterNumber <= chaptersCount, "Chapter Does Not exist");
        require(msg.sender == NOVEL_CREATOR, "Not Creator");

        return chapters[chapterNumber];
    }

    function subscribeChapter(uint256 chapterNumber) public payable returns(string memory){
        require(chapterNumber <= freeChapterCount, "No subscribtion required");
        require(chapterNumber <= chaptersCount, "Chapter does not exist");
        require(novelChapter_Subscribers[chapterNumber][msg.sender] != true, "Already Subscribed");
        if(chapterNumber > 1){
            require(novelChapter_Subscribers[chapterNumber - 1][msg.sender] == true, "Please Subscribe Previous Chapter");
        }
        require(msg.value == chapter_price);

        NOVEL_CREATOR.transfer(paymentToCreator(msg.value));
        ADMIN.transfer(paymentToAdmin(msg.value));

        novelChapter_Subscribers[chapterNumber][msg.sender] = true;

        return "Subscribe Successfully....";
    }

    function multipleSubscribe(uint256 chapterStart, uint256 chapterAmount) public payable returns(string memory){
        require(chapterStart <= freeChapterCount, "No subscribtion required");
        require((chapterStart + chapterAmount - 1) <= chaptersCount, "Chapter Limit Reached");
        require((chapter_price * chapterAmount) == msg.value, "Insufficient Amount");
        require(msg.value == (chapterAmount * chapter_price));
        require(novelChapter_Subscribers[chapterStart][msg.sender] != true, "Already Subscribed");
        if(chapterStart > 1){
            require(novelChapter_Subscribers[chapterStart - 1][msg.sender] == true, "Please Subscribe Previous Chapter");
        }
        NOVEL_CREATOR.transfer(paymentToCreator(msg.value));
        ADMIN.transfer(paymentToAdmin(msg.value));        

        for(uint256 i = chapterStart; i <= (chapterStart + chapterAmount - 1); i++){
            novelChapter_Subscribers[i][msg.sender] = true;
        }

        return "Subscribe Succefully....";
    }

    function paymentToCreator(uint256 value) internal pure returns(uint256){
        value = value - (value * 2 / 100);
        return value;
    }

    function paymentToAdmin(uint256 value) internal pure returns(uint256){
        value = (value * 2 / 100);
        return value;
    }

    function changeChapterPrice(uint256 price) public returns(string memory){
        require(msg.sender == NOVEL_CREATOR , "Sender is not Creator of Novel");

        chapter_price = price;

        return "Changed Successfull";
    }

}