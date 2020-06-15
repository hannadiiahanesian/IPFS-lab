# IPFS-lab

You need IPFS daemon to run this app
Created using react

In order to make it work on localnetwork you will need to change config file in .ipfs dir to

   "API": {
    "HTTPHeaders": {
      "Access-Control-Allow-Origin": [
        "*"
      ]
    }
  },
