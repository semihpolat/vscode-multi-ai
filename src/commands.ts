import * as vscode from 'vscode';
import { sendApiRequest, handleApiResponse } from './api';
import { createExplain, createPrompt, createPromptFromZero } from './prompts';

export function registerRefactorWithChatGPTCommand(): vscode.Disposable {
  return vscode.commands.registerCommand('vscode-multi-ai.refactorWithChatgpt', async () => {
    console.log('Command "vscode-multi-ai.refactorWithChatgpt" triggered.');

    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);
      console.log('Selected text:', text);

      const input = await vscode.window.showInputBox({
        prompt: 'Refactoring instructions',
      });
      console.log('User input:', input);

      if (input) {
        const prompt = createPrompt(text, input);
        try {
          console.log('Sending API request...');
          const response = await sendApiRequest(prompt);
          handleApiResponse(response, editor, selection);
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
}

export function registerCodeFromZeroCommand(): vscode.Disposable {
  return vscode.commands.registerCommand('vscode-multi-ai.codeFromZero', async () => {
    console.log('Command "vscode-multi-ai.codeFromZero" triggered.');

    const input = await vscode.window.showInputBox({
      prompt: 'Coding instructions',
    });
    console.log('User input:', input);

    if (input) {
      const prompt = createPromptFromZero('', input);

      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const selection = editor.selection;

        try {
          console.log('Sending API request...');
          const response = await sendApiRequest(prompt);
          handleApiResponse(response, editor, selection);
        } catch (error: any) {
          vscode.window.showErrorMessage(`Error: ${error.message}`);
          console.error('API request error:', error);
        }
      } else {
        vscode.window.showErrorMessage('No active editor found.');
        console.error('No active editor found.');
      }
    } else {
      console.log('User input was empty or cancelled.');
    }
  });
}

export function registerExplainItCommand(): vscode.Disposable {
    return vscode.commands.registerCommand('vscode-multi-ai.explainIt', async () => {
      console.log('Command "vscode-multi-ai.explainIt" triggered.');
  
      const editor = vscode.window.activeTextEditor;
  
      if (editor) {
        const selection = editor.selection;
        const text = editor.document.getText(selection);
        console.log('Selected text:', text);
  
        const input = await vscode.window.showInputBox({
          prompt: 'Type what you do not understand in the code',
        });
        console.log('User input:', input);
  
        if (input) {
          const prompt = createExplain(text, input);
          try {
            console.log('Sending API request...');
            const response = await sendApiRequest(prompt);
            handleApiResponse(response, editor, selection);
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
  }