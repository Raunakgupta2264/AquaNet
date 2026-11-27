public class OptimalBST {
    public static void main(String[] args) {
        int[] keys = {10, 12, 20};
        int[] freq = {34, 8, 50};
        int n = keys.length;
        
        int[][] costMatrix = new int[n + 1][n + 1];
        
        for (int i = 0; i < n; i++) {
            costMatrix[i][i] = freq[i];
        }
        
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i <= n - length; i++) {
                int j = i + length - 1;
                costMatrix[i][j] = Integer.MAX_VALUE;
                
                int sum = 0;
                for (int k = i; k <= j; k++) {
                    sum += freq[k];
                }
                
                for (int r = i; r <= j; r++) {
                    int currentCost = ((r > i) ? costMatrix[i][r - 1] : 0) + 
                                      ((r < j) ? costMatrix[r + 1][j] : 0) + sum;
                    if (currentCost < costMatrix[i][j]) {
                        costMatrix[i][j] = currentCost;
                    }
                }
            }
        }
        
        System.out.println("Optimal BST search cost: " + costMatrix[0][n - 1]);
    }
}
