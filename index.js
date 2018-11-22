function testTag1(block) {
    return 'TESTTESTTEST' + block.body + 'TESTTESTTEST';
}

function hookForPage(page) {
    page.content = page.content.replace(/<(\\?)h1>/, '<$1h3>');
    return page;
}

module.exports = {
    blocks: {
        testTag1
    },
    hooks: {
        page: hookForPage
    }
};
