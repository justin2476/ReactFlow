import { z } from "zod";

// Workflow Node Types
export const nodeTypes = [
  "purchase_request",
  "manager_approval",
  "budget_validation",
  "vendor_selection",
  "po_creation",
  "goods_receipt",
  "invoice_processing",
  "payment_release",
] as const;

export type NodeType = typeof nodeTypes[number];

// Node metadata for each type
export const nodeMetadata: Record<NodeType, { label: string; description: string; category: string }> = {
  purchase_request: {
    label: "Purchase Request",
    description: "Initiate procurement process",
    category: "Request",
  },
  manager_approval: {
    label: "Manager Approval",
    description: "Management review and approval",
    category: "Approval",
  },
  budget_validation: {
    label: "Budget Validation",
    description: "Validate budget availability",
    category: "Validation",
  },
  vendor_selection: {
    label: "Vendor Selection",
    description: "Choose and qualify vendor",
    category: "Operations",
  },
  po_creation: {
    label: "PO Creation",
    description: "Generate purchase order",
    category: "Operations",
  },
  goods_receipt: {
    label: "Goods Receipt",
    description: "Confirm delivery of goods",
    category: "Operations",
  },
  invoice_processing: {
    label: "Invoice Processing",
    description: "Process vendor invoice",
    category: "Finance",
  },
  payment_release: {
    label: "Payment Release",
    description: "Release payment to vendor",
    category: "Finance",
  },
};

// Workflow Node Data Schema
export const workflowNodeDataSchema = z.object({
  type: z.enum(nodeTypes),
  label: z.string(),
  description: z.string().optional(),
  assignedDepartment: z.string().optional(),
  assignedApprover: z.string().optional(),
  slaDays: z.number().min(0).optional(),
  conditions: z.string().optional(),
});

export type WorkflowNodeData = z.infer<typeof workflowNodeDataSchema>;

// React Flow Node Schema
export const reactFlowNodeSchema = z.object({
  id: z.string(),
  type: z.literal("workflowNode"),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: workflowNodeDataSchema,
});

export type ReactFlowNode = z.infer<typeof reactFlowNodeSchema>;

// React Flow Edge Schema
export const reactFlowEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.string().optional(),
  label: z.string().optional(),
  animated: z.boolean().optional(),
});

export type ReactFlowEdge = z.infer<typeof reactFlowEdgeSchema>;

// Workflow Schema (for save/load)
export const workflowSchema = z.object({
  name: z.string(),
  nodes: z.array(reactFlowNodeSchema),
  edges: z.array(reactFlowEdgeSchema),
});

export type Workflow = z.infer<typeof workflowSchema>;
