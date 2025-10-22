import { useEffect } from "react";
import { Node } from "reactflow";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workflowNodeDataSchema, type WorkflowNodeData, nodeMetadata } from "@shared/schema";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface PropertiesDrawerProps {
  open: boolean;
  selectedNode: Node<WorkflowNodeData> | null;
  onOpenChange: (open: boolean) => void;
  onUpdateNode: (nodeId: string, data: WorkflowNodeData) => void;
}

export default function PropertiesDrawer({
  open,
  selectedNode,
  onOpenChange,
  onUpdateNode,
}: PropertiesDrawerProps) {
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
      onOpenChange(false);
    }
  };

  const stepName = selectedNode ? nodeMetadata[selectedNode.data.type].label : "";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[500px] p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="text-lg font-semibold">
            {stepName} Properties
          </SheetTitle>
          <SheetDescription>
            Configure the details and conditions for this workflow step
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="py-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Step Information
                </h3>
                
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
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">
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

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">
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

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">
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
            </form>
          </Form>
        </ScrollArea>

        <div className="px-6 py-4 border-t bg-background sticky bottom-0">
          <div className="flex gap-3">
            <Button 
              onClick={form.handleSubmit(onSubmit)}
              className="flex-1"
              data-testid="button-save-properties"
            >
              Save Changes
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              data-testid="button-cancel-properties"
            >
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
