// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
//const vscode = require('vscode');
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import axios from 'axios';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const homeDir = os.homedir();
	const filePath1 = path.join(homeDir, "Documents/2024/summer_intern/cligpt-output/"); //only will work for specific folder that is no longer my gptlogs folder
	function generateTimestampedFileName(): string { //generates the filename based on timestamp
		const timestamp = new Date().toISOString();
		return `cligpt-${timestamp}.md`;
	}

	function createAndWriteToFile(directory: string): string {//creates file using generated timestamp, and writes our info into file
		const fileName = generateTimestampedFileName();
		const filePath = path.join(directory, fileName);
		const message = "role: You are an expert Software Developer\nmodel: gpt-4o\n## My question:\n"
	
		try {
			fs.writeFileSync(filePath, message, { flag: 'a' });
			vscode.window.showInformationMessage(`File created and content written: ${fileName}`);
		} catch (error) {
			vscode.window.showErrorMessage('Failed to create and write to the file');
		}
	
		return filePath;
	}
	async function openFileInVSCode(filePath: string) {
		try {
			const document = await vscode.workspace.openTextDocument(filePath);
			await vscode.window.showTextDocument(document);
		} catch (error) {
			vscode.window.showErrorMessage('Failed to open the file in VSCode');
		}
	}
	let createAndOpenFile = vscode.commands.registerCommand('cligpt.create', async () =>{
		const gptfile = createAndWriteToFile(filePath1);
		openFileInVSCode(gptfile);
	});
	

	let sendToChatGPTCommand = vscode.commands.registerCommand('cligpt.send', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            let content:string = document.getText();

            // Send content to ChatGPT
            const response = await sendToChatGPT(content);

            // Write the response back to the file
            if (response) {
                editor.edit(editBuilder => {
                    editBuilder.insert(new vscode.Position(document.lineCount, 0), `\n\n## ChatGPT Response:\n${response}\n\n## My question`);
                });
            }
			else{
				vscode.window.showErrorMessage('No response.');
			}
        }
		else {
            vscode.window.showErrorMessage('No active editor found. Please open a file first.');
        }
    });
	async function sendToChatGPT(content: string): Promise<string | null> {
		const apiKey = "replace with apiKey"; // Replace with your OpenAI API key
		
		try {
			const response = await axios.post('https://api.openai.com/v1/chat/completions', {
				prompt: content,
				max_tokens: 150, // Adjust the number of tokens as per your requirement
				n: 1,
				stop: null,
				temperature: 0.7,
			}, 
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${apiKey}`
				}
			});
			if (response.data && response.data.choices && response.data.choices.length > 0) {
				return response.data.choices[0].text.trim();
			}
			return "1";
		} catch (error) {
			
			vscode.window.showErrorMessage('Error communicating with ChatGPT: ');
		}
	
		return null;
	}
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('cligpt.create', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from cligpt!');
	});

	context.subscriptions.push(createAndOpenFile, sendToChatGPTCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
// Take code from listdir to open a new file with name based on time and date. 
// Store name of file being used that well have to give to cligpt, so when we then input text into the file and ask the question it
// will take that question and run in on gpt.
