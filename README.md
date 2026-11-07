# Piluso

Demo interactiva para agencias de viaje en Latinoamérica. La aplicación usa datos locales y simula reservas, conversaciones, cobros Belo y pagos a proveedores. No utiliza backend ni procesa dinero real.

## Tecnología

- React 19, TypeScript y Vite
- Estado local persistido en `localStorage`; sincronización entre pestañas mediante el evento `storage`
- Belo MCP simulado en `src/services/belo/`
- Vitest para reglas de cálculo y disponibilidad

## Requisitos

- Node.js 22 o posterior
- npm

## Desarrollo

```bash
npm install
npm run dev
```

Abrí la dirección local que muestra Vite. En la primera pantalla podés entrar como titular, agente o viajero; no se requiere contraseña.

## Build y verificaciones

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Recorrido de demo

1. Entrá como titular y revisá Overview, los próximos viajes y los indicadores.
2. En Conversaciones, abrí la consulta de Mateo Ríos, pedile un borrador a Pili y tomá o devolvé el control de la charla.
3. En Paquetes, editá, publicá, duplicá o creá un paquete. El enlace se puede compartir desde la tarjeta.
4. Salí y volvé a entrar como viajero. Consultá a Pili, revisá el itinerario, confirmá pasajeros y tarifa.
5. Elegí link, QR o transferencia y simulá un pago aprobado o rechazado.
6. Volvé a entrar como titular: la reserva, el saldo, la comisión, las notificaciones y los pagos pendientes a proveedores se actualizaron.
7. En Pagos → Pagos a proveedores, ajustá concepto, monto o destino, seleccioná pagos y confirmá el lote. Si falta saldo, probá la conversión demo.
8. Para cancelaciones, solicitá la cancelación desde el flujo de viajero y resolvela desde la ficha de la reserva. Los pagos a proveedores ya ejecutados no se revierten.

Todos los importes son ficticios. Tipo de cambio fijo de demostración: 1 USD = 1.180 ARS. Comisión simulada: 1%. Los envíos de WhatsApp, pagos y transferencias no salen de la aplicación.

## GitHub Pages

El build usa rutas y recursos relativos para alojamiento estático. El workflow `.github/workflows/deploy.yml` compila y publica en GitHub Pages al hacer push a `main`. Habilitá Pages en la configuración del repositorio con **GitHub Actions** como fuente.

## Persistencia y reinicio

Las modificaciones se guardan en el navegador y se comparten con otras pestañas abiertas en el mismo origen. Usá Configuración → Datos demo → **Reiniciar datos demo** para volver al conjunto inicial.

## Limitaciones de la demo

- No hay usuarios reales, servidor, API de Belo, WhatsApp ni procesamiento de pagos.
- Pili responde mediante reglas locales deterministas; no llama a un modelo de IA.
- Las herramientas del cliente Belo son nombres provisionales para el prototipo.
- El logo visible es temporal y está centralizado en el componente `Logo` de `src/App.tsx` para reemplazarlo en otra iteración.
