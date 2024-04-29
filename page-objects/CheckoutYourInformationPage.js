/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('@playwright/test');
const { ReusablePageObject } = require('./ReusablePageObjects');

exports.CheckoutYourInfo = class CheckoutYourInfo extends ReusablePageObject {
  constructor(page) {
    super(page);
    this.page = page;
    this.titleOfCheckoutYourInfo = page.locator('.header_secondary_container');
    this.cencelButton = page.locator('[data-test="cancel"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.zipCodeField = page.locator('#postal-code');
    this.errorField = page.locator('[data-test="error"]');
  }

  async clickOnCencelButton() {
    await this.cencelButton.click();
  }

  async clickOnContionueButon() {
    await this.continueButton.click();
  }

  async errorTextCheck(text) {
    await expect(this.errorField).toHaveText(text);
  }

  async fillFirstName(name) {
    await this.firstName.fill(name);
    await expect(this.firstName).toHaveValue(name);
  }

  async fillLastName(lastName) {
    await this.lastName.fill(lastName);
    await expect(this.lastName).toHaveValue(lastName);
  }

  async fillZipCode(zipCode) {
    await this.zipCodeField.fill(zipCode);
    await expect(this.zipCodeField).toHaveValue(zipCode);
  }

  async fillAllFieldsAndClick(firstname, lastname, zipCode) {
    await this.fillFirstName(firstname);
    await this.fillLastName(lastname);
    await this.fillZipCode(zipCode);
    await this.clickOnContionueButon();
  }
};
