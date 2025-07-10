export function manpage() {
  interface ManPage {
    name: string;
    description: string;
    usage: string;
    options?: {
      flag: string;
      description: string;
    }[];
    examples?: {
      command: string;
      description: string;
    }[];
  notes?: string;
}

  const manPages: ManPage[] = [
    {
      name: 'help',
      description: 'Displays a list of available commands.',
      usage: 'help',
      notes: 'This command provides a quick overview of what you can do in this terminal.'
    },
    {
      name: 'clear',
      description: 'Clears the terminal screen.',
      usage: 'clear'
    },
    {
      name: 'about',
      description: 'Provides information about this terminal application.',
      usage: 'about'
    },
    {
      name: 'man',
      description: 'Displays the manual page for a given command.',
      usage: 'man [command_name]',
      examples: [
        { command: 'man echo', description: 'Show the manual page for the echo command.' },
        { command: 'man help', description: 'Show the manual page for the help command.' }
      ],
      notes: 'If no command name is provided, it will show general usage.'
    },
    {
      name: 'echo',
      description: 'Prints the provided message to the terminal.',
      usage: 'echo [message]',
      examples: [
        { command: 'echo Hello World', description: 'Displays "Hello World".' },
        { command: 'echo "This is a test"', description: 'Displays "This is a test".' }
      ],
      notes: 'The echo command is often used for displaying text or variables.'
    },
  ]
  return {
    manPages
  }
}