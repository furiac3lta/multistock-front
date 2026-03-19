#!/bin/sh

set -eu

CONTAINER_NAME="${CONTAINER_NAME:-warehouse_mysql}"
TARGET_DB="${TARGET_DB:-multistockdb}"
DB_USER="${DB_USER:-root}"
DB_PASSWORD="${DB_PASSWORD:-root}"

if [ $# -lt 1 ]; then
  echo "Uso: ./scripts/restore-mysql.sh <archivo.sql>" >&2
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "No existe el archivo '$BACKUP_FILE'." >&2
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker no esta instalado o no esta en PATH." >&2
  exit 1
fi

if ! docker ps --format '{{.Names}}' | grep -qx "$CONTAINER_NAME"; then
  echo "No encontre un contenedor en ejecucion llamado '$CONTAINER_NAME'." >&2
  exit 1
fi

echo "Preparando base '$TARGET_DB' en el contenedor '$CONTAINER_NAME'"

docker exec "$CONTAINER_NAME" sh -c \
  "exec mysql -u\"$DB_USER\" -p\"$DB_PASSWORD\" -e 'CREATE DATABASE IF NOT EXISTS \`$TARGET_DB\`'"

echo "Restaurando '$BACKUP_FILE' en '$TARGET_DB'"

docker exec -i "$CONTAINER_NAME" sh -c \
  "exec mysql -u\"$DB_USER\" -p\"$DB_PASSWORD\" \"$TARGET_DB\"" \
  < "$BACKUP_FILE"

echo "Restore listo en '$TARGET_DB'"
