/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('@playwright/test');

exports.Checkoutviewpage = class Checkoutviewpage {
  /**
     * @param {import('@playwright/test').Page} page
     */
  constructor(page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginbutton = page.locator('[data-test="login-button"]');
  }
};
