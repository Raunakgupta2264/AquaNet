import java.util.ArrayList;
import java.util.List;

public class ZFunction {
    public static void main(String[] args) {
        String report = "contamination detected. highly severe contamination.";
        String query = "contamination";
        String combined = query + "$" + report;
        
        int[] zArr = calculateZ(combined);
        List<Integer> occurrences = new ArrayList<>();
        
        for (int i = 0; i < zArr.length; i++) {
            if (zArr[i] == query.length()) {
                occurrences.add(i - query.length() - 1);
            }
        }
        System.out.println("Pattern found at indices: " + occurrences);
    }
    
    private static int[] calculateZ(String s) {
        int n = s.length();
        int[] z = new int[n];
        int left = 0, right = 0;
        
        for (int i = 1; i < n; i++) {
            if (i <= right) {
                z[i] = Math.min(right - i + 1, z[i - left]);
            }
            while (i + z[i] < n && s.charAt(z[i]) == s.charAt(i + z[i])) {
                z[i]++;
            }
            if (i + z[i] - 1 > right) {
                left = i;
                right = i + z[i] - 1;
            }
        }
        return z;
    }
}
