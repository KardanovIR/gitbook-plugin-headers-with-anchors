function testTag1(block) {
    return 'TESTTESTTEST' + block.body + 'TESTTESTTEST';
}

module.exports = {
    blocks: {
        testTag1
    }
};
