import java.util.*;

public class VertexCover {
    static class Graph {
        int V;
        List<Integer>[] adj;
        
        Graph(int v) {
            V = v;
            adj = new ArrayList[v];
            for(int i=0; i<v; i++) adj[i] = new ArrayList<>();
        }
        
        void addEdge(int v, int w) {
            adj[v].add(w);
            adj[w].add(v);
        }
        
        void printVertexCover() {
            boolean[] visited = new boolean[V];
            
            for(int u=0; u<V; u++) {
                if(!visited[u]) {
                    for(int v : adj[u]) {
                        if(!visited[v]) {
                            visited[v] = true;
                            visited[u] = true;
                            break;
                        }
                    }
                }
            }
            
            System.out.print("AquaNet Pipeline Conflict Vertex Cover: ");
            for(int j=0; j<V; j++) {
                if(visited[j]) System.out.print(j + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Graph g = new Graph(6);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        g.addEdge(3, 4);
        g.addEdge(4, 5);
        g.printVertexCover();
    }
}
