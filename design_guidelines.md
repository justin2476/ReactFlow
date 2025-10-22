# Design Guidelines: Procurement Workflow Builder

## Design Approach

**Selected Approach:** Design System (Utility-Focused)

**Primary Reference:** Linear + Figma's canvas interface patterns

**Justification:** As a productivity tool for business process automation, this application prioritizes efficiency, learnability, and functional clarity over emotional engagement. The interface draws inspiration from modern workflow tools (Linear, n8n, Zapier) and canvas-based design tools (Figma, Miro) to create a professional, enterprise-grade experience.

**Key Design Principles:**
- Clarity over decoration: Every element serves a functional purpose
- Spatial hierarchy: Canvas takes precedence, with supporting panels receding
- Consistent state feedback: Clear visual indicators for node states, connections, and selections
- Professional restraint: Subtle animations and refined interactions without distraction

---

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary Interface)**

*Background Layers:*
- Canvas background: 220 15% 8%
- Sidebar/Panel background: 220 15% 12%
- Card/Node background: 220 10% 16%
- Elevated elements: 220 10% 20%

*Brand & Accent:*
- Primary brand: 215 80% 58% (professional blue for actions, selected states)
- Success states: 142 71% 45% (green for approved steps, valid connections)
- Warning states: 38 92% 50% (amber for pending approvals, SLA alerts)
- Error states: 0 84% 60% (red for validation errors, rejected steps)
- Neutral focus: 220 10% 50% (borders, dividers, inactive states)

*Node Type Colors* (subtle, distinct backgrounds):
- Purchase Request: 260 50% 20%
- Approval steps: 200 40% 20%
- Validation steps: 142 30% 18%
- Operational steps: 220 15% 18%

*Text Hierarchy:*
- Primary text: 220 10% 95%
- Secondary text: 220 8% 65%
- Tertiary/labels: 220 6% 50%

**Light Mode** (provide as alternative)
- Canvas: 220 15% 98%
- Panels: 220 20% 100%
- Adjust other colors maintaining contrast ratios

---

### B. Typography

**Font Stack:**
- Primary: 'Inter' via Google Fonts (clean, professional, excellent readability)
- Monospace: 'JetBrains Mono' for JSON/code displays

**Type Scale:**
- Hero/Section titles: 24px/600
- Panel headers: 18px/600
- Node titles: 14px/500
- Body text: 14px/400
- Labels/metadata: 12px/500
- Small text/captions: 11px/400

**Line Heights:**
- Headings: 1.2
- Body: 1.5
- Compact UI elements: 1.4

---

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, and 8 primarily
- Tight spacing (within components): p-2, gap-2
- Standard spacing (between elements): p-4, gap-4, m-4
- Section spacing: p-6, py-8
- Large breathing room: p-8, gap-8

**Grid Structure:**
```
[Toolbar: 56px height, full width]
[Main Canvas (center, flex-1) | Properties Panel (320px width, collapsible)]
[Sidebar: 240px width | Canvas Area | Properties Panel]
```

**Responsive Breakpoints:**
- Collapse sidebar to icon-only on screens < 1024px
- Stack properties panel below on screens < 768px
- Maintain canvas as priority at all breakpoints

---

### D. Component Library

**Toolbar (Top Bar)**
- Height: 56px, background: panel color
- Left section: Logo/title, workflow name (editable inline)
- Center: Action buttons (Save, Load, Reset) with icons
- Right: Zoom controls, view options, user menu
- Button style: Ghost buttons with icons, hover state: elevated background
- Dividers between button groups using subtle borders

**Sidebar (Node Palette)**
- Width: 240px, scrollable vertical list
- Node cards: Compact, 100% width, rounded corners (6px)
- Each card shows: Icon (24px), step name, brief description
- Drag handle indicator on hover
- Categories with collapsible sections: "Request", "Approval", "Operations", "Finance"
- Search/filter input at top of sidebar

**Canvas Area**
- React Flow container with custom styling
- Grid pattern background (subtle dots, 16px spacing)
- Minimap in bottom-right corner (120x80px)
- Controls (zoom in/out/fit) in bottom-left corner

**Workflow Nodes**
- Size: 200px width, auto height (min 80px)
- Border radius: 8px
- Border: 1px solid with node-type color
- Shadow on hover: subtle elevation
- Structure:
  - Header section: Icon + Title (with edit icon)
  - Body: Key metadata (assigned to, SLA days)
  - Footer: Connection handles (styled as small circles, 12px)
- Selected state: 2px border with primary color, subtle glow effect
- Status indicators: Small badge in top-right (pending/complete/error)

**Edges/Connections**
- Stroke width: 2px
- Default color: neutral (220 10% 40%)
- Selected color: primary brand
- Style: Smooth bezier curves
- Arrow markers on target end
- Label support for conditions (small badge on edge)

**Properties Panel (Right Side)**
- Width: 320px, collapsible
- Header: "Node Properties" with close button
- Sections with clear labels:
  - Basic Info (name, description)
  - Assignment (department dropdown, approver select)
  - SLA Configuration (number input + unit selector)
  - Conditions (text area with syntax highlighting suggestion)
- Form inputs: Shadcn UI components (Input, Select, Textarea)
- Save/Cancel buttons at bottom (sticky footer)
- Empty state when no node selected: Helpful illustration + prompt text

**Modals**
- Save Workflow: Simple dialog with filename input, download JSON button
- Load Workflow: File upload area (drag-drop or browse), preview JSON structure
- Reset Canvas: Confirmation dialog with warning message

**Toast Notifications**
- Position: Top-right
- Duration: 3 seconds
- Types: Success (green), Error (red), Info (blue)
- Message examples: "Workflow saved", "Invalid connection", "Node updated"

---

### E. Animations

**Use Sparingly:**
- Node drag: Slight shadow increase, cursor changes to grabbing
- Connection creation: Animated line following cursor
- Panel transitions: 200ms ease-in-out for sidebar/properties panel collapse
- Button interactions: Subtle scale (0.98) on active press
- Toast entrance/exit: Slide-in from right, fade out
- NO complex canvas animations, scrolling effects, or decorative motion

---

## Images

**No images required** for this utility-focused application. The interface relies on:
- Iconography from Lucide React (consistent 20-24px size)
- Empty state illustrations (simple SVG graphics when no workflow exists)
- Node type icons (procurement-specific: shopping cart, checkmark, calculator, document, etc.)

---

## Workflow-Specific Considerations

**Node State Visualization:**
- Draft nodes: Normal appearance
- Active/In-progress: Pulsing border (subtle)
- Completed: Checkmark icon overlay
- Error/Blocked: Red border, warning icon

**Connection Validation:**
- Invalid connections: Dashed red line with error indicator
- Valid connections: Solid line with appropriate color
- Hover state: Thicker stroke, highlighted path

**Canvas Interaction Feedback:**
- Drag zones: Highlighted on node drag-over
- Selection box: Semi-transparent blue overlay with dashed border
- Context menu: Right-click on nodes/canvas for actions (delete, duplicate, configure)

**Keyboard Shortcuts Support:**
- Visual indicators for shortcuts in tooltips
- Cmd/Ctrl+S for save, Cmd/Ctrl+Z for undo, Delete for remove node

---

This design creates a professional, efficient workspace for procurement workflow design that balances powerful functionality with intuitive usability, maintaining visual consistency throughout while enabling complex process automation tasks.