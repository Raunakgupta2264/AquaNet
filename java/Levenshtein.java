public class Levenshtein {
    public static void main(String[] args) {
        String word1 = "arsenik";
        String word2 = "arsenic";
        
        int dist = computeEditDistance(word1, word2);
        System.out.println("Edit distance between " + word1 + " and " + word2 + " is: " + dist);
    }
    
    private static int computeEditDistance(String a, String b) {
        int rows = a.length() + 1;
        int cols = b.length() + 1;
        int[][] dp = new int[rows][cols];
        
        for (int i = 0; i < rows; i++) dp[i][0] = i;
        for (int j = 0; j < cols; j++) dp[0][j] = j;
        
        for (int i = 1; i < rows; i++) {
            for (int j = 1; j < cols; j++) {
                int cost = (a.charAt(i - 1) == b.charAt(j - 1)) ? 0 : 1;
                dp[i][j] = Math.min(Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1), dp[i - 1][j - 1] + cost);
            }
        }
        return dp[rows - 1][cols - 1];
    }
}
