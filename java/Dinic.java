import java.util.*;

public class Dinic {
    static class Edge {
        int v, flow, C, rev;
        Edge(int v, int flow, int C, int rev) {
            this.v = v; this.flow = flow; this.C = C; this.rev = rev;
        }
    }
    
    static class Graph {
        int V;
        int[] level;
        List<Edge>[] adj;
        
        Graph(int V) {
            this.V = V;
            level = new int[V];
            adj = new ArrayList[V];
            for(int i = 0; i < V; i++) adj[i] = new ArrayList<>();
        }
        
        void addEdge(int u, int v, int C) {
            adj[u].add(new Edge(v, 0, C, adj[v].size()));
            adj[v].add(new Edge(u, 0, 0, adj[u].size() - 1));
        }
        
        boolean bfs(int s, int t) {
            Arrays.fill(level, -1);
            level[s] = 0;
            Queue<Integer> q = new LinkedList<>();
            q.add(s);
            while(!q.isEmpty()) {
                int u = q.poll();
                for(Edge e : adj[u]) {
                    if(level[e.v] < 0 && e.flow < e.C) {
                        level[e.v] = level[u] + 1;
                        q.add(e.v);
                    }
                }
            }
            return level[t] >= 0;
        }
        
        int sendFlow(int u, int flow, int t, int[] ptr) {
            if(u == t) return flow;
            for(int i = ptr[u]; i < adj[u].size(); i++) {
                ptr[u] = i;
                Edge e = adj[u].get(i);
                if(level[e.v] == level[u] + 1 && e.flow < e.C) {
                    int curr_flow = Math.min(flow, e.C - e.flow);
                    int temp_flow = sendFlow(e.v, curr_flow, t, ptr);
                    if(temp_flow > 0) {
                        e.flow += temp_flow;
                        adj[e.v].get(e.rev).flow -= temp_flow;
                        return temp_flow;
                    }
                }
            }
            return 0;
        }
        
        int dinicMaxflow(int s, int t) {
            if(s == t) return -1;
            int total = 0;
            while(bfs(s, t)) {
                int[] ptr = new int[V];
                int flow;
                while((flow = sendFlow(s, Integer.MAX_VALUE, t, ptr)) > 0) {
                    total += flow;
                }
            }
            return total;
        }
    }

    public static void main(String[] args) {
        // AquaNet 6-node Reservoir to Consumer max flow graph
        Graph g = new Graph(6);
        g.addEdge(0, 1, 16);
        g.addEdge(0, 2, 13);
        g.addEdge(1, 2, 10);
        g.addEdge(1, 3, 12);
        g.addEdge(2, 1, 4);
        g.addEdge(2, 4, 14);
        g.addEdge(3, 2, 9);
        g.addEdge(3, 5, 20);
        g.addEdge(4, 3, 7);
        g.addEdge(4, 5, 4);
        
        System.out.println("AquaNet Max Flow (Dinic's): " + g.dinicMaxflow(0, 5));
    }
}
