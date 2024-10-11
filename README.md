# ControlCar API Test

Este proyecto contiene una API conectada a https://pokeapi.co/ para el desarrollo de test para ControlCar.

## Endpoints

### 1. `GET /pokemon/import`

- **Descripción:** Importa los primeros 150 pokemones al estado del servidor.
- **Respuesta:**
  ```json
  [
     {
         "id": "1",
         "name": "bulbasaur",
         "url": "https://pokeapi.co/api/v2/pokemon/1/",
         "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
         "captured": false,
         "types": [
             {
                 "slot": 1,
                 "type": {
                     "name": "grass",
                     "url": "https://pokeapi.co/api/v2/type/12/"
                 }
             },
             {
                 "slot": 2,
                 "type": {
                     "name": "poison",
                     "url": "https://pokeapi.co/api/v2/type/4/"
                 }
             }
         ]
     },
     ...
  ]
  ```

### 2. `GET /pokemon/search`

- **Descripción:** Obtiene la información de un coche específico por su ID.
- **Parámetros Query:**
  - `page`: Pagina de los resultados.
  - `q`: Nombre del pokemon
  - `type`: Tipo de pokemon
- **Respuesta:**
  ```json
  {
      "page": 1,
      "totalPages": 15,
      "total": 150,
      "results": [
          {
              "id": "1",
              "name": "bulbasaur",
              "url": "https://pokeapi.co/api/v2/pokemon/1/",
              "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
              "captured": false,
              "types": [
                  {
                      "slot": 1,
                      "type": {
                          "name": "grass",
                          "url": "https://pokeapi.co/api/v2/type/12/"
                      }
                  },
                  {
                      "slot": 2,
                      "type": {
                          "name": "poison",
                          "url": "https://pokeapi.co/api/v2/type/4/"
                      }
                  }
              ]
          },
          ...
      ]
  }
  ```

### 3. `POST /pokemon/capture`

- **Descripción:** Añade un nuevo pokemon a la lista de pokemones capturados.
- **Cuerpo de la solicitud:**
  ```json
  {
    "id": "1"
  }
  ```
- **Respuesta:**
  ```json
  {
    "message": "Pokemon capturado"
  }
  ```

### 4. `GET /pokemon/captured`

- **Descripción:** Obtiene los pokemones capturados.
- **Respuesta:**
  ```json
  [
    {
        "id": "1",
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        "captured": true,
        "types": [
            {
                "slot": 1,
                "type": {
                    "name": "grass",
                    "url": "https://pokeapi.co/api/v2/type/12/"
                }
            },
            {
                "slot": 2,
                "type": {
                    "name": "poison",
                    "url": "https://pokeapi.co/api/v2/type/4/"
                }
            }
        ]
    },
    ...
  ]
  ```

### 5. `DELETE /pokemon/capture/{id}`

- **Descripción:** Elimina un pokemon capturado de la lista de capturados por su ID.
- **Parámetros:**
  - `id` (requerido): ID del pokemon.
- **Respuesta:**
  ```json
  {
    "message": "Pokemon removed"
  }
  ```

## Instalación

1. Clona el repositorio.
   ```sh
   git clone https://github.com/nicopv-dev/controlcar-app-test.git
   ```
2. Navega al directorio del proyecto.
   ```sh
   cd controlcar-api-test
   ```
3. Instala las dependencias.
   ```sh
   npm install
   ```

## Uso

1. Inicia el servidor.
   ```sh
   npm run dev
   ```

⚙️Desarrollado por [_Nicolas Pereira_](https://nicolaspereira.cl)
