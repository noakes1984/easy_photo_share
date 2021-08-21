import axios from "axios";

const ENDPOINTS = {
  DEFAULT: "https://api.dropboxapi.com/2/files/list_folder",
};

export function checkForFile() {
  return axios({
      method: "POST",
      url: "https://api.dropboxapi.com/2/files/list_folder",
      data: {
        "path": "/Homework/math",
        "recursive": false,
        "include_media_info": false,
        "include_deleted": false,
        "include_has_explicit_shared_members": false,
        "include_mounted_folders": true,
        "include_non_downloadable_files": true
    },
      headers: {
        'Authorization' : 'Bearer sl.A2_BRXBHtyT0jmRaHVOAiXxozC9Tq300-LLeLncctRMxQ-fGU4QJNw-9GTOOH7zwexGNcKl_F3zOVjmzs2Uz-5AkZSZK0roLCj4ln3cOFcMeRBW5VJpWoYbHvGq-krDYI8ENQAMsM-g',
        'Content-Type': 'application/json'
      },
      
    })
    .then(function (response) {
      console.log("GOOD JOB", response.data);
    })
    .catch((error) => {
      console.log("Hello", error.response.status);
    });
}
