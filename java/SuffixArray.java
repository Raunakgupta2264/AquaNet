import java.util.*;

public class SuffixArray {
    static class Suffix implements Comparable<Suffix> {
        int index;
        int rank;
        int nextRank;
        
        public int compareTo(Suffix other) {
            if (this.rank == other.rank) {
                return Integer.compare(this.nextRank, other.nextRank);
            }
            return Integer.compare(this.rank, other.rank);
        }
    }
    
    public static void main(String[] args) {
        String data = "banana$";
        int n = data.length();
        Suffix[] suffixes = new Suffix[n];
        
        for (int i = 0; i < n; i++) {
            suffixes[i] = new Suffix();
            suffixes[i].index = i;
            suffixes[i].rank = data.charAt(i) - 'a';
            suffixes[i].nextRank = (i + 1 < n) ? (data.charAt(i + 1) - 'a') : -1;
        }
        
        Arrays.sort(suffixes);
        
        int[] ind = new int[n];
        for (int k = 4; k < 2 * n; k = k * 2) {
            int rank = 0;
            int prevRank = suffixes[0].rank;
            suffixes[0].rank = rank;
            ind[suffixes[0].index] = 0;
            
            for (int i = 1; i < n; i++) {
                if (suffixes[i].rank == prevRank && suffixes[i].nextRank == suffixes[i - 1].nextRank) {
                    prevRank = suffixes[i].rank;
                    suffixes[i].rank = rank;
                } else {
                    prevRank = suffixes[i].rank;
                    suffixes[i].rank = ++rank;
                }
                ind[suffixes[i].index] = i;
            }
            
            for (int i = 0; i < n; i++) {
                int nextIndex = suffixes[i].index + k / 2;
                suffixes[i].nextRank = (nextIndex < n) ? suffixes[ind[nextIndex]].rank : -1;
            }
            Arrays.sort(suffixes);
        }
        
        int[] suffixArr = new int[n];
        for (int i = 0; i < n; i++) {
            suffixArr[i] = suffixes[i].index;
        }
        
        int[] lcp = new int[n];
        int[] invSuff = new int[n];
        for (int i = 0; i < n; i++) invSuff[suffixArr[i]] = i;
        
        int h = 0;
        for (int i = 0; i < n; i++) {
            if (invSuff[i] > 0) {
                int k = suffixArr[invSuff[i] - 1];
                while (i + h < n && k + h < n && data.charAt(i + h) == data.charAt(k + h)) {
                    h++;
                }
                lcp[invSuff[i]] = h;
                if (h > 0) h--;
            }
        }
        
        System.out.println("Suffix Array: " + Arrays.toString(suffixArr));
        System.out.println("LCP Array: " + Arrays.toString(lcp));
    }
}
