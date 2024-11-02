import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const SwaggerConfig = new DocumentBuilder()
    .setTitle('Che!Casa')
    .setDescription(
      ` 
  ##Descripción:

      Che!Casa es una plataforma de búsqueda y publicación de alojamiento en Argentina. 
      Nuestra aplicación permite a los usuarios explorar una variedad de opciones de alojamiento, 
      desde apartamentos hasta casas rurales, facilitando la planificación de sus viajes.
      
  ##Funcionalidades Principales:

      **Búsqueda de Alojamiento:** Los viajeros pueden buscar y filtrar alojamientos según diferentes criterios, 
      como ubicación, tipo de propiedad, precio y comodidades.

      **Publicación de Propiedades:** Los propietarios pueden crear anuncios de sus propiedades, 
      incluyendo detalles como fotos, descripciones, precios y disponibilidad.

      **Gestión de Reservas:** Los usuarios pueden reservar propiedades y gestionar sus reservas desde la plataforma.

      **Perfiles de Usuario:** Tanto viajeros como propietarios pueden crear y gestionar sus perfiles, 
      incluyendo historial de reservas y propiedades publicadas.
      
   ##Objetivos:

       **Che!Casa** busca simplificar la experiencia de encontrar y ofrecer alojamiento en Argentina, 
       promoviendo una comunidad activa de viajeros y anfitriones. 
       Nuestra API proporciona todos los recursos necesarios para interactuar con la plataforma, 
       permitiendo una integración sencilla y eficiente.
       

       paths:
          auth/signup:
           post:
            summary: SignUp
            description: Permite a los nuevos usuarios registrarse en la plataforma.
            responses:
              '201':
            description: Usuario creado exitosamente.
              '400':
            description: Error en la solicitud.

          auth/login:
           post:
           summary: Login
           description: Permite a los usuarios iniciar sesión en la plataforma.
           responses:
            '200':
           description: Inicio de sesión exitoso.
            '401':
          description: Credenciales inválidas.

         auth/google:
          post:
          summary: Google Login
          description: Permite a los usuarios iniciar sesión usando sus credenciales de Google.
          responses:
            '200':
          description: Inicio de sesión exitoso.
            '400':
          description: Error en la solicitud.

          auth/complete-profile:
           put:
           summary: Complete Profile
           description: Completa la información del perfil de usuario.
           responses:
             '200':
           description: Perfil actualizado exitosamente.
             '400':
           description: Error en la solicitud.

          users:
           get:
           summary: Get All Users
           description: Obtiene la lista de todos los usuarios registrados.
           responses:
            '200':
            description: Lista de usuarios.
            '404':
            description: No se encontraron usuarios.

           users/email:
           get:
           summary: Get User By Email
           description: Obtiene un usuario específico por su correo electrónico.
           responses:
           '200':
           description: Usuario encontrado.
           '404':
           description: Usuario no encontrado.

          users/{id}:
           get:
           summary: Get User By ID
           description: Obtiene un usuario específico por su ID.
           responses:
           '200':
           description: Usuario encontrado.
           '404':
           description: Usuario no encontrado.

          put:
           summary: Update User
           description: Actualiza la información de un usuario.
           responses:
           '200':
           description: Usuario actualizado exitosamente.
           '404':
           description: Usuario no encontrado.

          delete:
           summary: Remove User
           description: Elimina un usuario de la plataforma.
           responses:
           '204':
           description: Usuario eliminado exitosamente.
           '404':
           description: Usuario no encontrado.

          users/deactivate:
           put:
           summary: Deactivate User
           description: Desactiva un usuario de la plataforma.
           responses:
           '200':
           description: Usuario desactivado exitosamente.
           '404':
           description: Usuario no encontrado.

          users/activate:
           put:
           summary: Activate User
           description: Activa un usuario de la plataforma.
          responses:
           '200':
           description: Usuario activado exitosamente.
           '404':
           description: Usuario no encontrado.

         file-upload/uploadProfileImg/{id}:
          post:
          summary: File Upload Profile Image
          description: Sube una imagen de perfil para un usuario.
          responses:
          '200':
          description: Imagen de perfil subida exitosamente.
          '400':
          description: Error en la solicitud.

         file-upload/uploadPropertyImg/{id}:
          post:
          summary: File Upload Property Image
          description: Sube una imagen para una propiedad.
          responses:
          '200':
          description: Imagen de propiedad subida exitosamente.
          '400':
          description: Error en la solicitud.

         properties:
          get:
          summary: Get All Properties
          description: Obtiene la lista de todas las propiedades.
          responses:
          '200':
          description: Lista de propiedades.
          '404':
          description: No se encontraron propiedades.

         post:
          summary: Create Property
          description: Permite a los propietarios crear un anuncio de propiedad.
          responses:
          '201':
          description: Propiedad creada exitosamente.
          '400':
          description: Error en la solicitud.

        properties/{id}:
         get:
         summary: Get Property By ID
         description: Obtiene una propiedad específica por su ID.
         responses:
         '200':
         description: Propiedad encontrada.
         '404':
         description: Propiedad no encontrada.

       properties/filter:
         get:
         summary: Filter Properties
         description: Filtra propiedades según criterios específicos (ej. ubicación, precio).
         responses:
        '200':
         description: Lista de propiedades filtradas.
        '404':
        description: No se encontraron propiedades.`,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api', app, document);
};
