const ipfsapi = require("ipfs-api");
const ipfs = new ipfsapi("localhost", "5001", { protocol: "http" });
export default ipfs;
