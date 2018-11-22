function testTag1(block) {
    return 'TESTTESTTEST' + block.body + 'TESTTESTTEST';
}

const
    HEADER_BEG = '<h[1-6] id="([^"]+)">',
    HEADER_END = '<\\/h[1-6]>',
    HEADER_INNER = '[^>]+';

function addAnchorToHeader(raw) {
    var
        id = raw.
             replace(new RegExp(HEADER_BEG + HEADER_INNER + HEADER_END), '$1'),
        out = raw.
              replace(new RegExp(HEADER_BEG), '').
              replace(new RegExp(HEADER_END), '');

    out = id;

    return out;
}

function addAnchorsToHeaders(content) {

    var
        rexp = new RegExp(HEADER_BEG + HEADER_INNER + HEADER_END, 'g'),
        headers = content.match(rexp);

    // No need to go further
    if (!(headers instanceof Array) || !headers.length) {
        return;
    }

    // Replace
    headers.forEach((header) => {
        content = content.replace(header, addAnchorsToHeaders(header));
    });

    return content;
}

function page(page) {
    page.content = addAnchorsToHeaders(page.content);

    page.content = page.content.replace(/<(\\?)h1>/g, '<$1h3>');
    return page;
}

module.exports = {
    blocks: {
        testTag1
    },
    hooks: {
//         page
    }
};
