## Pruebas de DASH

1. Crear página con vídeo solamente mediante DASH

Antes de comenzar la parte práctica,necesitaremos:

* Un servidor (puede ser local, en este caso utilizo laragon)
* Instalar la librería de dashjs en la carpeta raíz del proyecto

```shell
npm i dashjs
```

Todos los distintos casos de uso posibles de dashjs, nos los proporcionan ellos mismos si seguimos los siguientes pasos:

* Intalar grunt

```shell
npm install -g grunt-cli
```

* Clonar el repositorio de dashjs

```shell
git clone https://github.com/Dash-Industry-Forum/dash.js.git
```

* instalar las dependecias en el directorio objetivo

```shell
npm intall
```

* Lo ejecutamos

```shell
grunt dev
```

Lo primero que necesitaremos en todos los ejemplos que vamos a realizar es incorporar la librería de _dashjs_

```html
<script src= "../node_modules/dashjs/dist/dash.all.min.js"></script>
```

### 1. Página de solo vídeo con controls

Para comenzar, crearemos una carpeta en la cual iremos creando los distintos archivos, _public_. A continuación, crearemos un archivo HTML, que se puede llamar como se desee, en este caso _SimpleDASHTest.html_.

A la hora de crear la página necesitaremos un contenedor para el video.

```html
<video id="videoPlayer" autoplay controls></video>
```

Con la etiqueta ``controls`` nos permite ver opciones en el reproductor como el audio, _play_, poner a pantalla completa.

También, podemos configurar el tamaño del contenedor de vídeo definiendo el estilo.En este caso al ser una primera prueba lo definimos dentro del ``head``.

```html
<style>
    video{
        height: 360px;
        width: 640px;
    }
</style>
```

Una vez tenemos el contenedor para el vídeo, vamos a indicar que video vamos a reproducir.

```html
    <script>
        (function() {
            var url = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd";
            var player = dashjs.MediaPlayer().create();
            player.initialize(document.querySelector("#videoPlayer"), url, true)
        })()
    </script>
```

esto también se puede determinar en el contenedor de vídeo de la siguiente manera:

```html
    <video data-dashjs-player autoplay src="https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd" controls>
    </video>
```

## 2. Reproductor con estádistica

En este caso lo que vamos a hacer es reproducir un vídeo de la manera que hemos visto anteriormente, además de mostrar el tiempo de buffer que tiene cargado.

Para poder mostar el buffer necesitaremos dos funciones, una que inicie el video de dashjs, además de iniciar la función que actualiza el valor del buffer.

Contenedor para el valor del buffer

```html
<div>
    <span id="stats"></span>
</div>
```

```html
<script>
        var player;
        function init() {
            player = dashjs.MediaPlayerFactory.create(document.querySelector(".dashPlayer"));
            setInterval(updateStats, 500);
        }
        function updateStats() {
            document.querySelector('#stats').innerHTML = "Buffer level " + player.getBufferLength() + " s"
        }
</script>
```

Por último necesitamos añadir al final del body el siguiente ``script`` para que se ejecuten las funciones

```html
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            init();
        })
    </script>
```

## 3.Prueba de solo audio

De manera similar a los casos anteriores, necesitaremos una función para ejecutar el contenido de nuestro archivo multimedia y fijarlo.

```html

    <script>
        function init() {
            var audio,
                player,
                url = "https://vm2.dashif.org/dash/vod/testpic_2s/audio.mpd";
            audio = document.querySelector('audio');
            player = dashjs.MediaPlayer().create();
            player.initialize(audio, url, true);
        }
    </script>

```

También necesitaremos un contenedor de audio para poder ejecutarlo, en este caso no necesita que le pasemos ningún recurso de audio, ya que se lo damos en la función

```html
<div>
    <audio controls></audio>
<div>
```

## 4. Video Settings

En este caso se pretende generar un reproductor en el cual se pueden seleccionar algunas opciones referentes al mismo de manera dinámica, como el maximo bitrate posible, el mínimo, etc.

```html
<script>
    function applySettings() {
        var stableBuffer = parseInt(document.getElementById('stableBuffer').value, 10);
        var bufferAtTopQuality = parseInt(document.getElementById('topQualityBuffer').value, 10);
        var minBitrate = parseInt(document.getElementById('minBitrate').value, 10);
        var maxBitrate = parseInt(document.getElementById('maxBitrate').value, 10);
        var limitByPortal = document.getElementById('limitByPortal').checked;

        player.updateSettings({
            'streaming': {
                'stableBufferTime': stableBuffer,
                'bufferTimeAtTopQualityLongForm': bufferAtTopQuality,
                'abr': {
                    'minBitrate': {
                        'video': minBitrate
                    },
                    'maxBitrate': {
                        'video': maxBitrate
                    },
                    'limitBitrateByPortal': limitByPortal
                }
            }
        })
    }
</script>
```