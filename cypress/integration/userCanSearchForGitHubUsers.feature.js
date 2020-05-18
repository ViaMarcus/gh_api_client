describe("User can search for GitHub users", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
    cy.route({
      method: "GET",
      url: "https://api.github.com/users/mojombo",
      response: "fixture: mojombo_info.json",
    });
    cy.route({
      method: "GET",
      url: "https://api.github.com/search/users?q=tom%20repos",
      response: "fixture: search_result.json",
    });
  });

  describe("user can search", () => {
    beforeEach(() => {
      cy.get("input#search-field").type("tom repos");
      cy.get("button#search-submit").click();
    });

    it("displays the amount of results", () => {
      cy.get("p#search-message").should("contain", "12 results");
    });

    it("displays the first result", () => {
      cy.get("#result-1").should("contain", "dunklesToast");
    });

    it("displays the second result", () => {
      cy.get("#result-2").should("contain", "tomwillfixit");
    });
  });

  describe("user can get empty results", () => {
    it('says there are no results', () => {
      cy.route({
        method: "GET",
        url: "https://api.github.com/search/users?q=whowouldevensearchforthis",
        response: "fixture: empty_search.json",
      });
      cy.get("input#search-field").type("whowouldevensearchforthis");
      cy.get("button#search-submit").click();
      cy.get('#search-message').should("contain", "No results")
    })
  });

  describe("user can get too many results", () => {
    it('says there are hidden results', () => {
      cy.route({
        method: "GET",
        url: "https://api.github.com/search/users?q=tom",
        response: "fixture: big_search.json",
      });
      cy.get("input#search-field").type("tom");
      cy.get("button#search-submit").click();
      cy.get('#search-message').should("contain", "Showing result 1-30 of a total 112272. You should perhaps narrow your search")
    })
  });

  describe("user can visit the results", () => {
    beforeEach(() => {
      cy.get("input#search-field").type("tom repos");
      cy.get("button#search-submit").click();
    });

    it("can visit the first person", () => {
      cy.get("#mojambo").click();
      cy.get("#profile").should("contain", "Name: Tom Preston-Werner");
    });

    it('can go to their repo on GH', () => {
      cy.get("#mojambo").click();
      cy.get('a').contains('github.com').click()
      cy.url().should('contain', "github.com/mojambo")
    })
  });
});
