import { Button } from "@/components/ui/button";
import { 
  Save, 
  Upload, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize,
  Workflow,
  Moon,
  Sun
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme-provider";

interface WorkflowToolbarProps {
  workflowName: string;
  onWorkflowNameChange: (name: string) => void;
  onSave: () => void;
  onLoad: () => void;
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
}

export default function WorkflowToolbar({
  workflowName,
  onWorkflowNameChange,
  onSave,
  onLoad,
  onReset,
  onZoomIn,
  onZoomOut,
  onFitView,
}: WorkflowToolbarProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="h-14 bg-card border-b border-card-border flex items-center justify-between px-4 gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <Workflow className="w-5 h-5 text-primary-foreground" />
          </div>
          <Input
            value={workflowName}
            onChange={(e) => onWorkflowNameChange(e.target.value)}
            className="w-64 h-9 font-medium"
            placeholder="Workflow Name"
            data-testid="input-workflow-name"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 pr-2 border-r border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            data-testid="button-save-workflow"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLoad}
            data-testid="button-load-workflow"
          >
            <Upload className="w-4 h-4 mr-2" />
            Load
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            data-testid="button-reset-workflow"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onZoomOut}
            data-testid="button-zoom-out"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onZoomIn}
            data-testid="button-zoom-in"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onFitView}
            data-testid="button-fit-view"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 pl-2 border-l border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-toggle-theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
