# Actividades económicas (multipaís)

Cada país tiene su propio dataset con la taxonomía oficial de actividades económicas.
La app carga el dataset del país seleccionado de forma **perezosa** (dynamic import) y
guarda en el formulario tanto el código local como su mapeo a **ISIC Rev.4** (capa
canónica para clasificación de riesgo tipo SAGRILAFT y analítica).

> ⚠️ Los JSON de este directorio contienen **solo unas pocas entradas de ejemplo**
> (marcadas con `_todo`). **Deben reemplazarse por las listas oficiales COMPLETAS**
> de cada autoridad antes de producción. No fabricar ni completar códigos a mano.

## Estructura de cada archivo

```jsonc
{
  "_todo": "…reemplazar por la lista oficial completa…",
  "entries": [
    { "localCode": "4711", "localLabel": "…", "isicCode": "4711" }
  ]
}
```

- `localCode`: código en el sistema local del país.
- `localLabel`: descripción oficial en el idioma del país.
- `isicCode`: clase ISIC Rev.4 correspondiente (mapeo canónico).

## Registro de taxonomías por país

| País | Archivo          | Sistema          | Revisión       | Autoridad     |
|------|------------------|------------------|----------------|---------------|
| CO   | `co-ciiu.json`   | CIIU             | Rev.4 A.C.     | DANE          |
| EC   | `ec-ciiu.json`   | CIIU             | Rev.4          | INEC          |
| AR   | `ar-clae.json`   | CLAE             | —              | ARCA (ex-AFIP)|
| BR   | `br-cnae.json`   | CNAE             | —              | IBGE / Concla |
| CL   | `cl-ciiu.json`   | CIIU             | Rev.4 CL       | SII           |
| UY   | `uy-ciiu.json`   | CIIU             | Rev.4          | INE / DGI     |
| *    | `isic.json`      | ISIC (fallback)  | Rev.4          | ONU           |

## Dónde conseguir cada lista oficial

- **CO — CIIU Rev.4 A.C. (DANE):** clasificación CIIU adaptada para Colombia, DANE.
- **EC — CIIU (INEC):** Clasificación Nacional de Actividades Económicas, INEC.
- **AR — CLAE (ARCA, ex-AFIP):** Codificador de Actividades (formulario 883 / nomenclador CLAE).
- **BR — CNAE (IBGE / Concla):** Classificação Nacional de Atividades Econômicas (Concla/IBGE).
- **CL — CIIU Rev.4 CL (SII):** códigos de actividad económica del Servicio de Impuestos Internos.
- **UY — CIIU Rev.4 (INE / DGI):** clasificación de actividades del INE; códigos fiscales DGI.
- **ISIC Rev.4 + tablas de correspondencia:** United Nations Statistics Division
  (UNSD), incluidas las tablas de correspondencia local ↔ ISIC.

## Cómo agregar / actualizar un país

1. Reemplazá las `entries` del JSON con la lista oficial completa (mismo formato).
2. Verificá el `isicCode` de cada entrada contra la tabla de correspondencia oficial.
3. Si es un país nuevo, agregá la entrada en `taxonomies.ts` con su `load()`.
