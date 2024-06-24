# cligpt README
This is an extension to use openAI's chatGPT through vsCode. This extension will create a file for when you want to ask chatgpt a question, each file logs a conversation and can be stored where you want(recommend a log folder) organized in files by year and month. The fileName is based on the date and time. This extension currently supports 3 commands:
- cligpt: will create the file and give a space to write a question. Only needs to be called once per conversation
- cligptPush: Sends the complete file to chatGPT and will print out chatGPT's response. Once one queston is asked a space will be provided to add another question and this command should be run everytime you finish typing a question.
- cligptCommit: Ends the conversation with a short one sentence summary of the entire conversation.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

Run `npm install` to install dependencies. The only dependency needed is axios 1.7.2
Create a config.ts file and add:
```
export const config = {
    apiKey: 'REPLACE WITH YOUR OPENAI APIKEY',
    model: 'WHAT MODE OF GPT YOU WANT TO USE',
    location: 'WHERE YOU WANT TO STORE FILES',
    role: 'ROLE YOU WANT TO GIVE TO CHATGPT'
};
```
here is an example of what it could look like with a fake API key:
```
export const config = {
    apiKey: 'sk-GDNhsveD83b5lsbFh4ns85ns84nwl2lDHY$bwsur4Dfksb&DBhes',
    model: 'gpt-4',
    location: 'Documents/GPT_Logs',
    role: 'You are an expert Software Developer'
};
```
If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Once you run cligptPush, it will take some time for chatGPT to give its response, ~5-15 seconds.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
