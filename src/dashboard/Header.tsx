// src/components/dashboard/Header.tsx
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// ... dentro do componente
const formattedDate = format(time, "EEEE, d 'de' MMMM 'de' yyyy", {
  locale: ptBR,
});