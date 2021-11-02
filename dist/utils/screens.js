"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderItem = exports.renderCountUp = exports.renderAnimatedItem = exports.insertSupporterContent = exports.getTextItemStyles = exports.getItemContainerStyles = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_countup_1 = __importDefault(require("react-countup"));
const Bounce_1 = __importDefault(require("react-reveal/Bounce"));
const Fade_1 = __importDefault(require("react-reveal/Fade"));
const Flip_1 = __importDefault(require("react-reveal/Flip"));
const Slide_1 = __importDefault(require("react-reveal/Slide"));
const Zoom_1 = __importDefault(require("react-reveal/Zoom"));
const react_typist_1 = __importDefault(require("react-typist"));
const text_1 = require("./text");
const getItemContainerStyles = (item, screenSize) => {
    var _a, _b;
    const styles = {
        maxWidth: `${(_a = item.screenSizes[screenSize]) === null || _a === void 0 ? void 0 : _a.maxWidth}%`,
        minWidth: `${(_b = item.screenSizes[screenSize]) === null || _b === void 0 ? void 0 : _b.maxWidth}%`,
    };
    return styles;
};
exports.getItemContainerStyles = getItemContainerStyles;
const getTextItemStyles = (item, screenSize) => {
    var _a, _b;
    const styles = {
        color: item.font.colour,
        fontFamily: item.font.family,
        fontSize: `${(_a = item.screenSizes[screenSize]) === null || _a === void 0 ? void 0 : _a.font.size}px`,
        fontStyle: item.font.style,
        fontWeight: item.font.weight,
        lineHeight: `${(_b = item.screenSizes[screenSize]) === null || _b === void 0 ? void 0 : _b.font.lineHeight}px`,
        textAlign: item.horizontalAlignment,
    };
    if (item.horizontalAlignment === 'right')
        styles.float = 'right';
    return styles;
};
exports.getTextItemStyles = getTextItemStyles;
const insertSupporterContent = (supporter, itemText, countUp = false) => {
    var _a, _b, _c;
    if (!itemText)
        return '';
    const curlyBracesRegex = /[^{}]*(?=\})/g;
    const insertDataMatches = itemText.match(curlyBracesRegex);
    if (insertDataMatches === null || insertDataMatches === void 0 ? void 0 : insertDataMatches.length) {
        for (const match of insertDataMatches) {
            if (match) {
                const matchArray = match.split('|');
                if (matchArray.length === 5) {
                    const matchInsertData = {
                        type: matchArray[0],
                        id: matchArray[1],
                        truncateLength: !isNaN(parseInt(matchArray[2])) ? parseInt(matchArray[2]) : 0,
                        format: (_a = matchArray[3]) !== null && _a !== void 0 ? _a : '',
                        fallback: (_b = matchArray[4]) !== null && _b !== void 0 ? _b : '',
                    };
                    let replacementText = matchInsertData.type === 'field' && supporter.fields.hasOwnProperty(matchInsertData.id)
                        ? supporter.fields[matchInsertData.id]
                        : ((_c = supporter.searchesResults) === null || _c === void 0 ? void 0 : _c.hasOwnProperty(matchInsertData.id))
                            ? supporter.searchesResults[matchInsertData.id]
                            : '';
                    if (matchInsertData.truncateLength) {
                        replacementText = (0, text_1.truncateText)(replacementText.toString(), matchInsertData.truncateLength);
                    }
                    if (matchInsertData.format) {
                        switch (matchInsertData.format) {
                            case 'moneyPounds':
                                const replacementTextNumber = parseFloat(replacementText.toString());
                                if (!isNaN(replacementTextNumber)) {
                                    replacementText = `£${replacementTextNumber === Math.round(replacementTextNumber)
                                        ? countUp
                                            ? Math.round(replacementTextNumber)
                                            : Math.round(replacementTextNumber).toLocaleString()
                                        : countUp
                                            ? replacementTextNumber
                                            : replacementTextNumber.toLocaleString()}`;
                                }
                                break;
                            case 'numberOfTimes':
                                const replacementTextInteger = parseInt(replacementText.toString());
                                if (!isNaN(replacementTextInteger)) {
                                    switch (replacementTextInteger) {
                                        case 1:
                                            replacementText = 'once';
                                            break;
                                        case 2:
                                            replacementText = 'twice';
                                            break;
                                        default:
                                            replacementText = `${replacementTextInteger} times`;
                                    }
                                }
                                break;
                        }
                    }
                    if (!replacementText.toString().trim().length && matchInsertData.fallback)
                        replacementText = matchInsertData.fallback;
                    itemText = itemText.replace(`{${match}}`, replacementText.toString());
                }
                else {
                    itemText = 'ERROR - check code';
                }
            }
        }
    }
    return itemText;
};
exports.insertSupporterContent = insertSupporterContent;
const renderAnimatedItem = (supporter, item, screenSize, classNameExtra) => {
    // if (!showItemInPreview(year, getSupporterRealOrDummy(), item, previewTimeline))
    //   return <React.Fragment></React.Fragment>;
    const className = `screen-design__canvas__item screen-design__canvas__item--${item.type} screen-design__canvas__item--${item.id} ${classNameExtra}`;
    switch (item.animation) {
        case 'bounce':
            return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: className, style: (0, exports.getItemContainerStyles)(item, screenSize) }, { children: (0, jsx_runtime_1.jsx)(Bounce_1.default, { children: (0, exports.renderItem)(supporter, item, screenSize) }, void 0) }), void 0));
        case 'fade':
            return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: className, style: (0, exports.getItemContainerStyles)(item, screenSize) }, { children: (0, jsx_runtime_1.jsx)(Fade_1.default, { children: (0, exports.renderItem)(supporter, item, screenSize) }, void 0) }), void 0));
        case 'flip':
            return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: className, style: (0, exports.getItemContainerStyles)(item, screenSize) }, { children: (0, jsx_runtime_1.jsx)(Flip_1.default, { children: (0, exports.renderItem)(supporter, item, screenSize) }, void 0) }), void 0));
        case 'slide':
            return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: className, style: (0, exports.getItemContainerStyles)(item, screenSize) }, { children: (0, jsx_runtime_1.jsx)(Slide_1.default, Object.assign({ left: true }, { children: (0, exports.renderItem)(supporter, item, screenSize) }), void 0) }), void 0));
        case 'typewriter':
            return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: className, style: (0, exports.getItemContainerStyles)(item, screenSize) }, { children: (0, jsx_runtime_1.jsx)(react_typist_1.default, Object.assign({ cursor: { show: false } }, { children: (0, exports.renderItem)(supporter, item, screenSize) }), void 0) }), void 0));
        case 'zoom':
            return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: className, style: (0, exports.getItemContainerStyles)(item, screenSize) }, { children: (0, jsx_runtime_1.jsx)(Zoom_1.default, { children: (0, exports.renderItem)(supporter, item, screenSize) }, void 0) }), void 0));
        default:
            return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: className, style: (0, exports.getItemContainerStyles)(item, screenSize) }, { children: (0, exports.renderItem)(supporter, item, screenSize) }), void 0));
    }
};
exports.renderAnimatedItem = renderAnimatedItem;
const renderCountUp = (itemText) => {
    itemText = (0, text_1.multipleSpacesToSingle)(itemText);
    const itemTextArray = itemText.split(' ');
    const itemTextArrayNew = [];
    for (let word of itemTextArray) {
        let prefix = '';
        if (word.charAt(0) === '£') {
            prefix = word.charAt(0);
            word = word.substr(1);
        }
        if (isNaN(parseFloat(word))) {
            itemTextArrayNew.push((0, jsx_runtime_1.jsxs)("span", { children: [word, " "] }, void 0));
        }
        else {
            itemTextArrayNew.push((0, jsx_runtime_1.jsxs)("span", { children: [prefix, (0, jsx_runtime_1.jsx)(react_countup_1.default, { duration: 2, end: parseFloat(word) }, void 0), ' '] }, void 0));
        }
    }
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: itemTextArrayNew.map((wordElement, index) => ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: wordElement }, index))) }, void 0));
};
exports.renderCountUp = renderCountUp;
const renderItem = (supporter, item, screenSize) => item.type === 'image' ? ((0, jsx_runtime_1.jsx)("img", { alt: item.text, src: item.url }, void 0)) : item.type === 'share' ? ((0, jsx_runtime_1.jsx)("div", { children: "[Share buttons will appear here. Set up sharing options on Engaging Networks page.]" }, void 0)) : item.animation === 'countUp' ? ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: (0, exports.getTextItemStyles)(item, screenSize) }, { children: (0, exports.renderCountUp)((0, exports.insertSupporterContent)(supporter, item.text, true)) }), void 0)) : ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: (0, exports.getTextItemStyles)(item, screenSize) }, { children: (0, exports.insertSupporterContent)(supporter, item.text) }), void 0));
exports.renderItem = renderItem;
//# sourceMappingURL=screens.js.map