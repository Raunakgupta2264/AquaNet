import java.util.*;

public class AhoCorasick {
    static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        TrieNode failNode;
        List<String> output = new ArrayList<>();
    }
    
    public static void main(String[] args) {
        String report = "The sample contained traces of lead and mercury, but no arsenic.";
        String[] keywords = {"lead", "mercury", "arsenic"};
        
        TrieNode root = new TrieNode();
        for (String word : keywords) {
            TrieNode current = root;
            for (char ch : word.toCharArray()) {
                current.children.putIfAbsent(ch, new TrieNode());
                current = current.children.get(ch);
            }
            current.output.add(word);
        }
        
        Queue<TrieNode> queue = new LinkedList<>();
        for (TrieNode child : root.children.values()) {
            child.failNode = root;
            queue.add(child);
        }
        
        while (!queue.isEmpty()) {
            TrieNode current = queue.poll();
            for (Map.Entry<Character, TrieNode> entry : current.children.entrySet()) {
                char ch = entry.getKey();
                TrieNode child = entry.getValue();
                
                TrieNode fallback = current.failNode;
                while (fallback != null && !fallback.children.containsKey(ch)) {
                    fallback = fallback.failNode;
                }
                
                child.failNode = fallback != null ? fallback.children.get(ch) : root;
                child.output.addAll(child.failNode.output);
                queue.add(child);
            }
        }
        
        TrieNode current = root;
        for (int i = 0; i < report.length(); i++) {
            char ch = report.charAt(i);
            while (current != null && !current.children.containsKey(ch)) {
                current = current.failNode;
            }
            if (current == null) {
                current = root;
                continue;
            }
            current = current.children.get(ch);
            for (String match : current.output) {
                System.out.println("Detected toxin: " + match + " ending at index " + i);
            }
        }
    }
}
