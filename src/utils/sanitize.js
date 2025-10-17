const SANEAMIENTO_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
};

const REGEX_PELIGROSO = /[&<>"'/]/ig;

export function sanitizeHTML(string) {
    return string.replace(REGEX_PELIGROSO, (match) => SANEAMIENTO_MAP[match]);
}