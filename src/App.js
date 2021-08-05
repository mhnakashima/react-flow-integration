import "./App.css";
import ReactFlow, { MiniMap, Controls, Background } from "react-flow-renderer";

function App() {
  const flow = require("./assets/data.json");
  let elements = [];

  if (flow) {
    for (const [key, value] of Object.entries(flow)) {
      const x = parseInt(value.$position.left.split("px")[0]) || 0;
      const y = parseInt(value.$position.top.split("px")[0]) || 0;
      elements.push({
        id: key,
        data: {
          label: <div className="bloco">{value.$title}</div>,
        },
        position: { x, y },
      });

      if (value.$conditionOutputs.length) {
        const edges = value.$conditionOutputs;
        edges.forEach(edge => {
          elements.push({
            id: `el_${key}_${edge.stateId}`,
            source: key,
            target: edge.stateId,
            animated: true
          })
        })
      }
    }
  }

  return (
    <div className="App">
      <div
        style={{
          width: window.screen.availWidth,
          height: window.screen.availHeight - 105,
        }}
      >
        <ReactFlow className="builder-container" elements={elements}>
          <MiniMap
            nodeColor={(node) => {
              switch (node.type) {
                case "input":
                  return "red";
                case "default":
                  return "#00ff00";
                case "output":
                  return "rgb(0,0,255)";
                default:
                  return "#eee";
              }
            }}
            nodeStrokeWidth={3}
          />
          <Background variant="dots" gap={12} size={0.5} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
