public class RabinKarp {
    public static void main(String[] args) {
        String dataStream = "RES-A12 PIPE-302 SAMPLE-9281";
        String target = "SAMPLE-9281";
        int pos = findSubstring(dataStream, target);
        System.out.println("Target found at: " + pos);
    }
    
    private static int findSubstring(String text, String pattern) {
        int pLen = pattern.length();
        int tLen = text.length();
        if (pLen == 0) return 0;
        if (pLen > tLen) return -1;
        
        long pHash = 0;
        long tHash = 0;
        long h = 1;
        int d = 256;
        int q = 101;
        
        for (int i = 0; i < pLen - 1; i++) {
            h = (h * d) % q;
        }
        
        for (int i = 0; i < pLen; i++) {
            pHash = (d * pHash + pattern.charAt(i)) % q;
            tHash = (d * tHash + text.charAt(i)) % q;
        }
        
        for (int i = 0; i <= tLen - pLen; i++) {
            if (pHash == tHash) {
                boolean match = true;
                for (int j = 0; j < pLen; j++) {
                    if (text.charAt(i + j) != pattern.charAt(j)) {
                        match = false;
                        break;
                    }
                }
                if (match) return i;
            }
            if (i < tLen - pLen) {
                tHash = (d * (tHash - text.charAt(i) * h) + text.charAt(i + pLen)) % q;
                if (tHash < 0) tHash += q;
            }
        }
        return -1;
    }
}
