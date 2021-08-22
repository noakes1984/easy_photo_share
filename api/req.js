import axios from "axios";

const BASE_URL = "https://api.dropboxapi.com/2"

const ENDPOINTS = {
  list_folder: "/files/list_folder",
  create_shared_link_with_settings: "/sharing/create_shared_link_with_settings",
  upload_file: "/files/upload"
};

export function checkForFolder(token) {
  return axios({
      method: "POST",
      url: BASE_URL + ENDPOINTS.list_folder,
      data: {
        "path": "/homework/math",
        "recursive": false,
        "include_media_info": false,
        "include_deleted": false,
        "include_has_explicit_shared_members": false,
        "include_mounted_folders": true,
        "include_non_downloadable_files": true
    },
      headers: {
        'Authorization' : `Bearer ${token}`,
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

export function createSharedLink() {
  return axios({
      method: "POST",
      url: BASE_URL + ENDPOINTS.create_shared_link_with_settings,
      data: {
        "path": "/Prime_Numbers.txt",
        "settings": {
            "audience": "public",
            "access": "viewer",
            "requested_visibility": "public",
            "allow_download": true
        }
    },
      headers: {
        'Authorization' : 'Bearer sl.A28zn2AeITDqa3fm6HubE23s_kEHr4QXVVcBIfRsHVCkPTSA8UN-pqgr2k1i_EJ9xD1mnI3gl5dBzcg4qolJCua9Y54T5JmJ3s4vaInGjqC2yAKkGIdcsLMkF1kc-rGvlML2GVjsHcg',
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

// export function createSharedLink() {
//   return axios({
//       method: "POST",
//       url: BASE_URL + ENDPOINTS.create_shared_link_with_settings,
//       data: {
//         "path": "/Prime_Numbers.txt",
//         "settings": {
//             "audience": "public",
//             "access": "viewer",
//             "requested_visibility": "public",
//             "allow_download": true
//         }
//     },
//       headers: {
//         'Authorization' : 'Bearer sl.A28zn2AeITDqa3fm6HubE23s_kEHr4QXVVcBIfRsHVCkPTSA8UN-pqgr2k1i_EJ9xD1mnI3gl5dBzcg4qolJCua9Y54T5JmJ3s4vaInGjqC2yAKkGIdcsLMkF1kc-rGvlML2GVjsHcg',
//         'Content-Type': 'application/json'
//       },
      
//     })
//     .then(function (response) {
//       console.log("GOOD JOB", response.data);
//     })
//     .catch((error) => {
//       console.log("Hello", error.response.status);
//     });
// }

// curl https://api.dropbox.com/oauth2/token \
//     -d code=<AUTHORIZATION_CODE> \
//     -d grant_type=authorization_code \
//     -d redirect_uri=<REDIRECT_URI> \
//     -u <APP_KEY>:<APP_SECRET></APP_SECRET>

export function uploadFile() {
  return axios({
      method: "POST",
      url: BASE_URL.ENDPOINTS.upload_file,
      headers: {
        'Authorization' : 'Bearer sl.A28zn2AeITDqa3fm6HubE23s_kEHr4QXVVcBIfRsHVCkPTSA8UN-pqgr2k1i_EJ9xD1mnI3gl5dBzcg4qolJCua9Y54T5JmJ3s4vaInGjqC2yAKkGIdcsLMkF1kc-rGvlML2GVjsHcg',
        "Dropbox-API-Arg": "{\"path\": \"/Homework/math/Matrices.txt\",\"mode\": \"add\",\"autorename\": true,\"mute\": false,\"strict_conflict\": false}",
        "Content-Type" : "application/octet-stream"
      },
      
    })
    .then(function (response) {
      console.log("GOOD JOB", response.data);
    })
    .catch((error) => {
      console.log("Hello", error.response.status);
    });
}

export function getfile() {
  return axios({
      method: "POST",
      url: "https://api.dropboxapi.com/2/file_requests/get",
      data: {
        "id": "oaCAVmEyrqYnkZX9955Y"
    },
      headers: {
        'Authorization' : 'Bearer sl.A28zn2AeITDqa3fm6HubE23s_kEHr4QXVVcBIfRsHVCkPTSA8UN-pqgr2k1i_EJ9xD1mnI3gl5dBzcg4qolJCua9Y54T5JmJ3s4vaInGjqC2yAKkGIdcsLMkF1kc-rGvlML2GVjsHcg',
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
