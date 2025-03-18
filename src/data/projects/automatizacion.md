---
title: "Script de Automatización"
description: "🚀 Script para automatizar el renombrado masivo de archivos de soportes 📂, optimizando el proceso ⚡"
cover: "https://res.cloudinary.com/jeffercbs/image/upload/f_auto,q_auto/v1/jeffercbs/autorename-script/pj1lfdx3yacw2spycckc"
image: "https://res.cloudinary.com/jeffercbs/image/upload/f_auto,q_auto/v1/jeffercbs/autorename-script/pj1lfdx3yacw2spycckc"
repo: "https://github.com/jeffercbs/autorename-reports"
stack:
  framework: "Python, PowerShell"
  case: "Automatización"
  css: "No aplica"
  database: "No aplica"
  auth: "No aplica"
type: "Automatización"
createdAt: "05/15/2024"
---

Este proyecto se desarrollo con el fin de automatizar una tarea que antes era un proceso tedioso, repetitivo y propenso a errores en una organización. El proposito era automatizarlo y ahorrarles horas de trabajo con un script en Python.

Lo que hace el script es recorrer un directorio lleno de archivos PDF, buscar sus nombres en un archivo de Excel y renombrarlos automáticamente siguiendo un formato específico:

> 📄 "Soporte de pago ${código universal}"

El Excel tiene dos columnas con códigos asociados a cada PDF, así que el script simplemente extrae la información, encuentra el archivo correspondiente y lo renombra. Una vez procesados, los archivos se mueven a una carpeta organizada con los nuevos nombres.

Para que la solución fuera aún más robusta, creé un script en PowerShell que se encarga de preparar todo el entorno antes de ejecutar el script de Python. Este script:

- **Verifica si hay un entorno virtual (venv) y lo crea si no existe**
- **Instala automáticamente todas las dependencias necesarias**
- **Asegura que el directorio de archivos renombrados esté listo**
- **Valida que el archivo de Excel con la información exista**
- **Ejecuta el script de Python sin necesidad de intervención manual**

Al final, esta solución eliminó completamente la tarea manual, reduciendo errores y ahorrando muchísimo tiempo. Lo mejor de todo es que cualquiera puede ejecutarlo sin preocuparse por configuraciones complicadas. Solo es cuestión de correr el script de PowerShell y dejar que haga su trabajo.

Este proyecto me permitió ver el impacto real de la automatización en el día a día y cómo algo tan simple como renombrar archivos puede convertirse en una tarea rápida, eficiente y sin estrés con las herramientas adecuadas.
