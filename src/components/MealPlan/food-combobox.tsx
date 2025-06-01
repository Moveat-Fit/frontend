/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FormControl, FormMessage } from "@/components/ui/form";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Controller } from "react-hook-form";

type FoodOption = {
    id: number;
    name: string;
    food_group: string;
    default_portion: {
        grams: number;
        energy_value_kcal: number;
        portion: number;
        unit_measure: string;
    };
};

type Props = {
    control: any;
    name: string;
    label?: string;
    options: FoodOption[];
    onSelect?: (item: FoodOption) => void;
};

export default function FoodCombobox({ control, name, label, options, onSelect }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => {
                const selectedItem = options.find(option => option.name === field.value);

                return (
                    <div className="grid gap-2">
                        {label && <label className="text-xs font-medium">{label}</label>}

                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="w-[200px] justify-between font-normal"
                                        title={selectedItem?.name || "Selecione um alimento"}
                                    >
                                        <span className="block max-w-[140px] overflow-hidden whitespace-nowrap text-ellipsis">
                                            {field.value ? selectedItem?.name : "Selecione um alimento"}
                                        </span>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>

                                </FormControl>


                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] max-h-[300px] p-0 overflow-auto">
                                <Command>
                                    <CommandInput placeholder="Buscar alimento..." />
                                    <CommandEmpty>Nenhum alimento encontrado.</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((item) => (
                                            <CommandItem
                                                key={item.id}
                                                value={item.name}
                                                onSelect={() => {
                                                    field.onChange(item.name);
                                                    onSelect?.(item);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        item.name === field.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {item.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </div>
                );
            }}
        />
    );
}
