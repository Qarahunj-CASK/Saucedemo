/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('@playwright/test');
const { ReusablePageObject } = require('./ReusablePageObjects');

exports.LoginPage = class LoginPage extends ReusablePageObject {
  constructor(page) {
    super(page);
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorField = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async fillUsernameField(username) {
    await this.username.fill(username);
    await expect(this.username).toHaveAttribute('value', username);
  }

  async fillPasswordField(password) {
    await this.password.fill(password);
    await expect(this.password).toHaveAttribute('value', password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async loginToThePage(username, password, url) {
    await this.goto();
    await this.fillUsernameField(username);
    await this.fillPasswordField(password);
    await this.clickLoginButton();
    await super.checkURL(url);
  }
};
