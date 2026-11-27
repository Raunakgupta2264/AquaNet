import java.util.Arrays;

public class BipartiteMatching {
    static final int M = 4; // Operators
    static final int N = 4; // Treatment units

    boolean bpm(boolean bpGraph[][], int u, boolean seen[], int matchR[]) {
        for (int v = 0; v < N; v++) {
            if (bpGraph[u][v] && !seen[v]) {
                seen[v] = true;
                if (matchR[v] < 0 || bpm(bpGraph, matchR[v], seen, matchR)) {
                    matchR[v] = u;
                    return true;
                }
            }
        }
        return false;
    }

    int maxBPM(boolean bpGraph[][]) {
        int matchR[] = new int[N];
        Arrays.fill(matchR, -1);
        int result = 0;
        for (int u = 0; u < M; u++) {
            boolean seen[] = new boolean[N];
            if (bpm(bpGraph, u, seen, matchR)) {
                result++;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        boolean bpGraph[][] = new boolean[][]{
            {true, true, false, false},
            {false, true, false, false},
            {false, false, true, false},
            {false, false, true, true}
        };
        BipartiteMatching m = new BipartiteMatching();
        System.out.println("AquaNet Operators Assigned: " + m.maxBPM(bpGraph));
    }
}
