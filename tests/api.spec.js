// @ts-check
import {requestCall} from '../support/requests.js';
import { test, expect } from '@playwright/test';


let header_xChallanger;
let data =  {
        title: 'added new data' + Date.now(),
        "description": "",
    };
  

test.describe("API requests examples", async () => {

  const baseUrl = "https://apichallenges.herokuapp.com";

  test.beforeAll("For getting header", async({request}) => {
    const response = await request.post(`${baseUrl}/challenger`);
    expect(response).toBeOK();
    header_xChallanger = response.headers()['x-challenger'];
    console.log(header_xChallanger);
  });

  test.only('POST request example', async ({request}) => {

    const response = await requestCall(request, 'post', `${baseUrl}/todos`, header_xChallanger, data);
    console.log(response);
});
  




  // test("GET request example", async({request}) => {

  //   const response = await request.get(`/todos`);
  //   const responseBody = JSON.parse(await response.text());
  //   expect(response).toBeOK();
  //   expect(responseBody.todos[0].title).toBe("pay invoices");
  //   expect(responseBody.todos[0].doneStatus).toBeFalsy();
  // })
  

  // test("POST request example", async({request}) => {

  //   const response = await request.post(`/todos`, {
  //     data: {
  //       title: 'added new data',
  //       "description": "",
  //   }, 
  //     headers:{
  //     'X-CHALLENGER': header_xChallanger
  //     }
  //   });
  //})
})
