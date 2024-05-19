import axios, { AxiosResponse } from 'axios';
import * as vscode from 'vscode';

const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const apiKey = '';

export async function sendApiRequest(prompt: string): Promise<AxiosResponse<any>> {
  return axios.post(
    `${apiUrl}?key=${apiKey}`,
    {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export function handleApiResponse(response: AxiosResponse<any>, editor: vscode.TextEditor, selection: vscode.Selection) {
  console.log('API Response:', response.data);

  if (response.data && response.data.candidates && response.data.candidates.length > 0) {
    const refactoredText = response.data.candidates[0].content.parts[0].text;
    console.log('Refactored text:', refactoredText);

    editor.edit((editBuilder) => {
      editBuilder.replace(selection, refactoredText);
    });
  } else {
    vscode.window.showErrorMessage('Unexpected response format');
    console.error('Unexpected response format:', response.data);
  }
}
