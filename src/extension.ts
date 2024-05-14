import * as vscode from 'vscode';
import axios, { AxiosResponse } from 'axios';

interface GeminiApiResponse {
    candidates: Candidate[];
}

interface Candidate {
    content: Content;
}

interface Content {
    parts: Part[];
}

interface Part {
    text: string;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "refactor-with-chatgpt" is now active!');

    let disposable = vscode.commands.registerCommand('extension.refactorWithChatgpt', async () => {
        console.log('Command "extension.refactorWithChatgpt" triggered.');

        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            console.log('Selected text:', text);

            const input = await vscode.window.showInputBox({ prompt: 'Refactoring instructions' });
            console.log('User input:', input);

            if (input) {
                const apiUrl = 'GEMINI_API_URL'; // Gemini API URL
                const apiKey = 'YOUR_API_KEY'; // Gemini API Key

                try {
                    const response: AxiosResponse<GeminiApiResponse> = await axios.post(apiUrl, {
                        prompt: input,
                        text: text
                    }, {
                        headers: {
                            'Authorization': `Bearer ${apiKey}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log('API Response:', response.data); // Yanıtı kontrol etmek için ekledik

                    if (response.data && response.data.candidates && response.data.candidates.length > 0) {
                        const refactoredText = response.data.candidates[0].content.parts[0].text;
                        console.log('Refactored text:', refactoredText);

                        editor.edit(editBuilder => {
                            editBuilder.replace(selection, refactoredText);
                        });
                    } else {
                        vscode.window.showErrorMessage('Unexpected response format');
                        console.error('Unexpected response format:', response.data);
                    }
                } catch (error: any) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                    console.error('API request error:', error);
                }
            } else {
                console.log('User input was empty or cancelled.');
            }
        } else {
            vscode.window.showErrorMessage('No active editor found.');
            console.error('No active editor found.');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
    console.log('Extension "refactor-with-chatgpt" is now deactivated.');
}
