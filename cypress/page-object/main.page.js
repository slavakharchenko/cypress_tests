class MainPage {
  open() {
    cy.visit('/');
  }

  play() {
    this.startBtn.click();
  }

  get title () {
    return cy.get('#status');
  }

  get startBtn () {
    return cy.get('#start');
  }

  get symbols () {
    return cy.get('#result div');
  }

}

export default new MainPage()
