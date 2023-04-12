import { useEffect } from "react";
import Graph from "graphology";
import { ControlsContainer, FullScreenControl, SigmaContainer, ZoomControl, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useAppStore } from "../../store";

const LoadGraph = () => {
  const matrix = useAppStore((state) => state.matrix)
  const matrixPath = useAppStore((state) => state.matrixPath)
  const nodes = useAppStore((state) => state.nodes)
  const loadGraph = useLoadGraph();


  useEffect(() => {
    if(matrix != [[]] && matrix != null){
      const graph = new Graph();
      for(let i=0;i<nodes.length;i++){
        graph.addNode(i, { x: nodes[i].x, y: nodes[i].y, size: 15, label: nodes[i].nama, color: "#0ea5e9" });
      }
      for(let i=0;i<nodes.length;i++){
        for(let j=i+1;j<nodes.length;j++){
          if(matrixPath[i][j] == 2){
            graph.addEdge(i,j, {label: 'erf', color: "#ef4444", size: 5})
          }else if(matrix[i][j] > 0){
            graph.addEdge(i,j, {label: 'iko', color: "#0ea5e9", size: 5})
          }
        }
      }
      loadGraph(graph);
    }
  }, [matrix]);

  return null;
};

function MainGraph() {
  return (
    <SigmaContainer style={{width: '100vw', height: '100vh', backgroundColor: '#f9fafb', zoom:1}}>
      <LoadGraph />
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl className="pl-1.5 overflow-hidden"/>
        <FullScreenControl className="pl-1.5 overflow-hidden"/>
      </ControlsContainer>
    </SigmaContainer>
  )
}

export default MainGraph