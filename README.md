# Trie Data Structure and Word Permutation Finder
This repository contains code for a Trie data structure and a function to find all valid words from a given dictionary that can be formed using characters from a provided input string.

## High-Level Approach
### Trie Data Structure
The Trie data structure is used for efficient word storage and retrieval. It consists of nodes where each node represents a single character. By traversing the Trie from the root node, we can build words character by character. The presence of a word is indicated by a boolean flag in the Trie node.

### Word Permutation Finder
The findWords function utilizes the Trie data structure to efficiently find valid words that can be formed using characters from the input string. Here's a high-level overview of the approach:

1. Trie Construction: First, we construct a Trie by inserting all words from the dictionary into it. This allows for quick lookup of words.

2. Permutation Search: We perform a depth-first search (DFS) through the Trie while traversing the input string. At each step, we check if the current character is present in the Trie. If it is, we continue the traversal. If not, we backtrack.

3. Backtracking: During the DFS, we keep track of character frequencies in the input string. When we encounter a character in the Trie, we decrement its count in the frequency map. After exploring all possible paths from a node, we restore the character count to backtrack correctly.

4. Result Collection: Whenever we reach a node in the Trie representing the end of a word (isWord flag is true), we add the formed word to the result array.

## Usage
To run the solution, use the following command:
 `npx ts-node solution.ts`
 Make sure you have TypeScript (tsc) and Node.js installed on your system.

To use this code, simply include the Trie class and the findWords function in your project. You can then create a Trie instance, insert words into it, and use the findWords function to find permutations. Ensure to provide appropriate input string and dictionary for desired results.


## Open Questions
**Including Empty Strings:** The current implementation allows an empty string as a valid word in the dictionary and the inputString. If we want to prevent empty strings, we can add another conditional check in the DFS function
