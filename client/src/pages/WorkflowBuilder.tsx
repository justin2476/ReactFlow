import { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { useToast } from "@/hooks/use-toast";
import WorkflowNode from "@/components/workflow/WorkflowNode";
import NodeSidebar from "@/components/workflow/NodeSidebar";
import PropertiesDrawer from "@/components/workflow/PropertiesDrawer";
import WorkflowToolbar from "@/components/workflow/WorkflowToolbar";
import SaveWorkflowDialog from "@/components/workflow/SaveWorkflowDialog";
import LoadWorkflowDialog from "@/components/workflow/LoadWorkflowDialog";
import ResetConfirmDialog from "@/components/workflow/ResetConfirmDialog";
import { nodeMetadata, type WorkflowNodeData, type Workflow, type NodeType } from "@shared/schema";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const nodeTypes = {
  workflowNode: WorkflowNode,
};

const STORAGE_KEY = "procurement-workflow";

function WorkflowBuilderContent() {
  const [workflowName, setWorkflowName] = useState("Untitled Workflow");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node<WorkflowNodeData> | null>(null);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition, fitView, zoomIn, zoomOut } = useReactFlow();
  const { toast } = useToast();
  const nodeIdCounter = useRef(0);

  // Load workflow from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const workflow: Workflow = JSON.parse(saved);
        setWorkflowName(workflow.name);
        setNodes(workflow.nodes as Node<WorkflowNodeData>[]);
        setEdges(workflow.edges as Edge[]);
        
        // Update counter to avoid ID conflicts
        const maxId = Math.max(
          0,
          ...workflow.nodes.map(n => parseInt(n.id.replace('node-', '')) || 0)
        );
        nodeIdCounter.current = maxId + 1;
        
        toast({
          title: "Workflow Loaded",
          description: "Previously saved workflow has been restored.",
        });
      } catch (error) {
        console.error("Failed to load workflow:", error);
      }
    }
  }, [setNodes, setEdges, toast]);

  // Save to localStorage whenever workflow changes
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      const workflow: Workflow = {
        name: workflowName,
        nodes: nodes as any,
        edges: edges as any,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workflow));
    } else {
      // Remove from localStorage when workflow is empty
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [workflowName, nodes, edges]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, type: "smoothstep", animated: true }, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow") as NodeType;
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node<WorkflowNodeData> = {
        id: `node-${nodeIdCounter.current++}`,
        type: "workflowNode",
        position,
        data: {
          type,
          label: nodeMetadata[type].label,
          description: nodeMetadata[type].description,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      
      toast({
        title: "Node Added",
        description: `${nodeMetadata[type].label} added to workflow.`,
      });
    },
    [screenToFlowPosition, setNodes, toast]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node<WorkflowNodeData>) => {
      setSelectedNode(node);
      setPropertiesOpen(true);
    },
    []
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setPropertiesOpen(false);
  }, []);

  const onUpdateNode = useCallback(
    (nodeId: string, data: WorkflowNodeData) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId ? { ...node, data } : node
        )
      );
      
      toast({
        title: "Node Updated",
        description: "Node properties have been saved.",
      });
    },
    [setNodes, toast]
  );

  const handleSaveWorkflow = (filename: string) => {
    const workflow: Workflow = {
      name: workflowName,
      nodes: nodes as any,
      edges: edges as any,
    };

    const blob = new Blob([JSON.stringify(workflow, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Workflow Saved",
      description: `${filename}.json has been downloaded.`,
    });
  };

  const handleLoadWorkflow = (workflow: Workflow) => {
    setWorkflowName(workflow.name);
    setNodes(workflow.nodes as Node<WorkflowNodeData>[]);
    setEdges(workflow.edges as Edge[]);
    
    // Update counter
    const maxId = Math.max(
      0,
      ...workflow.nodes.map(n => parseInt(n.id.replace('node-', '')) || 0)
    );
    nodeIdCounter.current = maxId + 1;

    setTimeout(() => fitView(), 50);

    toast({
      title: "Workflow Loaded",
      description: `${workflow.name} has been imported successfully.`,
    });
  };

  const handleResetWorkflow = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setPropertiesOpen(false);
    setWorkflowName("Untitled Workflow");
    nodeIdCounter.current = 0;
    localStorage.removeItem(STORAGE_KEY);

    toast({
      title: "Canvas Reset",
      description: "All nodes and connections have been cleared.",
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <WorkflowToolbar
        workflowName={workflowName}
        onWorkflowNameChange={setWorkflowName}
        onSave={() => setSaveDialogOpen(true)}
        onLoad={() => setLoadDialogOpen(true)}
        onReset={() => setResetDialogOpen(true)}
        onZoomIn={() => zoomIn()}
        onZoomOut={() => zoomOut()}
        onFitView={() => fitView()}
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <NodeSidebar />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={80} minSize={50}>
          <div ref={reactFlowWrapper} className="h-full w-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              fitView
              deleteKeyCode="Delete"
              className="bg-background"
              data-testid="reactflow-canvas"
            >
              <Background 
                variant={BackgroundVariant.Dots} 
                gap={16} 
                size={1}
                className="bg-background"
              />
              <Controls 
                className="bg-card border border-card-border rounded-md shadow-sm"
                showInteractive={false}
              />
              <MiniMap 
                className="bg-card border border-card-border rounded-md"
                nodeColor={(node) => {
                  const data = node.data as WorkflowNodeData;
                  const typeColors: Record<string, string> = {
                    purchase_request: "#8b5cf6",
                    manager_approval: "#3b82f6",
                    budget_validation: "#10b981",
                    payment_release: "#f59e0b",
                  };
                  return typeColors[data.type] || "#64748b";
                }}
                maskColor="rgba(0, 0, 0, 0.1)"
              />
            </ReactFlow>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <PropertiesDrawer
        open={propertiesOpen}
        selectedNode={selectedNode}
        onOpenChange={setPropertiesOpen}
        onUpdateNode={onUpdateNode}
      />

      <SaveWorkflowDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        workflowName={workflowName}
        onSave={handleSaveWorkflow}
      />

      <LoadWorkflowDialog
        open={loadDialogOpen}
        onOpenChange={setLoadDialogOpen}
        onLoad={handleLoadWorkflow}
      />

      <ResetConfirmDialog
        open={resetDialogOpen}
        onOpenChange={setResetDialogOpen}
        onConfirm={handleResetWorkflow}
      />
    </div>
  );
}

export default function WorkflowBuilder() {
  return (
    <ReactFlowProvider>
      <WorkflowBuilderContent />
    </ReactFlowProvider>
  );
}
