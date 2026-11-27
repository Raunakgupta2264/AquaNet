import java.util.Arrays;

public class BlellochScan {
    public static void scan(int[] arr) {
        int n = arr.length;
        
        // Up-sweep
        for (int d = 0; d < (Math.log(n) / Math.log(2)); d++) {
            int step = (int) Math.pow(2, d + 1);
            for (int k = 0; k < n; k += step) {
                arr[k + step - 1] = arr[k + (step / 2) - 1] + arr[k + step - 1];
            }
        }
        
        arr[n - 1] = 0; // Set last to 0 for exclusive scan
        
        // Down-sweep
        for (int d = (int)(Math.log(n) / Math.log(2)) - 1; d >= 0; d--) {
            int step = (int) Math.pow(2, d + 1);
            for (int k = 0; k < n; k += step) {
                int t = arr[k + (step / 2) - 1];
                arr[k + (step / 2) - 1] = arr[k + step - 1];
                arr[k + step - 1] = t + arr[k + step - 1];
            }
        }
    }

    public static void main(String[] args) {
        int[] levels = {3, 1, 7, 0, 4, 1, 6, 3};
        System.out.println("AquaNet Water Levels: " + Arrays.toString(levels));
        scan(levels);
        System.out.println("AquaNet Prefix Sums (Exclusive): " + Arrays.toString(levels));
    }
}
