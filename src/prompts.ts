export function createPrompt(finalString: string, instructions: string): string {
    let prompt = 'You are a TypeScript assistant helping the user refactor code within their editor window.';
    prompt += `\nModification instructions from user:\n${instructions}.\n\nPlease refactor the following code, ensuring that the refactored code replaces the highlighted section <CURSOR_SELECTION> ..... <CURSOR_SELECTION> in the editor.\n`;
    prompt += '\n' + finalString + '\n';
    prompt += 'IMPORTANT NOTE: Only output the refactored code. If you need to add comments, do not add comments.';
    return prompt;
  }
  
  export function createPromptFromZero(finalString: string, instructions: string): string {
    let prompt = 'You are a TypeScript assistant helping the user create code within their editor window.';
    prompt += `\nModification instructions from user:\n${instructions}.\n\nPlease create the code, ensuring that the refactored code replaces the highlighted section <CURSOR_SELECTION> ..... <CURSOR_SELECTION> in the editor.\n`;
    prompt += '```\n' + finalString + '\n```\n';
    prompt += 'IMPORTANT NOTE: Only output the refactored code. If you need to add comments, do not add comments.';
    return prompt;
  }
  
  export function createExplain(finalString: string, instructions: string): string {
    let prompt = 'You are a TypeScript assistant helping the user refactor code within their editor window.';
    prompt += `\n user wanna learn about that small typescript or react piece:"\n${instructions}".\n\nPlease understand the following code\n`;
    prompt += '\n' + finalString + '\n';
    prompt += 'IMPORTANT NOTE: Only write input code + add your answer(turkce acikla ve 1 cumle ile) in comment format';
    return prompt;
  }