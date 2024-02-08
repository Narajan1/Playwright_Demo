import { request } from '@playwright/test';

async function requestCall(request,requestType, url, header, dataObj) {
    let call;
    if (requestType === 'get') {
        call = await request.get(url, {
            headers: {'X-CHALLENGER': header}
        });

    } else if (requestType === 'put') {
        call = await request.put(url, {
            data: dataObj,
            headers: {'X-CHALLENGER': header}
        });
    } else if (requestType === 'post') {
        call = await request.post(url, {
            data: dataObj,
            headers: {'X-CHALLENGER': header}
        });
    } else if (requestType === 'delete') {
        call = await request.delete(url, {
            headers: {'X-CHALLENGER': header}
        });
    }
  }
  export { requestCall };

// export const customMethod = {

    // async requestMethod(requestType, url, headerX) {
        
    //     return await request.fetch(url, {
    //         method: requestType,
    //         //url: url,
    //         data: {
    //             title: 'added new data' + Date.now(),
    //             "description": "",
    //         },

    //         headers:{
    //             'X-CHALLENGER': headerX
    //             }
    //     });
    // },

// }
