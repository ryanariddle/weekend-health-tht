/**
 * Represents a single node in a Trie data structure.
 *
 * children: A dictionary to store references to child nodes.
 *           Keys are individual characters, values are TrieNode instances.
 * isWord:   A boolean flag indicating if the path from the root to
 *           this node forms a complete word.
 */
class TrieNode {
    children: { [key: string]: TrieNode } = {};
    isWord: boolean = false;
}

/**
 * A Trie data structure for efficient word storage and retrieval.
 */
class Trie {
    root: TrieNode = new TrieNode();

    /**
     * Inserts a word into the Trie.
     *
     * @param word: The word to be inserted.
     */
    insert(word: string): void {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isWord = true;
    }
}

/**
 * Finds all words from a dictionary that can be formed using characters from a given input string.
 *
 * @param inputString: The string containing available characters.
 * @param dictionary:  The list of words to search for.
 * @returns: An array of words from the dictionary that can be formed by the input string.
 */
function findWords(inputString: string, dictionary: string[]): string[] {
    // No valid words exist if the dictionary is empty. Assuming an empty string is valid
    if (!dictionary.length) {
        return [];
    }

    const trie: Trie = new Trie();
    // Insert all valid words into our trie
    for (const word of dictionary) {
        trie.insert(word);
    }

    // Array to store the valid permutations
    const results: string[] = [];
    // Map to keep track of character frequencies in the input string
    const charCounts: Map<string, number> = new Map();

    // Store the frequency of each character in the input string
    for (const char of inputString) {
        charCounts.set(char, (charCounts.get(char) || 0) + 1);
    }

    /**
     * Depth-first search helper function to traverse the Trie.
     *
     * @param node:             The current Trie node.
     * @param currentWord:      The word being formed so far.
     * @param remainingCounts:  A map of remaining character counts from the input string.
     */
    function dfs(node: TrieNode, currentWord: string, remainingCounts: Map<string, number>) {
        // If the current word is valid, add it to the results
        if (node.isWord) {
            results.push(currentWord);
        }

        // Iterate through each child of the current node
        for (const [char, child] of Object.entries(node.children)) {
            // Check if the character is available
            const count = remainingCounts.get(char);
            if (count && count > 0) {
                // Modify the map in-place
                remainingCounts.set(char, count - 1);
                // Recursively call DFS with the modified map by reference
                dfs(child, currentWord + char, remainingCounts);
                // Restore the count for backtracking
                remainingCounts.set(char, count);
            }
        }
    }

    dfs(trie.root, "", charCounts);
    return results;
}

// Tests
let permutations: string[] = findWords("ate", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]);
console.log(permutations);
// Expected output: ["ate", "eat", "tea"]
console.assert(permutations.length == 3);
console.assert(permutations.includes("ate"));
console.assert(permutations.includes("eat"));
console.assert(permutations.includes("tea"));

permutations= findWords("oogd", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]);
console.log(permutations);
// Expected output: ["dog", "do", "god", "goo", "go", "good"]
console.assert(permutations.length == 6);
console.assert(permutations.includes("dog"));
console.assert(permutations.includes("do"));
console.assert(permutations.includes("god"));
console.assert(permutations.includes("goo"));
console.assert(permutations.includes("go"));
console.assert(permutations.includes("good"));

permutations = findWords("", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]);
console.log(permutations);
// Expected output: []
console.assert(permutations.length == 0);

permutations = findWords("lmn", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]);
console.log(permutations);
// Expected output: []
console.assert(permutations.length == 0);

permutations = findWords("hi", ["", "hi"]);
console.log(permutations);
// Expected output: ["", "hi"]
console.assert(permutations.length == 2);
console.assert(permutations.includes(""));
console.assert(permutations.includes("hi"));

permutations = findWords("", ["", "hi"]);
console.log(permutations);
// Expected output: [""]
console.assert(permutations.length == 1);
console.assert(permutations.includes(""));
