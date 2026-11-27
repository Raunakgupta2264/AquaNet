public class KMP {
    public static void main(String[] args) {
        String text = "Water sample contains traces of lead.";
        String pattern = "lead";
        int index = searchPattern(text, pattern);
        System.out.println("Pattern found at: " + index);
    }
    
    public static int searchPattern(String txt, String pat) {
        int patLen = pat.length();
        int txtLen = txt.length();
        if (patLen == 0) return 0;
        
        int[] prefixTable = new int[patLen];
        int len = 0;
        int i = 1;
        while (i < patLen) {
            if (pat.charAt(i) == pat.charAt(len)) {
                len++;
                prefixTable[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = prefixTable[len - 1];
                } else {
                    prefixTable[i] = 0;
                    i++;
                }
            }
        }
        
        int j = 0;
        int k = 0;
        while (k < txtLen) {
            if (pat.charAt(j) == txt.charAt(k)) {
                j++;
                k++;
            }
            if (j == patLen) {
                return k - j;
            } else if (k < txtLen && pat.charAt(j) != txt.charAt(k)) {
                if (j != 0) {
                    j = prefixTable[j - 1];
                } else {
                    k++;
                }
            }
        }
        return -1;
    }
}
