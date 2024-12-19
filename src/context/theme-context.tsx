import { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextProps {
    theme: string
    setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme")
        return savedTheme || "light"
    })

    useEffect(() => {
        const root = window.document.documentElement
        const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
        root.classList.remove(isDark ? "light" : "dark")
        root.classList.add(isDark ? "dark" : "light")
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
} 