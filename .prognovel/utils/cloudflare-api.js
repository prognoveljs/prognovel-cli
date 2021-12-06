const fetch = require("node-fetch");
const CF_API_BASE_ENDPOINT = "https://api.cloudflare.com/client/v4/";
const { CF_ACCOUNT_ID, CF_NAMESPACE_ID, CF_API_TOKEN } = process.env;
const { FormData } = require("formdata-node");

function cfWorkerKV() {
  return {
    put: async function (key, data) {
      const url =
        CF_API_BASE_ENDPOINT +
        `accounts/${CF_ACCOUNT_ID}/storage/kv/namespaces/${CF_NAMESPACE_ID}/values/${key}`;

      try {
        const res = await fetch(url, {
          headers: {
            Authorization: "Bearer " + CF_API_TOKEN,
          },
          body: data,
          method: "PUT",
        });
        const json = await res.json();
        console.log(`Uploading ${key} is ${json.success ? "sucess" : "failed"}`);
        if (!json.success) {
          failBuild(
            `Failed to upload to Cloudflare server. 
    Make sure you set the environment secrets in .env file correctly`,
            "upload failed",
          );
        }
      } catch (error) {
        failBuild(
          `Failed to upload to Cloudflare server. 
  Make sure you set the environment secrets in .env file correctly`,
          "upload failed",
        );
      }
    },
  };
}

module.exports = {
  cfWorkerKV,
};
