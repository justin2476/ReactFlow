import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileJson, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { workflowSchema, type Workflow } from "@shared/schema";

interface LoadWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoad: (workflow: Workflow) => void;
}

export default function LoadWorkflowDialog({
  open,
  onOpenChange,
  onLoad,
}: LoadWorkflowDialogProps) {
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleLoad = async () => {
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }

    try {
      const text = await selectedFile.text();
      const data = JSON.parse(text);
      const workflow = workflowSchema.parse(data);
      onLoad(workflow);
      onOpenChange(false);
      setSelectedFile(null);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error 
          ? `Invalid workflow file: ${err.message}` 
          : "Failed to load workflow. Please check the file format."
      );
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/json") {
      setSelectedFile(file);
      setError(null);
    } else {
      setError("Please drop a valid JSON file");
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          setSelectedFile(null);
          setError(null);
        }
      }}
    >
      <DialogContent data-testid="dialog-load-workflow">
        <DialogHeader>
          <DialogTitle>Load Workflow</DialogTitle>
          <DialogDescription>
            Import a previously saved workflow from a JSON file.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover-elevate transition-all"
            data-testid="dropzone-upload"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                {selectedFile ? (
                  <FileJson className="w-6 h-6 text-primary" />
                ) : (
                  <Upload className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              {selectedFile ? (
                <>
                  <p className="text-sm font-medium text-foreground">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Click to choose a different file
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-foreground">
                    Drop your JSON file here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports .json workflow files
                  </p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileSelect}
              className="hidden"
              data-testid="input-file-upload"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel-load"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleLoad} 
            disabled={!selectedFile}
            data-testid="button-confirm-load"
          >
            Load Workflow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
