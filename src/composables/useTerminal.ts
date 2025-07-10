import { ref } from 'vue'
import { manpage } from './manPage.ts'

interface Line  {
  text: string
  prompt?: boolean
}

const readUntilWhitespace = (inputString: string): string => {
  const firstWhitespaceIndex = inputString.search(/\s/);
  if (firstWhitespaceIndex !== -1) {
    return inputString.substring(0, firstWhitespaceIndex);
  } else {
    return inputString;
  }
}

export function useTerminal() {
  const lines = ref<Line[]>([]);
  const currentInput = ref('');
  const history = ref<string[]>([]);
  const history_index = ref<number>(-1);
  const manPages = manpage();
  const commands = ref<string[]>([
    'help',
    'clear',
    'about',
    'man',
    'echo',
  ])

  
  lines.value.push({ text: 'Type help for a list of commands\n' });

  const handleEnter = () => {
    const trimmedInput = currentInput.value.trim();
    if (trimmedInput === '') return;

    lines.value.push({ text: trimmedInput, prompt: true });
    history.value.push(trimmedInput);
    history_index.value++;

    currentInput.value = '';

    const command = readUntilWhitespace(trimmedInput).toLowerCase();

    if (!check_commands(command)) {
      lines.value.push({ text: `${command}: command not found` });
      return;
    }

    switch (command) {
      case 'help':
        handleHelp();
        break;
      case 'clear':
        handleClear();
        break;
      case 'about':
        handleAbout();
        break;
      case 'man':
        handleMan(trimmedInput);
        break;
      case 'echo':
        handleEcho(trimmedInput);
        break;
      default:
        lines.value.push({ text: `${command}: command not found` });
        break;
    }
  };

  const handleArrowup = (event: KeyboardEvent) => {
    event.preventDefault();
    if (history_index.value <= 0) return;
    history_index.value--;
    currentInput.value = history.value[history_index.value];
  };

  const handleArrowdown = (event: KeyboardEvent) => {
    event.preventDefault();
    if (history.value.length === 0) return;

    if (history_index.value < history.value.length - 1) {
      history_index.value++;
      currentInput.value = history.value[history_index.value];
    } else {
      history_index.value = history.value.length;
      currentInput.value = '';
    }
  };

  const check_commands = (command: string): Boolean => {
    return commands.value.includes(command);
  }

  
  const handleHelp = () => {
    lines.value.push({ text: 'Available commands: ' + commands.value.join(', ') });
  };
  
  const handleClear = () => {
    lines.value.length = 0;
  };
  
  const handleAbout = () => {
    lines.value.push({ text: 'This is a sample terminal clone built with Vue.' });
  };
  
  const handleEcho = (fullInput: string) => {
    const firstSpaceIndex = fullInput.indexOf(' ');

    let messageToEcho: string;
    if (firstSpaceIndex !== -1) {
      messageToEcho = fullInput.substring(firstSpaceIndex + 1).trim();
    } else {
      messageToEcho = '';
    }
    lines.value.push({ text: messageToEcho });
  };

  const handleMan = (fullInput: string) => {
    const firstSpaceIndex = fullInput.indexOf(' ');
    let targetCommand: string;
    if (firstSpaceIndex !== -1) {
      targetCommand = fullInput.substring(firstSpaceIndex + 1).trim();
    } else {
      lines.value.push({ text: 'What manual page do you want?' });
      return;
    }

  };

  // const handleMan = (args: string) => {
  //   const targetCommand = args.toLowerCase();
  //   const manPage = manPages.find(m => m.name === targetCommand);

  //   if (manPage) {
  //     lines.value.push({ text: `\nNAME\n    ${manPage.name} - ${manPage.description}\n` });
  //     lines.value.push({ text: `SYNOPSIS\n    ${manPage.usage}\n` });

  //     if (manPage.options && manPage.options.length > 0) {
  //       lines.value.push({ text: `OPTIONS` });
  //       manPage.options.forEach(opt => {
  //         lines.value.push({ text: `    ${opt.flag}\n        ${opt.description}\n` });
  //       });
  //     }

  //     if (manPage.examples && manPage.examples.length > 0) {
  //       lines.value.push({ text: `EXAMPLES` });
  //       manPage.examples.forEach(example => {
  //         lines.value.push({ text: `    $ ${example.command}` });
  //         lines.value.push({ text: `        ${example.description}\n` });
  //       });
  //     }

  //     if (manPage.notes) {
  //       lines.value.push({ text: `NOTES\n    ${manPage.notes}\n` });
  //     }
  //     lines.value.push({ text: '' }); // Add an empty line for spacing
  //   } else {
  //     lines.value.push({ text: `No manual entry for ${targetCommand}` });
  //     lines.value.push({ text: `Try 'man help' or 'man echo' for examples.` });
  //   }
  // };
  return {
    lines,
    currentInput,
    handleEnter,
    handleArrowup,
    handleArrowdown,
  }
}