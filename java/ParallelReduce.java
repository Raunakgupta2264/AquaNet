import java.util.concurrent.RecursiveTask;
import java.util.concurrent.ForkJoinPool;

public class ParallelReduce {
    static class SumTask extends RecursiveTask<Integer> {
        int[] arr;
        int low;
        int high;
        static final int THRESHOLD = 2;

        SumTask(int[] arr, int low, int high) {
            this.arr = arr;
            this.low = low;
            this.high = high;
        }

        @Override
        protected Integer compute() {
            if (high - low <= THRESHOLD) {
                int sum = 0;
                for (int i = low; i < high; i++) sum += arr[i];
                return sum;
            } else {
                int mid = low + (high - low) / 2;
                SumTask left = new SumTask(arr, low, mid);
                SumTask right = new SumTask(arr, mid, high);
                left.fork();
                int rightResult = right.compute();
                int leftResult = left.join();
                return leftResult + rightResult;
            }
        }
    }

    public static void main(String[] args) {
        int[] readings = {10, 20, 30, 40, 50, 60, 70, 80};
        ForkJoinPool pool = new ForkJoinPool();
        SumTask task = new SumTask(readings, 0, readings.length);
        int result = pool.invoke(task);
        System.out.println("AquaNet Total Water Reading Sum: " + result);
    }
}
