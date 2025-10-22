import { useEffect } from "react";
import { Node } from "reactflow";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workflowNodeDataSchema, type WorkflowNodeData } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface PropertiesPanelProps {
  selectedNode: Node<WorkflowNodeData> | null;
  onUpdateNode: (nodeId: string, data: WorkflowNodeData) => void;
  onClose: () => void;
}

export default function PropertiesPanel({
  selectedNode,
  onUpdateNode,
  onClose,
}: PropertiesPanelProps) {
  const form = useForm<WorkflowNodeData>({
    resolver: zodResolver(workflowNodeDataSchema),
    defaultValues: selectedNode?.data || {
      type: "purchase_request",
      label: "",
      description: "",
      assignedDepartment: "",
      assignedApprover: "",
      slaDays: undefined,
      conditions: "",
    },
  });

  useEffect(() => {
    if (selectedNode) {
      form.reset(selectedNode.data);
    }
  }, [selectedNode, form]);

  const onSubmit = (data: WorkflowNodeData) => {
    if (selectedNode) {
      onUpdateNode(selectedNode.id, data);
      onClose();
    }
  };

  if (!selectedNode) {
    return (
      <div className="w-80 bg-sidebar border-l border-sidebar-border flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Node Selected
          </h3>
          <p className="text-sm text-muted-foreground">
            Select a workflow node to view and edit its properties
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-sidebar border-l border-sidebar-border flex flex-col h-full">
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-sidebar-foreground">
          Node Properties
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          data-testid="button-close-properties"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-6">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter step name"
                      data-testid="input-node-label"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Brief description of this step"
                      className="resize-none h-20"
                      data-testid="input-node-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 pt-2 border-t border-sidebar-border">
              <h3 className="text-sm font-semibold text-sidebar-foreground">
                Assignment
              </h3>

              <FormField
                control={form.control}
                name="assignedDepartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., Finance, Operations"
                        data-testid="input-node-department"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignedApprover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Approver</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., John Smith, CFO"
                        data-testid="input-node-approver"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 pt-2 border-t border-sidebar-border">
              <h3 className="text-sm font-semibold text-sidebar-foreground">
                SLA Configuration
              </h3>

              <FormField
                control={form.control}
                name="slaDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SLA (Days)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        placeholder="e.g., 3"
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? undefined : Number(value));
                        }}
                        value={field.value ?? ""}
                        data-testid="input-node-sla"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Number of days to complete this step
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 pt-2 border-t border-sidebar-border">
              <h3 className="text-sm font-semibold text-sidebar-foreground">
                Conditions
              </h3>

              <FormField
                control={form.control}
                name="conditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conditional Rules</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="e.g., if amount > $10,000, require CFO approval"
                        className="resize-none h-24 font-mono text-xs"
                        data-testid="input-node-conditions"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Define rules that affect workflow routing
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2 pt-4 border-t border-sidebar-border sticky bottom-0 bg-sidebar pb-2">
              <Button 
                type="submit" 
                className="flex-1"
                data-testid="button-save-properties"
              >
                Save Changes
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                data-testid="button-cancel-properties"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
}
