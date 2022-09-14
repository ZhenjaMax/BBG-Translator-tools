# Chapter II: Writing XML language file for BBG mod.
Part 1. Structure of BBG language file (in terms of XML).<br/>
Part 2. Guidelines for BBG language file.<br/>
Part 3. How to check your language file.<br/>

# Part 1. Structure of BBG language file (in terms of XML).
Let's look at a part of this file (english.xml for example) and note important notes about it.

<p align="center">
  <img src="../images/2-language.png">
</p>

- XML Header at line #1; you shouldn't change it;
- `GameData` root element (opening tag) at line #2 and inner element `LocalizedText` (opening tag) at line #3; you shouldn't change these too;
- comment lines #4 ... #6; part of file structure (see below);
- `Replace` opening tag at line #7:
  - has attribute `Tag="LOC_TRAIT_LEADER_ROOSEVELT_COROLLARY_DESCRIPTION"`;
  - has attribute `Language="en_US"`.
    - summing up, we can conclude that game will **replace** (`Replace` tag) for English language (`Language` attribute) text this object contains for tag `LOC_TRAIT_LEADER_ROOSEVELT_COROLLARY_DESCRIPTION`.
- `Text` (opening tag and closing tags) at line #8 with string inside: it is new text that will be shown for English language instead;
- `Replace` closing tag at line #9.

# Part 2. Guidelines for BBG language file.
There are some rules you should follow when you edit file.
1. BBG language file has special structure (in terms of placing elements for):
   - if you add new tag then you need to write it in the right place (specified civilization ability, pantheon, city-state and so on; use search through file to find good place for it);
   - if you cannot find place for your tag then it probably doesn't exist. So you need create comment line at some category of tags (to keep structure of translation file) and put tag below it.
   - you **<ins>should not</ins>** just put your tag at the end of file!
2. Keep style of capital letters and small letters from Firaxis text through your text. Check first letters of terms "Science, Tech tree, City-State, Desert" etc. in your language.
3. Check your current gameplay text before you add XML tag and write text for it:
   - some tags are for English only because a lot of English lines are not clear for users and need to rework;
   - you probably already have this tag in your file: use search through file to be sure that you haven't duplicates in your file.

# Part 3. How to check your language file.
When your BBG language file is ready, you need to test if before publishing.
1. Open your XML file in browser (double-click or drag-and-drop to your browser). If you have syntax errors you will see message at the top of browser page (see screenshot below). This message contains line and column number where you probably made syntax error.

<p align="center">
  <img src="../images/2-error.png">
</p>

2. Go to Civilization VI Steam Workshop folder and replace its language file. Path is `Steam\steamapps\workshop\content\289070\2312050357\lang` (last number can be changed because of another Steam Workshop Mod ID, be careful).<br/><br/>
Then open Civilization VI game, wait till loaded main menu and exit game. If you have another language then change it in game settings and reload game.<br/><br/>
Then go to Civilization VI logs folder and find `Database.log` file. Usual path is `"C:\Users\USER\Documents\My Games\Sid Meier's Civilization VI\Logs\Database.log"`. Check file for errors (or use search through file with keyword `error`): if you have any, you have duplicate tag in your file.<br/><br/>

If you haven't seen any errors for you case then your translation file is OK!
