
import { generateTranscript } from './generator.ts';
export * from './types.ts';

// Facade for the user
export const createTranscript = generateTranscript;
