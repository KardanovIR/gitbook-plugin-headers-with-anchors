function testTag1(block) {
    return 'TESTTESTTEST' + block.body + 'TESTTESTTEST';
}

const
    TEXT_HEADER_BEG = '<h$1 id="$2"><a id="#anchor-{{ id }}" href="#anchor-{{ id }}">',
    TEXT_HEADER_END = '</a></h$1>',
    REXP_HEADER_BEG = '<h([1-6]) id="([^"]+)">',
    REXP_HEADER_END = '<\\/h([1-6])>',
    REXP_HEADER_INNER = '[^>]+';

function addAnchorToHeader(raw) {
    var
        n = raw.
             replace(new RegExp(REXP_HEADER_BEG + REXP_HEADER_INNER + REXP_HEADER_END), '$1'),
        id = raw.
             replace(new RegExp(REXP_HEADER_BEG + REXP_HEADER_INNER + REXP_HEADER_END), '$2').
             replace(/[()]/g, '-').
             replace(/-+/g, '-').
             toLowerCase(),
        out = raw.
              replace(new RegExp(REXP_HEADER_BEG), TEXT_HEADER_BEG).
              replace(new RegExp(REXP_HEADER_END), TEXT_HEADER_END).
              replace(/\{\{\s*id\s*\}\}/g, id);

    return out;
}

function addAnchorsToHeaders(raw) {
    var
        rexp = new RegExp(REXP_HEADER_BEG + REXP_HEADER_INNER + REXP_HEADER_END, 'g'),
        headers = raw.match(rexp);

    // No need to go further
    if (!(headers instanceof Array) || !headers.length) {
        return raw;
    }

    // Replace
    headers.forEach((header) => {
        raw = raw.replace(header, addAnchorToHeader(header));
    });

    return raw;
}

function page(page) {
    page.content = addAnchorsToHeaders(page.content);

console.log(page.content);

    return page;
}

module.exports = {
    blocks: {
        testTag1
    },
    hooks: {
        page
    }
};
