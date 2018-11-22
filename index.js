function testTag1(block) {
    return 'TESTTESTTEST' + block.body + 'TESTTESTTEST';
}

function hookForPage(page) {
    data.content = 'TESTTESTTEST' + data.content + 'TESTTESTTEST';
}

module.exports = {
    blocks: {
        testTag1
    },
    hooks: {
        page: hookForPage
    }
};
