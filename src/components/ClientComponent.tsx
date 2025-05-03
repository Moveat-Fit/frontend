"use client";

import { useEffect, useState } from "react";
import { getProfessionalName } from "@/utils/tokenUtil";

export default function ClientComponent() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const nome = getProfessionalName();
    setName(nome);
  }, []);

  const greetings = name ? `Olá, ${name.split(" ")[0]}!` : "Olá!";

  return <h1>{greetings}</h1>;
}
