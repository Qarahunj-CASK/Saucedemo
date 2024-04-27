/* eslint-disable linebreak-style */
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');

const { USER_NAME } = process.env;
const { PASSWORD } = process.env;
const usernameAndPasswordError = 'Epic sadface: Username and password do not match any user in this service';
const usernameIsEmptyError = 'Epic sadface: Username is required';
const passwordIsEmtyError = 'Epic sadface: Password is required';

if (USER_NAME === 'locked_out_user') {
  test('Ensure that the login is not possible with logged out user.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.username).toBeEmpty();
    await expect(loginPage.password).toBeEmpty();
    await expect(loginPage.loginButton).toBeDisabled();
  });
} else {
  test('Authorization with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillUsernameField(USER_NAME);
    await loginPage.fillPasswordField(PASSWORD);
    await loginPage.clickLoginButton(PASSWORD);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('Authorization with invalid username and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillUsernameField('invalid_username');
    await loginPage.fillPasswordField(PASSWORD);
    await loginPage.clickLoginButton();
    await expect(loginPage.errorField).toHaveText(usernameAndPasswordError);
  });

  test('Authorization with valid username and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillUsernameField(USER_NAME);
    await loginPage.fillPasswordField('invalid_password');
    await loginPage.clickLoginButton();
    await expect(loginPage.errorField).toHaveText(usernameAndPasswordError);
  });

  test('Authorization with invalid username and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillUsernameField('invalid_username');
    await loginPage.fillPasswordField('invalid_password');
    await loginPage.clickLoginButton();
    await expect(loginPage.errorField).toHaveText(usernameAndPasswordError);
  });

  test('Authorization with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.username).toBeEmpty();
    await loginPage.fillPasswordField(PASSWORD);
    await loginPage.clickLoginButton();
    await expect(loginPage.errorField).toHaveText(usernameIsEmptyError);
  });

  test('Authorization with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillUsernameField(USER_NAME);
    await expect(loginPage.password).toBeEmpty();
    await loginPage.clickLoginButton();
    await expect(loginPage.errorField).toHaveText(passwordIsEmtyError);
  });

  test('Authorization with an empty username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.username).toBeEmpty();
    await expect(loginPage.password).toBeEmpty();
    await loginPage.clickLoginButton();
    await expect(loginPage.errorField).toHaveText(usernameIsEmptyError);
  });

  test('Ensure that the login button is unclickable when both the login and password fields are empty.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.username).toBeEmpty();
    await expect(loginPage.password).toBeEmpty();
    await expect(loginPage.loginButton).toBeDisabled();
  });

  test('Ensure that login is possible with the Enter button.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillUsernameField(USER_NAME);
    await loginPage.fillPasswordField(PASSWORD);
    await page.keyboard.press('Enter');
    await expect(page.getByText('Products')).toBeVisible();
  });
}
