/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */

const { ReusablePageObject } = require('./ReusablePageObjects');

exports.LeftMenubar = class LeftMenubar extends ReusablePageObject {
  constructor(page) {
    super(page);
    this.allItems = page.locator('#inventory_sidebar_link');
    this.about = page.locator('#about_sidebar_link');
    this.logout = page.locator('#logout_sidebar_link');
    this.resetAppState = page.locator('#reset_sidebar_link');
    this.menuBar = page.locator('.bm-menu');
    this.xButton = page.locator('#react-burger-cross-btn');
  }

  async clickOnXButton() {
    await this.xButton.click();
  }

  async clickOnLogoutButton() {
    await this.logout.click();
  }

  async clickOnResetButton() {
    await this.resetAppState.click();
  }

  async clickOnAboutButton() {
    await this.about.click();
  }

  async clickOnAllItemsButton() {
    await this.allItems.click();
  }
};
