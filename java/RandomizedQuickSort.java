import java.util.*;

public class RandomizedQuickSort {
    static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return i + 1;
    }

    static int partition_r(int[] arr, int low, int high) {
        Random rand = new Random();
        int random = rand.nextInt(high - low) + low;
        swap(arr, random, high);
        return partition(arr, low, high);
    }

    static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition_r(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static void main(String[] args) {
        int[] demands = {450, 120, 800, 320, 650};
        System.out.println("AquaNet Unsorted Demands: " + Arrays.toString(demands));
        quickSort(demands, 0, demands.length - 1);
        System.out.println("AquaNet Sorted Demands: " + Arrays.toString(demands));
    }
}
