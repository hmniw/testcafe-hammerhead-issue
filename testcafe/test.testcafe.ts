import { Selector as selector } from 'testcafe';

fixture(`hammerhead repo test`).page(`www.google.com`)

test('journey', async (t) => {
    const agreeButton = selector(`button`).withText('I agree');
    const searchBox = selector(`[aria-label="Search"]`);
    const searchResults = selector(`h1`).withText('Search Results');
    const gitHubAddres = 'https://github.com/DevExpress/testcafe-hammerhead'
    const webResults = selector('h2').withText('Web results').nth(0);
    const gitHubLink = webResults.parent();

    await t
        .expect(agreeButton.visible)
        .ok()
        .click(agreeButton)
        .expect(agreeButton.visible)
        .notOk()
        .expect(searchBox.exists)
        .ok()
        .typeText(searchBox, 'testcafe-hammerhead')
        .pressKey('enter')
        .expect(searchResults.visible)
        .ok()
        .expect(gitHubLink.exists)
        .ok()
        .expect(gitHubLink.getAttribute('href'))
        .eql(gitHubAddres)
})