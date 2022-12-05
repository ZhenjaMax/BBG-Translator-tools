import fs from "fs";

// 1. Drop file to ./lang folder and write file name.
const FILE_NAME: string = "italian.xml";
const ENGLISH_FILE_NAME: string = "english.xml";

const NEW_FILE_NAME: string = `new_${FILE_NAME}`;
const STRANGE_FILE_NAME: string = `strange_${FILE_NAME.slice(0, FILE_NAME.indexOf("."))}.txt`;
const TEXT_NOT_PROVIDED_MESSAGE: string = "TEXT NOT PROVIDED";
const ERROR_SAVING_XML_MESSAGE: string = "Error while saving XML file.";
const ERROR_SAVING_TXT_MESSAGE: string = "Error when saving TXT file.";
const SUCCESS_SAVING_XML_MESSAGE: string = `Success! See file ${NEW_FILE_NAME}`
const SUCCESS_SAVING_TXT_MESSAGE: string = `Success! See file ${STRANGE_FILE_NAME}`;

// 2. Open files.
let englishXML: string = fs.readFileSync(__dirname + "/../lang/" + ENGLISH_FILE_NAME, "utf-8");
const anotherLanguageXML: string = fs.readFileSync(__dirname + "/../lang/" + FILE_NAME, "utf-8");

// 3. Change language of XML.
let anotherLanguageIndex: number = anotherLanguageXML.search(/Language="\w{2}_\w{2}(\w*_\w*)?"/g);
if(anotherLanguageIndex === -1)
    throw "-1 index of language name";
let langName: string = anotherLanguageXML.slice(anotherLanguageIndex + 10, anotherLanguageXML.indexOf("\"", anotherLanguageIndex + 10));    // 10 because length of tag attr: Language="
englishXML = englishXML.replaceAll(/Language="\w{2}_\w{2}"/g, `Language="${langName}"`);

// 4. Replace text of tags.
let englishTags: string[] | undefined = englishXML.match(/Tag="\w+"/g)?.map(tag => tag.slice(5, tag.length-1));     // 5 because length of tag attr: Tag="
if(englishTags === undefined)
    throw "tags are null";

for(let tag of englishTags) {
    let anotherLanguageTagIndex: number = anotherLanguageXML.indexOf(tag);
    let anotherLanguageTextStartIndex: number = anotherLanguageXML.indexOf("<Text>", anotherLanguageTagIndex);
    let anotherLanguageTextEndIndex: number = anotherLanguageXML.indexOf("</Text>", anotherLanguageTagIndex);
    let anotherLanguageText: string =
        (anotherLanguageTextStartIndex === -1) || (anotherLanguageTextEndIndex === -1) || (anotherLanguageTagIndex === -1)
        ? TEXT_NOT_PROVIDED_MESSAGE
        : anotherLanguageXML.slice(anotherLanguageTextStartIndex+6, anotherLanguageTextEndIndex);

    let englishTagIndex: number = englishXML.indexOf(tag);
    let englishTextStartIndex: number = englishXML.indexOf("<Text>", englishTagIndex);
    let englishTextEndIndex: number = englishXML.indexOf("</Text>", englishTagIndex);
    if((englishTextStartIndex === -1) || (englishTextEndIndex === -1))
        continue;
    let englishText: string = englishXML.slice(englishTextStartIndex+6, englishTextEndIndex);   // 6 because length of tag <Text>

    englishXML = englishXML.replace(englishText, anotherLanguageText);
}

// 5. Save to file.
fs.writeFile(__dirname + `/../lang/` + NEW_FILE_NAME,
    englishXML,
    (err) => {console.log(err ? ERROR_SAVING_XML_MESSAGE : SUCCESS_SAVING_XML_MESSAGE)}
);

// 6. Print strange tags.
let strangeTags: string[] = anotherLanguageXML
    .match(/Tag="\w+"/g)
    ?.map(tag => tag.slice(5, tag.length-1))
    .filter(tag => englishTags?.indexOf(tag) === -1) || [];
console.log(`Strange tags amount: ${strangeTags.length}`);
if(strangeTags.length > 0)
    fs.writeFile(__dirname + `/../lang/` + STRANGE_FILE_NAME,
        strangeTags.join("\n"),
        (err) => {console.log(err ? ERROR_SAVING_TXT_MESSAGE : SUCCESS_SAVING_TXT_MESSAGE)}
    );
