import * as React from "react"
import { cn } from "../../lib/utils"

export function Table({ className, ...props }) {
  return (
    <table
      className={cn("w-full border-collapse text-sm text-left", className)}
      {...props}
    />
  )
}

export function TableHeader({ className, ...props }) {
  return <thead className={cn("bg-gray-100", className)} {...props} />
}

export function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn(
        "border-b last:border-0 hover:bg-gray-50 transition-colors",
        className
      )}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }) {
  return (
    <th className={cn("p-2 font-medium text-gray-700", className)} {...props} />
  )
}

export function TableBody({ className, ...props }) {
  return <tbody className={cn("", className)} {...props} />
}

export function TableCell({ className, ...props }) {
  return <td className={cn("p-2", className)} {...props} />
}
