import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Processing from "./components/Processing";

const ipfsClient = require("ipfs-http-client");
const ipfsLocal = ipfsClient("http://localhost:5001");

function App() {
  const [resourceHash, setResourceHash] = useState("");
  const [resUrl, setResUrl] = useState("http://localhost:8080/ipfs/");
  const [imgUrl, setImageUrl] = useState("./ipfs.png");
  const [fileBuffer, setFileBuffer] = useState(null);
  const [srcIpfs, setSrcIpfs] = useState("local");
  const [Processing, setProcessing] = useState(false);
  const [ProcessingMsg, setProcessingMsg] = useState("");


  const submitIPFS = async (e) => {
    e.preventDefault();
    if (!fileBuffer) {
      setProcessingMsg("Select a file");
      return;
    }
    setProcessing(true);
    setProcessingMsg("File uploading to IPFS");

    if (srcIpfs === "local") {
      for await (const result of ipfsLocal.add(fileBuffer)) {
        setResourceHash(result.path);
        setProcessing(false);
        setProcessingMsg("Data stored with following hash");
      }
    } else {
      console.log("error");
    }
  };

  const fileReader = (e) => {
    e.preventDefault();
    setProcessing(true);
    setProcessingMsg("Adding file to the buffer");
    const file = e.target.files[0];


    const bufferInput = new window.FileReader();
    bufferInput.readAsArrayBuffer(file);
    bufferInput.onloadend = () => {
      setFileBuffer(Buffer(bufferInput.result));
      setProcessing(false);
      setProcessingMsg("File added to the buffer");
    };
  };

  return (
    <div className="App">
      <div>
        <h1>Upload Files to IPFS</h1>
        <h2>Network: {srcIpfs}</h2>
        <img src={imgUrl} className="networkImg" alt="ss-images" />
      </div>
      <div>
        <div class="Upload">
          <p>Please select a file then upload to IPFS,<br></br> you can retreive the file after</p>
        </div>
        <div>
          <label class="inputLabel">
            <input type="file" onChange={fileReader} />
            Select file
          </label>
        </div>
        <div>
          {resourceHash && (
            <p className="hash">File hash: {resourceHash}</p>
          )}
        </div>
        <div class="Process">
          {Processing && <Processing />}
          <p>{ProcessingMsg}</p>
          <button className="appBtn" type="button" onClick={submitIPFS}>
            Upload to IPFS
          </button>
          {resourceHash && (
            <a href={`${resUrl}${resourceHash}`} target="_blank" rel="noopener noreferrer"Download>
              <button className="appBtn">
                <i className="fas fa-download" />
                Download from IPFS
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
