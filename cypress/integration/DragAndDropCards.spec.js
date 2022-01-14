/// <reference types="cypress" />

describe("Checking DnD user cards", () => {
    beforeEach(() => {
        cy.visit("/")
        cy.intercept("GET", "https://api.randomuser.me/?results=10", {
            fixture: "users.json"
        })

    })
    const dataTransfer = new DataTransfer()
    const handlerDragStart = (user, list_drag, list_drop) => {
        cy.get(`[data-cy="${list_drag}"]`).contains(user).trigger('dragstart', {
            dataTransfer
        });
        handlerDrop(list_drop)
    }
    const handlerDrop = (list_drop) => {
        cy.get(`${list_drop}`).trigger('drop', {
            dataTransfer
        });
    }

    it('should move 6 users to the list of favorite users', () => {


        const listUsers = [
            [
                'Jose Gutierrez',
                'Roope Lampo',
                'Kyle Hopkins'
            ],[
                'Ali Durmaz',
                'Andre Olivier',
                'Angel Sanders'
            ]

        ]

        cy.wrap(listUsers[0]).each(user => handlerDragStart(user, "list_all_users", "[data-cy='list_favorites']"))
        cy.get("[data-cy='group_buttons'] > div:nth-child(2)").contains('От 2010 до 2019').click()
        cy.wrap(listUsers[1]).each(user => handlerDragStart(user, "list_all_users", "[data-cy='list_favorites']"))

        /// Andre Olivier card should move into second place
        cy.get("[data-cy='list_favorites'] .ReactVirtualized__Grid__innerScrollContainer > div").should("have.length", 6)
        handlerDragStart(
            "Andre Olivier",
            "list_favorites",
            "[data-cy='list_favorites'] .ReactVirtualized__Grid__innerScrollContainer > div:nth-child(2)"
        )
        cy.get("[data-cy='list_favorites'] .ReactVirtualized__Grid__innerScrollContainer > div:nth-child(2)").should("be.visible")

        /// Move Fanny Syed card from list_all_users to list_favorites to the third position
        cy.get("[data-cy='list_favorites'] .ReactVirtualized__Grid__innerScrollContainer > div").should("have.length", 6)
        handlerDragStart(
            "Fanny Syed",
            "list_all_users",
            "[data-cy='list_favorites'] .ReactVirtualized__Grid__innerScrollContainer > div:nth-child(3)"
        )
        cy.get("[data-cy='list_favorites'] .ReactVirtualized__Grid__innerScrollContainer > div:nth-child(3)").should("be.visible")
    })
})