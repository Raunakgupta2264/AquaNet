import java.util.Arrays;
import java.util.Random;

public class ReservoirSampling {
    static void selectKItems(int[] stream, int n, int k) {
        int[] reservoir = new int[k];
        for (int i = 0; i < k; i++)
            reservoir[i] = stream[i];

        Random r = new Random();
        for (int i = k; i < n; i++) {
            int j = r.nextInt(i + 1);
            if (j < k)
                reservoir[j] = stream[i];
        }

        System.out.println("AquaNet Sampled Sensors: " + Arrays.toString(reservoir));
    }

    public static void main(String[] args) {
        int[] stream = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        System.out.println("AquaNet Sensor Stream: " + Arrays.toString(stream));
        selectKItems(stream, stream.length, 3);
    }
}
