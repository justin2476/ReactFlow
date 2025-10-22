import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  ShoppingCart, 
  CheckCircle, 
  Calculator, 
  Users, 
  FileText, 
  Package, 
  Receipt, 
  DollarSign,
  Search
} from "lucide-react";
import { nodeMetadata, type NodeType } from "@shared/schema";

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

const categories = ["Request", "Approval", "Validation", "Operations", "Finance"];

export default function NodeSidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const filteredNodes = Object.entries(nodeMetadata).filter(([_, meta]) =>
    meta.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meta.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border space-y-3">
        <h2 className="text-lg font-semibold text-sidebar-foreground">
          Process Steps
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search steps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
            data-testid="input-search-nodes"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <TooltipProvider delayDuration={300}>
            <div className="space-y-6">
             
               { filteredNodes.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {filteredNodes.map(([nodeType, meta]) => {
                        const Icon = nodeIcons[nodeType as NodeType];
                        return (
                          <Tooltip key={nodeType}>
                            <TooltipTrigger asChild>
                              <Card
                                draggable
                                onDragStart={(e) => onDragStart(e, nodeType as NodeType)}
                                className="p-3 cursor-grab active:cursor-grabbing hover-elevate active-elevate-2 transition-all hover:shadow-md aspect-square flex flex-col items-center justify-center gap-2 text-center"
                                data-testid={`card-draggable-${nodeType}`}
                              >
                                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                                  <Icon className="w-4 h-4 text-primary" />
                                </div>
                                <h4 className="text-xs font-semibold text-foreground leading-tight">
                                  {meta.label}
                                </h4>
                              </Card>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-xs">
                              <p className="text-sm">{meta.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                )}
           
              
            </div>
          </TooltipProvider>

          {filteredNodes.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No steps found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
