const
    md5 = require('md5');

/**
 * @const {string} TEXT_HEADER_BEG
 * @const {string} TEXT_HEADER_END
 * @const {string} REXP_HEADER_BEG
 * @const {string} REXP_HEADER_END
 * @const {string} REXP_HEADER_INNER
 */
const
    TEXT_HEADER_BEG = '<h$1$2><a ' +
                          'class="wd-go wd-go_for_header-anchor" ' +
                          'id="section-{{ id }}" ' +
                          'href="#section-{{ id }}"' +
                      '>',
    TEXT_HEADER_END = '</a></h$1>',
    REXP_HEADER_BEG = '<h([1-6])([^>]*)?>',
    REXP_HEADER_END = '<\/h([1-6])>',
    REXP_HEADER_INNER = '([^<]+)';

/**
 * @function {addAnchorToHeader}
 *
 * @param {string} raw
 */
function addAnchorToHeader(raw) {
    var
        id = md5(raw.
             replace(new RegExp(REXP_HEADER_BEG + REXP_HEADER_INNER + REXP_HEADER_END), '$3').
             replace(/[\s()\[\]"'`.,:;?!#&]/g, '-').
             replace(/-+/g, '-').
             toLowerCase()),
        out = '';

    out = raw.
          replace(new RegExp(REXP_HEADER_BEG), TEXT_HEADER_BEG).
          replace(new RegExp(REXP_HEADER_END), TEXT_HEADER_END).
          replace(/\{\{\s*id\s*\}\}/g, id);

    return out;
}

/**
 * @function {addAnchorsToHeaders}
 *
 * @param {string} raw
 */
function addAnchorsToHeaders(raw) {
    var
        rexp = new RegExp(REXP_HEADER_BEG + REXP_HEADER_INNER + REXP_HEADER_END, 'gm'),
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

/**
 * @function {page}
 *
 * @param {object} page
 */
function page(page) {
    page.content = addAnchorsToHeaders(page.content);

    return page;
}



module.exports = {
    book: {
        assets: './assets',
        js: [],
        css: ['headers-with-anchors.css?cacheBreaker=1']
    },
    hooks: {page}
};
