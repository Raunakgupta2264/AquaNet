# AquaNet – Smart Water Resource Management Platform

## Project Title
**AquaNet**: A Smart Water Resource Management Platform powered by Advanced Data Structures and Algorithms.

## Problem Statement
Water management systems face challenges in rapid contamination detection, efficient pipeline flow optimization, dynamic resource allocation, and resolving conflicting maintenance schedules. Traditional systems rely on simple querying and brute-force methods, which fail to scale.

## Objectives
- Demonstrate the real-world applicability of Data Structures and Algorithms.
- Provide a responsive dashboard for monitoring reservoirs, pipelines, and water quality.
- Visualize algorithm execution step-by-step for educational purposes.
- Maintain modularity, low latency, and a clear mapping to college DSA modules.

## Features
- **Interactive Algorithm Visualizer**: Step-by-step playback for over 25+ algorithms.
- **Smart Analytics Dashboard**: Mock statistics representing a water network.
- **Water Quality Monitor**: Advanced string algorithms for text mining reports.
- **Flow Simulator**: Network flow algorithms to compute max pipeline capacity.
- **Resource Allocator**: DP techniques for optimizing treatment processes.
- **Constraint Analyzer**: NP-Complete reductions for scheduling maintenance.

## System Architecture
```
Users (Operators / Administrators)
       ↓
AquaNet Dashboard (React + Vite)
       ↓
Water Management Engine (UI State)
       ↓
DSA Algorithm Engine (TypeScript Implementations)
       ↓
Data Layer (Mock Sensory & Network Data)
```

## Technology Stack
- **Frontend**: React (TypeScript), Vite, Tailwind CSS, Lucide React, Framer Motion
- **Core Algorithms**: Native TypeScript

## DSA Mapping
| Module | DSA | AquaNet Application | Complexity |
|--------|-----|----------------------|------------|
| M1 (Strings) | KMP, Z-Function, Rabin-Karp, Aho-Corasick | Search contamination keywords in water quality reports. | $O(N + M)$ |
| M2 (Suffix) | Suffix Array, SA-IS, LCP, Suffix Tree/Automaton | Indexing massive historical water reports. | $O(N \log N)$ or $O(N)$ |
| M3 (DP) | Levenshtein, MCM, Optimal BST, Bitmask TSP | Error correction in reports; treatment optimization. | varies (e.g. $O(N \cdot M)$) |
| M4 (Network) | Edmonds-Karp, Dinic, Bipartite Matching, Min-Cut | Compute max water flow and assign operators. | $O(V^2 E)$ / $O(V E^2)$ |
| M5 (NP) | 3-SAT -> CLIQUE -> IS -> Vertex Cover | Resolve conflicting maintenance schedules. | NP-Hard (2-Approx: $O(V+E)$) |
| M6 (Parallel)| Rand. QuickSort, Reservoir Sampling, Blelloch | Sort demands, sample sensors, cumulative levels. | $O(N \log N)$ / $O(N)$ / $O(\log N)$ |

## How to Run
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open the localhost URL in your browser.

## Demo Instructions
1. Open the application.
2. Navigate through the sidebar modules (e.g., String Algorithms, Network Flow).
3. Use the input configurations on the left to set custom parameters.
4. Click "Run Algorithm" and use the playback controls to step through the execution visually.

## Future Scope
- Integration with real IoT water sensors.
- Backend database integration (PostgreSQL / MongoDB).
- Advanced geospatial mapping (Mapbox / Leaflet) of the water network.
