"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Rocket, Copy, FileText, Globe, Bookmark, Sun, X, Github, User, ChevronLeft, Shuffle, HomeIcon } from "lucide-react"
import { Separator } from "./ui/separator"

interface ToolbarItem {
  id: string
  icon: React.ReactNode
  label: string
  onClick?: () => void
  isActive?: boolean
  variant?: "default" | "active"
}

interface FloatingToolbarProps {
  items?: ToolbarItem[]
  onPrevious?: () => void
  onRandomize?: () => void
  showTopActions?: boolean
}

export function FloatingToolbar({ items, onPrevious, onRandomize, showTopActions = true }: FloatingToolbarProps) {
  const [activeId, setActiveId] = useState<string>("rocket")

  const defaultItems: ToolbarItem[] = [
    {
      id: "rocket",
      icon: <HomeIcon className="w-5 h-5" />,
      label: "Launch",
      isActive: true,
    },
    {
      id: "copy",
      icon: <Copy className="w-5 h-5" />,
      label: "Copy",
    },
    {
      id: "file",
      icon: <FileText className="w-5 h-5" />,
      label: "File",
    },
    {
      id: "explore",
      icon: <Globe className="w-5 h-5" />,
      label: "Explore",
    },
    {
      id: "saved",
      icon: <Bookmark className="w-5 h-5" />,
      label: "Saved",
    },
    {
      id: "theme",
      icon: <Sun className="w-5 h-5" />,
      label: "Theme",
    },
    {
      id: "close",
      icon: <X className="w-5 h-5" />,
      label: "Close",
    },
    {
      id: "github",
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
    },
    {
      id: "user",
      icon: <User className="w-5 h-5" />,
      label: "Profile",
    },
  ]

  const toolbarItems = items || defaultItems

  const handleItemClick = (item: ToolbarItem) => {
    setActiveId(item.id)
    item.onClick?.()
  }

  return (
    <> 
    {/* Hover trigger area at the bottom */}
    <div className="fixed bottom-0 left-0 right-0 h-24 z-40 pointer-events-none group">
      {/* Actual toolbar - appears on hover */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto transition-all duration-300 ease-in-out opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0">
        {/* Top Actions */}
        {/* {showTopActions && (
          <div className="flex gap-3 justify-center mb-4">
            <Button variant="outline" className="gap-2 bg-muted hover:bg-muted/80 border-muted" onClick={onPrevious}>
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button variant="outline" className="gap-2 bg-muted hover:bg-muted/80 border-muted" onClick={onRandomize}>
              <Shuffle className="w-4 h-4" />
              Randomize
            </Button>
          </div>
        )} */}

        {/* Main Toolbar */}
        <div className="flex items-center gap-2 bg-muted/50 backdrop-blur-sm rounded-md p-3 shadow-lg border border-border/50">
          {toolbarItems.map((item) => (
              <>
               {["Explore" ].includes(item.label)&&<Separator orientation="vertical" className="bg-gray-200  h-10 w-[.75px]" />}
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`
                flex items-center justify-center py-2 px-4 rounded-sm transition-all duration-200 gap-2 mx-1 font-medium h-10
                ${
                  activeId === item.id
                    ? "bg-primary/10 text-primary shadow-md scale-105 "
                    : " hover:bg-gray-300  hover:scale-105"
                }
                
              `}
              title={item.label}
              aria-label={item.label}
            >
              {item.icon}
              {["Explore", "Saved"].includes(item.label)&&item.label}
            </button>
              { [ "Saved"].includes(item.label)&&<Separator orientation="vertical" className="bg-gray-200  h-10 w-[.75px]" />}
              </>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
