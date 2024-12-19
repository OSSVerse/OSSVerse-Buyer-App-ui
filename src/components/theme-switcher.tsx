import { Sun, Moon, Monitor } from "lucide-react";
import Select, { SelectItem, } from "@/components/ui/select";
import { useTheme } from '@/context/theme-context';


const ThemeSelector = () => {
    const { theme, setTheme } = useTheme();

    const handleThemeChange = (value: string) => {

        setTheme(value);
        console.log(value);
        // Add your theme change logic here
    };

    return (
        <div className="w-72">

            <Select value={theme} onValueChange={handleThemeChange} id="theme-selector">

                <SelectItem value="light" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Light
                    </div>
                </SelectItem>
                <SelectItem value="dark" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Dark
                    </div>
                </SelectItem>
                <SelectItem value="system" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        System
                    </div>
                </SelectItem>
            </Select>
        </div>

    );
};

export default ThemeSelector;