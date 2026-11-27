import java.util.Random;

public class MillerRabin {
    static long power(long x, long y, long p) {
        long res = 1;
        x = x % p;
        while (y > 0) {
            if ((y & 1) == 1) res = (res * x) % p;
            y = y >> 1;
            x = (x * x) % p;
        }
        return res;
    }

    static boolean miillerTest(long d, long n) {
        Random rand = new Random();
        long a = 2 + (long)(rand.nextDouble() % (n - 4));
        long x = power(a, d, n);

        if (x == 1 || x == n - 1) return true;
        while (d != n - 1) {
            x = (x * x) % n;
            d *= 2;
            if (x == 1) return false;
            if (x == n - 1) return true;
        }
        return false;
    }

    static boolean isPrime(long n, int k) {
        if (n <= 1 || n == 4) return false;
        if (n <= 3) return true;

        long d = n - 1;
        while (d % 2 == 0) d /= 2;

        for (int i = 0; i < k; i++)
            if (!miillerTest(d, n))
                return false;
        return true;
    }

    public static void main(String[] args) {
        long sensorHash = 97;
        int k = 4; // Number of iterations
        if (isPrime(sensorHash, k))
            System.out.println("AquaNet Sensor Hash " + sensorHash + " is Prime.");
        else
            System.out.println("AquaNet Sensor Hash " + sensorHash + " is Composite.");
    }
}
