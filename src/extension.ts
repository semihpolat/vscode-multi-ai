import * as vscode from 'vscode';
import { registerRefactorWithChatGPTCommand, registerCodeFromZeroCommand, registerExplainItCommand } from './commands';

const registeredCommands = new Set<string>();

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "refactor-with-chatgpt" is now active!');

  if (!registeredCommands.has('vscode-multi-ai.refactorWithChatgpt')) {
    const refactorWithChatGPTCommand = registerRefactorWithChatGPTCommand();
    context.subscriptions.push(refactorWithChatGPTCommand);
    registeredCommands.add('vscode-multi-ai.refactorWithChatgpt');
  }

  if (!registeredCommands.has('vscode-multi-ai.codeFromZero')) {
    const codeFromZeroCommand = registerCodeFromZeroCommand();
    context.subscriptions.push(codeFromZeroCommand);
    registeredCommands.add('vscode-multi-ai.codeFromZero');
  }

  if (!registeredCommands.has('vscode-multi-ai.explainIt')) {
    const explainItCommand = registerExplainItCommand();
    context.subscriptions.push(explainItCommand);
    registeredCommands.add('vscode-multi-ai.explainIt');
  }

  
}

export function deactivate() {
  console.log('Extension "refactor-with-chatgpt" is now deactivated.');
}
