function testTag1(block) {
    'TESTTESTTEST' + block.body + 'TESTTESTTEST';
}

module.exports = {
    blocks: {
        testTag1
    }
};
