class TrieNode {
    children: { [key: string]: TrieNode } = {};
    isWord: boolean = false;
}

class Trie {
    root: TrieNode = new TrieNode();

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

function findWords(inputString: string, dictionary: string[]): string[] {
    if (!inputString || !dictionary.length) {
        return [];
    }

    const trie: Trie = new Trie();
    // Insert all valid words into our trie
    for (const word of dictionary) {
        trie.insert(word);
    }

    const results: string[] = [];
    const charCounts: Map<string, number> = new Map();

    for (const char of inputString) {
        charCounts.set(char, (charCounts.get(char) || 0) + 1);
    }

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
                // Create a new map with the updated count
                const newCounts = new Map(remainingCounts);
                newCounts.set(char, count - 1);
                // Recursively call DFS with the child node and updated counts
                dfs(child, currentWord + char, newCounts);
            }
        }
    }

    dfs(trie.root, "", charCounts);
    return results;
}

// Tests
console.log(findWords("ate", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]));
// Expected output: ["ate", "eat", "tea"]

console.log(findWords("oogd", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]));
// Expected output: ["dog", "do", "god", "goo", "go", "good"]
