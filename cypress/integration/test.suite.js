import mainPage from '../page-object/main.page';
import { outcomeSchema } from '../data/schemas';
import {
  OUTCOME_PATH,
  TITLE_TEXT,
  OUTCOME_JSON,
  CORS_ERROR_MESSAGE,
  BASE_URL,
} from '../data/constants';

describe('UI', function () {
  beforeEach(() => {
    mainPage.open();
    cy.server();
  });

  it('Check start page', function () {
    mainPage.title.should('have.text', TITLE_TEXT.baseTitle);
    mainPage.symbols
      .should('have.length', '3')
      .and('not.have.attr', 'style');
  });

  it('Big win', function () {
    cy.route(OUTCOME_PATH, OUTCOME_JSON.winJSON);
    mainPage.play();
    mainPage.title.should('have.text', TITLE_TEXT.winTitle);
    mainPage.symbols.each((element, index) => {
      cy.wrap(element)
        .should('have.attr', 'style')
        .and('contain', `Symbol_${OUTCOME_JSON.winJSON.value[index]}.png`)
    });
  });

  it('Small win', function () {
    cy.route(OUTCOME_PATH, OUTCOME_JSON.smallWinJSON);
    mainPage.play();
    mainPage.title.should('have.text', TITLE_TEXT.smallWinTitle);
    mainPage.symbols.each((element, index) => {
      cy.wrap(element)
        .should('have.attr', 'style')
        .and('contain', `Symbol_${OUTCOME_JSON.smallWinJSON.value[index]}.png`)
    });
  });

  it('No win', function ()  {
    cy.route(OUTCOME_PATH, OUTCOME_JSON.noWinJSON);
    mainPage.play();
    mainPage.title.should('have.text', TITLE_TEXT.noWinTitle);
    mainPage.symbols.each((element, index) => {
      cy.wrap(element)
        .should('have.attr', 'style')
        .and('contain', `Symbol_${OUTCOME_JSON.noWinJSON.value[index]}.png`)
    });
  });
});

describe('Api', () => {
  it('check CORS request /outcome.json', () => {
    cy.request(OUTCOME_PATH).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.error).to.eq(CORS_ERROR_MESSAGE);
    });
  });

  it('check request schema /outcome.json', () => {
    cy.request({ url: OUTCOME_PATH, headers: { referer: BASE_URL } })
      .then(response => {
        expect(response.status).to.eq(200);
        const error = outcomeSchema.validate(response.body).error;
        expect(error).to.undefined;
      });
  })
});
