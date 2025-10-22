import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useState } from "react";

interface SaveWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflowName: string;
  onSave: (filename: string) => void;
}

export default function SaveWorkflowDialog({
  open,
  onOpenChange,
  workflowName,
  onSave,
}: SaveWorkflowDialogProps) {
  const [filename, setFilename] = useState(
    workflowName.toLowerCase().replace(/\s+/g, "-") || "workflow"
  );

  const handleSave = () => {
    onSave(filename);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-save-workflow">
        <DialogHeader>
          <DialogTitle>Save Workflow</DialogTitle>
          <DialogDescription>
            Export your workflow as a JSON file that can be imported later.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="filename">Filename</Label>
            <div className="flex gap-2">
              <Input
                id="filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="my-workflow"
                data-testid="input-filename"
              />
              <span className="flex items-center text-sm text-muted-foreground">
                .json
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel-save"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            data-testid="button-confirm-save"
          >
            <Download className="w-4 h-4 mr-2" />
            Download JSON
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
