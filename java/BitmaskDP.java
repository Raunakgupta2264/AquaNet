import java.util.Arrays;

public class BitmaskDP {
    public static void main(String[] args) {
        int[][] costGraph = {
            {0, 10, 15, 20},
            {10, 0, 35, 25},
            {15, 35, 0, 30},
            {20, 25, 30, 0}
        };
        int n = costGraph.length;
        int maxMask = 1 << n;
        int[][] memo = new int[maxMask][n];
        
        for (int[] row : memo) {
            Arrays.fill(row, -1);
        }
        
        int result = solveTSP(1, 0, costGraph, memo, n);
        System.out.println("Minimum resource selection cost: " + result);
    }
    
    private static int solveTSP(int mask, int pos, int[][] graph, int[][] memo, int n) {
        if (mask == (1 << n) - 1) {
            return graph[pos][0];
        }
        if (memo[mask][pos] != -1) {
            return memo[mask][pos];
        }
        
        int ans = Integer.MAX_VALUE;
        for (int city = 0; city < n; city++) {
            if ((mask & (1 << city)) == 0) {
                int newAns = graph[pos][city] + solveTSP(mask | (1 << city), city, graph, memo, n);
                ans = Math.min(ans, newAns);
            }
        }
        
        return memo[mask][pos] = ans;
    }
}
