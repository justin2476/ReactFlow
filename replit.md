# Procurement Workflow Builder

## Overview
A React-based drag-and-drop workflow builder for designing and automating procurement process flows. Built with React Flow, TypeScript, and a modern UI using Tailwind CSS and Shadcn UI components.

## Features
- **Visual Workflow Design**: Drag-and-drop interface for building procurement workflows
- **8 Procurement Step Types**: Purchase Request, Manager Approval, Budget Validation, Vendor Selection, PO Creation, Goods Receipt, Invoice Processing, Payment Release
- **Node Configuration**: Editable properties panel for configuring step details (name, department, approver, SLA, conditions)
- **Workflow Management**: Save (export to JSON), Load (import from JSON), and Reset canvas functionality
- **Local Persistence**: Automatic saving to localStorage to preserve workflow state
- **Professional UI**: Clean, modern interface with zoom/pan controls, minimap, and responsive design

## Technology Stack
- **Frontend**: React 18, TypeScript, React Flow
- **UI Components**: Shadcn UI, Tailwind CSS
- **State Management**: React Hooks, React Flow state
- **Data Validation**: Zod schemas
- **Persistence**: localStorage API

## Project Structure
```
client/src/
├── components/workflow/
│   ├── WorkflowNode.tsx          # Custom React Flow node component
│   ├── NodeSidebar.tsx           # Draggable node palette
│   ├── PropertiesPanel.tsx       # Node configuration panel
│   ├── WorkflowToolbar.tsx       # Main toolbar with actions
│   ├── SaveWorkflowDialog.tsx    # Export workflow dialog
│   ├── LoadWorkflowDialog.tsx    # Import workflow dialog
│   └── ResetConfirmDialog.tsx    # Reset confirmation
├── pages/
│   └── WorkflowBuilder.tsx       # Main workflow builder page
└── App.tsx                        # Application root with routing

shared/
└── schema.ts                      # TypeScript types and Zod schemas
```

## Data Model
- **WorkflowNodeData**: Node configuration (type, label, description, assignment, SLA, conditions)
- **ReactFlowNode**: React Flow node with position and workflow data
- **ReactFlowEdge**: Connections between nodes
- **Workflow**: Complete workflow (name, nodes, edges) for save/load

## User Workflows
1. **Create Workflow**: Drag nodes from sidebar → Configure properties → Connect nodes
2. **Save Workflow**: Toolbar > Save → Enter filename → Download JSON
3. **Load Workflow**: Toolbar > Load → Upload JSON file → Workflow restored
4. **Reset Canvas**: Toolbar > Reset → Confirm → Canvas cleared

## Design System
- Professional blue primary color (215 80% 58%)
- Dark mode support with appropriate contrast
- Consistent spacing (4px, 8px, 16px, 24px)
- Inter font for UI, JetBrains Mono for code
- Subtle shadows and hover states
- Smooth transitions and animations

## Development Notes
- React Flow handles canvas interactions (zoom, pan, drag)
- localStorage automatically saves workflow state
- Node IDs auto-increment to prevent conflicts
- Form validation using react-hook-form + Zod
- Toast notifications for user feedback
- Responsive design with collapsible panels

## Recent Changes
- Initial implementation with full workflow builder functionality
- All 8 procurement step types with custom icons and colors
- Complete save/load/reset workflow management
- Properties panel with comprehensive node configuration
- localStorage persistence for auto-save
