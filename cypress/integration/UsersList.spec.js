/// <reference types="cypress" />

describe("Searching and add users in favorites", () => {

    beforeEach(() => {
        cy.visit("/")
        cy.intercept("GET", "https://api.randomuser.me/?results=10", {
            fixture: "users.json"
        }).as('getUsersList')
    })

    it("Should load one hundred users with mock", () => {
        cy.wait('@getUsersList').its('response.body.results').should('have.length', 100)
    })

    // it('should search for users by name', () => {
    //     const ListNames = [
    //         'Mia Skålevik',
    //         'Sarah Morris',
    //         'James Steeves',
    //         'Ryan Turner',
    //         'Reggie Stroet',
    //         'Vicki Montgomery'
    //     ]
    //     cy.wrap(ListNames).each($userName => {
    //         cy.get("input[placeholder='Поиск...']").type(`${$userName}`)
    //         cy.contains(`${$userName}`).should("be.visible")
    //         cy.get("input[placeholder='Поиск...']").clear()
    //     })
    // })

    // it('should display two buttons "От 2000 до 2009" and "От 2010 до 2019"', () => {
    //     cy.contains(`От 2000 до 2009`).should("be.visible")
    //     cy.contains(`От 2010 до 2019`).should("be.visible")
    // })
    //
    // it('should display the number of found users in the "От 2000 до 2009" group', () => {
    //     const listValueInSearch = [
    //         {value: 'ma', found: 7},
    //         {value: 're', found: 6},
    //         {value: 'ce', found: 1},
    //         {value: 'ta', found: 1},
    //         {value: 'j', found: 4},
    //     ]
    //     cy.wrap(listValueInSearch).each($valueSearch => {
    //         cy.get("input[placeholder='Поиск...']").type(`${$valueSearch.value}`)
    //         cy.contains(`Нашел: ${$valueSearch.found}`).should("be.visible")
    //         cy.get("input[placeholder='Поиск...']").clear()
    //     })
    // })
    //
    // it('should display the number of found users in the "От 2010 до 2019" group', () => {
    //     const listValueInSearch = [
    //         {value: 'ma', found: 5},
    //         {value: 're', found: 5},
    //         {value: 'ce', found: 1},
    //         {value: 'ta', found: 2},
    //         {value: 'j', found: 9},
    //     ]
    //     cy.wrap(listValueInSearch).each($valueSearch => {
    //         cy.get("input[placeholder='Поиск...']").type(`${$valueSearch.value}`)
    //         cy.contains(`Нашел: ${$valueSearch.found}`).should("be.visible")
    //         cy.get("input[placeholder='Поиск...']").clear()
    //     })
    // })

    // it('should click on the button and display another list', () => {
    //     cy.contains('От 2010 до 2019').click()
    //     cy.contains('Ali Durmaz').should("be.visible")
    //     cy.contains('Andre Olivier').should("be.visible")
    //     cy.contains('Angel Sanders').should("be.visible")
    //
    //     cy.contains('От 2000 до 2009').click()
    //     cy.contains('Jose Gutierrez').should("be.visible")
    //     cy.contains('Roope Lampo').should("be.visible")
    //     cy.contains('Kyle Hopkins').should("be.visible")
    // })

    // it('should find users and display them in another list', () => {
    //     cy.get("input[placeholder='Поиск...']").type(`Andre`)
    //     cy.get("[data-cy='group_buttons'] > div:nth-child(1)").contains('От 2000 до 2009').contains('Нашел: 0')
    //     cy.get("[data-cy='list_all_users'] .ReactVirtualized__Grid__innerScrollContainer").should("have.length", 0)
    //     cy.get("[data-cy='group_buttons'] > div:nth-child(2)").contains('От 2010 до 2019').contains('Нашел: 2').click()
    //     cy.get("[data-cy='list_all_users'] .ReactVirtualized__Grid__innerScrollContainer").should("have.length", 1)
    //     cy.contains('Andre Olivier').should("be.visible")
    //     cy.contains('Andreas Moldestad').should("be.visible")
    //     cy.get("input[placeholder='Поиск...'").clear()
    // })


    // it('should move 6 users to the list of favorite users', () => {
    //     const dataTransfer = new DataTransfer()
    //     const handlerDragStart = (user) => {
    //         cy.contains(user).trigger('dragstart', {
    //             dataTransfer
    //         });
    //         handlerDrop()
    //     }
    //     const handlerDrop = () => {
    //         cy.get("[data-cy='list_favorites_users']").trigger('drop', {
    //             dataTransfer
    //         });
    //     }
    //
    //     const listUsers = [
    //         [
    //             'Jose Gutierrez',
    //             'Roope Lampo',
    //             'Kyle Hopkins'
    //         ],[
    //             'Ali Durmaz',
    //             'Andre Olivier',
    //             'Angel Sanders'
    //         ]
    //
    //     ]
    //
    //     cy.wrap(listUsers[0]).each(user => handlerDragStart(user))
    //     cy.get(`[data-cy='group_buttons_1'] > span:nth-child(1)`).click()
    //     cy.wrap(listUsers[1]).each(user => handlerDragStart(user))
    // })

    it('should find users and move to the list of favorite users', () => {

    })


})