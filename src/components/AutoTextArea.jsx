import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils"

export default function AutoTextArea({value, className, onChange, ...props}) {
  const textAreaRef = useRef(null)

  const resizeTextArea = (textarea) => {
    textarea.style.height = "auto"
    textarea.style.height = textarea.scrollHeight + "px"
  }

  useEffect(() => {
    resizeTextArea(textAreaRef.current)
  }, [value])

  return (
    <textarea
      ref={textAreaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter some text"
      className={cn(
        "overflow-auto resize-none flex w-full bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      rows={1}
      {...props}
    />
  );
}
