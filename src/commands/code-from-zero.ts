import * as vscode from 'vscode';
import axios from 'axios';

function createPromptFromZero(
    finalString: string,
    instructions: string
  ): string {
    let prompt =
      "You are a TypeScript assistant helping the user create code within their editor window.";
    prompt += `\nModification instructions from user:\n${instructions}.\n\nPlease create the code, ensuring that the refactored code replaces the highlighted section <CURSOR_SELECTION> ..... <CURSOR_SELECTION> in the editor.\n`;
    prompt += "```\n" + finalString + "\n```\n";
    prompt += `IMPORTANT NOTE: Only output the refactored code. If you need to add comments, do not add comments.`;
    return prompt;
  }

export async function codeFromZero() {
  console.log('Command "vscode-multi-ai.codeFromZero" triggered.');

  const input = await vscode.window.showInputBox({
    prompt: "Coding instructions",
  });
  console.log("User input:", input);

  if (input) {
    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"; // Gemini API URL
    const apiKey = "AIzaSyBsYz84R9WBUrVcy836DWvfEdx1bZkZmH8"; // Gemini API Key
    const prompt = createPromptFromZero("", input);

    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const selection = editor.selection;

      try {
        console.log("Sending API request...");
        const response = await axios.post(
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
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API Response:", response.data); // Yanıtı kontrol etmek için ekledik

        if (
          response.data &&
          response.data.candidates &&
          response.data.candidates.length > 0
        ) {
          const generatedCode =
            response.data.candidates[0].content.parts[0].text;
          console.log("Generated code:", generatedCode);

          editor.edit((editBuilder) => {
            editBuilder.replace(selection, generatedCode);
          });
        } else {
          vscode.window.showErrorMessage("Unexpected response format");
          console.error("Unexpected response format:", response.data);
        }
      } catch (error: any) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
        console.error("API request error:", error);
      }
    } else {
      vscode.window.showErrorMessage("No active editor found.");
      console.error("No active editor found.");
    }
  } else {
    console.log("User input was empty or cancelled.");
  }
}
