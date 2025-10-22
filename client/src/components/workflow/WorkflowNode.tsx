import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  CheckCircle, 
  Calculator, 
  Users, 
  FileText, 
  Package, 
  Receipt, 
  DollarSign,
  Clock
} from "lucide-react";
import type { WorkflowNodeData, NodeType } from "@shared/schema";

const nodeIcons: Record<NodeType, typeof ShoppingCart> = {
  purchase_request: ShoppingCart,
  manager_approval: CheckCircle,
  budget_validation: Calculator,
  vendor_selection: Users,
  po_creation: FileText,
  goods_receipt: Package,
  invoice_processing: Receipt,
  payment_release: DollarSign,
};

const nodeColors: Record<NodeType, string> = {
  purchase_request: "bg-violet-500/10 border-violet-500/30",
  manager_approval: "bg-blue-500/10 border-blue-500/30",
  budget_validation: "bg-emerald-500/10 border-emerald-500/30",
  vendor_selection: "bg-card border-card-border",
  po_creation: "bg-card border-card-border",
  goods_receipt: "bg-card border-card-border",
  invoice_processing: "bg-card border-card-border",
  payment_release: "bg-amber-500/10 border-amber-500/30",
};

function WorkflowNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  const Icon = nodeIcons[data.type];
  const colorClass = nodeColors[data.type];

  return (
    <Card 
      className={`w-[200px] min-h-[80px] transition-all ${colorClass} ${
        selected ? "ring-2 ring-primary shadow-lg" : "shadow-sm"
      }`}
      data-testid={`node-${data.type}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-primary border-2 border-background"
        data-testid="handle-target"
      />
      
      <div className="p-3 space-y-2">
        <div className="flex items-start gap-2">
          <Icon className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground leading-tight truncate">
              {data.label}
            </h3>
            {data.description && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                {data.description}
              </p>
            )}
          </div>
        </div>

        {(data.assignedDepartment || data.assignedApprover || data.slaDays !== undefined) && (
          <div className="space-y-1 pt-1 border-t border-border/50">
            {data.assignedDepartment && (
              <div className="text-xs text-muted-foreground truncate">
                <span className="font-medium">Dept:</span> {data.assignedDepartment}
              </div>
            )}
            {data.assignedApprover && (
              <div className="text-xs text-muted-foreground truncate">
                <span className="font-medium">Approver:</span> {data.assignedApprover}
              </div>
            )}
            {data.slaDays !== undefined && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {data.slaDays} {data.slaDays === 1 ? "day" : "days"}
                </span>
              </div>
            )}
          </div>
        )}

        {data.conditions && (
          <Badge variant="secondary" className="text-xs mt-1">
            Conditional
          </Badge>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-primary border-2 border-background"
        data-testid="handle-source"
      />
    </Card>
  );
}

export default memo(WorkflowNode);
