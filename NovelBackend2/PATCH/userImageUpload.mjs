import fs from 'fs';
import { NFTStorage, File } from 'nft.storage';
import path from "path";
import { fileURLToPath } from 'url';
let url;
let i, user;
let metadata

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UploadToIPFS = async(counter, userId)=>{
  i = counter;
  user = userId;
    let urls = storeExampleNFT((err)=>{
      if(err) throw err;
    });
    url = await urls;
    return url;
};



const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk0QWI4MzQ5NUMwZURmNTc2ZjdiQjc4OGJDMDc4NDUxNDY5NDMyZTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDk4NzM3NzQ3MSwibmFtZSI6IlJ5dGhtTkZUIn0.vunRDt0PqRMx_866IOH4uwT-zjgQoQ5G7HSpB8HCoo8";

async function storeExampleNFT() {
  const meta = {
    name: user,
    description: "null",
    image : new File(
        [await fs.promises.readFile(`../userImage/${i}.jpg`)],
        `${i}.jpg`,
        {type : 'image/png'}
    ),
  }

  url = createMetadata(meta);

  try {
    fs.unlinkSync(`../userImage/${i}.jpg`);
  } catch (err) {
    console.error(err);
  }  
  return url
}

async function createMetadata(meta){
  const client = new NFTStorage({ token: API_KEY });
  const metadata = await client.store(meta);
  
  console.log('NFT data stored!')
  
  url = metadata.url.replace('ipfs://',"https://ipfs.io/ipfs/");
  console.log(url);

  return url;
}
export default UploadToIPFS; 




// OUTPUT
// {
//   "name":"Songs Name",
//   "description":"Song URl",
//   "properties":{
//     "origins":{
//       "video":"ipfs://bafybeihjblkx7fegy7emftba6jfauhbr5fbby6dgf6phvqnogjj2hgvlky/1.mp3"},
//       "authors":[{"name":"Meet Oswal"}]
//     },
//     "image":"ipfs://bafybeiekpg5tqeqv6uro262yvfhmhgwsff6ip42xznc2axkugc5dkb35zi/1.jpg"
// }

