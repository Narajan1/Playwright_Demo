// @ts-check
import { expect, test } from '@playwright/test';
import { performRequest } from '../support/requests.js';
import { getApiKey } from '../support/requests.js'
import { jsonSchemeValidation, schemaTodo, schemaTodos } from '../support/schema.js';
import { baseURL } from '../playwright.config.js';
import { faker } from '@faker-js/faker';


let apiKey;
let todoID;
let dataObj = {
  title: faker.lorem.word(),
  doneStatus: true,
  description: faker.lorem.text(),
};


test.beforeAll("For getting header-challenger", async () => {
  const response = await getApiKey('POST', `${baseURL}/challenger`);
  expect(response.ok).toBeTruthy();
  apiKey = response.headers.get('x-challenger');
});

test("Should perform GET request and get all todos", async () => {
  const response = await performRequest('GET', `${baseURL}/todos`);
  expect(response.ok).toBeTruthy();
  const responseBody = JSON.parse(await response.text());
  expect(jsonSchemeValidation(responseBody, schemaTodos)).toBe(true);
  expect(responseBody.todos[0].doneStatus).toBeFalsy();
});

test("Should perform GET request and get one todo by id", async () => {
  const response = await performRequest('GET', `${baseURL}/todos/1`);
  expect(response.ok).toBeTruthy();
  const responseBody = JSON.parse(await response.text());
  expect(jsonSchemeValidation(responseBody, schemaTodos)).toBe(true);
  expect(responseBody.todos[0].title).toBe("scan paperwork");
  expect(responseBody.todos[0].doneStatus).toBeFalsy();
});

test("Should perform POST request", async () => {
  const response = await performRequest('POST', `${baseURL}/todos`, dataObj, apiKey);
  console.log(response.headers.get("statusText"));
  expect(response.ok).toBeTruthy();
  const responseBody = JSON.parse(await response.text());
  expect(jsonSchemeValidation(responseBody, schemaTodo)).toBe(true);
  todoID = responseBody.id;
});


test('Should DELETE todo', async () => {
  const response = await performRequest('DELETE', `${baseURL}/todos/${todoID}`, dataObj, apiKey);
  expect(response.ok).toBeTruthy();

});

test("Shouldn't GET the deleted todo", async () => {
  const response = await performRequest('GET', `${baseURL}/todos/${todoID}`);
  expect(response.ok).toBeFalsy();
});
