# Álbum Fotográfico — con Videos

Esta versión permite mezclar **fotos** y **videos** en la misma galería.
- En el arreglo `IMAGENES` puedes añadir objetos con `type: 'video'`, `src` y opcionalmente `poster`.
- El lightbox reproduce el video con controles y mantiene las flechas para navegar entre elementos.

## Estructura
```
album-fotografico-web-video/
├─ index.html
├─ img/               # coloca tus imágenes
└─ video/             # coloca tus videos (MP4 recomendado)
```

## Ejemplo de item de video
```js
{
  type: 'video',
  src: 'video/mi_clip.mp4',
  poster: 'img/mi_clip_poster.jpg',
  titulo: 'Nuestro baile',
  etiquetas: ['Video', 'Boda']
}
```

## Recomendaciones
- Usa MP4 (H.264 + AAC) para máxima compatibilidad (iOS/Android/desktop).
- Comprime a 720p/1080p para mantener el sitio liviano.
- Agrega `poster` para una miniatura nítida en la grilla.
- Si el archivo es muy grande, considera alojarlo en otra plataforma y compárteme el enlace para habilitar incrustación externa.

---
Empaquetado el 2025-08-24 12:31:09.
