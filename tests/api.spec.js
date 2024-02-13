// @ts-check
import { expect, test } from '@playwright/test';
import {performRequest} from '../support/requests.js';
import {getApiKey} from '../support/requests.js'

let apiKey;
let todoID;
let dataObj = {
  title: 'added new data' + Date.now(),
  "description": "desc" + Date.now()
};

const baseUrl = "https://apichallenges.herokuapp.com";

test.beforeAll("For getting header", async () => {
  const response = await getApiKey('POST',`${baseUrl}/challenger`);
  expect(response.ok).toBeTruthy();
  apiKey = response.headers.get('x-challenger');
  console.log(apiKey);
});


test("POST request", async () => {
  const response = await performRequest('POST', `${baseUrl}/todos`, dataObj, apiKey);
  expect(response.ok).toBeTruthy();
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  // todoID = responseBody.id;
  // console.log(todoID);
});

test("GET request", async () => {
  const response = await performRequest('GET',`${baseUrl}/todos`);
  expect(response.ok).toBeTruthy();
  const responseBody = JSON.parse(await response.text());
  expect(responseBody.todos[0].title).toBe("train staff");
  expect(responseBody.todos[0].doneStatus).toBeFalsy();
});
