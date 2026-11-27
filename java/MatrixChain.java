public class MatrixChain {
    public static void main(String[] args) {
        int[] dimensions = {10, 20, 30, 40, 30};
        int n = dimensions.length;
        int[][] minOperations = new int[n][n];
        
        for (int i = 1; i < n; i++) {
            minOperations[i][i] = 0;
        }
        
        for (int chainLen = 2; chainLen < n; chainLen++) {
            for (int i = 1; i < n - chainLen + 1; i++) {
                int j = i + chainLen - 1;
                minOperations[i][j] = Integer.MAX_VALUE;
                for (int k = i; k <= j - 1; k++) {
                    int cost = minOperations[i][k] + minOperations[k + 1][j] + 
                               dimensions[i - 1] * dimensions[k] * dimensions[j];
                    if (cost < minOperations[i][j]) {
                        minOperations[i][j] = cost;
                    }
                }
            }
        }
        
        System.out.println("Minimum multiplications needed: " + minOperations[1][n - 1]);
    }
}
