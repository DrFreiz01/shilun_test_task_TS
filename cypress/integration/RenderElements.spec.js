/// <reference types="cypress" />

describe("Checking the rendering of all components", () => {
    beforeEach(() => {
        cy.visit("/")
        cy.intercept("GET", "https://api.randomuser.me/?results=10", {
            fixture: "users.json"
        }).as('getUsersList')
    })

    it("Should load one hundred users with mock", () => {
        cy.wait('@getUsersList').its('response.body.results').should('have.length', 100)
    })

    it("Should display the input field to search for users", () => {
        cy.get("[data-cy='list_all_users-input'] > input[placeholder='Поиск...']").should('have.text', '')
    })

    it("Should display buttons with user groups", () => {
        cy.get("[data-cy='group_buttons'] button").should("have.length", 2)
        cy.get("[data-cy='group_buttons'] .col:nth-child(1)").contains("От 2000 до 2009").should("be.visible")
        cy.get("[data-cy='group_buttons'] .col:nth-child(2)").contains("От 2010 до 2019").should("be.visible")

        // Should display the counter of found users in the button
        cy.get("[data-cy='group_button'] span:nth-child(2)").should("have.length", 2)
        cy.get("[data-cy='group_buttons'] .col:nth-child(1) span:nth-child(2)").contains("Нашел: 49").should("be.visible")
        cy.get("[data-cy='group_buttons'] .col:nth-child(2) span:nth-child(2)").contains("Нашел: 51").should("be.visible")
    })

    it("Should display a block with all uploaded users", () => {
        cy.get("[data-cy='list_all_users'] .ReactVirtualized__List").should("be.visible")
    })

    it("Should display a block with favorites users", () => {
        cy.get("[data-cy='list_favorites'] .ReactVirtualized__List").should("be.visible")
    })

    it("Should display the header in the favorite users block", () => {
        cy.get("[data-cy='list_favorites-title']").should("have.text", "Избранные пользователи")
    })

    it("Should display in user cards", () => {
        cy.get("[data-cy='list_all_users'] .ReactVirtualized__Grid__innerScrollContainer > div").should("have.length", "19")
    })

    it("Should display photo, full name, date of birth, email on the card", () => {
        cy.get("[data-cy='card_user-photo']").should("have.length", "19")
        cy.get("[data-cy='card_user-full_name']").should("have.length", "19")
        cy.get("[data-cy='card_user-date']").should("have.length", "19")
        cy.get("[data-cy='card_user-email']").should("have.length", "19")
    })

})