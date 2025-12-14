import { InputNode } from './inputNode';
import { OutputNode } from './outputNode';
import { LLMNode } from './llmNode';
import { TextNode } from './textNode';

export const nodeRegistry = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
};
