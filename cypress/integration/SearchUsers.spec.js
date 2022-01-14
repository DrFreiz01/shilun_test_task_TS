/// <reference types="cypress" />

describe("Checking user and counter searches", () => {
    beforeEach(() => {
        cy.visit("/")
        cy.intercept("GET", "https://api.randomuser.me/?results=10", {
            fixture: "users.json"
        })
    })

    it("Should search for users by name", () => {
        const ListNamesFirstTab = [
            'Mia Skålevik',
            'Sarah Morris',
            'James Steeves',
            'Ryan Turner',
            'Reggie Stroet',
            'Vicki Montgomery'
        ]
        cy.wrap(ListNamesFirstTab).each(userName => {
            cy.get("input[placeholder='Поиск...']").type(`${userName}`)
            cy.contains(`${userName}`).should("be.visible")
            cy.get("input[placeholder='Поиск...']").clear()
        })

        cy.get("[data-cy='group_buttons'] > div:nth-child(2)").contains('От 2010 до 2019').click()

        const ListNamesSecondTab = [
            'Anton Cazemier',
            'Ed Shaw',
            'Veeti Manner',
            'Lena Muller',
            'Avery Brown',
            'Gerold Bast'
        ]
        cy.wrap(ListNamesSecondTab).each(userName => {
            cy.get("input[placeholder='Поиск...']").type(`${userName}`)
            cy.contains(`${userName}`).should("be.visible")
            cy.get("input[placeholder='Поиск...']").clear()
        })
    })

    it('Should display the number of found users in the "От 2000 до 2009" group', () => {
        const listValueInSearch = [
            {value: 'ma', found: 7},
            {value: 're', found: 6},
            {value: 'ce', found: 1},
            {value: 'ta', found: 1},
            {value: 'j', found: 4},
        ]
        cy.wrap(listValueInSearch).each($valueSearch => {
            cy.get("input[placeholder='Поиск...']").type(`${$valueSearch.value}`)
            cy.contains(`Нашел: ${$valueSearch.found}`).should("be.visible")
            cy.get("input[placeholder='Поиск...']").clear()
        })
    })

    it('Should display the number of found users in the "От 2010 до 2019" group', () => {
        const listValueInSearch = [
            {value: 'ma', found: 5},
            {value: 're', found: 5},
            {value: 'ce', found: 1},
            {value: 'ta', found: 2},
            {value: 'j', found: 9},
        ]
        cy.wrap(listValueInSearch).each($valueSearch => {
            cy.get("input[placeholder='Поиск...']").type(`${$valueSearch.value}`)
            cy.contains(`Нашел: ${$valueSearch.found}`).should("be.visible")
            cy.get("input[placeholder='Поиск...']").clear()
        })
    })

    it('Should deactivate the counter on the button "От 2010 до 2019" group', () => {
        cy.get("input[placeholder='Поиск...']").type('James Steeves')
        cy.get("[data-cy='group_buttons'] > div:nth-child(2)").contains('От 2010 до 2019').contains('Нашел: 0')
        cy.get("input[placeholder='Поиск...']").clear()
    })

})