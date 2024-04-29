/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('@playwright/test');

exports.ReusablePageObject = class ReusablePageObject {
  constructor(page) {
    this.page = page;
  }

  async checkURL(url) {
    await expect(this.page).toHaveURL(url);
  }
};
