"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
// @ts-expect-error NextThemesProvider prop types are mismatched in this setup
import { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
