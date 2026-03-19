#!/bin/sh

set -eu

CONTAINER_NAME="${CONTAINER_NAME:-warehouse_mysql}"
DB_NAME="${DB_NAME:-multistockdb}"
DB_USER="${DB_USER:-root}"
DB_PASSWORD="${DB_PASSWORD:-root}"
BACKUP_DIR="${BACKUP_DIR:-./backups}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
OUTPUT_FILE="$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql"

mkdir -p "$BACKUP_DIR"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker no esta instalado o no esta en PATH." >&2
  exit 1
fi

if ! docker ps --format '{{.Names}}' | grep -qx "$CONTAINER_NAME"; then
  echo "No encontre un contenedor en ejecucion llamado '$CONTAINER_NAME'." >&2
  exit 1
fi

echo "Generando backup en $OUTPUT_FILE"

docker exec "$CONTAINER_NAME" sh -c \
  "exec mysqldump -u\"$DB_USER\" -p\"$DB_PASSWORD\" --routines --triggers --events \"$DB_NAME\"" \
  > "$OUTPUT_FILE"

if [ ! -s "$OUTPUT_FILE" ]; then
  echo "El archivo se creo vacio. Revisa credenciales y estado de MySQL." >&2
  exit 1
fi

echo "Backup listo: $OUTPUT_FILE"
